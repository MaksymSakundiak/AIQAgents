"use client";

import Image from "next/image";

export default function AlphaOverview() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <h2 className="text-4xl font-bold">What is AIQAgents?</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Alpha Agents is an open protocol for building and deploying autonomous agents capable of real-world trading, governance, and financial strategy — with full support for no-code interfaces, secure execution, and modular customization.
        </p>

        <div className="grid md:grid-cols-3 gap-8 pt-10">
          {/* Card 1 */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-xl hover:shadow-purple-700/30 transition h-full">
            <Image
              src="/image/trained.webp"
              alt="Intelligent"
              fill
              className="object-cover blur-sm opacity-30"
            />
            <div className="relative z-10 p-6">
              <h3 className="text-xl font-semibold mb-2">🧠 Trained for Alpha</h3>
              <p className="text-gray-300 text-sm">
                Leverages historical and live DeFi data to uncover high-probability trading opportunities.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-xl hover:shadow-blue-700/30 transition h-full">
            <Image
              src="/image/instant.jpeg"
              alt="Deploy Instantly"
              fill
              className="object-cover blur-sm opacity-30"
            />
            <div className="relative z-10 p-6">
              <h3 className="text-xl font-semibold mb-2">⚡ Deploy Instantly</h3>
              <p className="text-gray-300 text-sm">
                Launch agents in minutes using no-code tools or your own custom strategies.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-xl hover:shadow-green-700/30 transition h-full">
            <Image
              src="/image/evolving.jpeg"
              alt="Always Evolving"
              fill
              className="object-cover blur-sm opacity-30"
            />
            <div className="relative z-10 p-6">
              <h3 className="text-xl font-semibold mb-2">🔁 Always Evolving</h3>
              <p className="text-gray-300 text-sm">
                Agents continuously learn and adapt to changing market conditions for improved performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}