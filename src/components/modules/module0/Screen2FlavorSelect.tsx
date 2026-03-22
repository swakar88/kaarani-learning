"use client";

import React, { useState } from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { FlavorCard } from "@/components/ui/FlavorCard";
import { ScreenProps } from "@/types";
import { FLAVORS } from "@/data/flavors";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";

const KAARANI_TEXT =
  "Everything is better when you love the data! Choose a flavor — a topic you're passionate about. I'll use real examples from that world to teach you every Power BI concept. Cricket is pre-selected, but the choice is totally yours!";

const KAARANI_HINT =
  "You can change your flavor any time from the settings. The data stays the same — only the names and examples change.";

export default function Screen2FlavorSelect({
  onNext,
  onPrev,
  screenIndex,
  totalScreens,
}: ScreenProps) {
  const { selectedFlavor, setSelectedFlavor } = useKaarani();
  const [customTopic, setCustomTopic] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const activeFlavor = getFlavorById(selectedFlavor);

  const handleCustomConfirm = () => {
    if (customTopic.trim()) {
      // We store custom as a special flavor id with the label
      // For now map to a generic "custom" with the topic stored separately
      // In future we'll use Anthropic API to generate examples
      setSelectedFlavor("custom");
    }
  };

  return (
    <ModuleLayout
      moduleId={0}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={{
        label: `Start with $${activeFlavor.label}`,
        onClick: onNext,
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2" style={{ color: "#111827" }}>
            Pick your data flavor 
          </h1>
          <p className="text-base" style={{ color: "#6B7280" }}>
            We&apos;ll use real data from your chosen world throughout the entire
            course.
          </p>
        </div>

        {/* Selected flavor banner */}
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-2xl mb-6"
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px solid #2563EB",
          }}
        >
          <span className="text-2xl"></span>
          <div>
            <p className="text-sm font-bold" style={{ color: "#2563EB" }}>
              Selected: {activeFlavor.label}
            </p>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              Example metric: {activeFlavor.sampleMetric}
            </p>
          </div>
          <span
            className="ml-auto text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: "#2563EB", color: "white" }}
          >
            Active
          </span>
        </div>

        {/* Flavor grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {FLAVORS.map((flavor) => (
            <FlavorCard
              key={flavor.id}
              flavor={flavor}
              selected={selectedFlavor === flavor.id}
              onSelect={setSelectedFlavor}
            />
          ))}
        </div>

        {/* Custom topic */}
        <div
          className="rounded-2xl p-4"
          style={{ backgroundColor: "#F9FAFB", border: "1px dashed #E5E7EB" }}
        >
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
            style={{ color: "#2563EB" }}
            onClick={() => setShowCustom((v) => !v)}
          >
            <span className="text-lg"></span>
            My topic isn&apos;t listed — enter a custom topic
            <span className="ml-1">{showCustom ? "▲" : "▼"}</span>
          </button>

          {showCustom && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g. Chess tournaments, F1 racing, Startup funding…"
                className="flex-1 px-4 py-2 rounded-xl border text-sm outline-none focus:border-[#2563EB]"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                  color: "#111827",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCustomConfirm();
                }}
              />
              <button
                type="button"
                onClick={handleCustomConfirm}
                disabled={!customTopic.trim()}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer disabled:opacity-40"
                style={{ backgroundColor: "#2563EB" }}
              >
                Use this
              </button>
            </div>
          )}

          <p className="text-xs mt-2" style={{ color: "#6B7280" }}>
            Custom topics will use AI-generated examples (coming soon — powered
            by Claude).
          </p>
        </div>
      </div>
    </ModuleLayout>
  );
}
