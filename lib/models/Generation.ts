import mongoose, { Schema, Document, models } from "mongoose";

export interface IGeneration extends Document {
  userId: string;
  clientName: string;
  industry: string;
  service: string;
  challenge: string;
  tone: string;
  output: {
    coldEmail: string;
    linkedinMessage: string;
    proposal: string;
    followUpSequence: string;
    pricingRange: string;
  };
  viewId: string;
  analytics: {
    views: number;
    totalTimeSeconds: number;
  };
  isHidden: boolean;
  createdAt: Date;
}

const GenerationSchema = new Schema<IGeneration>(
  {
    userId: { type: String, required: true, index: true },
    clientName: { type: String, required: true },
    industry: { type: String, required: true },
    service: { type: String, required: true },
    challenge: { type: String, required: true },
    tone: { type: String, required: true, default: "Professional" },
    output: {
      coldEmail: { type: String, required: true },
      linkedinMessage: { type: String, required: true },
      proposal: { type: String, required: true },
      followUpSequence: { type: String, required: true },
      pricingRange: { type: String, required: true },
    },
    viewId: { 
      type: String, 
      required: true, 
      index: true,
      default: () => require('crypto').randomUUID() 
    },
    analytics: {
      views: { type: Number, default: 0 },
      totalTimeSeconds: { type: Number, default: 0 },
    },
    isHidden: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const GenerationModel =
  models.Generation ||
  mongoose.model<IGeneration>("Generation", GenerationSchema);
