"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getAnalyticsExample } from "@/data/module1";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const KAARANI_TEXT =
  "Descriptive analytics is the most common type — and it's where Power BI truly shines. It answers the simplest but most essential question: what happened? Think of it as your rear-view mirror.";

const KAARANI_HINT =
  "About 80% of Power BI reports are descriptive. Dashboards, scorecards, summary charts — all descriptive.";

// Real-world tools that do descriptive analytics
const DESCRIPTIVE_TOOLS = [
  { name: "Power BI", icon: "", note: "Dashboards & reports" },
  { name: "Excel", icon: "", note: "Pivot tables & charts" },
  { name: "Google Analytics", icon: "", note: "Website traffic reports" },
  { name: "SQL Queries", icon: "", note: "SUM, COUNT, AVG" },
];

export default function Screen3Descriptive({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const example = getAnalyticsExample(selectedFlavor).descriptive;

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Descriptive analytics is the foundation. It answers the simplest but most essential question: what happened? Think of it as your rear-view mirror.",
    `Here's a real ${flavor.label} example. ${example.headline} — ${example.detail}. That's descriptive analytics. Just the facts.`,
    "In Power BI, descriptive analytics looks like dashboards, bar charts, line charts, KPI cards, and scorecards. About 80 percent of all Power BI reports are descriptive.",
    "The tools that do this: Power BI for visual dashboards, Excel for pivot tables, Google Analytics for web data, and SQL for raw aggregations.",
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
          ? { label: "Next: Diagnostic Analytics →", onClick: onNext }
          : { label: "Next: Diagnostic Analytics →", onClick: onNext, disabled: true }
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
              Type 1 of 4
            </span>
            <span
              className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider"
              style={{ backgroundColor: "#FFFFFF", color: "#1D4ED8", border: "1.5px solid #E8E8E8" }}
            >
              Descriptive
            </span>
          </div>
          <h1 className="text-3xl font-black" style={{ color: "#111827" }}>
            What happened?
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            Summarises past data. Tells you what occurred — no guessing, no prediction.
          </p>
        </div>

        {/* Block 1: Main example card */}
        <div className={`${blockClass(1)} mb-4`}>
          <div
            className="rounded-3xl p-6 mb-6"
            style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E8E8" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <span className="text-4xl"></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#2563EB" }}>
                  {flavor.label} example
                </p>
                <p className="text-xl font-black leading-tight" style={{ color: "#111827" }}>
                  {example.headline}
                </p>
                <p className="text-sm mt-1" style={{ color: "#2563EB" }}>
                  {example.detail}
                </p>
              </div>
            </div>

            {/* Stat breakdown */}
            <div className="grid grid-cols-3 gap-3">
              <div
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
              >
                <p className="text-2xl font-black" style={{ color: "#1D4ED8" }}>
                  {example.metric}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#2563EB" }}>
                  Key metric
                </p>
              </div>
              <div
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
              >
                <p className="text-sm font-bold" style={{ color: "#1D4ED8" }}>
                  {example.dimension}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#2563EB" }}>
                  {flavor.dimension1Label}
                </p>
              </div>
              <div
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}
              >
                <p className="text-sm font-bold" style={{ color: "#1D4ED8" }}>
                  {example.period}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#2563EB" }}>
                  Period
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2: "In Power BI" tags list */}
        <div className={`${blockClass(2)} mb-4`}>
          <div
            className="rounded-2xl p-4 mb-5"
            style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}>
               In Power BI, descriptive analytics looks like…
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Bar charts comparing totals",
                "Line charts over time",
                "KPI cards",
                "Data tables",
                "Scorecards",
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

        {/* Block 3: Tools row */}
        <div className={`${blockClass(3)} mb-4`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>
              Tools used for descriptive analytics
            </p>
            <div className="flex gap-3 flex-wrap">
              {DESCRIPTIVE_TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
                >
                  <div>
                    <p className="font-bold text-xs" style={{ color: "#111827" }}>
                      {tool.name}
                    </p>
                    <p className="text-[10px]" style={{ color: "#6B7280" }}>
                      {tool.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
