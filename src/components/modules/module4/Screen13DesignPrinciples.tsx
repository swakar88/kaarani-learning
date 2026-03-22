"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { ScreenHeader } from "@/components/ui/ScreenSection";

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
  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Data without clarity is just noise. The best Power BI reports answer one question per page, use colour intentionally, and put the most important insight where the eye lands first — top left. Design is not decoration. It's communication."
      kaaraniHint="Before publishing, ask: 'Can a busy person understand this in 5 seconds?' If not, simplify. Less is almost always more in dashboards."
      onPrev={onPrev}
      primaryAction={{ label: "Module 4 complete →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Screen 13" title="Report design best practices "
          subtitle="Beautiful reports communicate faster. Good design is good data analysis." moduleColor={M_COLOR} />

        <div className="flex flex-col gap-4">
          {PRINCIPLES.map(p => (
            <div key={p.category} className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: `1.5px solid ${p.color}30` }}>
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
        </div>
      </div>
    </ModuleLayout>
  );
}
