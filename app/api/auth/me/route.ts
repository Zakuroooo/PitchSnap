import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { verifyAccessToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = verifyAccessToken(accessToken);
    } catch (err) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await UserModel.findById(decoded.userId).exec();
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          plan: user.plan,
          generationsThisMonth: user.generationsThisMonth,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Auth me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
