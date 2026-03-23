"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const PRACTICES_DO = [
  { icon: "", label: "Use a dedicated measures table", desc: "Create an empty table called '_Measures' and store all your measures there. They stay separate from your data tables." },
  { icon: "", label: "Prefix measure names with units", desc: "e.g. '$ Revenue', '% Margin', '# Orders'. Makes it instantly clear what the number represents." },
  { icon: "", label: "Always use DIVIDE, never ÷", desc: "DIVIDE(a, b, 0) handles division by zero. a/b will error or return INFINITY when b = 0." },
  { icon: "", label: "Add a Date table — always", desc: "Even a simple CALENDAR() table. Time intelligence functions require it." },
];

const PRACTICES_DONT = [
  { icon: "", label: "Don't use calculated columns for aggregations", desc: "SUM on a calculated column is slower and wastes memory. Use a measure instead." },
  { icon: "", label: "Avoid FILTER(ALL(Table), ...)", desc: "This iterates every row. Use CALCULATE with filter predicates instead — much faster on large tables." },
  { icon: "", label: "Never use ambiguous relationship paths", desc: "If two tables have multiple relationship paths, Power BI may get confused. Use USERELATIONSHIP() explicitly." },
  { icon: "", label: "Don't put logic in visuals", desc: "If you're typing conditional logic into a visual field, that belongs in a DAX measure — not in the visual config." },
];

export default function Screen11BestPractices({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();

  // 4 blocks: header(0), do's(1), don'ts(2), tooling tip(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `We're almost done with Module 3. Let me leave you with the rules that separate good Power BI models from great ones.`,
    `Four things to always do. Store your measures in a dedicated table — it keeps your model organised. Prefix measure names with units so users always know what they're looking at. Use DIVIDE instead of the slash operator — it handles division by zero safely. And always add a Date table, even a simple one.`,
    `Four things to avoid. Never use calculated columns for aggregations — that's what measures are for. Avoid iterating every row with FILTER ALL — use CALCULATE predicates instead. If two tables share multiple relationship paths, be explicit with USERELATIONSHIP. And never put conditional logic in visual fields — that belongs in a measure.`,
    `One more tool worth knowing: DAX Studio is a free desktop application that connects to your Power BI file and lets you run and profile DAX queries. When your measures become slow, DAX Studio shows you exactly why. It's the go-to tool for every serious Power BI developer.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="DAX best practices separate good models from great ones. These rules will save you hours of debugging and make your reports faster. The most common mistakes: no Date table, dividing with / instead of DIVIDE, and putting everything in calculated columns."
      kaaraniHint="The free tool DAX Studio (daxstudio.org) lets you profile your measures and find performance bottlenecks. Worth installing once your models grow."
      onPrev={onPrev}
      primaryAction={{ label: "Module 3 complete →", onClick: onNext, disabled: !isComplete }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={3} label="Module 3 · Screen 11" title="DAX Best Practices "
            subtitle="Rules that separate good models from great ones." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Do's */}
        <div className={`${blockClass(1)} mb-4`}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>Always do these</p>
          <div className="flex flex-col gap-2 mb-4">
            {PRACTICES_DO.map(p => (
              <div key={p.label} className="flex items-start gap-3 p-4 rounded-2xl"
                style={{ backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
                <div>
                  <p className="font-bold text-sm mb-0.5" style={{ color: "#111827" }}>{p.label}</p>
                  <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 2 — Don'ts */}
        <div className={`${blockClass(2)} mb-4`}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>Avoid these</p>
          <div className="flex flex-col gap-2 mb-4">
            {PRACTICES_DONT.map(p => (
              <div key={p.label} className="flex items-start gap-3 p-4 rounded-2xl"
                style={{ backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
                <div>
                  <p className="font-bold text-sm mb-0.5" style={{ color: "#111827" }}>{p.label}</p>
                  <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3 — Tooling tip */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
            <p className="text-xs" style={{ color: "#2563EB" }}>
              <strong>DAX Studio</strong> (daxstudio.org) is a free tool that profiles your DAX measures and shows performance bottlenecks. Essential once your models grow beyond a few tables.
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
