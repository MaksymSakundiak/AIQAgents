"use client";

import { Typography } from "@material-tailwind/react";
import AboutCard from "@/components/about-card";

const EVENT_INFO = [
  {
    title: "Secure",
    description:
      "Use our drag-and-drop builder to create logic. Customize with APIs or plug in LLM prompts.",
    subTitle: "It is:",
    image: "/image/ev3.png",
  },
  {
    title: "Modular",
    description:
      "Every action is logged. Every trade is auditable. Built on-chain.",
    subTitle: "It is:",
    image: "/image/ev1.png",
  },
  {
    title: "Intelligent",
    description:
      "Agents act on their own using real-time market signals and defined logic loops.",
    subTitle: "It is:",
    image: "/image/ev2.png",
  },
];

export function AboutEvent() {
  return (
    <section className="relative z-10 bg-black py-24 px-6 md:px-16 lg:px-32 text-cyan-100 overflow-hidden">
      {/* Subtle glowing background orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-900 opacity-10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-cyan-900 opacity-12 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl flex flex-col items-center space-y-10 text-center">
        <Typography
          variant="h6"
          className="uppercase font-semibold tracking-widest text-cyan-500"
        >
          About the Project
        </Typography>
        <Typography
          variant="h3"
          className="text-4xl md:text-5xl font-extrabold drop-shadow-lg"
        >
          Why Choose AIQ Agents?
        </Typography>
        <Typography
          variant="lead"
          className="max-w-3xl text-cyan-300 leading-relaxed"
        >
          Alpha Agents are intelligent, modular AI bots that operate independently
          in financial markets. They read data, interpret trends, make decisions,
          and execute — all without human micromanagement. Whether you&apos;re a beginner
          or an expert, our no-code logic builder, pre-trained models, and DeFi
          integration make launching your first AI agent easier than ever.
        </Typography>

        <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENT_INFO.map(({ title, description, subTitle, image }, idx) => (
            <AboutCardWrapper
              key={idx}
              title={title}
              description={description}
              subTitle={subTitle}
              image={image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCardWrapper({
  title,
  description,
  subTitle,
  image,
}: {
  title: string;
  description: string;
  subTitle: string;
  image: string;
}) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer transform transition-transform duration-300 hover:scale-[1.05] bg-black border border-cyan-800">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-30"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Content */}
      <div className="relative p-10 text-left text-cyan-400 flex flex-col h-full justify-center">
        <p className="text-cyan-500 font-semibold tracking-wide mb-2">{subTitle}</p>
        <h3 className="text-3xl font-extrabold mb-4 drop-shadow-lg">{title}</h3>
        <p className="text-cyan-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default AboutEvent;