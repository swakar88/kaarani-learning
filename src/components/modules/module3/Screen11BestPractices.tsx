"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const PRACTICES = [
  { do: true, icon: "", label: "Use a dedicated measures table", desc: "Create an empty table called '_Measures' and store all your measures there. They stay separate from your data tables." },
  { do: true, icon: "", label: "Prefix measure names with units", desc: "e.g. '$ Revenue', '% Margin', '# Orders'. Makes it instantly clear what the number represents." },
  { do: true, icon: "", label: "Always use DIVIDE, never ÷", desc: "DIVIDE(a, b, 0) handles division by zero. a/b will error or return INFINITY when b = 0." },
  { do: true, icon: "", label: "Add a Date table — always", desc: "Even a simple CALENDAR() table. Time intelligence functions require it." },
  { do: false, icon: "", label: "Don't use calculated columns for aggregations", desc: "SUM on a calculated column is slower and wastes memory. Use a measure instead." },
  { do: false, icon: "", label: "Avoid FILTER(ALL(Table), ...)", desc: "This iterates every row. Use CALCULATE with filter predicates instead — much faster on large tables." },
  { do: false, icon: "", label: "Never use ambiguous relationship paths", desc: "If two tables have multiple relationship paths, Power BI may get confused. Use USERELATIONSHIP() explicitly." },
  { do: false, icon: "", label: "Don't put logic in visuals", desc: "If you're typing conditional logic into a visual field, that belongs in a DAX measure — not in the visual config." },
];

export default function Screen11BestPractices({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="DAX best practices separate good models from great ones. These rules will save you hours of debugging and make your reports faster. The most common mistakes: no Date table, dividing with / instead of DIVIDE, and putting everything in calculated columns."
      kaaraniHint="The free tool DAX Studio (daxstudio.org) lets you profile your measures and find performance bottlenecks. Worth installing once your models grow."
      onPrev={onPrev}
      primaryAction={{ label: "Module 3 complete →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={3} label="Module 3 · Screen 11" title="DAX Best Practices "
          subtitle="Rules that separate good models from great ones." moduleColor={M_COLOR} />

        <div className="flex flex-col gap-2">
          {PRACTICES.map(p => (
            <div key={p.label} className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ backgroundColor: p.do ? "#F9FAFB" : "#FEF2F2", border: `1.5px solid ${p.do ? "#E5E7EB" : "#FECACA"}` }}>
                            <div>
                <p className="font-bold text-sm mb-0.5" style={{ color: p.do ? "#111827" : "#991B1B" }}>{p.label}</p>
                <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModuleLayout>
  );
}
