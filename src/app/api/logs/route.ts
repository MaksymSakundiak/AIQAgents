import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db"; // Assuming you have a database connection set up

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("agentId");
    let logs;
    if (agentId) {
      logs = db.prepare("SELECT * FROM agent_logs WHERE agentId = ? ORDER BY timestamp DESC").all(agentId);
    } else {
      logs = db.prepare("SELECT * FROM agent_logs ORDER BY timestamp DESC").all();
    }
    return NextResponse.json({ status: "ok", logs });
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}