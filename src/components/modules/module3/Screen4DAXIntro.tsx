"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader, CodeBlock } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const DAX_FACTS = [
  { icon: "", label: "Plain English", desc: "DAX reads like natural language. 'Total Runs = SUM of Runs column' is almost literally the code." },
  { icon: "", label: "Works inside Power BI", desc: "You write DAX directly in the report — no Python, no SQL needed. It sits next to your visuals." },
  { icon: "", label: "Context-aware", desc: "The same DAX measure automatically recalculates for every filter applied in your report. One measure, infinite slices." },
  { icon: "", label: "Columnar engine", desc: "Power BI uses the VertiPaq engine — DAX measures are lightning fast even on millions of rows." },
];

export default function Screen4DAXIntro({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);

  // 4 blocks: header(0), first DAX measure(1), DAX facts(2), DAX vs Excel callout(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `DAX stands for Data Analysis Expressions. It's the formula language of Power BI — and it's much friendlier than it sounds.`,
    `Here is your very first DAX measure. All it does is ask: what is the total ${flavor.metric1Label}? And Power BI answers that question for whatever is currently selected in the report. One measure — infinite contexts.`,
    `Four things make DAX special. It reads like plain English. It works right inside Power BI — no coding environment needed. It automatically responds to filter context. And it's incredibly fast, even on millions of rows.`,
    `Here's the key difference from Excel. Excel calculates individual cells. DAX calculates measures that respond to your report's filter context. When you click a slicer or filter a chart, every DAX measure on the page instantly recalculates. That's the power.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="DAX stands for Data Analysis Expressions. It's the formula language of Power BI — and it's much friendlier than it sounds. Think of each DAX measure as a question you're asking your data. 'What is the total runs?' 'What's the average?' Power BI answers it for every combination of filters."
      kaaraniHint="DAX is not programming. It's closer to Excel formulas with a superpower: it knows about your model's relationships and filter context automatically."
      onPrev={onPrev}
      primaryAction={{ label: "Measures vs columns →", onClick: onNext, disabled: !isComplete }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={3} label="Module 3 · Screen 4" title="What is DAX? "
            subtitle="The plain-English formula language of Power BI." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — First DAX measure */}
        <div className={`${blockClass(1)} mb-6`}>
          <div className="rounded-3xl p-6 mb-6" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl"></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: M_COLOR }}>Your first DAX measure</p>
                <p className="font-black text-lg" style={{ color: "#111827" }}>Ask: "What is the total {flavor.metric1Label}?"</p>
              </div>
            </div>
            <CodeBlock code={`Total ${flavor.metric1Label} = SUM(fact_[${flavor.metric1Label}])`} label="DAX Measure" color={M_COLOR} />
            <p className="text-xs mt-3 leading-relaxed" style={{ color: "#6B7280" }}>
              That's it. Power BI will now show the total for whatever is selected — a player, a team, a season, or all of them at once. <strong>One measure, infinite context.</strong>
            </p>
          </div>
        </div>

        {/* Block 2 — DAX facts */}
        <div className={`${blockClass(2)} mb-5`}>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {DAX_FACTS.map(f => (
              <div key={f.label} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                <p className="font-bold text-sm mt-2 mb-1" style={{ color: "#111827" }}>{f.label}</p>
                <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3 — DAX vs Excel callout */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
            <p className="text-xs" style={{ color: "#2563EB" }}>
              <strong>DAX vs Excel:</strong> Excel calculates cells. DAX calculates measures that respond to your report&apos;s filter context. Much more powerful — and automatically updates when you slice by any field.
            </p>
          </div>
        </div>

        {/* Tap to reveal */}
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
