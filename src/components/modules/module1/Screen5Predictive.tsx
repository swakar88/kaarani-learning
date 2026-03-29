"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getAnalyticsExample } from "@/data/module1";
import { Placeholder } from "@/components/ui/Placeholder";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const KAARANI_TEXT =
  "Predictive analytics uses past patterns to forecast the future. It doesn't tell you what will definitely happen — it tells you what's likely to happen, and with what confidence. Power BI has built-in forecasting you can add in one click.";

const KAARANI_HINT =
  "Power BI's built-in forecast looks at your historical trend and projects it forward — automatically. For more advanced predictions, it connects to Azure ML and Python scripts.";

// Simple CSS-based forecast chart component
function ForecastChart({ flavorLabel }: { flavorLabel: string }) {
  // Fake historical + forecast bars
  const historicalBars = [40, 55, 48, 62, 58, 70, 65, 80];
  const forecastBars = [85, 90, 95];
  const maxVal = 100;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#2563EB" }}>
        {flavorLabel} — Trend + Forecast
      </p>
      <div className="flex items-end gap-1.5 h-28">
        {historicalBars.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md transition-all"
              style={{
                height: `${(v / maxVal) * 100}%`,
                backgroundColor: "#2563EB",
                opacity: 0.7 + i * 0.03,
              }}
            />
          </div>
        ))}
        {forecastBars.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${(v / maxVal) * 100}%`,
                background: "repeating-linear-gradient(45deg, #2563EB, #2563EB 3px, #F9FAFB 3px, #F9FAFB 6px)",
                border: "1.5px dashed #2563EB",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#2563EB" }} />
          <span className="text-xs" style={{ color: "#6B7280" }}>Historical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border-dashed border" style={{ borderColor: "#2563EB", backgroundColor: "#FFFFFF" }} />
          <span className="text-xs" style={{ color: "#6B7280" }}>Forecast (predicted)</span>
        </div>
      </div>
    </div>
  );
}

export default function Screen5Predictive({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const example = getAnalyticsExample(selectedFlavor).predictive;

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(3);

  const narrationScript = [
    "Predictive analytics uses past patterns to forecast the future. Not what will definitely happen — but what's likely to happen, and how confident we are.",
    `For ${flavor.label}: ${example.question}. The model says: ${example.prediction}. Confidence level: ${example.confidence}.`,
    "Power BI has a built-in forecast line you can add to any line chart in one click. For more advanced models, it connects to Azure ML and Python.",
  ];

  return (
    <ModuleLayout
      moduleId={1}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Next: Prescriptive Analytics →", onClick: onNext }
          : { label: "Next: Prescriptive Analytics →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">
        {/* Block 0: Type badge + heading + subtitle */}
        <div className={blockClass(0)} style={{ marginBottom: "2rem" }}>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              Type 3 of 4
            </span>
            <span
              className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider"
              style={{ backgroundColor: "#F9FAFB", color: "#111827", border: "1.5px solid #E5E7EB" }}
            >
              Predictive
            </span>
          </div>
          <h1 className="text-3xl font-black" style={{ color: "#111827" }}>
            What will happen?
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            Uses statistical models and past patterns to forecast future outcomes.
          </p>
        </div>

        {/* Block 1: Example card with ForecastChart + prediction/confidence grid */}
        <div className={`${blockClass(1)} mb-4`}>
          <div
            className="rounded-3xl p-6 mb-6"
            style={{ backgroundColor: "#F9FAFB", border: "2px solid #E5E7EB" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <span className="text-4xl"></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>
                  {flavor.label} prediction
                </p>
                <p className="text-sm font-bold" style={{ color: "#111827" }}>
                  {example.question}
                </p>
              </div>
            </div>

            {/* Forecast chart */}
            <div
              className="rounded-2xl p-4 mb-4"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
            >
              <ForecastChart flavorLabel={flavor.label} />
            </div>

            {/* Prediction result */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>
                  Prediction
                </p>
                <p className="text-sm font-semibold leading-snug" style={{ color: "#111827" }}>
                  {example.prediction}
                </p>
              </div>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>
                  Confidence
                </p>
                <p className="text-sm font-semibold leading-snug" style={{ color: "#111827" }}>
                  {example.confidence}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2: PBI tools tags + Placeholder */}
        <div className={`${blockClass(2)} mb-4`}>
          <div
            className="rounded-2xl p-4 mb-4"
            style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}>
               How to add a forecast in Power BI
            </p>
            <ol className="flex flex-col gap-2 mb-3">
              {[
                "Add a Line chart to your report canvas",
                "Click the chart to select it",
                "In the Visualisations pane → click the Analytics tab (the magnifying glass icon)",
                "Expand Forecast → click Add",
                "Set forecast length, confidence interval, and seasonality",
              ].map((s, i) => (
                <li key={i} className="flex gap-2 text-xs" style={{ color: "#374151" }}>
                  <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: "#2563EB" }}>{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: "#E5E7EB" }}>
              {["Key Influencers visual", "Azure ML integration", "Python/R scripts"].map((item) => (
                <span key={item} className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#FFFFFF", color: "#2563EB", border: "1px solid #E5E7EB" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Placeholder for real Power BI forecast visual */}
          <Placeholder
            type="report"
            label="[Power BI Report: Forecast line chart with confidence bands — to be embedded]"
            height="120px"
            note="Will show a real Power BI forecast once embedded"
          />
        </div>

        {!isComplete && (
          <button
            type="button"
            onClick={() => {
              unlockVoice();
              if (narrationScript[step + 1]) speak(narrationScript[step + 1]);
              next();
            }}
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
