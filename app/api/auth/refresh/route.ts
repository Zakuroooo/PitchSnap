import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "@/lib/jwt";
import { setAuthCookies, getTokenFromCookies, clearAuthCookies } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = getTokenFromCookies(req);

    if (!refreshToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err: any) {
      const response = NextResponse.json({ error: "Session expired, please login again" }, { status: 401 });
      clearAuthCookies(response);
      return response;
    }

    await connectDB();

    const user = await UserModel.findById(decoded.userId).exec();
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const tokenPayload = { userId: user._id.toString(), email: user.email };
    const newAccessToken = signAccessToken(tokenPayload);
    const newRefreshToken = signRefreshToken(tokenPayload);

    const response = NextResponse.json({ success: true }, { status: 200 });
    setAuthCookies(response, newAccessToken, newRefreshToken);

    return response;
  } catch (error: any) {
    console.error("Refresh token error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
