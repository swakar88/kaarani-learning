"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorSharingScenario } from "@/data/module5";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const SHARING_METHODS = [
  {
    id: "link",
    icon: "",
    label: "Share a Link",
    pros: ["Quick — copy and send in seconds", "Works for one-off requests"],
    cons: ["Recipient needs a Pro licence", "Hard to manage at scale", "Cannot customise navigation"],
    bestFor: "1–5 people, urgent ad-hoc requests",
  },
  {
    id: "app",
    icon: "",
    label: "Publish an App",
    pros: ["Clean branded experience", "Manage audience as a group", "Update reports without re-sharing"],
    cons: ["Requires workspace role setup", "Extra publish step"],
    bestFor: "Broad audiences: teams, departments, org-wide",
  },
  {
    id: "teams",
    icon: "",
    label: "Embed in Teams",
    pros: ["Where your colleagues already work", "No context-switching", "Pinned as a Teams tab"],
    cons: ["Teams licence required", "Setup by IT admin sometimes needed"],
    bestFor: "Teams-heavy organisations",
  },
  {
    id: "web",
    icon: "",
    label: "Publish to Web",
    pros: ["Fully public — no login required", "Embed on any website"],
    cons: [" No security — anyone can see it", "Not for internal/confidential data"],
    bestFor: "Public data only: open government, public dashboards",
  },
];

export default function Screen7Sharing({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const scenario = getFlavorSharingScenario(selectedFlavor);
  const [active, setActive] = useState("app");
  const current = SHARING_METHODS.find(s => s.id === active)!;

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Sharing in Power BI has four main methods — and choosing the right one saves you headaches. For small teams use links. For large audiences use Apps. For Microsoft Teams users, pin a tab. Never use Publish to Web for internal reports — it's completely public with zero security."
      kaaraniHint="The most professional and scalable approach is always: publish to a workspace, create an App, add your audience. This gives you version control, branded navigation, and a single URL to communicate to your stakeholders."
      onPrev={onPrev}
      primaryAction={{ label: "Mobile Layout →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={5} label="Module 5 · Screen 7" title="Sharing & Permissions "
          subtitle="Four ways to share. Choose the right method for your audience." moduleColor={M_COLOR} />

        <div className="grid grid-cols-2 gap-2 mb-4">
          {SHARING_METHODS.map(s => (
            <button key={s.id} type="button" onClick={() => setActive(s.id)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-all"
              style={{ borderColor: active === s.id ? M_COLOR : "#E5E7EB", backgroundColor: active === s.id ? M_COLOR + "12" : "#FFFFFF" }}>
                            <p className="text-xs font-bold text-center" style={{ color: active === s.id ? M_COLOR : "#3D2B1F" }}>{s.label}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-4 mb-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <div className="flex items-center gap-2 mb-3">
                        <div>
              <p className="font-black" style={{ color: M_COLOR }}>{current.label}</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>Best for: {current.bestFor}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-bold mb-1.5" style={{ color: "#111827" }}> Pros</p>
              {current.pros.map((p, i) => (
                <p key={i} className="text-xs mb-1" style={{ color: "#111827" }}>• {p}</p>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold mb-1.5" style={{ color: M_COLOR }}> Cons</p>
              {current.cons.map((c, i) => (
                <p key={i} className="text-xs mb-1" style={{ color: "#111827" }}>• {c}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>{flavor.label} sharing strategy</p>
          <p className="text-sm font-bold mb-1" style={{ color: "#111827" }}>{scenario.reportName}</p>
          <p className="text-xs mb-2" style={{ color: "#6B7280" }}>Audience: {scenario.primaryAudience}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-lg font-bold" style={{ backgroundColor: "#FFFFFF"}}> Publish as App</span>
            <span className="text-xs" style={{ color: "#6B7280" }}>Recommended for this audience</span>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
