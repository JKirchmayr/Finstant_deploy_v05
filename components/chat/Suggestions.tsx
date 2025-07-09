"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SuggestionCardProps {
  img: string;
  title: string;
  selected: boolean;
  className?: string;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  img,
  title,
  selected,
  className,
}) => (
  <Card
    className={cn(
      "flex flex-col p-4 gap-2 shadow-none hover:shadow transition-all duration-200 cursor-pointer",
      { "border-primary/70 shadow-lg": selected },
      className
    )}
  >
    <div className="">
      <Image src={img} alt={title} height={30} width={30} />
    </div>
    <p className="text-sm">{title}</p>
  </Card>
);

export const Suggestions = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
    null
  );
  const suggestions = [
    {
      img: "/images/suggest/building.png",
      title: "Generate Company Profile",
    },
    {
      img: "/images/suggest/ziel.png",
      title: "Generate Target List",
    },
    {
      img: "/images/suggest/munze.png",
      title: "Generate Financial Sponsor List",
    },
    {
      img: "/images/suggest/company.png",
      title: "Create Company Strip Profiles",
    },
    {
      img: "/images/suggest/web-search.png",
      title: "Conduct Market Web Research",
    },
    {
      img: "/images/suggest/scale.png",
      title: "Benchmarking Analysis",
    },
  ];

  return (
    <div className="flex flex-col w-full items-center justify-center bg-white my-8">
      <div className="">
        <Image
          src="/images/logo_small.jpg"
          alt="logo"
          width={40}
          height={40}
          className=""
        />
      </div>
      <h1
        className="text-2xl font-normal text-gray-800 my-6 text-center"
        style={{ fontFamily: "Times New Roman" }}
      >
        Instant Corporate Finance Workflows
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => setSelectedSuggestion(index)}
            className="w-full"
          >
            <SuggestionCard
              key={index}
              img={suggestion.img}
              title={suggestion.title}
              selected={selectedSuggestion === index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface BottomSuggestionsProps {
  setInput: (input: string) => void;
  className?: string;
}
export const BottomSuggestions = ({
  setInput,
  className,
}: BottomSuggestionsProps) => {
  const shortSuggestions = [
    "Company Profile of Siemens",
    "Give me an intro to SAP",
    "Volkswagen AG",
    "Profile of Bosch",
    "Give me an Overview of Daimler",
  ];
  return (
    <div
      className={cn("w-full flex flex-wrap gap-4 justify-center", className)}
    >
      {shortSuggestions.map((suggestion, index) => (
        <Button
          key={index}
          onClick={() => setInput(suggestion)}
          className="w-fit text-xs h-8 border cursor-pointer text-muted-foreground bg-secondary"
          variant="ghost"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};
