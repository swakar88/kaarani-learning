"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const KAARANI_TEXT =
  "Different people work with data in different ways. Understanding the roles helps you know where you fit — and what to hand off. As a Power BI user, you're primarily a Data Analyst, but you'll collaborate with all these roles.";

const KAARANI_HINT =
  "In small organisations, one person may wear all these hats. In large ones, each is a full-time specialisation.";

interface DataRole {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  color: string;
  bg: string;
  border: string;
  responsibilities: string[];
  tools: string[];
  youAre: boolean;
}

const DATA_ROLES: DataRole[] = [
  {
    id: "analyst",
    title: "Data Analyst",
    icon: "",
    tagline: "Turns data into dashboards and insights",
    color: "#2563EB",
    bg: "#FFFFFF",
    border: "#E5E7EB",
    responsibilities: [
      "Build reports and dashboards",
      "Clean and transform data",
      "Identify trends and patterns",
      "Present findings to stakeholders",
    ],
    tools: ["Power BI", "Excel", "SQL", "Tableau"],
    youAre: true,
  },
  {
    id: "engineer",
    title: "Data Engineer",
    icon: "",
    tagline: "Builds the pipelines that move data",
    color: "#2563EB",
    bg: "#FFFFFF",
    border: "#E5E7EB",
    responsibilities: [
      "Build and maintain data pipelines",
      "Design data warehouses",
      "Ensure data quality at source",
      "Optimise data storage",
    ],
    tools: ["Azure Data Factory", "Spark", "SQL", "Python"],
    youAre: false,
  },
  {
    id: "scientist",
    title: "Data Scientist",
    icon: "",
    tagline: "Builds predictive models and runs experiments",
    color: "#2563EB",
    bg: "#FFFFFF",
    border: "#E8E8E8",
    responsibilities: [
      "Build ML and statistical models",
      "A/B testing and experiments",
      "Feature engineering",
      "Communicate model outputs",
    ],
    tools: ["Python", "R", "Azure ML", "Jupyter"],
    youAre: false,
  },
  {
    id: "business",
    title: "Business User",
    icon: "",
    tagline: "Consumes reports to make decisions",
    color: "#2563EB",
    bg: "#F9FAFB",
    border: "#E5E7EB",
    responsibilities: [
      "Read and interact with dashboards",
      "Ask questions of the data",
      "Validate findings with domain knowledge",
      "Drive action from insights",
    ],
    tools: ["Power BI Service", "Excel", "Teams", "SharePoint"],
    youAre: false,
  },
];

export default function Screen7DataRoles({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  // Keep existing activeRole state intact
  const [activeRole, setActiveRole] = useState<string>("analyst");
  const current = DATA_ROLES.find((r) => r.id === activeRole) ?? DATA_ROLES[0];

  const { unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(3);

  const narrationScript = [
    "Different people work with data in very different ways. Let me walk you through the four main data roles — and show you exactly where you fit.",
    "Tap each role to explore what they do. You are primarily a Data Analyst — building reports and dashboards in Power BI.",
    "The Data Analyst turns data into decisions. The Data Engineer builds the pipelines. The Data Scientist builds prediction models. The Business User reads your reports and acts on them. Each role is crucial.",
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
          ? { label: "Where does Power BI fit? →", onClick: onNext }
          : { label: "Where does Power BI fit? →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">
        {/* Block 0: Heading + description */}
        <div className={blockClass(0)} style={{ marginBottom: "2rem" }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#2563EB" }}>
            Module 1 · Data Roles
          </span>
          <h1 className="text-3xl font-black mt-1" style={{ color: "#111827" }}>
            Who works with data?
          </h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            Tap a role to explore what they do.
          </p>
        </div>

        {/* Block 1: Role tabs grid */}
        <div className={`${blockClass(1)} mb-4`}>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {DATA_ROLES.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setActiveRole(role.id)}
                className="flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer"
                style={{
                  borderColor: activeRole === role.id ? "#2563EB" : "#E5E7EB",
                  backgroundColor: "#FFFFFF",
                  boxShadow: activeRole === role.id ? "0 0 0 3px rgba(37,99,235,0.1)" : "none",
                }}
              >
                <div>
                  <p className="font-bold text-sm" style={{ color: activeRole === role.id ? "#2563EB" : "#111827" }}>
                    {role.title}
                  </p>
                  {role.youAre && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: "#2563EB" }}
                    >
                      That&apos;s you!
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Block 2: Role detail panel */}
        <div className={`${blockClass(2)} mb-4`}>
          <div
            key={current.id}
            className="rounded-3xl p-6 animate-fade-in-up"
            style={{ backgroundColor: current.bg, border: `2px solid ${current.border}` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black" style={{ color: "#2563EB" }}>
                    {current.title}
                  </h2>
                  {current.youAre && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: "#2563EB" }}
                    >
                      You
                    </span>
                  )}
                </div>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  {current.tagline}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Responsibilities */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}>
                  What they do
                </p>
                <ul className="flex flex-col gap-1.5">
                  {current.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm" style={{ color: "#111827" }}>
                      <span style={{ color: "#2563EB", flexShrink: 0 }}>•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}>
                  Tools they use
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.tools.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: "#2563EB" + "18", color: "#2563EB" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
