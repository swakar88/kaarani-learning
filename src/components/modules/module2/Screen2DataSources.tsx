"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorDataset } from "@/data/module2";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const SOURCES = [
  { id: "file", icon: "", label: "Files", desc: "CSV, Excel, JSON, XML, PDF", note: "Most common for learning", color: "#2563EB" },
  { id: "database", icon: "", label: "Databases", desc: "SQL Server, MySQL, PostgreSQL, Azure SQL", note: "Production standard", color: "#2563EB" },
  { id: "web", icon: "", label: "Web & Online", desc: "Web scraping, SharePoint, OData APIs", note: "Powerful but fragile", color: "#2563EB" },
  { id: "cloud", icon: "", label: "Cloud Services", desc: "Azure, Dataverse, Fabric Lakehouse, Snowflake", note: "Enterprise standard", color: "#2563EB" },
  { id: "other", icon: "", label: "Other Apps", desc: "Salesforce, SAP, Google Analytics, and 100+ more", note: "Via certified connectors", color: "#2563EB" },
];

export default function Screen2DataSources({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const dataset = getFlavorDataset(selectedFlavor);
  const [active, setActive] = useState("file");
  const current = SOURCES.find(s => s.id === active)!;

  // 4 blocks: header(0), source selector(1), our source card(2), how-to instructions(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Power BI can connect to almost anything — CSV files on your desktop, cloud databases, live web APIs, and hundreds of third-party apps.",
    "Let's explore the five main categories of data sources. Tap each one to see what's included. For most learners, Files is where you start.",
    `For this module, we're loading a ${flavor.label} dataset. It's a ${dataset.fileType} file with ${dataset.rows} rows from ${dataset.source}. This is the most common starting point for real projects.`,
    "To load it in Power BI Desktop: click Home → Get Data → choose your file type → browse to the file → then click Transform Data to open Power Query first. That's the workflow you'll use every time.",
  ];

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Power BI can connect to almost anything — CSV files on your desktop, cloud databases, live web APIs, and hundreds of third-party apps. For this module we'll start with a file, which is the most common starting point."
      kaaraniHint="'Get Data' is the first step in every Power BI report. You'll click it hundreds of times in your career."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Open Power Query →", onClick: onNext }
          : { label: "Open Power Query →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={2} label="Module 2 · Screen 2" title="Where does data come from?"
            subtitle="Power BI connects to 100+ data sources. Let's explore the main categories." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Source selector */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="grid grid-cols-5 gap-2 mb-5">
            {SOURCES.map(s => (
              <button key={s.id} type="button" onClick={() => setActive(s.id)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 cursor-pointer transition-all duration-150"
                style={{ borderColor: active === s.id ? s.color : "#E5E7EB", backgroundColor: active === s.id ? s.color + "12" : "#FFFFFF" }}>
                <span className="text-xs font-bold text-center" style={{ color: active === s.id ? s.color : "#3D2B1F" }}>{s.label}</span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-5" style={{ backgroundColor: current.color + "0C", border: `2px solid ${current.color}30` }}>
            <div className="flex items-center gap-3 mb-3">
              <div>
                <p className="font-black text-lg" style={{ color: current.color }}>{current.label}</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: current.color + "18", color: current.color }}>{current.note}</span>
              </div>
            </div>
            <p className="text-sm" style={{ color: "#111827" }}>{current.desc}</p>
          </div>
        </div>

        {/* Block 2 — Our source for this module */}
        <div className={`${blockClass(2)} mb-4`}>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
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
        </div>

        {/* Block 3 — In Power BI Desktop instructions */}
        <div className={`${blockClass(3)} mb-4`}>
          <img src="/screenshots/m2-get-data.png" alt="Get Data dialog in Power BI Desktop"
            className="w-full rounded-2xl mb-3 border" style={{ borderColor: "#E5E7EB" }} />
          <div className="rounded-2xl p-4 mb-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>In Power BI Desktop</p>
            <p className="text-sm mb-3" style={{ color: "#111827" }}>
              Click <strong>Home → Get Data → Text/CSV</strong> (or your file type) → browse to your file → you'll see two buttons:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3" style={{ backgroundColor: "#FFFBEB", border: "1.5px solid #FDE68A" }}>
                <p className="text-xs font-black mb-1" style={{ color: "#92400E" }}>Load</p>
                <p className="text-xs leading-snug" style={{ color: "#78350F" }}>Skips cleaning — loads data straight into the model. Only use this if your data is already perfect.</p>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: "#EFF6FF", border: "1.5px solid #BFDBFE" }}>
                <p className="text-xs font-black mb-1" style={{ color: "#1E40AF" }}>Transform Data ✓</p>
                <p className="text-xs leading-snug" style={{ color: "#1E40AF" }}>Opens Power Query so you can clean first, then load. <strong>Always use this for real data.</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tap to reveal */}
        {!isComplete && (
          <button
            type="button"
            onClick={() => {
              unlockVoice();
              if (narrationScript[step + 1]) speak(narrationScript[step + 1]);
              next();
            }}
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
