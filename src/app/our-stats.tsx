"use client";

import { Typography, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Sparkle, Clock, Users, Cube } from "phosphor-react";

const STATS = [
  { count: 1000, suffix: "+", title: "Beta Users", icon: <Users size={32} weight="duotone" /> },
  { count: 24, suffix: "/7", title: "Autonomous Agents", icon: <Cube size={32} weight="duotone" /> },
  { count: 50, suffix: "+", title: "DeFi Protocols Integrated", icon: <Sparkle size={32} weight="duotone" /> },
  { count: 5, suffix: " min", title: "Avg. Deployment Time", icon: <Clock size={32} weight="duotone" /> },
];

// Hook for animated count up effect (ease out)
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    let currentStep = 0;

    const easeOutQuad = (t: number) => t * (2 - t);

    const timer = setInterval(() => {
      currentStep++;
      const progress = easeOutQuad(currentStep / totalSteps);
      const value = Math.floor(progress * end);
      setCount(value > end ? end : value);
      if (currentStep >= totalSteps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
}

export function OurStats() {
  return (
    <section
      className="relative z-20 w-full bg-gradient-to-br from-black via-cyan-900 to-black py-28 px-6 md:px-16 lg:px-32 text-cyan-100 overflow-hidden"
      aria-label="Project Statistics"
    >
      {/* Background glow layers with subtle pulse animation */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500 opacity-20 blur-[140px] pointer-events-none animate-pulseSlow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-cyan-700 opacity-25 blur-[130px] pointer-events-none animate-pulseSlow delay-1000"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Text Content */}
        <div className="space-y-8 max-w-xl">
          <Typography
            variant="h6"
            className="uppercase font-semibold tracking-widest text-cyan-400"
          >
            Our Stats
          </Typography>
          <Typography
            variant="h2"
            className="text-5xl font-extrabold leading-tight drop-shadow-md"
          >
            Powering Autonomous Finance
          </Typography>
          <Typography variant="lead" className="text-cyan-300 text-lg">
            We’re building the future of finance with intelligent, secure, and modular AI agents — seamlessly operating on-chain, around the clock.
          </Typography>

          <Button
            variant="gradient"
            size="lg"
            className="mt-6 w-48 rounded-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 shadow-lg hover:shadow-cyan-700"
            aria-label="Get started with AIQ Agents"
          >
            Get Started
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-8">
          {STATS.map(({ count, suffix, title, icon }, idx) => (
            <StatCard key={idx} count={count} suffix={suffix} title={title} icon={icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  count,
  suffix,
  title,
  icon,
}: {
  count: number;
  suffix?: string;
  title: string;
  icon: React.ReactNode;
}) {
  const animatedCount = useCountUp(count);

  return (
    <div
      className="relative rounded-3xl bg-gradient-to-tr from-cyan-900 via-cyan-800 to-cyan-700 p-8 shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer select-none"
      role="region"
      aria-label={`${title} statistic`}
    >
      {/* Neon border glow */}
      <div className="absolute inset-0 rounded-3xl border border-cyan-400 border-opacity-60 shadow-[0_0_35px_#0ff] mix-blend-screen" />

      <div className="relative z-10 flex flex-col items-center space-y-3">
        <div className="text-cyan-300 drop-shadow-md">{icon}</div>
        <Typography className="text-5xl font-extrabold text-white drop-shadow-lg">
          {animatedCount}
          <span className="text-xl ml-1">{suffix}</span>
        </Typography>
        <Typography className="mt-3 text-lg font-semibold text-cyan-300 text-center">
          {title}
        </Typography>
      </div>
    </div>
  );
}

export default OurStats;
