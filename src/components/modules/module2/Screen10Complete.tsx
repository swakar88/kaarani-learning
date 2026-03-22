"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ModuleComplete } from "@/components/ui/ScreenSection";

export default function Screen10Complete({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);

  return (
    <ModuleLayout moduleId={2} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Excellent work! You've taken raw, messy ${flavor.label} data and transformed it into a clean, correctly typed dataset ready for analysis. In Module 3, we'll build the relationships between your tables and write your first DAX measures — that's where the magic really begins.`}
      kaaraniHint="Your Power Query recipe will run automatically every time you click Refresh. That's the power of building it correctly once."
      onPrev={onPrev}
      primaryAction={{ label: "Start Module 3: Model + DAX →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ModuleComplete
          moduleId={2}
          title="You can now prepare real-world data in Power Query"
          topics={["Connected to a real dataset", "Fixed data types", "Removed duplicates", "Handled null values", "Transformed columns", "Filtered unwanted rows", "Merged & appended tables", "Loaded to Data Model"]}
          nextModuleId={3}
          nextModuleTitle="Model + DAX"
          nextModuleIcon="⭐"
          nextModuleColor="#2563EB"
          flavorLabel={flavor.label}
        />
      </div>
    </ModuleLayout>
  );
}
