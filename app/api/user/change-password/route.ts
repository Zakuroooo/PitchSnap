import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userEmail, currentPassword, newPassword } = await req.json();

    if (!userEmail || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    await dbConnect();
    const user = await UserModel.findOne({ email: userEmail });

    if (!user || !user.hashedPassword) {
      return NextResponse.json({ error: "Cannot change password for OAuth accounts." }, { status: 400 });
    }

    const isValid = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!isValid) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    const newHash = await bcrypt.hash(newPassword, 12);
    user.hashedPassword = newHash;
    await user.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "An internal error occurred." }, { status: 500 });
  }
}
