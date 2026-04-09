import { NextResponse, NextRequest } from "next/server";

export function setAuthCookies(res: NextResponse, accessToken: string, refreshToken: string): void {
  const isProduction = process.env.NODE_ENV === "production";

  // Access token cookie: 15 min max-age
  res.cookies.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 15 * 60, // 15 minutes
    path: "/",
  });

  // Refresh token cookie: 7 day max-age
  res.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

export function clearAuthCookies(res: NextResponse): void {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookies.set({
    name: "accessToken",
    value: "",
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  res.cookies.set({
    name: "refreshToken",
    value: "",
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
}

export function getTokenFromCookies(req: NextRequest): { accessToken?: string; refreshToken?: string } {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  return { accessToken, refreshToken };
}
