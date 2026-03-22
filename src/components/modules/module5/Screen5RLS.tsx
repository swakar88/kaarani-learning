"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorSharingScenario } from "@/data/module5";
import { ScreenHeader, CodeBlock } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

export default function Screen5RLS({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const scenario = getFlavorSharingScenario(selectedFlavor);
  const [activeRole, setActiveRole] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const roles = scenario.rlsRoles;

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Row-Level Security — RLS — is how you make one report show different data to different people. A sales manager sees only their region. An executive sees everything. You define Roles in Power BI Desktop, add a DAX filter, then assign users to roles in the Service. The report is identical; the data changes based on who's logged in."
      kaaraniHint="Dynamic RLS uses USERNAME() or USERPRINCIPALNAME() in the DAX filter — no need to create a separate role per person. One 'Employee' role with [Email] = USERPRINCIPALNAME() scales to 10,000 users automatically."
      onPrev={onPrev}
      primaryAction={{ label: "Scheduled Refresh →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={5} label="Module 5 · Screen 5" title="Row-Level Security "
          subtitle="One report, different data per user. Define roles. Add DAX filters. Assign users." moduleColor={M_COLOR} />

        {/* How it works */}
        <div className="flex gap-2 mb-4">
          {["Define roles in Desktop", "Add DAX filter", "Publish", "Assign users in Service"].map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 p-2 rounded-xl text-center"
              style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
              <span className="text-base font-black" style={{ color: M_COLOR }}>{i + 1}</span>
              <p className="text-[10px] leading-tight" style={{ color: "#111827" }}>{step}</p>
            </div>
          ))}
        </div>

        {/* Role selector */}
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>
          {flavor.label} RLS roles
        </p>
        <div className="flex gap-2 mb-3">
          {roles.map((role, i) => (
            <button key={i} type="button" onClick={() => { setActiveRole(i); setRevealed(false); }}
              className="flex-1 py-2 px-3 rounded-xl border-2 cursor-pointer transition-all text-xs font-bold"
              style={{ borderColor: activeRole === i ? M_COLOR : "#E5E7EB", backgroundColor: activeRole === i ? M_COLOR + "12" : "#FFFFFF", color: activeRole === i ? M_COLOR : "#3D2B1F" }}>
              {role.role}
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-4 mb-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#6B7280" }}>DAX filter for role: <span style={{ color: M_COLOR }}>{roles[activeRole].role}</span></p>
          <CodeBlock code={roles[activeRole].filter} label="DAX filter" />
          <button type="button" onClick={() => setRevealed(true)}
            className="mt-3 w-full py-2 rounded-xl text-xs font-bold transition-all"
            style={{ backgroundColor: revealed ? "#F9FAFB" : M_COLOR, color: revealed ? "#111827" : "#FFFFFF", border: revealed ? "1px solid #E5E7EB" : "none" }}>
            {revealed ? ` ${roles[activeRole].description}` : "What does this filter?"}
          </button>
        </div>

        <div className="rounded-xl p-3" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-1" style={{ color: M_COLOR }}> Common RLS mistakes</p>
          <ul className="text-xs space-y-1" style={{ color: "#111827" }}>
            <li>• Forgetting to assign users to roles in the Service — role exists but nobody is in it</li>
            <li>• Testing with your own account (you see everything as dataset owner)</li>
            <li>• Not using dynamic RLS — creating 50 roles for 50 regions manually</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
}
