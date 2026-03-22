"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getAnalyticsExample } from "@/data/module1";

const KAARANI_TEXT =
  "Diagnostic analytics is where Power BI becomes powerful. You start with a number that surprises you, then you drill down — slicing the data by different dimensions — until you find the reason. It's like being a detective.";

const KAARANI_HINT =
  "In Power BI, drill-through, cross-filtering, and slicers are your diagnostic tools. You click on a bar and the whole report filters.";

export default function Screen4Diagnostic({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const example = getAnalyticsExample(selectedFlavor).diagnostic;

  const [step, setStep] = useState(0);

  const diagnosticSteps = [
    {
      label: "Notice the anomaly",
      icon: "",
      content: example.problem,
      color: "#EF4444",
      bg: "#FEF2F2",
      border: "#FECACA",
    },
    {
      label: "Ask 'why?'",
      icon: "",
      content: `Drill down by ${example.drillDown}`,
      color: "#2563EB",
      bg: "#F9FAFB",
      border: "#E8E8E8",
    },
    {
      label: "Find the root cause",
      icon: "",
      content: example.finding,
      color: "#2563EB",
      bg: "#F9FAFB",
      border: "#E5E7EB",
    },
  ];

  return (
    <ModuleLayout
      moduleId={1}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={{ label: "Next: Predictive Analytics →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Type badge + heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              Type 2 of 4
            </span>
            <span
              className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider"
              style={{ backgroundColor: "#FFFFFF", color: "#2563EB", border: "1.5px solid #E8E8E8" }}
            >
              Diagnostic
            </span>
          </div>
          <h1 className="text-3xl font-black" style={{ color: "#111827" }}>
            Why did it happen? 
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            Investigates the cause behind a result. Uses drill-down, filtering, and
            correlation.
          </p>
        </div>

        {/* Interactive drill-down demo */}
        <div
          className="rounded-3xl p-6 mb-6"
          style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E8E8" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-4xl"></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>
                {flavor.label} — detective walk-through
              </p>
              <p className="text-sm" style={{ color: "#2563EB" }}>
                Follow the diagnostic process step by step
              </p>
            </div>
          </div>

          {/* Step-through flow */}
          <div className="flex flex-col gap-3">
            {diagnosticSteps.map((s, i) => {
              const isVisible = i <= step;
              const isActive = i === step;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => i === step && setStep(Math.min(step + 1, diagnosticSteps.length - 1))}
                  disabled={!isVisible || i > step}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                    isVisible ? "opacity-100" : "opacity-20"
                  } ${isActive ? "cursor-pointer" : "cursor-default"}`}
                  style={{ borderColor: isVisible ? "#2563EB" : "#E5E7EB", backgroundColor: "#FFFFFF" }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: isVisible ? "#2563EB" : "#E5E7EB", color: isVisible ? "#FFFFFF" : "#9CA3AF" }}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "#374151" }}>
                      {s.label}
                    </p>
                    <p className="text-sm font-semibold leading-snug" style={{ color: "#111827" }}>
                      {s.content}
                    </p>
                  </div>
                  {isActive && i < diagnosticSteps.length - 1 && (
                    <span className="flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-lg self-center"
                      style={{ backgroundColor: "#374151" + "18", color: "#374151" }}>
                      Tap to drill down →
                    </span>
                  )}
                  {i < step && (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: "#374151" }}>
                      
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {step >= 2 && (
            <div
              className="mt-4 rounded-xl p-3 text-sm text-center font-semibold"
              style={{ backgroundColor: "#F9FAFB", color: "#111827", border: "1px solid #E5E7EB" }}
            >
               Root cause found! That&apos;s diagnostic analytics.
            </div>
          )}

          {step < 2 && (
            <p className="text-xs text-center mt-3" style={{ color: "#6B7280" }}>
              Tap each step to walk through the investigation
            </p>
          )}
        </div>

        {/* Power BI tools callout */}
        <div
          className="rounded-2xl p-4"
          style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}>
             In Power BI, diagnostic analytics uses…
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Drill-through pages",
              "Cross-filter on click",
              "Slicers & filters",
              "Decomposition tree",
              "Q&A visual",
            ].map((item) => (
              <span
                key={item}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ backgroundColor: "#FFFFFF", color: "#2563EB", border: "1px solid #E5E7EB" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
