"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { Placeholder } from "@/components/ui/Placeholder";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const KAARANI_TEXT =
  "Power BI lives primarily in descriptive and diagnostic analytics — the bottom two rungs of the ladder. But with Azure ML integration and Python support, it can reach into predictive too. It's the bridge between raw data and business decisions.";

const KAARANI_HINT =
  "Microsoft Fabric, which we cover in Module 5, extends Power BI all the way up to prescriptive analytics with AI-powered recommendations.";

const ANALYTICS_LADDER = [
  {
    type: "Prescriptive",
    question: "What should we do?",
    powerBI: "Limited — via Azure ML + Power Automate",
    difficulty: "Hardest",
    diffColor: "#9CA3AF",
    color: "#2563EB",
    bg: "#F9FAFB",
    border: "#E8E8E8",
    pbiStrength: 1,
    icon: "",
  },
  {
    type: "Predictive",
    question: "What will happen?",
    powerBI: "Partial — Forecast line, Key Influencers, Azure ML",
    difficulty: "Advanced",
    diffColor: "#2563EB",
    color: "#2563EB",
    bg: "#F9FAFB",
    border: "#E5E7EB",
    pbiStrength: 2,
    icon: "",
  },
  {
    type: "Diagnostic",
    question: "Why did it happen?",
    powerBI: "Strong — Drill-through, Decomposition tree, Slicers",
    difficulty: "Intermediate",
    diffColor: "#2563EB",
    color: "#2563EB",
    bg: "#FFFFFF",
    border: "#E8E8E8",
    pbiStrength: 4,
    icon: "",
    pbiHome: true,
  },
  {
    type: "Descriptive",
    question: "What happened?",
    powerBI: "Excellent — Dashboards, Reports, KPI cards, Charts",
    difficulty: "Beginner",
    diffColor: "#2563EB",
    color: "#2563EB",
    bg: "#FFFFFF",
    border: "#E5E7EB",
    pbiStrength: 5,
    icon: "",
    pbiHome: true,
  },
];

export default function Screen8PowerBIFit({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "You've learned all four types of analytics. Now let's see exactly where Power BI lives on that spectrum.",
    "Descriptive and Diagnostic are Power BI's home territory — it's exceptional at both. Predictive is possible with the forecast line and Key Influencers visual. Prescriptive requires Azure ML or Power Automate.",
    "Module 1 complete! You now understand descriptive, diagnostic, predictive, and prescriptive analytics, the data roles, and where Power BI fits.",
    `Up next: Module 2 — Prepare and Clean Data. We'll use real ${flavor.label} datasets and fix everything with Power Query.`,
  ];

  return (
    <ModuleLayout
      moduleId={1}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Start Module 2: Prepare Data →", onClick: onNext }
          : { label: "Start Module 2: Prepare Data →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">
        {/* Block 0: Heading + subtitle */}
        <div className={blockClass(0)} style={{ marginBottom: "2rem" }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#2563EB" }}>
            Module 1 · Final Screen
          </span>
          <h1 className="text-3xl font-black mt-1" style={{ color: "#111827" }}>
            Where does Power BI fit?
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            The analytics maturity ladder — and Power BI&apos;s home on it.
          </p>
        </div>

        {/* Block 1: Analytics ladder */}
        <div className={`${blockClass(1)} mb-4`}>
          <div className="flex flex-col-reverse gap-2 mb-6">
            {ANALYTICS_LADDER.map((level) => (
              <div
                key={level.type}
                className="rounded-2xl p-4 border-2 relative"
                style={{
                  borderColor: level.pbiHome ? "#2563EB" : level.border,
                  backgroundColor: level.bg,
                  boxShadow: level.pbiHome ? "0 0 0 3px #2563EB18" : "none",
                }}
              >
                {/* Power BI home badge */}
                {level.pbiHome && (
                  <span
                    className="absolute -top-3 right-4 text-xs font-black px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: "#2563EB" }}
                  >
                     Power BI home
                  </span>
                )}

                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-black text-base" style={{ color: level.color }}>
                        {level.type}
                      </h3>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: level.diffColor + "18", color: level.diffColor }}
                      >
                        {level.difficulty}
                      </span>
                    </div>
                    <p className="text-xs font-semibold mb-1.5" style={{ color: "#6B7280" }}>
                      {level.question}
                    </p>
                    <p className="text-xs leading-snug" style={{ color: "#111827" }}>
                      <span className="font-semibold" style={{ color: "#2563EB" }}>Power BI: </span>
                      {level.powerBI}
                    </p>
                  </div>
                  {/* Strength dots */}
                  <div className="flex gap-0.5 items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: i <= level.pbiStrength ? level.color : "#E5E7EB",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Block 2: Module 1 completion card */}
        <div className={`${blockClass(2)} mb-4`}>
          <div
            className="rounded-3xl p-6 mb-5"
            style={{
              background: "linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)",
              border: "1px solid #E5E7EB",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl"></span>
              <div>
                <p className="font-black text-lg" style={{ color: "#2563EB" }}>
                  Module 1 complete!
                </p>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  You now understand the four types of analytics and where Power BI fits.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                " Descriptive analytics",
                " Diagnostic analytics",
                " Predictive analytics",
                " Prescriptive analytics",
                " Data roles",
                " Power BI's role",
              ].map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#FFFFFF", color: "#2563EB", border: "1px solid #E5E7EB" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Block 3: Next module preview + Placeholder */}
        <div className={`${blockClass(3)} mb-4`}>
          <div
            className="rounded-2xl p-4 flex items-center gap-4 mb-4"
            style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}
          >
            <span className="text-3xl"></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "#2563EB" }}>
                Up next — Module 2
              </p>
              <p className="font-bold" style={{ color: "#111827" }}>
                Prepare &amp; Clean Data
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                Real {flavor.label} datasets, Power Query, and fixing messy data
              </p>
            </div>
          </div>

          {/* Placeholder for Power BI ecosystem diagram */}
          <Placeholder
            type="diagram"
            label="[Diagram: Power BI ecosystem — Desktop, Service, Mobile, Fabric — to be replaced with animated SVG]"
            height="110px"
          />
        </div>

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
