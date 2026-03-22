"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ModuleComplete } from "@/components/ui/ScreenSection";

export default function Screen15Complete({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Incredible! You've now built complete dashboards with every chart type Power BI offers — all using ${flavor.label} data. The last module is about getting your work out into the world: publishing, sharing, securing, and setting up automatic data refreshes.`}
      kaaraniHint="Save your .pbix file before Module 5. You'll publish it to Power BI Service and test all the sharing features."
      onPrev={onPrev}
      primaryAction={{ label: "Start Module 5: Manage & Share →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ModuleComplete
          moduleId={4}
          title="You can now build any Power BI report"
          topics={["Canvas & panes", "Bar & column charts", "Line & area charts", "Cards & KPIs", "Tables & matrices", "Maps", "Slicers & filters", "Cross-filtering", "Conditional formatting", "Bookmarks & buttons", "Forecasting", "AI visuals", "Design best practices"]}
          nextModuleId={5}
          nextModuleTitle="Manage & Share"
          nextModuleIcon=""
          nextModuleColor="#2563EB"
          flavorLabel={flavor.label}
        />
      </div>
    </ModuleLayout>
  );
}
