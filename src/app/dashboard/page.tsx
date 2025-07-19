"use client";

import { useEffect, useState } from "react";
import { Bell, Moon, Sun } from "@phosphor-icons/react";
import { useRouter } from "next/navigation"; // For redirection after sign-out
import ProfileSettings from "./ProfileSettings";
import "./dashboard.css";

type Agent = {
  id: string;
  agentName: string;
  style: string;
  risk: number;
  maxInvest: number;
  assets: string[];
  autoSell: boolean;
  status: string;
  userId: string; // Added to filter by user
};

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  // Form fields
  const [agentName, setAgentName] = useState("");
  const [style, setStyle] = useState("moderate");
  const [risk, setRisk] = useState(5);
  const [maxInvest, setMaxInvest] = useState(1000);
  const [assets, setAssets] = useState("");
  const [autoSell, setAutoSell] = useState(true);

  // Fetch agents for the current user
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch("/api/agents");
      const data = await res.json();
      if (data.status === "ok" && userId) {
        // Filter agents by the current user's ID
        const filteredAgents = data.agents.filter((agent: Agent) => agent.userId === userId);
        setAgents(filteredAgents);
      }
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    } finally {
      setLoading(false);
    }
  };

  // Launch new agent
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLaunching(true);
    setSuccess(false);

    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("userName");

    if (!userId || !name) {
      alert("User not authenticated. Please sign in.");
      return;
    }

    const config = {
      agentName,
      style,
      risk,
      maxInvest,
      assets: assets.split(",").map((a) => a.trim()),
      autoSell,
      userId,
      name,
    };

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();

      if (data.status === "ok") {
        setSuccess(true);
        setAgentName("");
        setAssets("");
        fetchAgents();
        setActiveTab("overview");
      } else {
        alert("Failed to launch agent.");
      }
    } catch (err) {
      alert("Agent launch failed.");
    } finally {
      setLaunching(false);
    }
  };

  // Sign out function
  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    router.push("/auth/signup"); // Redirect to sign-in page
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
    fetchAgents();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-logo">
          <div className="logo">
            <span className="logo-icon">
              <div className="logoh">🤖</div>
            </span>
            <h1 className="logo-title">
              <span>AIQ</span>
              <span>Agents</span>
            </h1>
          </div>
        </div>
        <div className="app-header-navigation">
          <div className="tabs">
            <a
              href="#"
              className={activeTab === "overview" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("overview");
              }}
            >
              Overview
            </a>
            <a
              href="#"
              className={activeTab === "launch" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("launch");
              }}
            >
              Launch Agent
            </a>
          </div>
        </div>
        <div className="app-header-actions">
          <div className="profile-section">
            <span className="user-profile">{userName || "User"}</span>
            <button
              className="sign-out-button"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
          <div className="app-header-actions-buttons">
            <button className="icon-button notification-button">
              <Bell size={25} />
            </button>
            <button className="icon-button theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={25} /> : <Moon size={25} />}
            </button>
          </div>
        </div>
        <div className="app-header-mobile">
          <button className="icon-button">
            <i className="ph-list"></i>
          </button>
          <button className="icon-button notification-button">
            <i className="ph-bell"></i>
          </button>
          <button className="icon-button theme-toggle" onClick={toggleTheme}>
            <i className={theme === "dark" ? "ph-sun" : "ph-moon"}></i>
          </button>
        </div>
      </header>
      <div className="app-body">
        <div className="app-body-navigation">
          <nav className="navigation">
            <a href="#">
              <i className="ph-browsers"></i>
              <span>Dashboard</span>
            </a>
            <a href="#">
              <i className="ph-check-square"></i>
              <span>Profile</span>
            </a>
            <a href="#">
              <i className="ph-swap"></i>
              <span>Settings</span>
            </a>
          </nav>
          <footer className="footer">
            <h1>AIQ Agents<small>©</small></h1>
            <div>
              AIQ Agents ©<br />
              All Rights Reserved 2025
            </div>
          </footer>
        </div>
        <div className="app-body-main-content">
          {activeTab === "overview" && (
            <section className="service-section tab-content">
              <h2>Active AI Investment Agents</h2>
              {loading && <p>Loading...</p>}
              {!loading && agents.length === 0 && <p>No agents launched yet.</p>}
              <div className="tiles">
                {agents.map((agent) => (
                  <article key={agent.id} className="tile">
                    <div className="tile-header">
                      <i className="ph-lightning-light"></i>
                      <h3>
                        <span>{agent.agentName}</span>
                        <span>{agent.style.charAt(0).toUpperCase() + agent.style.slice(1)}</span>
                      </h3>
                    </div>
                    <div className="tile-details">
                      <p><strong>Risk Level:</strong> {agent.risk}</p>
                      <p><strong>Max Investment:</strong> ${agent.maxInvest}</p>
                      <p><strong>Assets:</strong> {agent.assets.join(", ")}</p>
                      <p><strong>Auto Sell:</strong> {agent.autoSell ? "Enabled" : "Disabled"}</p>
                      <p><strong>Status:</strong> {agent.status}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
          {activeTab === "launch" && (
            <section className="tab-content">
              <form onSubmit={handleSubmit} className="agent-form">
                <h2>
                  <i className="ph-rocket-launch"></i> Launch New AI Investment Agent
                </h2>
                <input
                  placeholder="Agent Name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  required
                />
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </select>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={risk}
                  onChange={(e) => setRisk(Number(e.target.value))}
                  placeholder="Risk Level (1-10)"
                />
                <input
                  type="number"
                  value={maxInvest}
                  onChange={(e) => setMaxInvest(Number(e.target.value))}
                  placeholder="Max $ Invest per Asset"
                />
                <input
                  value={assets}
                  onChange={(e) => setAssets(e.target.value)}
                  placeholder="Assets to track (e.g., BTC, ETH, AAPL)"
                />
                <label>
                  <input
                    type="checkbox"
                    checked={autoSell}
                    onChange={(e) => setAutoSell(e.target.checked)}
                  />
                  <span>Enable Auto-Sell</span>
                </label>
                <button type="submit" disabled={launching}>
                  {launching ? "Launching..." : "Launch Agent"}
                </button>
                {success && (
                  <p className="success-message">
                    ✅ Agent launched successfully!
                  </p>
                )}
              </form>
            </section>
          )}
        </div>
        <div className="app-body-sidebar">
          <section className="payment-section">
            <h2>Quick Actions</h2>
            <div className="payment-section-header">
              <p>Manage your investments</p>
            </div>
            <div className="payments">
              <div className="payment">
                <div className="payment-details">
                  <button
                    className="save-button"
                    onClick={() => setActiveTab("launch")}
                  >
                    Launch New Agent
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}