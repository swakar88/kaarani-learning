"use client";

import React, { useState } from "react";
import Screen1 from "@/components/modules/module0/Screen1InstallCheck";
import Screen2 from "@/components/modules/module0/Screen2FlavorSelect";
import Screen3 from "@/components/modules/module0/Screen3CoursePreview";
import { useRouter } from "next/navigation";
import { useKaarani } from "@/context/KaaraniContext";

const TOTAL_SCREENS = 3;

export default function Module0Page() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();
  const { markModuleComplete, setCurrentModule } = useKaarani();

  const handleNext = () => {
    if (currentScreen < TOTAL_SCREENS - 1) {
      setCurrentScreen((s) => s + 1);
    } else {
      // Module 0 complete — go to Module 1
      markModuleComplete(0);
      setCurrentModule(1);
      router.push("/module/1");
    }
  };

  const handlePrev = () => {
    if (currentScreen > 0) {
      setCurrentScreen((s) => s - 1);
    }
  };

  const commonProps = {
    onNext: handleNext,
    onPrev: currentScreen > 0 ? handlePrev : undefined,
    screenIndex: currentScreen,
    totalScreens: TOTAL_SCREENS,
  };

  switch (currentScreen) {
    case 0:
      return <Screen1 {...commonProps} />;
    case 1:
      return <Screen2 {...commonProps} />;
    case 2:
      return <Screen3 {...commonProps} />;
    default:
      return <Screen1 {...commonProps} />;
  }
}
