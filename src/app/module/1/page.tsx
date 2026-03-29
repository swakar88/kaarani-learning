"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useKaarani } from "@/context/KaaraniContext";

import Screen1 from "@/components/modules/module1/Screen1StoryHook";
import Screen2 from "@/components/modules/module1/Screen2WhatIsData";
import Screen3 from "@/components/modules/module1/Screen3Descriptive";
import Screen4 from "@/components/modules/module1/Screen4Diagnostic";
import Screen5 from "@/components/modules/module1/Screen5Predictive";
import Screen6 from "@/components/modules/module1/Screen6Prescriptive";
import Screen7 from "@/components/modules/module1/Screen7DataRoles";
import Screen8 from "@/components/modules/module1/Screen8PowerBIFit";

const TOTAL = 8;

export default function Module1Page() {
  const router = useRouter();
  const { markModuleComplete, setCurrentModule, currentScreen, setCurrentScreen } = useKaarani();

  const next = () => {
    if (currentScreen < TOTAL - 1) setCurrentScreen(currentScreen + 1);
    else { markModuleComplete(1); setCurrentModule(2); setCurrentScreen(0); router.push("/module/2"); }
  };
  const prev = () => {
    if (currentScreen > 0) setCurrentScreen(currentScreen - 1);
    else router.push("/module/0");
  };

  const p = { onNext: next, onPrev: prev, screenIndex: currentScreen, totalScreens: TOTAL };
  switch (currentScreen) {
    case 0: return <Screen1 {...p} />;
    case 1: return <Screen2 {...p} />;
    case 2: return <Screen3 {...p} />;
    case 3: return <Screen4 {...p} />;
    case 4: return <Screen5 {...p} />;
    case 5: return <Screen6 {...p} />;
    case 6: return <Screen7 {...p} />;
    case 7: return <Screen8 {...p} />;
    default: return <Screen1 {...p} />;
  }
}
