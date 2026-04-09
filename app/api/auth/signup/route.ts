import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { setAuthCookies } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await UserModel.findOne({ email: email.toLowerCase().trim() }).exec();
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      name,
      email: email.toLowerCase().trim(),
      hashedPassword,
      plan: "free",
      generationsThisMonth: 0,
      lastResetDate: new Date(),
    });

    const tokenPayload = { userId: user._id.toString(), email: user.email };
    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          plan: user.plan,
        },
      },
      { status: 201 }
    );

    setAuthCookies(response, accessToken, refreshToken);

    return response;
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message || "Internal server error", stack: error.stack }, { status: 500 });
  }
}
