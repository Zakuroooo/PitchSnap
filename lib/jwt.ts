import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
  email: string;
}

const getSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return secret;
};

const getRefreshSecret = (): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
  }
  return secret;
};

export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: "15m" });
}

export function signRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, getRefreshSecret(), { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): TokenPayload & jwt.JwtPayload {
  const decoded = jwt.verify(token, getSecret());
  if (typeof decoded === "string") {
    throw new Error("Invalid token payload format");
  }
  return decoded as TokenPayload & jwt.JwtPayload;
}

export function verifyRefreshToken(token: string): TokenPayload & jwt.JwtPayload {
  const decoded = jwt.verify(token, getRefreshSecret());
  if (typeof decoded === "string") {
    throw new Error("Invalid token payload format");
  }
  return decoded as TokenPayload & jwt.JwtPayload;
}
