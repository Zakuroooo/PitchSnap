import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import { GenerationModel } from "@/lib/models/Generation";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const FREE_TIER_LIMIT = 5;

function getMonthStart(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Auth check
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userPlan = session.user.plan || "free";

    // 2. Parse body
    const body = await req.json();
    const { clientName, industry, service, challenge, tone } = body;

    if (!clientName || !industry || !service || !challenge || !tone) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // 3. Connect DB
    await dbConnect();

    // 4. Free tier limit: 5 generations/month
    if (userPlan === "free") {
      const monthStart = getMonthStart();
      const count = await GenerationModel.countDocuments({
        userId,
        createdAt: { $gte: monthStart },
      });

      if (count >= FREE_TIER_LIMIT) {
        return NextResponse.json(
          {
            error: `Free plan limit reached (${FREE_TIER_LIMIT}/month). Upgrade to Pro for unlimited generations.`,
            limitReached: true,
          },
          { status: 429 }
        );
      }
    }

    // 5. Build prompts
    const systemPrompt = `You are an elite freelance business development expert and copywriter with 10+ years of experience closing high-ticket freelance deals. You write hyper-personalized, conversion-focused outreach that gets replies. Every piece of copy you write feels authentic, specific, and tailored — never generic or templated. You ALWAYS return valid JSON only.`;

    const userPrompt = `Generate a complete, professional pitch package. Every section must be FULLY written — no placeholders, no "[insert here]", no skipping content.

CLIENT BUSINESS: ${clientName}
INDUSTRY: ${industry}
SERVICE BEING PITCHED: ${service}
CLIENT'S MAIN PROBLEM: ${challenge}
TONE: ${tone}

Return ONLY valid JSON with no markdown, no code blocks, no extra text. Use this exact structure:

{
  "coldEmail": "Subject: [compelling subject line specific to ${clientName}]\\n\\n[Complete 180-220 word cold email. Open with a specific observation about ${clientName} in ${industry}. Address their problem: ${challenge}. Present your ${service} with 2-3 concrete benefits. End with a clear low-friction CTA. Sign off professionally. ${tone} tone.]",

  "linkedinMessage": "[Complete 80-100 word LinkedIn DM. Start with a genuine observation about ${clientName}. Connect it to how ${challenge} affects them. Mention your ${service} expertise briefly. Ask one easy question to open a dialogue. No hard sell. ${tone} tone. Do NOT start with 'I hope this message finds you well'.]",

  "proposal": "[Complete 450-500 word proposal with these exact headings:\\n\\nEXECUTIVE SUMMARY\\n[60-80 words: what you're proposing and core value for ${clientName}]\\n\\nUNDERSTANDING YOUR CHALLENGE\\n[80-100 words: deep knowledge of ${challenge} and its business impact for ${clientName} in ${industry}]\\n\\nPROPOSED SOLUTION\\n[100-120 words: how your ${service} solves it, with 3-4 specific deliverables]\\n\\nTIMELINE\\n[60-80 words: realistic phases and milestones]\\n\\nWHY WORK WITH ME\\n[80-100 words: specific reasons your ${service} expertise is the right fit]\\n\\nNEXT STEPS\\n[30-40 words: clear call to action]]",

  "followUpSequence": "FOLLOW-UP EMAIL 1 — Day 3\\nSubject: [specific follow-up subject]\\n\\n[Complete 50-60 word follow-up. Reference your original pitch. Add one new value insight about ${industry}. Warm, non-pushy. ${tone} tone.]\\n\\nFOLLOW-UP EMAIL 2 — Day 7\\nSubject: [specific follow-up subject]\\n\\n[Complete 50-60 word follow-up. Share a relevant result or case example. Offer something useful specific to ${clientName}'s situation. ${tone} tone.]\\n\\nFOLLOW-UP EMAIL 3 — Day 14\\nSubject: [specific final follow-up subject]\\n\\n[Complete 50-60 word final follow-up. Graceful closing. Leave the door open. Mention you won't follow up after this. Give a clear reason to reply now. ${tone} tone.]",

  "pricingRange": "SUGGESTED PRICING — ${service} for ${clientName} (${industry})\\n\\n🔹 STARTER PACKAGE\\nInvestment: [realistic price range]\\nBest for: [who this suits]\\nDeliverables:\\n• [deliverable 1]\\n• [deliverable 2]\\n• [deliverable 3]\\nTimeline: [realistic timeline]\\n\\n🔸 STANDARD PACKAGE\\nInvestment: [realistic price range]\\nBest for: [who this suits]\\nDeliverables:\\n• [deliverable 1]\\n• [deliverable 2]\\n• [deliverable 3]\\n• [deliverable 4]\\nTimeline: [realistic timeline]\\n\\n💎 PREMIUM PACKAGE\\nInvestment: [realistic price range]\\nBest for: [who this suits]\\nDeliverables:\\n• [deliverable 1]\\n• [deliverable 2]\\n• [deliverable 3]\\n• [deliverable 4]\\n• [deliverable 5]\\nTimeline: [realistic timeline]\\n\\n* Prices are estimates for ${service} in ${industry}. Final pricing depends on project scope."
}`;

    // 6. CALL 1: Generate initial draft
    const draftResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const draftRawContent = draftResponse.choices[0]?.message?.content || "";
    let draft;
    try {
      const cleaned = draftRawContent
        .replace(/^```json\n?/, "")
        .replace(/^```\n?/, "")
        .replace(/\n?```$/, "")
        .trim();
      draft = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Groq Draft output:", draftRawContent);
      return NextResponse.json(
        { error: "AI draft generation failed. Please try again." },
        { status: 500 }
      );
    }

    // 7. CALL 2: Self-review and improve
    const reviewSystemPrompt = `You are a senior sales strategist reviewing a freelance proposal. Improve weak parts. Make the copy compelling, specific, and impactful. Return ONLY the improved JSON — same exact structure, better content. No markdown, just valid JSON.`;
    
    const reviewUserPrompt = `Review and rigorously improve this proposal package: ${JSON.stringify(draft)}.
Client: ${clientName}
Industry: ${industry}
Service: ${service}
Main Problem: ${challenge}

Improve specifically:
1. Make the cold email subject line more compelling.
2. Add specific details about their industry to prove deep understanding.
3. Make the pricing section sound highly professional.
4. Ensure the follow-up sequence escalates properly without being desperate.
Return the improved version strictly as JSON.`;

    const refinedResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: reviewSystemPrompt },
        { role: "user", content: reviewUserPrompt },
      ],
      temperature: 0.5,
      max_tokens: 3000,
    });

    const refinedRawContent = refinedResponse.choices[0]?.message?.content || "";
    
    // 8. Parse Refined Output
    let output;
    try {
      const cleaned = refinedRawContent
        .replace(/^```json\n?/, "")
        .replace(/^```\n?/, "")
        .replace(/\n?```$/, "")
        .trim();
      output = JSON.parse(cleaned);
    } catch {
      // Fallback to draft if refinement fails JSON parsing
      console.error("Failed to parse Groq Refined output. Falling back to Draft.", refinedRawContent);
      output = draft;
    }

    // 9. CALL 3: Quality Score (Evaluate the refined output)
    const scoreSystemPrompt = `You are a strict conversion rate expert. Analyze this freelance proposal and return ONLY a JSON object with this exact structure: { "score": 85, "grade": "A", "strengths": ["specific strength 1", "specific strength 2"], "improvements": ["one improvement suggestion"], "verdict": "One sentence verdict" }
Score 0-100. Grade: A(90+), B(75-89), C(60-74), D(below 60). No markdown, just JSON.`;
    const scoreUserPrompt = `Score this proposal for ${clientName}:
Cold email: ${output.coldEmail.substring ? output.coldEmail.substring(0, 500) : ''}...
Service: ${service}
Industry: ${industry}`;

    let qualityScore = null;
    try {
      const scoreResponse = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: scoreSystemPrompt },
          { role: "user", content: scoreUserPrompt },
        ],
        temperature: 0.3,
        max_tokens: 300,
      });
      
      const rawScore = scoreResponse.choices[0]?.message?.content || "";
      const cleanedScore = rawScore
        .replace(/^```json\n?/, "")
        .replace(/^```\n?/, "")
        .replace(/\n?```$/, "")
        .trim();
      qualityScore = JSON.parse(cleanedScore);
      output.qualityScore = qualityScore;
    } catch (e) {
      console.error("Failed to generate quality score:", e);
    }

    // 10. Save generation to MongoDB
    await GenerationModel.create({
      userId,
      clientName,
      industry,
      service,
      challenge,
      tone,
      output,
    });

    // 11. Return output
    return NextResponse.json({ success: true, data: output }, { status: 200 });
  } catch (error: unknown) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
