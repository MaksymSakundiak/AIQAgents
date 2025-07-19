"use client";

import { IconButton, Button, Typography } from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/solid";

function Hero() {
  return (
    <div className="min-h-screen w-full bg-[url('/image/event.png')] bg-cover bg-no-repeat">
    <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
    <div className="grid min-h-screen px-8">
      <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
        <Typography variant="h1" color="white" className="lg:max-w-3xl">
          Autonomous AI Agents for the Financial Frontier
        </Typography>
        <Typography
          variant="lead"
          color="white"
          className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl"
        >
          Alpha Agents is your gateway to deploying fully autonomous AI systems that trade, analyze, and execute in real time — on your terms.
        </Typography>
        <div className="flex items-center gap-4">
          <Button variant="gradient" color="white">
            <a href="auth/signup" target="_blank">
              Get started
            </a>
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Hero;
