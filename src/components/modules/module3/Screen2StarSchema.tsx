"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorStarSchema } from "@/data/module3";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

function StarDiagram({ factTable, dimensions }: { factTable: string; dimensions: string[] }) {
  const cx = 160;
  const cy = 130;
  const r = 52;
  const dimR = 42;
  const angleStep = (2 * Math.PI) / dimensions.length;
  const radius = 108;

  const dimPositions = dimensions.map((_, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });

  return (
    <svg viewBox="0 0 320 260" className="w-full" style={{ maxHeight: 220 }}>
      {/* Lines from fact to each dim */}
      {dimPositions.map((pos, i) => (
        <line key={i} x1={cx} y1={cy} x2={pos.x} y2={pos.y}
          stroke="#BFDBFE" strokeWidth="2" strokeDasharray="5 3" />
      ))}
      {/* Fact table circle */}
      <circle cx={cx} cy={cy} r={r} fill="#2563EB" />
      <foreignObject x={cx - r} y={cy - r} width={r * 2} height={r * 2}>
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 8, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>FACT</span>
          <span style={{ color: "#fff", fontSize: 9, fontWeight: 700, textAlign: "center", padding: "0 4px", lineHeight: 1.2 }}>{factTable.replace("fact_", "")}</span>
        </div>
      </foreignObject>
      {/* Dimension circles */}
      {dimPositions.map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r={dimR} fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
          <foreignObject x={pos.x - dimR} y={pos.y - dimR} width={dimR * 2} height={dimR * 2}>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#1E40AF", fontSize: 7, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center" }}>DIM</span>
              <span style={{ color: "#1E40AF", fontSize: 8.5, fontWeight: 700, textAlign: "center", padding: "0 3px", lineHeight: 1.2 }}>{dimensions[i].replace("dim_", "")}</span>
            </div>
          </foreignObject>
        </g>
      ))}
    </svg>
  );
}

export default function Screen2StarSchema({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const schema = getFlavorStarSchema(selectedFlavor);
  const [activeDim, setActiveDim] = useState<string | null>(null);
  const current = schema.dimensions.find(d => d.name === activeDim);

  // 4 blocks: header(0), fact table(1), dimension tables(2), diagram(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `Let's talk about the star schema — the gold standard layout for Power BI models.`,
    `The fact table sits right in the centre of the star. This is your largest table — it stores all the numbers. Every delivery bowled, every order placed, every transaction. For our ${flavor.label} model, the fact table is ${schema.factTable}.`,
    `Around the fact table, you have dimension tables — the star points. These store the descriptive context. Click each one to see what columns it contains. These are the dimensions you'll slice and filter by in your report.`,
    `Visualise it as a star. The fact table in the middle. Dimension tables radiating outward. Every dimension connects to the fact table through a key column. This layout is fast, simple, and exactly what Power BI is optimised for.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="The star schema is the gold standard for Power BI models. One fat table in the middle — your Fact table — stores all the numbers. Smaller Dimension tables around it store the descriptive context. The fact table links to each dimension via a key column — like player_id or date_key."
      kaaraniHint="Always aim for a star schema. Avoid snowflaking — that's when dimension tables link to other dimension tables instead of directly to the fact table. It makes queries slower and harder to manage."
      onPrev={onPrev}
      primaryAction={{ label: "Create relationships →", onClick: onNext, disabled: !isComplete }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={3} label="Module 3 · Screen 2" title="The Star Schema ⭐"
            subtitle="One fact table in the centre. Dimension tables on the points. Tap each to explore." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Fact table */}
        <div className={`${blockClass(1)} mb-4`}>
          <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: "#F9FAFB", border: "2px solid #2563EB" }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl"></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: M_COLOR }}>Fact Table (centre of the star)</p>
                <p className="font-black text-lg" style={{ color: "#111827" }}>{schema.factTable}</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>{schema.factDescription}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {schema.factColumns.map(col => (
                <span key={col} className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#FFFFFF", color: "#111827", border: "1px solid #E5E7EB" }}>{col}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Block 2 — Dimension tables */}
        <div className={`${blockClass(2)} mb-4`}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>Dimension Tables (star points) — tap to explore</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {schema.dimensions.map(dim => (
              <button key={dim.name} type="button" onClick={() => setActiveDim(activeDim === dim.name ? null : dim.name)}
                className="flex items-start gap-3 p-3 rounded-xl border-2 text-left cursor-pointer transition-all"
                style={{ borderColor: activeDim === dim.name ? M_COLOR : "#E5E7EB", backgroundColor: "#FFFFFF" }}>
                <div>
                  <p className="text-xs font-black" style={{ color: activeDim === dim.name ? M_COLOR : "#3D2B1F" }}>{dim.name}</p>
                  <p className="text-[10px]" style={{ color: "#6B7280" }}>{dim.role}</p>
                </div>
              </button>
            ))}
          </div>

          {current && (
            <div className="rounded-2xl p-4 mb-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-black" style={{ color: M_COLOR }}>{current.name}</p>
              </div>
              <p className="text-xs mb-2" style={{ color: "#6B7280" }}>{current.role}</p>
              <div className="flex flex-wrap gap-1.5">
                {current.columns.map(col => (
                  <span key={col} className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ backgroundColor: "#FFFFFF", color: "#111827", border: "1px solid #E5E7EB" }}>{col}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Block 3 — Star schema SVG diagram */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3 text-center" style={{ color: M_COLOR }}>
              {flavor.label} — Star Schema layout
            </p>
            <StarDiagram factTable={schema.factTable} dimensions={schema.dimensions.map(d => d.name)} />
            <p className="text-xs text-center mt-3" style={{ color: "#9CA3AF" }}>
              Every dimension connects to the fact table — never to each other
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
