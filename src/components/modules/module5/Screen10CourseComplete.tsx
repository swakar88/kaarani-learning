"use client";

import React, { useState, useEffect } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { MODULES } from "@/data/modules";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const ALL_SKILLS = [
  { icon: "", skill: "Data analytics fundamentals & 4 analytics types" },
  { icon: "", skill: "Power Query — connect, clean, transform any data source" },
  { icon: "", skill: "Star schema data modelling & DAX measures" },
  { icon: "", skill: "14+ visualisation types, design principles & AI visuals" },
  { icon: "", skill: "Publish, share, secure & refresh Power BI reports" },
  { icon: "", skill: "Row-Level Security, workspaces, apps & deployment" },
  { icon: "", skill: "Microsoft Fabric — the next step in your journey" },
];

const NEXT_STEPS = [
  { icon: "", text: "Take the PL-300 Microsoft Power BI Data Analyst exam" },
  { icon: "", text: "Build a portfolio project with your own real data" },
  { icon: "", text: "Join the Power BI Community at community.powerbi.com" },
  { icon: "", text: "Explore Microsoft Learn for advanced DAX & Fabric" },
];

export default function Screen10CourseComplete({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, completedModules } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSkills(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`$You did it. You came in here knowing ${flavor.label} — and you're leaving knowing Power BI, data modelling, DAX, visualisation, and cloud deployment. That combination makes you genuinely rare. Most people can analyse data OR communicate it. You can now do both. Go build something that matters.`}
      kaaraniHint="Your Kaarani journey is complete — but data analytics is a craft you sharpen for years. Every dataset you touch will teach you something new. The PL-300 exam is a great next formal goal."
      onPrev={onPrev}
      primaryAction={{ label: " Restart course", onClick: () => { if (typeof window !== "undefined") window.location.href = "/module/0"; } }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={5} label="Module 5 · Course Complete" title="You're a Power BI Analyst! "
          subtitle={`Trained with ${flavor.label} data. Ready for the real world.`} moduleColor={M_COLOR} />

        {/* Grand celebration card */}
        <div className="rounded-2xl p-5 mb-4 text-center" style={{ background: `linear-gradient(135deg, ${M_COLOR}18 0%, #F9FAFB 100%)`, border: `2px solid ${M_COLOR}40` }}>
          <p className="text-5xl mb-3"></p>
          <p className="text-xl font-black mb-1" style={{ color: M_COLOR }}>Course Complete!</p>
          <p className="text-sm font-bold mb-3" style={{ color: "#111827" }}>6 modules · 58 screens · all with {flavor.label} data</p>
          <div className="flex justify-center gap-2">
            {MODULES.map(m => (
              <div key={m.id} className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: completedModules.includes(m.id) ? "#2563EB" : "#F3F4F6", color: completedModules.includes(m.id) ? "#FFFFFF" : "#9CA3AF" }}>
                {m.id}
              </div>
            ))}
          </div>
        </div>

        {/* Skills earned */}
        {showSkills && (
          <div className="mb-4 animate-fade-in-up">
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>Skills you've earned</p>
            <div className="flex flex-col gap-2">
              {ALL_SKILLS.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                                    <p className="text-xs font-bold" style={{ color: "#111827" }}>{item.skill}</p>
                  <span className="ml-auto text-xs" style={{ color: M_COLOR }}></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>Your next steps</p>
          <div className="flex flex-col gap-2">
            {NEXT_STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                                <p className="text-xs" style={{ color: "#111827" }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
