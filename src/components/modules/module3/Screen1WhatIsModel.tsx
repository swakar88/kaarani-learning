"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorStarSchema } from "@/data/module3";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

export default function Screen1WhatIsModel({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const schema = getFlavorStarSchema(selectedFlavor);

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Think of a data model as the engine under the bonnet. Power Query cleaned your ${flavor.label} data — now the model connects your tables together so they can talk to each other. Without relationships, a filter on one table doesn't affect another. With them, everything is connected.`}
      kaaraniHint="The Data Model view is the third icon in the left sidebar of Power BI Desktop — it looks like a network of circles. That's where you build relationships."
      onPrev={onPrev}
      primaryAction={{ label: "Learn about tables →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={3} label="Module 3 · Model + DAX" title="What is a Data Model? "
          subtitle="The hidden engine that makes Power BI reports smart." moduleColor={M_COLOR} />

        {/* Before / After */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#FEF2F2", border: "2px dashed #FECACA" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#EF4444" }}>Without a model</p>
            <div className="flex flex-col gap-2">
              {[" Table A — isolated", " Table B — isolated", " Table C — isolated"].map(t => (
                <div key={t} className="rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: "#FFFFFF", border: "1px solid #FECACA", color: "#111827" }}>{t}</div>
              ))}
              <p className="text-xs mt-1" style={{ color: "#EF4444" }}>Filters don't cross tables</p>
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

        {/* Our model preview */}
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

        <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            <strong style={{ color: "#2563EB" }}>Three views in Power BI Desktop:</strong> Report (build visuals), Data (see your table data), Model (draw relationships). We're about to work in the Model view.
          </p>
        </div>
      </div>
    </ModuleLayout>
  );
}
