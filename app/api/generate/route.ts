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

    // 5. Build Groq prompt
    const prompt = `You are an elite freelance proposal writer. Generate a complete pitch package for the following:

CLIENT BUSINESS: ${clientName}
INDUSTRY: ${industry}
SERVICE BEING PITCHED: ${service}
CLIENT'S MAIN PROBLEM: ${challenge}
TONE: ${tone}

Generate EXACTLY this JSON structure (no markdown, no extra text, only valid JSON):

{
  "coldEmail": "Subject: [subject line]\\n\\n[Full cold email body - 150-200 words, ${tone} tone, personalized to ${clientName} in ${industry}]",
  "linkedinMessage": "[LinkedIn DM - 80-100 words, conversational, no hard sell, ${tone} tone]",
  "proposal": "[Full professional project proposal - 400-500 words covering: Executive Summary, Understanding of Problem, Proposed Solution, Deliverables, Timeline, Why Choose Me. ${tone} tone]",
  "followUpSequence": "Follow-Up 1 (Day 3):\\n[50-60 word follow-up email]\\n\\nFollow-Up 2 (Day 7):\\n[50-60 word follow-up email]\\n\\nFollow-Up 3 (Day 14):\\n[50-60 word final follow-up email]",
  "pricingRange": "[Suggested pricing breakdown for ${service} for a ${industry} client with this scope. Include: Starter package, Standard package, Premium package with price ranges and what's included in each]"
}`;

    // 6. Call Groq Llama 3.1
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const rawContent = completion.choices[0]?.message?.content || "";

    // 7. Parse JSON output
    let output;
    try {
      // Strip markdown code blocks if Groq wraps in them
      const cleaned = rawContent
        .replace(/^```json\n?/, "")
        .replace(/^```\n?/, "")
        .replace(/\n?```$/, "")
        .trim();
      output = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Groq output:", rawContent);
      return NextResponse.json(
        { error: "AI returned an unexpected format. Please try again." },
        { status: 500 }
      );
    }

    // 8. Save generation to MongoDB
    await GenerationModel.create({
      userId,
      clientName,
      industry,
      service,
      challenge,
      tone,
      output,
    });

    // 9. Return output
    return NextResponse.json(output, { status: 200 });
  } catch (error: unknown) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
