import React from "react";

interface ProgressDotsProps {
  total: number;
  current: number; // 0-indexed
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={current + 1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < current;
        const isActive = i === current;

        return (
          <span
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: isActive ? "28px" : "8px",
              height: "8px",
              backgroundColor: isActive ? "#2563EB" : isDone ? "#2563EB" : "#E5E7EB",
              opacity: isDone ? 0.4 : 1,
            }}
            aria-label={`Screen ${i + 1}${isDone ? " (complete)" : isActive ? " (current)" : ""}`}
          />
        );
      })}
      <span className="ml-1 text-xs font-medium" style={{ color: "#9CA3AF" }}>
        {current + 1} / {total}
      </span>
    </div>
  );
}
