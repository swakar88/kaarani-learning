"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorDataset } from "@/data/module2";
import { ScreenHeader } from "@/components/ui/ScreenSection";

const M_COLOR = "#2563EB";

const SOURCES = [
  { id: "file", icon: "", label: "Files", desc: "CSV, Excel, JSON, XML, PDF", note: "Most common for learning", color: "#2563EB" },
  { id: "database", icon: "", label: "Databases", desc: "SQL Server, MySQL, PostgreSQL, Azure SQL", note: "Production standard", color: "#2563EB" },
  { id: "web", icon: "", label: "Web & Online", desc: "Web scraping, SharePoint, OData APIs", note: "Powerful but fragile", color: "#2563EB" },
  { id: "cloud", icon: "", label: "Cloud Services", desc: "Azure, Dataverse, Fabric Lakehouse, Snowflake", note: "Enterprise standard", color: "#2563EB" },
  { id: "other", icon: "", label: "Other Apps", desc: "Salesforce, SAP, Google Analytics, and 100+ more", note: "Via certified connectors", color: "#2563EB" },
];

export default function Screen2DataSources({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);
  const dataset = getFlavorDataset(selectedFlavor);
  const [active, setActive] = useState("file");
  const current = SOURCES.find(s => s.id === active)!;

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Power BI can connect to almost anything — CSV files on your desktop, cloud databases, live web APIs, and hundreds of third-party apps. For this module we'll start with a file, which is the most common starting point."
      kaaraniHint="'Get Data' is the first step in every Power BI report. You'll click it hundreds of times in your career."
      onPrev={onPrev}
      primaryAction={{ label: "Open Power Query →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={2} label="Module 2 · Screen 2" title="Where does data come from? "
          subtitle="Power BI connects to 100+ data sources. Let's explore the main categories." moduleColor={M_COLOR} />

        <div className="grid grid-cols-5 gap-2 mb-5">
          {SOURCES.map(s => (
            <button key={s.id} type="button" onClick={() => setActive(s.id)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 cursor-pointer transition-all duration-150"
              style={{ borderColor: active === s.id ? s.color : "#E5E7EB", backgroundColor: active === s.id ? s.color + "12" : "#FFFFFF" }}>
                            <span className="text-xs font-bold text-center" style={{ color: active === s.id ? s.color : "#3D2B1F" }}>{s.label}</span>
            </button>
          ))}
        </div>

        <div className="rounded-2xl p-5 mb-5 animate-fade-in-up" style={{ backgroundColor: current.color + "0C", border: `2px solid ${current.color}30` }}>
          <div className="flex items-center gap-3 mb-3">
                        <div>
              <p className="font-black text-lg" style={{ color: current.color }}>{current.label}</p>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: current.color + "18", color: current.color }}>{current.note}</span>
            </div>
          </div>
          <p className="text-sm" style={{ color: "#111827" }}>{current.desc}</p>
        </div>

        <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}>
            Our source for this module
          </p>
          <div className="flex items-center gap-3">
            <span className="text-2xl"></span>
            <div>
              <p className="font-bold text-sm" style={{ color: "#111827" }}>{dataset.name}</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>{dataset.fileType} · {dataset.rows} rows · {dataset.source}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>In Power BI Desktop</p>
          <p className="text-sm" style={{ color: "#111827" }}>
            Click <strong>Home → Get Data → Text/CSV</strong> (or your file type) → browse to your file → click <strong>Load</strong> or <strong>Transform Data</strong> to open Power Query first.
          </p>
        </div>
      </div>
    </ModuleLayout>
  );
}
