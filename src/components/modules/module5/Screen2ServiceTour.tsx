"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { Placeholder } from "@/components/ui/Placeholder";

const M_COLOR = "#2563EB";

const SERVICE_ZONES = [
  { id: "home", icon: "", label: "Home", desc: "Your recently opened reports, recommended content, and quick access to workspaces." },
  { id: "workspaces", icon: "", label: "Workspaces", desc: "Folders where reports, datasets, dataflows, and apps live. Collaborate here with your team." },
  { id: "apps", icon: "", label: "Apps", desc: "Published, read-only packages of reports for consumers. The recommended sharing method." },
  { id: "datasets", icon: "", label: "Datasets (Semantic Models)", desc: "Your published data models. Others can build their own reports on top of your dataset." },
  { id: "dataflows", icon: "", label: "Dataflows", desc: "Power Query in the cloud. Shared, reusable data preparation that multiple datasets can use." },
  { id: "gateway", icon: "", label: "Data Gateway", desc: "Bridges on-premise data sources (SQL Server, file shares) to Power BI Service for refresh." },
];

export default function Screen2ServiceTour({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const [active, setActive] = useState("workspaces");
  const current = SERVICE_ZONES.find(z => z.id === active)!;

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Power BI Service at app.powerbi.com is the cloud hub. Think of it as OneDrive for Power BI reports — but with collaboration, scheduling, security and sharing built in. You'll spend most of your sharing and admin time here."
      kaaraniHint="Workspaces are where you collaborate. Apps are what you share with consumers. Datasets are shared data models. These three form the core architecture of Power BI governance."
      onPrev={onPrev}
      primaryAction={{ label: "Publish a report →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={5} label="Module 5 · Screen 2" title="Power BI Service tour "
          subtitle="app.powerbi.com — explore the key areas." moduleColor={M_COLOR} />

        <Placeholder type="image" label="[Power BI Service screenshot: left nav with Home, Workspaces, Apps, Datasets labelled]" height="130px" className="mb-4" />

        <div className="grid grid-cols-3 gap-2 mb-4">
          {SERVICE_ZONES.map(z => (
            <button key={z.id} type="button" onClick={() => setActive(z.id)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-all"
              style={{ borderColor: active === z.id ? M_COLOR : "#E5E7EB", backgroundColor: active === z.id ? M_COLOR + "12" : "#FFFFFF" }}>
                            <p className="text-xs font-bold text-center" style={{ color: active === z.id ? M_COLOR : "#3D2B1F" }}>{z.label}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <div className="flex items-center gap-3 mb-2">
                        <p className="font-black" style={{ color: M_COLOR }}>{current.label}</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#111827" }}>{current.desc}</p>
        </div>
      </div>
    </ModuleLayout>
  );
}
