"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";

const KAARANI_TEXT =
  "Welcome to Kaarani — your friendly Power BI guide! Before we dive into the good stuff, let's make sure Power BI Desktop is installed and ready. Tick each step once you've done it, then we'll move on to choosing your data flavor.";

const KAARANI_HINT =
  "Power BI Desktop is free to download. You'll need a Microsoft or work email to sign in.";

interface CheckItem {
  id: string;
  step: number;
  title: string;
  description: string;
  linkText?: string;
  linkNote?: string;
  emoji: string;
}

const CHECKS: CheckItem[] = [
  {
    id: "download",
    step: 1,
    emoji: "⬇",
    title: "Download Power BI Desktop",
    description:
      "Head to the Microsoft Store or the Power BI website and install the free desktop app.",
    linkText: "Get Power BI Desktop",
    linkNote: "(free from Microsoft Store or powerbi.microsoft.com)",
  },
  {
    id: "signin",
    step: 2,
    emoji: "",
    title: "Sign in with a Microsoft account",
    description:
      "Open Power BI Desktop and sign in using a Microsoft account — a personal, school, or work email will work.",
    linkNote: "Don't have an account? Create one free at microsoft.com",
  },
  {
    id: "ready",
    step: 3,
    emoji: "",
    title: "You see the Power BI start screen",
    description:
      "Power BI Desktop is open and showing the welcome screen or a blank canvas. You're good to go!",
  },
];

export default function Screen1InstallCheck({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allChecked = CHECKS.every((c) => checked[c.id]);

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <ModuleLayout
      moduleId={0}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={{
        label: allChecked ? "Power BI is ready!" : "All set? Continue",
        onClick: onNext,
        disabled: false, // allow skipping for people who already have it
      }}
    >
      {/* Stage content */}
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2" style={{ color: "#111827" }}>
            Let&apos;s get Power BI ready 
          </h1>
          <p className="text-base" style={{ color: "#6B7280" }}>
            Power BI Desktop is free. These three steps take about 5 minutes.
          </p>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-4">
          {CHECKS.map((item) => {
            const isDone = !!checked[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className="flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer group w-full"
                style={{
                  borderColor: isDone ? "#2563EB" : "#E5E7EB",
                  backgroundColor: isDone ? "#FFFFFF" : "#FFFFFF",
                  boxShadow: isDone
                    ? "0 0 0 3px #2563EB18"
                    : "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                {/* Checkbox */}
                <div
                  className="mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200"
                  style={{
                    borderColor: isDone ? "#2563EB" : "#E5E7EB",
                    backgroundColor: isDone ? "#2563EB" : "transparent",
                  }}
                >
                  {isDone && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path
                        d="M1 5L4.5 8.5L11 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl"></span>
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: isDone ? "#2563EB" : "#8B6650" }}
                    >
                      Step {item.step}
                    </span>
                  </div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{
                      color: isDone ? "#2563EB" : "#3D2B1F",
                      textDecoration: isDone ? "line-through" : "none",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {item.description}
                  </p>
                  {item.linkNote && (
                    <p
                      className="text-xs mt-2 font-medium"
                      style={{ color: "#2563EB" }}
                    >
                      {item.linkText ? `→ ${item.linkText} ` : ""}
                      <span className="opacity-70">{item.linkNote}</span>
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Already installed message */}
        <p className="text-xs mt-6 text-center" style={{ color: "#6B7280" }}>
          Already have Power BI Desktop?{" "}
          <button
            type="button"
            className="font-semibold underline cursor-pointer"
            style={{ color: "#2563EB" }}
            onClick={onNext}
          >
            Skip ahead →
          </button>
        </p>
      </div>
    </ModuleLayout>
  );
}
