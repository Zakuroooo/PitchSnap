import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOTP extends Document {
  email: string;
  code: string;
  name: string;
  hashedPassword: string;
  createdAt: Date;
}

const OTPSchema: Schema<IOTP> = new Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // TTL: 10 minutes
});

export const OTPModel: Model<IOTP> =
  mongoose.models.OTP || mongoose.model<IOTP>("OTP", OTPSchema);
