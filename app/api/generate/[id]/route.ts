import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import { GenerationModel } from "@/lib/models/Generation";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await dbConnect();
    
    // Ensure strict ObjectId parsing if Mongoose string conversion silently drops it
    const mongoose = require("mongoose");
    const objectId = new mongoose.Types.ObjectId(id);

    // Soft delete to prevent metrics from tanking
    // Added strict: false directly to bypass Next.js Dev HMR preserving the old cached Generation schema
    const result = await GenerationModel.updateOne(
      { _id: objectId },
      { $set: { isHidden: true } },
      { strict: false }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Delete generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
