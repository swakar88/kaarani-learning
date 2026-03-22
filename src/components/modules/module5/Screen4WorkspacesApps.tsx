"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorSharingScenario } from "@/data/module5";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const TABS = [
  {
    id: "workspace",
    label: "Workspaces",
    icon: "",
    desc: "Where you and your team collaborate. Contains reports, datasets, dataflows, and dashboards.",
    items: [
      { icon: "", text: "My Workspace — personal sandbox, no sharing" },
      { icon: "", text: "Team Workspace — collaborate with colleagues" },
      { icon: "", text: "Premium Workspace — higher limits, deployment pipelines" },
    ],
    tip: "Think of a workspace like a SharePoint document library — but built for Power BI assets.",
  },
  {
    id: "app",
    label: "Apps",
    icon: "",
    desc: "A published, read-only bundle of reports and dashboards. The recommended way to share with consumers.",
    items: [
      { icon: "", text: "Consumers can view but not edit" },
      { icon: "", text: "Customisable navigation & branding" },
      { icon: "", text: "Distributed to specific users or the whole org" },
    ],
    tip: "Workspace = kitchen (you cook here). App = restaurant (guests eat here). Never let guests into the kitchen.",
  },
  {
    id: "pipeline",
    label: "Deployment Pipelines",
    icon: "",
    desc: "Dev → Test → Production promotion for enterprise-grade deployments. Premium feature.",
    items: [
      { icon: "", text: "Dev stage — build and test safely" },
      { icon: "", text: "Test stage — stakeholder review" },
      { icon: "", text: "Production — live for all users" },
    ],
    tip: "Pipelines prevent you from accidentally breaking the live report your CEO is viewing right now.",
  },
];

export default function Screen4WorkspacesApps({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const scenario = getFlavorSharingScenario(selectedFlavor);
  const [active, setActive] = useState("workspace");
  const current = TABS.find(t => t.id === active)!;

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Workspaces and Apps are the two-layer architecture of Power BI sharing. Workspaces are for builders — your team collaborates, iterates, and publishes from here. Apps are for consumers — your stakeholders get a clean, branded, read-only experience. Never give business users direct workspace access."
      kaaraniHint="A common mistake is sharing the workspace directly with all 200 users. Use an App instead — it's cleaner, safer, and lets you update the underlying reports without breaking the consumer's view."
      onPrev={onPrev}
      primaryAction={{ label: "Row-Level Security →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={5} label="Module 5 · Screen 4" title="Workspaces & Apps "
          subtitle="Two-layer architecture: builders use workspaces, consumers use apps." moduleColor={M_COLOR} />

        <div className="flex gap-2 mb-4">
          {TABS.map(t => (
            <button key={t.id} type="button" onClick={() => setActive(t.id)}
              className="flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 cursor-pointer transition-all"
              style={{ borderColor: active === t.id ? M_COLOR : "#E5E7EB", backgroundColor: active === t.id ? M_COLOR + "12" : "#FFFFFF" }}>
                            <p className="text-xs font-bold text-center" style={{ color: active === t.id ? M_COLOR : "#3D2B1F" }}>{t.label}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-4 mb-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-sm font-bold mb-2" style={{ color: "#111827" }}>{current.desc}</p>
          <div className="flex flex-col gap-2 mb-3">
            {current.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl p-2.5" style={{ backgroundColor: "#FFFFFF" }}>
                                <p className="text-xs" style={{ color: "#111827" }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <p className="text-xs" style={{ color: "#6B7280" }}> {current.tip}</p>
          </div>
        </div>

        <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>{flavor.label} deployment plan</p>
          <p className="text-sm font-bold mb-1" style={{ color: "#111827" }}>{scenario.reportName}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-1 rounded-lg font-bold" style={{ backgroundColor: "#FFFFFF"}}> {scenario.workspaceName}</span>
            <span className="text-xs" style={{ color: "#6B7280" }}>→ publish App to →</span>
            <span className="text-xs px-2 py-1 rounded-lg font-bold" style={{ backgroundColor: "#F9FAFB", color: "#111827" }}> {flavor.label} App</span>
          </div>
          <p className="text-xs mt-2" style={{ color: "#6B7280" }}>Audience: {scenario.primaryAudience}</p>
        </div>
      </div>
    </ModuleLayout>
  );
}
