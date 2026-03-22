"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorSharingScenario } from "@/data/module5";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const JOURNEY = [
  { step: 1, icon: "", label: "Power BI Desktop", desc: "Where you build. Connect data, model, visualise. Works offline. Saved as .pbix file.", you: true },
  { step: 2, icon: "⬆", label: "Publish", desc: "One click — your .pbix file uploads to Power BI Service in the cloud.", you: true },
  { step: 3, icon: "", label: "Power BI Service", desc: "app.powerbi.com — where reports live in the cloud. Accessible anywhere.", you: false },
  { step: 4, icon: "", label: "Share", desc: "Send a link, create an App, embed in Teams, or publish to the web.", you: false },
  { step: 5, icon: "", label: "Any Device", desc: "Colleagues view on browser, mobile app, or embedded in your own application.", you: false },
];

export default function Screen1DesktopToWeb({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const scenario = getFlavorSharingScenario(selectedFlavor);

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Congratulations on making it to the final module! Everything you've built — your ${flavor.label} data model, your DAX measures, your beautiful visualisations — needs to get to your audience. Module 5 is about the journey from your desktop to every screen your stakeholders use.`}
      kaaraniHint="Power BI Desktop is free. Power BI Pro ($10/user/month) is needed for sharing. Power BI Premium allows sharing with free-tier consumers. Always check your organisation's licence."
      onPrev={onPrev}
      primaryAction={{ label: "Tour the Service →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={5} label="Module 5 · Manage & Share" title="From your desktop to the world "
          subtitle="The journey from .pbix file to live dashboard on any device." moduleColor={M_COLOR} />

        {/* Journey steps */}
        <div className="flex flex-col gap-3 mb-6">
          {JOURNEY.map(j => (
            <div key={j.step} className="flex items-start gap-4 p-4 rounded-2xl"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${j.you ? M_COLOR : "#E5E7EB"}` }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: j.you ? M_COLOR : "#E5E7EB", color: j.you ? "#FFFFFF" : "#9CA3AF" }}>
                {j.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm" style={{ color: "#111827" }}>{j.label}</p>
                  {j.you && <span className="text-[10px] px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: "#EFF6FF", color: M_COLOR }}>You build here</span>}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{j.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scenario preview */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>Our {flavor.label} sharing plan</p>
          <p className="text-sm font-bold mb-1" style={{ color: "#111827" }}>{scenario.reportName}</p>
          <p className="text-xs mb-1" style={{ color: "#6B7280" }}>Audience: {scenario.primaryAudience}</p>
          <p className="text-xs" style={{ color: "#6B7280" }}>Workspace: <span className="font-mono">{scenario.workspaceName}</span></p>
        </div>
      </div>
    </ModuleLayout>
  );
}
