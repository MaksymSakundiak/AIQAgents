// src/app/api/agents/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, agentName, style, risk, maxInvest, assets, autoSell } = body;

    // Validation
    if (!userId || !name || !agentName || !style || !risk || !maxInvest || !assets) {
      return NextResponse.json({ status: "error", message: "Missing required fields" }, { status: 400 });
    }
    if (risk < 1 || risk > 10) {
      return NextResponse.json({ status: "error", message: "Risk must be between 1 and 10" }, { status: 400 });
    }
    if (maxInvest < 100) {
      return NextResponse.json({ status: "error", message: "Max investment must be at least $100" }, { status: 400 });
    }

    const id = uuidv4();
    db.prepare(
      `INSERT INTO agents (id, userId, name, agentName, style, risk, maxInvest, assets, autoSell, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(id, userId, name, agentName, style, risk, maxInvest, JSON.stringify(assets), autoSell ? 1 : 0, "running");

    return NextResponse.json({
      status: "ok",
      agentId: id,
      message: `Agent ${agentName} launched successfully.`,
    });
  } catch (err) {
    console.error("Agent launch failed:", err);
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const rows = db.prepare("SELECT * FROM agents").all();
    const agents = rows.map((row: any) => ({
      id: row.id,
      userId: row.userId,
      agentName: row.agentName,
      style: row.style,
      risk: row.risk,
      maxInvest: row.maxInvest,
      assets: JSON.parse(row.assets),
      autoSell: !!row.autoSell,
      status: row.status,
    }));
    return NextResponse.json({ status: "ok", agents });
  } catch (err) {
    console.error("Failed to fetch agents:", err);
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}