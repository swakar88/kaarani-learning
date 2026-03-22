"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ModuleComplete } from "@/components/ui/ScreenSection";

export default function Screen12Complete({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText={`Brilliant! You've built a star schema, connected relationships, and written DAX measures including CALCULATE and time intelligence — all using ${flavor.label} data. Module 4 is where it all becomes visible: you'll turn your model into every type of chart and build your first full dashboard.`}
      kaaraniHint="Save your Power BI file (.pbix) before moving on. Module 4 builds directly on the model you just created."
      onPrev={onPrev}
      primaryAction={{ label: "Start Module 4: Visualise →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ModuleComplete
          moduleId={3}
          title="Your data model and DAX measures are ready"
          topics={["Star schema", "Table relationships", "DAX intro", "Measures vs columns", "SUM / COUNT / AVERAGE / DIVIDE", "CALCULATE", "Filter context", "Time intelligence", "VAR/RETURN", "Best practices"]}
          nextModuleId={4}
          nextModuleTitle="Visualise & Analyse"
          nextModuleIcon=""
          nextModuleColor="#2563EB"
          flavorLabel={flavor.label}
        />
      </div>
    </ModuleLayout>
  );
}
