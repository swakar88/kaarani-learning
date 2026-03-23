"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorStarSchema } from "@/data/module3";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

export default function Screen1WhatIsModel({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const schema = getFlavorStarSchema(selectedFlavor);

  // 4 blocks: header(0), before/after(1), model preview(2), tip(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `Welcome to Module 3 — the Data Model. This is where Power BI gets its real power.`,
    `Think about this for a second. Without a data model, each of your tables is an island. Filters applied to one table don't affect another. You can't ask questions that cross tables. With a model, everything is connected.`,
    `Here's the ${flavor.label} model we'll build together. See that fact table in the middle? That's where all your numbers live. The dimension tables around it add context — who, when, where, what.`,
    `There are three views in Power BI Desktop. The Report view is where you build visuals. The Data view shows your table rows. The Model view is where you draw the lines that connect everything. That's where we're headed.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Think of a data model as the engine under the bonnet. Power Query cleaned your ${flavor.label} data — now the model connects your tables together so they can talk to each other. Without relationships, a filter on one table doesn't affect another. With them, everything is connected.`}
      kaaraniHint="The Data Model view is the third icon in the left sidebar of Power BI Desktop — it looks like a network of circles. That's where you build relationships."
      onPrev={onPrev}
      primaryAction={{ label: "Learn about tables →", onClick: onNext, disabled: !isComplete }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={3} label="Module 3 · Model + DAX" title="What is a Data Model? "
            subtitle="The hidden engine that makes Power BI reports smart." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Before / After */}
        <div className={`${blockClass(1)} mb-6`}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#F9FAFB", border: "2px dashed #D1D5DB" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>Without a model</p>
              <div className="flex flex-col gap-2">
                {["Table A — isolated", "Table B — isolated", "Table C — isolated"].map(t => (
                  <div key={t} className="rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", color: "#9CA3AF" }}>{t}</div>
                ))}
                <p className="text-xs mt-1" style={{ color: "#6B7280" }}>Filters don't cross tables</p>
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#F9FAFB", border: "2px solid #E5E7EB" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#2563EB" }}>With a model</p>
              <div className="flex flex-col gap-2 relative">
                {[" Fact table (centre)", " Dimension A", " Dimension B"].map(t => (
                  <div key={t} className="rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E5E7EB", color: "#111827" }}>{t}</div>
                ))}
                <p className="text-xs mt-1" style={{ color: "#2563EB" }}>Filters flow through relationships </p>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Our model preview */}
        <div className={`${blockClass(2)} mb-4`}>
          <div className="rounded-2xl p-5 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl"></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: M_COLOR }}>Our {flavor.label} model</p>
                <p className="font-black text-lg" style={{ color: "#111827" }}>{schema.factTable}</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>{schema.factDescription}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {schema.dimensions.map(d => (
                <span key={d.name} className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#FFFFFF", color: M_COLOR, border: "1px solid #E8E8E8" }}>
                  {d.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Block 3 — tip */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              <strong style={{ color: "#2563EB" }}>Three views in Power BI Desktop:</strong> Report (build visuals), Data (see your table data), Model (draw relationships). We're about to work in the Model view.
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
