"use client";

import React, { useState } from "react";
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

const TOTAL_SCREENS = 8;

export default function Module1Page() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();
  const { markModuleComplete, setCurrentModule } = useKaarani();

  const handleNext = () => {
    if (currentScreen < TOTAL_SCREENS - 1) {
      setCurrentScreen((s) => s + 1);
    } else {
      markModuleComplete(1);
      setCurrentModule(2);
      router.push("/module/2");
    }
  };

  const handlePrev = () => {
    if (currentScreen > 0) {
      setCurrentScreen((s) => s - 1);
    } else {
      router.push("/module/0");
    }
  };

  const commonProps = {
    onNext: handleNext,
    onPrev: handlePrev,
    screenIndex: currentScreen,
    totalScreens: TOTAL_SCREENS,
  };

  switch (currentScreen) {
    case 0: return <Screen1 {...commonProps} />;
    case 1: return <Screen2 {...commonProps} />;
    case 2: return <Screen3 {...commonProps} />;
    case 3: return <Screen4 {...commonProps} />;
    case 4: return <Screen5 {...commonProps} />;
    case 5: return <Screen6 {...commonProps} />;
    case 6: return <Screen7 {...commonProps} />;
    case 7: return <Screen8 {...commonProps} />;
    default: return <Screen1 {...commonProps} />;
  }
}
