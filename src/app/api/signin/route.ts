import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  return NextResponse.json({ status: "ok", user: { id: user.id, name: user.name, email: user.email } });
}