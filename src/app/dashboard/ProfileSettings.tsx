"use client";

import { useEffect, useState } from "react";
import { PencilSimple, Gear } from "@phosphor-icons/react";

export default function ProfileSettings() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  return (
    <section className="tab-content text-cyan-100">
      <h2 className="text-cyan-400 text-2xl mb-4 flex items-center gap-2">
        <Gear size={22} />
        Profile & Settings
      </h2>

      <div className="bg-gray-900 rounded-xl p-6 shadow-md w-full max-w-xl">
        <div className="mb-6">
          <label className="block text-sm font-medium text-cyan-300 mb-2">Username</label>
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded">
            <span>{userName || "Anonymous"}</span>
            <button className="text-cyan-400 hover:text-cyan-200 transition">
              <PencilSimple size={20} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-cyan-300 mb-2">Email Notifications</label>
          <select className="bg-gray-800 px-4 py-2 rounded w-full text-cyan-200">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-cyan-300 mb-2">Theme Preference</label>
          <select className="bg-gray-800 px-4 py-2 rounded w-full text-cyan-200">
            <option>Dark</option>
            <option>Light</option>
            <option>System</option>
          </select>
        </div>

        <button className="bg-cyan-600 hover:bg-cyan-500 transition px-6 py-2 rounded text-black font-semibold">
          Save Changes
        </button>
      </div>
    </section>
  );
}
