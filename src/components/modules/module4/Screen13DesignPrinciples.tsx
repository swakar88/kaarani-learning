"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const PRINCIPLES = [
  {
    category: "Layout",
    icon: "",
    color: "#2563EB",
    dos: ["Place KPI cards at the top", "Put filters/slicers on the left or top", "Group related visuals with whitespace", "Use a 12-column grid mentally"],
    donts: ["Mix different-sized visuals randomly", "Overlap visuals (except intentional overlays)", "Leave uneven margins"],
  },
  {
    category: "Colour",
    icon: "",
    color: "#2563EB",
    dos: ["Use one primary colour + greys", "Red = bad, Green = good (universally understood)", "Highlight the most important metric in a stronger colour"],
    donts: ["Use more than 4–5 colours in one report", "Use red/green if your audience includes colour-blind users (add icons)", "Use default Power BI blue for everything"],
  },
  {
    category: "Typography",
    icon: "",
    color: "#2563EB",
    dos: ["KPI numbers: 24pt+ font", "Body text: 10–12pt minimum", "Headers and titles: bold, slightly larger than body"],
    donts: ["Use more than 2 font families", "Use italics for numbers", "Make column headers smaller than body text"],
  },
  {
    category: "Storytelling",
    icon: "",
    color: "#2563EB",
    dos: ["Answer ONE question per page", "Put the most important insight at top-left (reading order)", "Add subtitles to every visual explaining what to look for"],
    donts: ["Put 15 charts on one page", "Leave chart titles as 'Sum of Value1'", "Build a report only you can interpret"],
  },
];

export default function Screen13DesignPrinciples({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(5);

  const narrationScript = [
    "Data without clarity is just noise. The best Power BI reports answer one question per page, use colour intentionally, and put the most important insight where the eye lands first — top left.",
    "Layout matters most: KPI cards at the top, slicers on the left, related visuals grouped together with whitespace. Think of a 12-column grid like newspaper layout.",
    "Colour discipline: one primary colour plus greys. Red means bad, green means good — universally understood. Never use more than four or five colours in one report.",
    "Typography rules: KPI numbers at 24pt or larger, body text minimum 10 to 12pt, and always use bold headers. Never use more than two font families in a report.",
    "Storytelling is the most important principle: one question per page, most important insight at top-left, subtitles on every visual explaining what to look for. Before publishing, ask: can a busy person understand this in five seconds?",
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Data without clarity is just noise. The best Power BI reports answer one question per page, use colour intentionally, and put the most important insight where the eye lands first — top left. Design is not decoration. It's communication."
      kaaraniHint="Before publishing, ask: 'Can a busy person understand this in 5 seconds?' If not, simplify. Less is almost always more in dashboards."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Module 4 complete →", onClick: onNext }
        : { label: "Module 4 complete →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={4} label="Module 4 · Screen 13" title="Report design best practices "
            subtitle="Beautiful reports communicate faster. Good design is good data analysis." moduleColor={M_COLOR} />
        </div>

        {PRINCIPLES.map((p, idx) => (
          <div key={p.category} className={`${blockClass(idx + 1)} rounded-2xl p-4 mb-4`} style={{ backgroundColor: "#FFFFFF", border: `1.5px solid ${p.color}30` }}>
            <div className="flex items-center gap-2 mb-3">
              <p className="font-black text-base" style={{ color: p.color }}>{p.category}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#2563EB" }}> Do</p>
                {p.dos.map(d => (
                  <p key={d} className="text-xs mb-1 flex gap-1" style={{ color: "#111827" }}><span style={{ color: "#2563EB", flexShrink: 0 }}>•</span> {d}</p>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#6B7280" }}>Don't</p>
                {p.donts.map(d => (
                  <p key={d} className="text-xs mb-1 flex gap-1" style={{ color: "#111827" }}><span style={{ color: "#9CA3AF", flexShrink: 0 }}>•</span> {d}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

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
