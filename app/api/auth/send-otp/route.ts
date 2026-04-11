import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { OTPModel } from "@/lib/models/OTP";
import { sendOTPEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    await dbConnect();

    // Check if email already registered
    const existing = await UserModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash password before storing in OTP doc
    const hashedPassword = await bcrypt.hash(password, 12);

    // Delete any existing pending OTP for this email
    await OTPModel.deleteMany({ email: email.toLowerCase() });

    // Save OTP doc (auto-expires in 10 min via TTL index)
    await OTPModel.create({
      email: email.toLowerCase(),
      code,
      name,
      hashedPassword,
    });

    // Send OTP email
    await sendOTPEmail(email, name, code);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[send-otp]", error);
    return NextResponse.json({ error: "Failed to send verification email." }, { status: 500 });
  }
}
