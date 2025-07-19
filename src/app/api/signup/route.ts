import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (existingUser) return NextResponse.json({ error: "User exists" }, { status: 400 });
  const hash = await bcrypt.hash(password, 10);
  db.prepare("INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)")
    .run(uuidv4(), name, email, hash);
  return NextResponse.json({ status: "ok" });
}