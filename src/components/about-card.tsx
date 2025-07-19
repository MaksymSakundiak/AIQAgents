"use client";

import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

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
        <CardHeader floated={false} className="h-56">
          <img src={image} alt={title} className="h-full w-full object-cover" />
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
