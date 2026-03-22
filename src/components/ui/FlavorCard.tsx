"use client";

import React from "react";
import { Flavor } from "@/types";

interface FlavorCardProps {
  flavor: Flavor;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function FlavorCard({ flavor, selected, onSelect }: FlavorCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(flavor.id)}
      className="relative flex flex-col items-start p-4 rounded-xl border transition-all duration-150 cursor-pointer w-full text-left"
      style={{
        borderColor: selected ? "#2563EB" : "#E5E7EB",
        backgroundColor: "#FFFFFF",
        boxShadow: selected ? "0 0 0 3px rgba(37,99,235,0.1)" : "0 1px 3px rgba(0,0,0,0.05)",
      }}
      aria-pressed={selected}
    >
      {selected && (
        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
          style={{ backgroundColor: "#2563EB" }}>
          
        </span>
      )}
      <span className="text-2xl mb-2 leading-none"></span>
      <span className="font-semibold text-sm" style={{ color: selected ? "#2563EB" : "#111827" }}>
        {flavor.label}
      </span>
      <span className="text-xs mt-0.5 leading-snug" style={{ color: "#6B7280" }}>
        {flavor.description}
      </span>
    </button>
  );
}
