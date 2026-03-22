"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getAnalyticsExample } from "@/data/module1";

const KAARANI_TEXT =
  "Prescriptive analytics is the most advanced type. It doesn't just tell you what will happen — it tells you what you should do about it. It combines predictions with optimisation to recommend the best course of action.";

const KAARANI_HINT =
  "Power BI itself is mainly descriptive and diagnostic. For prescriptive, you'd use Azure ML, Power Automate, or embed Python models — and visualise the output in Power BI.";

export default function Screen6Prescriptive({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const example = getAnalyticsExample(selectedFlavor).prescriptive;

  const [actionTaken, setActionTaken] = useState(false);

  return (
    <ModuleLayout
      moduleId={1}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={{ label: "See the four types together →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Type badge + heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              Type 4 of 4
            </span>
            <span
              className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider"
              style={{ backgroundColor: "#FFFFFF", color: "#1E3A8A", border: "1.5px solid #E8E8E8" }}
            >
              Prescriptive
            </span>
          </div>
          <h1 className="text-3xl font-black" style={{ color: "#111827" }}>
            What should we do? 
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            Combines data, predictions, and optimisation to recommend the best action.
          </p>
        </div>

        {/* Example card with interactive recommendation */}
        <div
          className="rounded-3xl p-6 mb-6"
          style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E8E8" }}
        >
          <div className="flex items-start gap-4 mb-5">
            <span className="text-4xl"></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>
                {flavor.label} — AI recommendation
              </p>
              <p className="text-sm font-bold" style={{ color: "#111827" }}>
                {example.question}
              </p>
            </div>
          </div>

          {/* Recommendation box */}
          <div
            className="rounded-2xl p-4 mb-4"
            style={{ backgroundColor: "#FFFFFF", border: "2px solid #E5E7EB" }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>
                  System recommendation
                </p>
                <p className="text-sm font-semibold leading-snug" style={{ color: "#111827" }}>
                  {example.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Expected impact */}
          <div
            className="rounded-xl p-3 mb-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>
               Expected impact
            </p>
            <p className="text-sm font-semibold" style={{ color: "#111827" }}>
              {example.expectedImpact}
            </p>
          </div>

          {/* Action button demo */}
          {!actionTaken ? (
            <button
              type="button"
              onClick={() => setActionTaken(true)}
              className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all cursor-pointer hover:opacity-90"
              style={{ backgroundColor: "#2563EB" }}
            >
               Apply this recommendation
            </button>
          ) : (
            <div
              className="w-full py-3 rounded-xl font-bold text-center text-sm"
              style={{ backgroundColor: "#F9FAFB", color: "#111827", border: "2px solid #E5E7EB" }}
            >
               Action taken! This is prescriptive analytics in action.
            </div>
          )}
        </div>

        {/* The four types summary preview */}
        <div
          className="rounded-2xl p-4"
          style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#2563EB" }}>
            The 4 types — quick recap
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { type: "Descriptive", q: "What happened?", color: "#2563EB" },
              { type: "Diagnostic", q: "Why did it happen?", color: "#2563EB" },
              { type: "Predictive", q: "What will happen?", color: "#2563EB" },
              { type: "Prescriptive", q: "What should we do?", color: "#2563EB" },
            ].map((t) => (
              <div
                key={t.type}
                className="rounded-xl px-3 py-2"
                style={{ backgroundColor: "#F3F4F6", border: "1px solid #E5E7EB" }}
              >
                <p className="text-xs font-bold" style={{ color: "#2563EB" }}>
                  {t.type}
                </p>
                <p className="text-xs" style={{ color: "#111827" }}>
                  {t.q}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
