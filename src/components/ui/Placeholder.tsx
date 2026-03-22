import React from "react";
import { PlaceholderType } from "@/types";

interface PlaceholderProps {
  type: PlaceholderType;
  label: string;
  width?: string;
  height?: string;
  className?: string;
  note?: string;
}

const TYPE_LABELS: Record<PlaceholderType, string> = {
  report: "Report embed",
  chart: "Chart",
  animation: "Animation",
  image: "Image",
  video: "Video",
  dataset: "Dataset",
  diagram: "Diagram",
  interaction: "Interactive",
};

export function Placeholder({ type, label, width = "100%", height = "280px", className = "", note }: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl relative ${className}`}
      style={{ width, height, border: "1.5px dashed #D1D5DB", backgroundColor: "#F9FAFB", minHeight: "120px" }}
    >
      <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded"
        style={{ backgroundColor: "#F3F4F6", color: "#9CA3AF", border: "1px solid #E5E7EB" }}>
        {TYPE_LABELS[type]}
      </span>
      <p className="text-sm font-medium text-center px-8 leading-snug" style={{ color: "#9CA3AF" }}>
        {label}
      </p>
      {note && (
        <p className="text-xs text-center px-8 mt-1" style={{ color: "#D1D5DB" }}>{note}</p>
      )}
    </div>
  );
}
