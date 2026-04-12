// Uses Resend REST API directly — no SDK needed

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const FROM = process.env.EMAIL_FROM ?? "PitchSnap <hello@pitchsnap.me>";
const IS_DEV = process.env.NODE_ENV !== "production";

/**
 * Core send function.
 * In dev: If Resend rejects with a domain/recipient restriction (403),
 * we fall back to console — the full flow still works, OTP appears in terminal.
 * In prod: throws so the API route returns a proper error.
 */
async function sendEmail(
  to: string,
  subject: string,
  html: string,
  fallbackLog?: string
): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set. Skipping email send.");
    if (fallbackLog) console.log(fallbackLog);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as {
      statusCode?: number;
      name?: string;
      message?: string;
    };

    // Resend free-tier restriction: can only send to verified account owner.
    // In dev, gracefully fall back to console so the flow is testable.
    if (
      IS_DEV &&
      (err.statusCode === 403 || err.name === "validation_error")
    ) {
      console.warn(
        `[Email] Resend domain restriction — email NOT delivered to ${to}.`
      );
      console.warn(
        `[Email] To test locally, add a verified domain at resend.com/domains.`
      );
      if (fallbackLog) console.log(fallbackLog);
      return; // Don't throw in dev — let the OTP flow continue
    }

    throw new Error(err.message ?? `Resend API error (${res.status})`);
  }

  console.log(`[Email] ✓ Sent "${subject}" → ${to}`);
}

/** Send a 6-digit OTP email for email verification */
export async function sendOTPEmail(email: string, name: string, code: string) {
  const fallbackLog = `\n  ╔══════════════════════════════════╗\n  ║  [DEV] OTP FOR ${email.padEnd(18)} ║\n  ║  CODE: ${code}                     ║\n  ╚══════════════════════════════════╝\n`;
  await sendEmail(
    email,
    `${code} is your PitchSnap verification code`,
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#0C0C0C;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0C0C0C;min-height:100vh;">
    <tr><td align="center" style="padding:60px 20px;">
      <table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;">
        <tr><td style="padding-bottom:40px;">
          <span style="font-size:14px;font-weight:800;letter-spacing:0.2em;color:#ffffff;text-transform:uppercase;">PITCHSNAP.</span>
        </td></tr>
        <tr><td style="border:1px solid rgba(255,255,255,0.07);padding:40px;">
          <p style="margin:0 0 8px 0;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#5e5e5e;">Email Verification</p>
          <h1 style="margin:0 0 24px 0;font-size:28px;font-weight:800;color:#ffffff;">Verify your email</h1>
          <p style="margin:0 0 32px 0;font-size:14px;color:#888888;line-height:1.6;">Hi ${name}, enter this code to finish creating your PitchSnap account. It expires in 10 minutes.</p>
          <div style="background:#141414;border:1px solid rgba(255,255,255,0.07);padding:24px;text-align:center;margin-bottom:32px;">
            <span style="font-size:40px;font-weight:800;letter-spacing:0.3em;color:#ffffff;">${code}</span>
          </div>
          <p style="margin:0;font-size:12px;color:#474747;">If you didn't request this, you can safely ignore this email.</p>
        </td></tr>
        <tr><td style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#333333;text-align:center;">&copy; 2026 PitchSnap. Built for closers.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    fallbackLog
  );
}

/** Send a branded welcome email after successful signup (fire-and-forget) */
export function sendWelcomeEmail(email: string, name: string) {
  const firstName = name.split(" ")[0];
  const dashboardUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    : "http://localhost:3000/dashboard";

  sendEmail(
    email,
    `Welcome to PitchSnap, ${firstName}.`,
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#0C0C0C;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0C0C0C;min-height:100vh;">
    <tr><td align="center" style="padding:60px 20px;">
      <table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;">
        <tr><td style="padding-bottom:40px;">
          <span style="font-size:14px;font-weight:800;letter-spacing:0.2em;color:#ffffff;text-transform:uppercase;">PITCHSNAP.</span>
        </td></tr>
        <tr><td style="border:1px solid rgba(255,255,255,0.07);padding:40px;">
          <p style="margin:0 0 8px 0;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#B8FF57;">You're in.</p>
          <h1 style="margin:0 0 24px 0;font-size:28px;font-weight:800;color:#ffffff;">Welcome, ${firstName}.</h1>
          <p style="margin:0 0 32px 0;font-size:14px;color:#888888;line-height:1.6;">Your account is ready. PitchSnap generates winning proposals in 10 seconds.</p>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;width:100%;">
            <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
              <span style="font-size:10px;font-weight:700;color:#5e5e5e;">01 &mdash;</span>
              <span style="font-size:13px;color:#c6c6c6;margin-left:12px;">Generate your first proposal in the dashboard</span>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
              <span style="font-size:10px;font-weight:700;color:#5e5e5e;">02 &mdash;</span>
              <span style="font-size:13px;color:#c6c6c6;margin-left:12px;">Review the quality score &mdash; aim for A-tier</span>
            </td></tr>
            <tr><td style="padding:12px 0;">
              <span style="font-size:10px;font-weight:700;color:#5e5e5e;">03 &mdash;</span>
              <span style="font-size:13px;color:#c6c6c6;margin-left:12px;">Send to the client &mdash; close the deal</span>
            </td></tr>
          </table>
          <a href="${dashboardUrl}" style="display:inline-block;background:#ffffff;color:#000000;font-size:12px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;padding:14px 32px;">Open Dashboard &rarr;</a>
        </td></tr>
        <tr><td style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#333333;text-align:center;">&copy; 2026 PitchSnap. Built for closers.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
  ).catch((err: unknown) => console.error("[Email] Welcome email failed:", err));
}
