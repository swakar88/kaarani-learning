"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorSharingScenario } from "@/data/module5";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const REFRESH_TYPES = [
  { id: "scheduled", icon: "", label: "Scheduled Refresh", desc: "Power BI pulls new data from your source at set times. Up to 8x/day on Pro, 48x/day on Premium.", when: "Most reports — daily or hourly dashboards." },
  { id: "gateway", icon: "", label: "On-Premises Gateway", desc: "Required if your data lives on a company SQL Server, file share, or local database. Acts as a secure bridge.", when: "Any on-premise data source — SQL Server, Oracle, local Excel files." },
  { id: "incremental", icon: "", label: "Incremental Refresh", desc: "Only refreshes new/changed rows instead of the full dataset. Dramatically faster for large tables.", when: "Tables with millions of rows where only recent data changes." },
  { id: "realtime", icon: "", label: "Real-Time / Streaming", desc: "Push datasets or DirectQuery. Data updates instantly — no scheduled refresh needed.", when: "Live dashboards, IoT sensors, stock prices, live scores." },
];

export default function Screen6ScheduledRefresh({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const scenario = getFlavorSharingScenario(selectedFlavor);
  const [active, setActive] = useState("scheduled");
  const [configured, setConfigured] = useState(false);
  const current = REFRESH_TYPES.find(r => r.id === active)!;

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Publishing puts a snapshot of your data in the cloud. Scheduled Refresh is what keeps it alive. Without a refresh schedule, your report shows last week's data forever.",
    "Four refresh modes: Scheduled for most reports, Gateway for on-premise data sources, Incremental for large tables, and Real-Time for live streaming data. Tap each one to learn when to use it.",
    `For ${flavor.label}: ${scenario.refreshSchedule} for ${scenario.reportName}. Tap the configure button to mark it as set up.`,
    "Set up email alerts for refresh failures in the dataset settings. Refresh failures are the number-one Power BI support ticket — your stakeholders will notice stale data before you do.",
  ];

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Publishing puts a snapshot of your data in the cloud. Scheduled Refresh is what keeps it alive. Without a refresh schedule, your report shows yesterday's — or last week's — data forever. For on-premise sources like SQL Server, you also need a Data Gateway installed on a machine that can reach your database."
      kaaraniHint="Refresh failures are the number-one Power BI support ticket. Set up email alerts for refresh failures in the dataset settings. Your stakeholders will notice stale data before you do."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Sharing & Permissions →", onClick: onNext }
        : { label: "Sharing & Permissions →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={5} label="Module 5 · Screen 6" title="Scheduled Refresh "
            subtitle="Keep your data alive. Set refresh schedules, gateways, and failure alerts." moduleColor={M_COLOR} />
        </div>

        <div className={`${blockClass(1)} mb-4`}>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {REFRESH_TYPES.map(r => (
              <button key={r.id} type="button" onClick={() => setActive(r.id)}
                className="flex flex-col items-start gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-all text-left"
                style={{ borderColor: active === r.id ? M_COLOR : "#E5E7EB", backgroundColor: active === r.id ? M_COLOR + "12" : "#FFFFFF" }}>
                <p className="text-xs font-bold" style={{ color: active === r.id ? M_COLOR : "#3D2B1F" }}>{r.label}</p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <div className="flex items-center gap-2 mb-2">
              <p className="font-black" style={{ color: M_COLOR }}>{current.label}</p>
            </div>
            <p className="text-sm mb-3" style={{ color: "#111827" }}>{current.desc}</p>
            <div className="rounded-xl p-2.5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <p className="text-xs font-bold mb-0.5" style={{ color: "#6B7280" }}>Best for:</p>
              <p className="text-xs" style={{ color: "#111827" }}>{current.when}</p>
            </div>
          </div>
        </div>

        {/* Flavor refresh plan */}
        <div className={`${blockClass(2)} rounded-2xl p-4 mb-4`} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>{flavor.label} refresh plan</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl"></span>
            <div>
              <p className="text-sm font-bold" style={{ color: "#111827" }}>{scenario.refreshSchedule}</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>for {scenario.reportName}</p>
            </div>
          </div>
          <button type="button" onClick={() => setConfigured(true)}
            className="mt-3 w-full py-2 rounded-xl text-xs font-bold transition-all"
            style={{ backgroundColor: configured ? "#F9FAFB" : M_COLOR, color: configured ? "#111827" : "#FFFFFF", border: configured ? "1px solid #E5E7EB" : "none" }}>
            {configured ? " Refresh schedule configured!" : "Configure this refresh schedule →"}
          </button>
        </div>

        <div className={`${blockClass(3)} grid grid-cols-3 gap-2`}>
          {[{ icon: "", text: "Email alerts on failure" }, { icon: "", text: "Refresh history log" }, { icon: "", text: "Credentials stored securely" }].map((item, i) => (
            <div key={i} className="rounded-xl p-2.5 text-center" style={{ backgroundColor: "#F3F4F6", border: "1px solid #E5E7EB" }}>
              <p className="text-lg mb-1">{item.icon}</p>
              <p className="text-[10px] font-bold" style={{ color: "#111827" }}>{item.text}</p>
            </div>
          ))}
        </div>

        {!isComplete && (
          <button type="button"
            onClick={() => { unlockVoice(); if (narrationScript[step + 1]) speak(narrationScript[step + 1]); next(); }}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors mt-4"
            style={{ backgroundColor: "#EFF6FF", color: "#2563EB", border: "1.5px dashed #93C5FD" }}
          >
            {tapLabel} →
          </button>
        )}
      </div>
    </ModuleLayout>
  );
}
