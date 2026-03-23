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

export default function Screen3Publish({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const scenario = getFlavorSharingScenario(selectedFlavor);
  const [publishStep, setPublishStep] = useState(0);

  const STEPS = [
    { label: "Save your .pbix file first", icon: "", note: "Always save before publishing — Service gets the last-saved version." },
    { label: "Home ribbon → Publish", icon: "⬆", note: "Or Ctrl+Enter. Opens workspace selector." },
    { label: "Select a workspace", icon: "", note: `Choose: ${scenario.workspaceName}` },
    { label: "Click Publish", icon: "", note: "Takes 10–60 seconds depending on dataset size." },
    { label: "Click the link to open in Service", icon: "", note: "Your report is now live at app.powerbi.com" },
  ];

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(3);

  const narrationScript = [
    "Publishing is the magic moment — your .pbix file becomes a live report in the cloud in seconds. Every time you publish, it overwrites the previous version in the Service.",
    "Walk through the five steps above — tap each one in order. Your colleagues see the updated report immediately on their next browser refresh.",
    "Important: publishing puts the report in your workspace but does NOT share it with others automatically. You still need to configure sharing, permissions, and a refresh schedule after publishing.",
  ];

  return (
    <ModuleLayout moduleId={5} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Publishing is the magic moment — your .pbix file becomes a live report in the cloud in seconds. Every time you publish, it overwrites the previous version in the Service. Your colleagues see the updated report immediately on their next refresh."
      kaaraniHint="You can publish to multiple workspaces — for example, a Dev workspace for testing and a Production workspace for live users. This is called workspace-based deployment."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Workspaces & apps →", onClick: onNext }
        : { label: "Workspaces & apps →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={5} label="Module 5 · Screen 3" title="Publish your report ⬆"
            subtitle="From Desktop to Service in 5 steps. Your work goes live." moduleColor={M_COLOR} />
        </div>

        <div className={`${blockClass(1)} flex flex-col gap-3 mb-5`}>
          {STEPS.map((s, i) => {
            const done = i < publishStep;
            const activeStep = i === publishStep;
            return (
              <button key={i} type="button" onClick={() => setPublishStep(Math.max(publishStep, i + 1))}
                className="flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all text-left"
                style={{ borderColor: done ? M_COLOR : activeStep ? M_COLOR : "#E5E7EB", backgroundColor: "#FFFFFF", opacity: i > publishStep + 1 ? 0.4 : 1 }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: done ? M_COLOR : activeStep ? M_COLOR : "#E5E7EB", color: (done || activeStep) ? "#FFFFFF" : "#9CA3AF" }}>
                  {done ? "✓" : i + 1}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#111827" }}>{s.label}</p>
                  {(done || activeStep) && <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{s.note}</p>}
                </div>
                {activeStep && <span className="ml-auto text-xs px-2 py-1 rounded-lg font-bold" style={{ backgroundColor: "#FFFFFF"}}>Tap →</span>}
              </button>
            );
          })}

          {publishStep >= STEPS.length && (
            <div className="rounded-2xl p-4 animate-fade-in-up" style={{ backgroundColor: "#F9FAFB", border: "2px solid #E5E7EB" }}>
              <p className="font-black text-center" style={{ color: "#111827" }}> Published! Your {flavor.label} dashboard is live.</p>
              <p className="text-xs text-center mt-1" style={{ color: "#6B7280" }}>Workspace: {scenario.workspaceName}</p>
            </div>
          )}
        </div>

        <div className={`${blockClass(2)} rounded-xl p-3`} style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
          <p className="text-xs font-bold mb-1" style={{ color: M_COLOR }}> What publishing does NOT do</p>
          <p className="text-xs" style={{ color: "#111827" }}>It does not share with others automatically. Publishing puts it in your workspace. You still need to configure sharing, permissions, and a refresh schedule.</p>
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
