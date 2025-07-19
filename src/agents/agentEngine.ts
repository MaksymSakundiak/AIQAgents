import Database from "better-sqlite3";
import path from "path";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

// Define the CoinGecko API response interface
interface CoinGeckoPriceResponse {
  [assetId: string]: {
    usd: number;
  };
}

const dbPath = path.resolve(process.cwd(), "agents.sqlite");
const db = new Database(dbPath);

async function fetchAssetPrice(asset: string): Promise<number | null> {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${asset.toLowerCase()}&vs_currencies=usd`;
    const res = await fetch(url);
    const data = await res.json() as CoinGeckoPriceResponse; // Type assertion
    return data[asset.toLowerCase()]?.usd ?? null;
  } catch {
    return null;
  }
}

async function runAgents() {
  const agents = db.prepare("SELECT * FROM agents WHERE status = 'running'").all();
  for (const agent of agents) {
    const assets = JSON.parse(agent.assets);
    for (const asset of assets) {
      const price = await fetchAssetPrice(asset);
      if (price) {
        const prevPrice = db.prepare(
          "SELECT price FROM agent_logs WHERE agentId = ? AND asset = ? ORDER BY timestamp DESC LIMIT 1"
        ).get(agent.id, asset)?.price || price;

        // Simple rule-based logic: Buy if price drops 5%, sell if price rises 10%
        if (price <= prevPrice * 0.95 && agent.maxInvest >= price) {
          db.prepare(
            "INSERT INTO agent_logs (id, agentId, asset, price, action) VALUES (?, ?, ?, ?, ?)"
          ).run(uuidv4(), agent.id, asset, price, `Bought ${asset} at $${price}`);
        } else if (price >= prevPrice * 1.10 && agent.autoSell) {
          db.prepare(
            "INSERT INTO agent_logs (id, agentId, asset, price, action) VALUES (?, ?, ?, ?, ?)"
          ).run(uuidv4(), agent.id, asset, price, `Sold ${asset} at $${price}`);
        }

        // Update agent status message
        db.prepare(
          "UPDATE agents SET message = ? WHERE id = ?"
        ).run(`Last checked ${asset} at $${price}`, agent.id);

        // Log monitoring activity
        db.prepare(
          "INSERT INTO agent_logs (id, agentId, asset, price, action) VALUES (?, ?, ?, ?, ?)"
        ).run(uuidv4(), agent.id, asset, price, "Monitored");
      }
    }
  }
}

// Run every 5 minutes
setInterval(runAgents, 5 * 60 * 1000);
runAgents().catch(console.error);