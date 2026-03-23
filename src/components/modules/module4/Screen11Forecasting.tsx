"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorChartExample } from "@/data/module4";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { Placeholder } from "@/components/ui/Placeholder";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

export default function Screen11Forecasting({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
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

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `Power BI has a built-in one-click forecast for line charts. It uses exponential smoothing — no maths degree required. For your ${flavor.label} data, you could forecast ${chartEx.forecastField}.`,
    `Here's what the forecast looks like — the dashed line extends from your historical data with a shaded confidence band showing the range of likely values.`,
    "Six steps to add a forecast: start with a Line chart, select it, open the Analytics pane (magnifying glass icon), expand Forecast, click Add, then configure units and confidence interval.",
    "Three key settings: Units controls how far ahead to forecast, Confidence Interval controls the band width (95% is standard), and Seasonality detects weekly or annual patterns in your data.",
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Power BI has a built-in one-click forecast for line charts. It uses exponential smoothing — no maths degree required. For your ${flavor.label} data, you could forecast ${chartEx.forecastField}. It won't be perfect, but it gives a statistically justified estimate.`}
      kaaraniHint="The confidence interval shows the range the forecast might fall in. A wider band = less certainty. Seasonality setting adjusts for weekly or annual patterns in your data."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "AI visuals →", onClick: onNext }
        : { label: "AI visuals →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={4} label="Module 4 · Screen 11" title="Forecasting — one click, statistical prediction "
            subtitle="Add a forecast line to any time series chart. Built-in, no code required." moduleColor={M_COLOR} />
        </div>

        <div className={`${blockClass(1)} mb-5`}>
          <Placeholder type="report" label={`[Power BI: Line chart with dashed forecast line and confidence band — ${flavor.label} ${chartEx.forecastField}]`} height="160px" />
        </div>

        {/* Steps */}
        <div className={`${blockClass(2)} rounded-2xl p-5 mb-5`} style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>How to add a forecast — step by step</p>
          <ol className="flex flex-col gap-2">
            {FORECAST_STEPS.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: "#111827" }}>
                <span className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: M_COLOR }}>{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        {/* Forecast settings */}
        <div className={`${blockClass(3)} mb-4`}>
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

        {!isComplete && (
          <button type="button"
            onClick={() => { unlockVoice(); if (narrationScript[step + 1]) speak(narrationScript[step + 1]); next(); }}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#EFF6FF", color: "#2563EB", border: "1.5px dashed #93C5FD" }}
          >
            {tapLabel} →
          </button>
        )}
      </div>
    </ModuleLayout>
  );
}
