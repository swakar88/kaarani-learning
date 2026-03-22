"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorChartExample } from "@/data/module4";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { Placeholder } from "@/components/ui/Placeholder";

const M_COLOR = "#2563EB";

export default function Screen11Forecasting({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const chartEx = getFlavorChartExample(selectedFlavor);

  const FORECAST_STEPS = [
    "Add a Line chart with a Date on X-axis",
    "Click on the visual to select it",
    "Format pane → Analytics pane (the magnifying glass icon)",
    "Expand Forecast → click Add",
    "Set: Units ahead to predict, Confidence interval (default 95%), Seasonality",
    "The forecast line appears as a dashed extension with a shaded confidence band",
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Power BI has a built-in one-click forecast for line charts. It uses exponential smoothing — no maths degree required. For your ${flavor.label} data, you could forecast ${chartEx.forecastField}. It won't be perfect, but it gives a statistically justified estimate.`}
      kaaraniHint="The confidence interval shows the range the forecast might fall in. A wider band = less certainty. Seasonality setting adjusts for weekly or annual patterns in your data."
      onPrev={onPrev}
      primaryAction={{ label: "AI visuals →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Screen 11" title="Forecasting — one click, statistical prediction "
          subtitle="Add a forecast line to any time series chart. Built-in, no code required." moduleColor={M_COLOR} />

        <Placeholder type="report" label={`[Power BI: Line chart with dashed forecast line and confidence band — ${flavor.label} ${chartEx.forecastField}]`} height="160px" className="mb-5" />

        {/* Steps */}
        <div className="rounded-2xl p-5 mb-5" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>How to add a forecast — step by step</p>
          <ol className="flex flex-col gap-2">
            {FORECAST_STEPS.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: "#111827" }}>
                <span className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: M_COLOR }}>{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Forecast settings */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Units", desc: "How far ahead to forecast. E.g. 6 months, 12 weeks.", icon: "" },
            { label: "Confidence interval", desc: "95% = 95% chance the real value falls in this band.", icon: "" },
            { label: "Seasonality", desc: "Auto-detect or set manual (e.g. 7 for weekly, 52 for annual).", icon: "" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
                            <p className="font-bold text-xs mt-1.5 mb-1" style={{ color: M_COLOR }}>{s.label}</p>
              <p className="text-[10px] leading-snug" style={{ color: "#6B7280" }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#2563EB" }}>{flavor.label} forecast use case</p>
          <p className="text-xs" style={{ color: "#111827" }}>{chartEx.forecastField}</p>
        </div>
      </div>
    </ModuleLayout>
  );
}
