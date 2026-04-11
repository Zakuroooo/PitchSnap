import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { OTPModel } from "@/lib/models/OTP";
import { sendWelcomeEmail } from "@/lib/email";
import { triggerSignupWebhook } from "@/lib/n8n";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required." }, { status: 400 });
    }

    await dbConnect();

    // Find pending OTP
    const otp = await OTPModel.findOne({
      email: email.toLowerCase(),
      code: code.trim(),
    });

    if (!otp) {
      return NextResponse.json(
        { error: "Invalid or expired code. Please request a new one." },
        { status: 400 }
      );
    }

    // Create the user account
    const user = await UserModel.create({
      name: otp.name,
      email: otp.email,
      hashedPassword: otp.hashedPassword,
      plan: "free",
      generationsThisMonth: 0,
      lastResetDate: new Date(),
    });

    // Delete used OTP
    await OTPModel.deleteOne({ _id: otp._id });

    // Send welcome email (fire-and-forget)
    sendWelcomeEmail(otp.email, otp.name);

    // Trigger n8n signup automation (fire-and-forget)
    triggerSignupWebhook({
      name: otp.name,
      email: otp.email,
      plan: "free",
      provider: "credentials",
    });

    return NextResponse.json({ success: true, userId: user._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("[verify-otp]", error);
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 500 });
  }
}
