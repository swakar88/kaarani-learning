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

const FABRIC_ITEMS = [
  { icon: "", label: "Data Factory", desc: "Pipelines to move and transform data at scale. Think Power Query, but for enterprise ETL." },
  { icon: "", label: "Data Engineering", desc: "Spark notebooks and Lakehouses for big data workloads. Python, Scala, SQL on petabytes." },
  { icon: "", label: "Data Science", desc: "ML experiments, model training, and MLflow tracking — right next to your Power BI data." },
  { icon: "", label: "Power BI", desc: "The reporting layer you've just mastered. Connects directly to Fabric's OneLake." },
  { icon: "", label: "Data Warehouse", desc: "T-SQL warehouse built on OneLake. Serverless, no infrastructure to manage." },
  { icon: "", label: "Real-Time Analytics", desc: "KQL (Kusto Query Language) for streaming data — IoT, logs, live events." },
];

export default function Screen9FabricIntro({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const scenario = getFlavorSharingScenario(selectedFlavor);
  const [active, setActive] = useState(3); // Start on Power BI

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Microsoft Fabric is the next evolution — a unified analytics platform that combines Power BI, Azure Data Factory, Synapse Analytics, and more into one product with one storage layer called OneLake.",
    "Think of it as Microsoft's answer to Databricks. Power BI is just one of six experiences within Fabric. All of them share one data lake — no copying, no silos. Tap each tile to explore the six experiences.",
    `For ${flavor.label}, the Fabric journey would use: ${scenario.fabricUseCase}. The skills you've built — DAX, data modelling, M code — all transfer directly into Fabric.`,
    "Your Power BI skills are your foundation. Fabric is where those skills grow into enterprise-scale data engineering, machine learning, and real-time analytics. You're ready for it.",
  ];

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Microsoft Fabric is the next evolution — a unified analytics platform that combines Power BI, Azure Data Factory, Synapse Analytics, and more into one product with one storage layer called OneLake. Think of it as Microsoft's answer to Databricks. Power BI is just one experience within Fabric."
      kaaraniHint={`Your ${flavor.label} use case would use Fabric's ${scenario.fabricUseCase}. As you grow beyond Power BI, Fabric is where you'll land. The skills you've built — DAX, data modelling, M code — all transfer directly.`}
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Course Complete! ", onClick: onNext }
        : { label: "Course Complete! ", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={5} label="Module 5 · Screen 9" title="Microsoft Fabric "
            subtitle="The platform where Power BI lives. One lake. Six experiences." moduleColor={M_COLOR} />
          {/* OneLake badge */}
          <div className="rounded-2xl p-3 mb-4 text-center" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E8E8" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#1D4ED8" }}> OneLake</p>
            <p className="text-xs" style={{ color: "#111827" }}>One unified storage for all Fabric workloads — no data duplication, no silos, no copying between services.</p>
          </div>
        </div>

        {/* 6 experience cards */}
        <div className={`${blockClass(1)} mb-4`}>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {FABRIC_ITEMS.map((item, i) => (
              <button key={i} type="button" onClick={() => setActive(i)}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 cursor-pointer transition-all text-center"
                style={{ borderColor: active === i ? M_COLOR : "#E5E7EB", backgroundColor: active === i ? M_COLOR + "12" : "#FFFFFF" }}>
                <p className="text-[10px] font-bold leading-tight" style={{ color: active === i ? M_COLOR : "#3D2B1F" }}>{item.label}</p>
              </button>
            ))}
          </div>

          <div className="rounded-2xl p-4 animate-fade-in-up" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{FABRIC_ITEMS[active].icon}</span>
              <p className="font-black" style={{ color: M_COLOR }}>{FABRIC_ITEMS[active].label}</p>
            </div>
            <p className="text-sm" style={{ color: "#111827" }}>{FABRIC_ITEMS[active].desc}</p>
          </div>
        </div>

        {/* Flavor Fabric use case */}
        <div className={`${blockClass(2)} rounded-2xl p-4 mb-4`} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>{flavor.label} Fabric use case</p>
          <p className="text-sm font-bold mb-1" style={{ color: "#111827" }}>{scenario.fabricUseCase}</p>
          <p className="text-xs" style={{ color: "#6B7280" }}>This is where your {flavor.label} analytics story goes next — beyond Power BI into the full Fabric platform.</p>
        </div>

        <div className={`${blockClass(3)} rounded-xl p-3`} style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-1" style={{ color: "#2563EB" }}>Your skills transfer</p>
          <p className="text-xs" style={{ color: "#111827" }}>DAX, data modelling, Power Query, visualisation — all of these are native Fabric skills. You are not starting over. You are levelling up.</p>
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
