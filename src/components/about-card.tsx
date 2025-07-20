"use client";

import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Image from "next/image"; // 👈 Import Next.js Image

type AboutCardProps = {
  title: string;
  subTitle: string;
  description: string;
  image?: string;
};

export default function AboutCard({ title, subTitle, description, image }: AboutCardProps) {
  return (
    <Card className="w-full shadow-lg">
      {image && (
        <CardHeader floated={false} className="relative h-56"> {/* 👈 Added relative positioning */}
          <Image
            src={image}
            alt={title}
            fill // 👈 Fills the parent container
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw" // 👈 Responsive sizing
          />
        </CardHeader>
      )}
      <CardBody>
        <Typography variant="small" color="orange" className="mb-2 uppercase">
          {subTitle}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography variant="paragraph" className="!text-gray-600">
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}