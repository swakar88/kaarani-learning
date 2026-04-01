"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorDataset } from "@/data/module2";
import { ScreenHeader } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const LOAD_OPTIONS = [
  { label: "Load", icon: "⬇", desc: "Loads data directly to the report model. Use when your data is already clean from the source.", best: "Quick loads of pre-cleaned data" },
  { label: "Transform Data", icon: "", desc: "Opens Power Query Editor first. Use when you need to clean, transform or combine data before loading.", best: "Most real-world scenarios" },
  { label: "Load To…", icon: "", desc: "Choose whether to load to the Data Model, a worksheet, or Connection Only (for use in other queries).", best: "Advanced scenarios & reference tables" },
];

export default function Screen9LoadModel({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const dataset = getFlavorDataset(selectedFlavor);

  // 4 blocks: header(0), what we've built(1), load options(2), model diagram + animation(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "You've done all the hard work. Now it's time for the final step: loading your clean data into the Power BI Data Model.",
    `Look at everything we've done to the ${flavor.label} dataset. Types corrected, duplicates removed, nulls handled, columns renamed, and lookup tables merged in. This is a professional-grade data preparation pipeline.`,
    "When you click Get Data, Power BI gives you three choices. For most real-world work, you'll choose Transform Data to go through Power Query first. Load is only for data that's already perfectly clean.",
    "Once Power Query is done, you click Close & Apply. Power BI runs all your Applied Steps against the full dataset and loads it into the Data Model. From here, Module 3 begins: relationships and DAX.",
  ];

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Once Power Query is happy with your data, you click Close & Apply — and Power BI loads all your queries into the Data Model. From there, Module 3 begins: you'll set up relationships between your tables and write your first DAX measures."
      kaaraniHint="Close & Apply runs all your Applied Steps against the full dataset — not just the 1,000-row preview. Large datasets may take a moment."
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Module 2 complete →", onClick: onNext }
          : { label: "Module 2 complete →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — Header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={2} label="Module 2 · Screen 9" title="Close & Apply — load to model"
            subtitle="Final step: send clean data to the Power BI Data Model." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — What we've built */}
        <div className={`${blockClass(1)} mb-5`}>
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: M_COLOR }}>What our {flavor.label} queries look like now</p>
            <div className="flex flex-col gap-2">
              {[` ${dataset.name} — types corrected`, " Duplicate rows removed", " Nulls handled appropriately", " Columns renamed & transformed", " Dimension lookup table merged in"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#111827" }}>
                  <span style={{ color: "#2563EB" }}>•</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Block 2 — Load options */}
        <div className={`${blockClass(2)} mb-5`}>
          <div className="grid grid-cols-3 gap-3">
            {LOAD_OPTIONS.map(opt => (
              <div key={opt.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                <p className="font-black text-sm mt-2 mb-1" style={{ color: "#111827" }}>{opt.label}</p>
                <p className="text-xs leading-snug mb-2" style={{ color: "#6B7280" }}>{opt.desc}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F9FAFB", color: "#2563EB" }}>Best for: {opt.best}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3 — Pipeline diagram + animation */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 rounded-xl p-3 text-center" style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
              <p className="text-xs font-bold" style={{ color: M_COLOR }}>Power Query</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>Clean & shape</p>
            </div>
            <span className="text-2xl">→</span>
            <div className="flex-1 rounded-xl p-3 text-center" style={{ backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
              <p className="text-xs font-bold" style={{ color: "#2563EB" }}>Data Model</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>Tables & columns</p>
            </div>
            <span className="text-2xl">→</span>
            <div className="flex-1 rounded-xl p-3 text-center" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
              <p className="text-xs font-bold" style={{ color: "#2563EB" }}>Report Canvas</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>Visuals & DAX</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-bold mb-1 text-center" style={{ color: "#6B7280" }}>Applied Steps — your recipe</p>
              <img src="/screenshots/m2-applied-steps.png" alt="Applied Steps panel in Power Query"
                className="w-full rounded-xl border" style={{ borderColor: "#E5E7EB" }} />
            </div>
            <div>
              <p className="text-xs font-bold mb-1 text-center" style={{ color: "#6B7280" }}>Close &amp; Apply to load</p>
              <img src="/screenshots/m2-close-apply.png" alt="Close and Apply button in Power Query"
                className="w-full rounded-xl border" style={{ borderColor: "#E5E7EB" }} />
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
