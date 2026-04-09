import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword?: string;
  plan: "free" | "pro" | "agency";
  generationsThisMonth: number;
  lastResetDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    hashedPassword: { type: String, required: true },
    plan: { 
      type: String, 
      enum: ["free", "pro", "agency"], 
      default: "free" 
    },
    generationsThisMonth: { type: Number, default: 0 },
    lastResetDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
