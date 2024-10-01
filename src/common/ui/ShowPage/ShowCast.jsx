"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import React from "react";

const ShowCast = ({ cast }) => {
  const castItems = cast
    .map((member) => ({
      id: member.cast_id,
      name: member.name,
      designation: member.character,
      image: member.profile_path
        ? "https://image.tmdb.org/t/p/w500" + member.profile_path
        : null,
    }))
    .filter((member) => member.image !== null)
    .slice(0, 10);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
      <div className="grid grid-cols-5 gap-y-8 md:flex">
        <AnimatedTooltip items={castItems} />
      </div>
    </div>
  );
};

export default ShowCast;
