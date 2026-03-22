"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader, PowerBICallout } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

export default function Screen5TablesMatrices({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);

  const sampleRows = [
    { dim1: "Alpha", dim2: "Group A", m1: 847, m2: 42, highlight: true },
    { dim1: "Beta", dim2: "Group A", m1: 632, m2: 31, highlight: false },
    { dim1: "Gamma", dim2: "Group B", m1: 591, m2: 28, highlight: false },
    { dim1: "Delta", dim2: "Group B", m1: 445, m2: 19, highlight: true },
    { dim1: "Epsilon", dim2: "Group A", m1: 380, m2: 14, highlight: false },
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Tables and Matrices are the detail visuals. When someone says 'I want to export to Excel', they're thinking Table visual. The Matrix adds row and column groupings — like a pivot table. Both support conditional formatting to add visual hierarchy to numbers."
      kaaraniHint="Always set column width manually in a Table visual. Auto-width makes columns too narrow. Use the Format pane → Values → column-specific width."
      onPrev={onPrev}
      primaryAction={{ label: "Maps & geo visuals →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Screen 5" title="Tables & Matrices "
          subtitle="Detail and drill-down. The Excel of Power BI visuals." moduleColor={M_COLOR} />

        {/* Live table example */}
        <div className="rounded-2xl overflow-hidden mb-5" style={{ border: "1.5px solid #E8E8E8" }}>
          <div className="px-4 py-2" style={{ backgroundColor: "#FFFFFF"}}>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: M_COLOR }}>
              Table: {flavor.label} — {flavor.dimension1Label} performance
            </p>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: "#F9FAFB" }}>
                {[flavor.dimension1Label, flavor.dimension2Label, flavor.metric1Label, flavor.metric2Label].map(h => (
                  <th key={h} className="px-3 py-2 text-left font-bold" style={{ color: "#6B7280", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleRows.map(r => (
                <tr key={r.dim1} style={{ borderBottom: "1px solid #F3F4F6", backgroundColor: r.highlight ? "#F9FAFB" : "white" }}>
                  <td className="px-3 py-2 font-semibold" style={{ color: "#111827" }}>{r.dim1}</td>
                  <td className="px-3 py-2" style={{ color: "#6B7280" }}>{r.dim2}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-black" style={{ color: M_COLOR }}>{r.m1}</span>
                      <div className="h-1.5 rounded-full flex-1" style={{ backgroundColor: "#E5E7EB" }}>
                        <div className="h-full rounded-full" style={{ width: `${(r.m1 / 847) * 100}%`, backgroundColor: M_COLOR }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-semibold" style={{ color: "#111827" }}>{r.m2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table vs Matrix */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { type: "Table", icon: "", use: "One row per item. All columns shown at once. Best for detailed lists.", fields: "Columns + Values" },
            { type: "Matrix", icon: "", use: "Row groups + column groups = pivot table. Drill-down enabled. Best for cross-analysis.", fields: "Rows + Columns + Values" },
          ].map(v => (
            <div key={v.type} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                            <p className="font-bold text-sm mt-2 mb-1" style={{ color: "#111827" }}>{v.type}</p>
              <p className="text-xs leading-snug mb-2" style={{ color: "#6B7280" }}>{v.use}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ backgroundColor: "#FFFFFF"}}>Fields: {v.fields}</span>
            </div>
          ))}
        </div>

        <PowerBICallout items={["Data bars (colour bars inside cells)", "Background colour rules", "Icon sets (  )", "Drill-down on rows (matrix only)", "Export to CSV/Excel"]} />
      </div>
    </ModuleLayout>
  );
}
