"use client";

import React from "react";
import { Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

const FAQS = [
  {
    title: "1. Can I tailor my agent’s actions?",
    desc: "Absolutely. You can fine-tune agent logic using our no-code visual builder or connect directly via API for custom logic and workflows.",
  },
  {
    title: "2. Is it possible for agents to interact with real-world markets?",
    desc: "Yes. Agents can execute trades and perform tasks in real-time via integrated exchanges and deployed smart contracts.",
  },
  {
    title: "3. Do I need programming skills to use Alpha Agents?",
    desc: "Not at all. Our platform includes intuitive no-code tools, but for developers, deep-level customization is fully supported.",
  },
  {
    title: "4. Can I deploy agents to work autonomously?",
    desc: "Yes. Once configured, agents can operate continuously, make decisions, and adapt to changing environments in real time.",
  },
  {
    title: "5. How scalable is the system for enterprise or team use??",
    desc: "Extremely scalable — with modular architecture, role-based access, and integrations to scale across teams and business layers.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center">
          <Typography variant="h1" color="blue-gray" className="mb-4">
            Frequently asked questions
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto mb-24 lg:w-3/5 !text-gray-500"
          >
            Welcome to the AIQ Agents FAQ section. We&apos;re here to
            address your most common queries and provide you with the
            information you need to make the most of your experience.
          </Typography>
        </div>

        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {FAQS.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              onClick={() => handleOpen(key + 1)}
            >
              <AccordionHeader className="text-left text-gray-900">
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography
                  color="blue-gray"
                  className="font-normal text-gray-500"
                >
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Faq;
