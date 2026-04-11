/** n8n automation webhook triggers — all fire-and-forget, never block the main flow */

const SIGNUP_WEBHOOK = process.env.N8N_SIGNUP_WEBHOOK_URL;
const PROPOSAL_WEBHOOK = process.env.N8N_PROPOSAL_WEBHOOK_URL;

function fireWebhook(url: string, payload: Record<string, unknown>) {
  if (!url) return; // Silently skip if not configured
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
  fireWebhook(SIGNUP_WEBHOOK ?? "", {
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
  fireWebhook(PROPOSAL_WEBHOOK ?? "", {
    event: "proposal.generated",
    timestamp: new Date().toISOString(),
    ...payload,
  });
}
