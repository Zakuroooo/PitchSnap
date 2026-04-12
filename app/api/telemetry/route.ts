import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { GenerationModel } from "@/lib/models/Generation";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { viewId, incrementSeconds, isInitialLoad } = body;

    if (!viewId) {
      return NextResponse.json({ error: "Missing viewId" }, { status: 400 });
    }

    const updateQuery: any = {};
    if (isInitialLoad) {
      updateQuery.$inc = { "analytics.views": 1 };
    } else if (incrementSeconds) {
      updateQuery.$inc = { "analytics.totalTimeSeconds": incrementSeconds };
    }

    if (updateQuery.$inc) {
      await GenerationModel.updateOne(
        { viewId },
        updateQuery
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Telemetry ERROR]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
