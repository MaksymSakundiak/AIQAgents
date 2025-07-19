import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "agents.sqlite");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    name TEXT NOT NULL,
    agentName TEXT NOT NULL,
    style TEXT NOT NULL,
    risk INTEGER NOT NULL,
    maxInvest INTEGER NOT NULL,
    assets TEXT NOT NULL,
    autoSell INTEGER NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id)
  );
`);

export default db;