/** n8n automation webhook triggers — all fire-and-forget, never block the main flow */

function fireWebhook(url: string | undefined, payload: Record<string, unknown>) {
  if (!url) {
    console.log("[n8n] Skipped webhook (no URL provided in environment)");
    return;
  }
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => console.error("[n8n] Webhook failed:", err));
}

/** Triggered when a new user signs up (credentials or OAuth) */
export function triggerSignupWebhook(payload: {
  name: string;
  email: string;
  plan: string;
  provider: "credentials" | "google" | "github";
}) {
  fireWebhook(process.env.N8N_SIGNUP_WEBHOOK_URL, {
    event: "user.signup",
    timestamp: new Date().toISOString(),
    ...payload,
  });
}

/** Triggered after every successful proposal generation */
export function triggerProposalWebhook(payload: {
  email: string;
  clientName: string;
  service: string;
  generationsThisMonth: number;
  planLimit: number;
}) {
  fireWebhook(process.env.N8N_PROPOSAL_WEBHOOK_URL, {
    event: "proposal.generated",
    timestamp: new Date().toISOString(),
    ...payload,
  });
}
