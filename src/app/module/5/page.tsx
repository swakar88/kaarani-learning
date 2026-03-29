"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useKaarani } from "@/context/KaaraniContext";

import Screen1 from "@/components/modules/module5/Screen1DesktopToWeb";
import Screen2 from "@/components/modules/module5/Screen2ServiceTour";
import Screen3 from "@/components/modules/module5/Screen3Publish";
import Screen4 from "@/components/modules/module5/Screen4WorkspacesApps";
import Screen5 from "@/components/modules/module5/Screen5RLS";
import Screen6 from "@/components/modules/module5/Screen6ScheduledRefresh";
import Screen7 from "@/components/modules/module5/Screen7Sharing";
import Screen8 from "@/components/modules/module5/Screen8MobileLayout";
import Screen9 from "@/components/modules/module5/Screen9FabricIntro";
import Screen10 from "@/components/modules/module5/Screen10KnowledgeCheck";
import Screen11 from "@/components/modules/module5/Screen10CourseComplete";

const TOTAL = 11;

export default function Module5Page() {
  const router = useRouter();
  const { markModuleComplete, setCurrentModule, currentScreen: screen, setCurrentScreen: setScreen } = useKaarani();

  const next = () => {
    if (screen < TOTAL - 1) setScreen(screen + 1);
    else { markModuleComplete(5); setCurrentModule(5); setScreen(0); router.push("/module/0"); }
  };
  const prev = () => {
    if (screen > 0) setScreen(screen - 1);
    else router.push("/module/4");
  };

  const p = { onNext: next, onPrev: prev, screenIndex: screen, totalScreens: TOTAL };
  switch (screen) {
    case 0: return <Screen1 {...p} />;
    case 1: return <Screen2 {...p} />;
    case 2: return <Screen3 {...p} />;
    case 3: return <Screen4 {...p} />;
    case 4: return <Screen5 {...p} />;
    case 5: return <Screen6 {...p} />;
    case 6: return <Screen7 {...p} />;
    case 7: return <Screen8 {...p} />;
    case 8: return <Screen9 {...p} />;
    case 9: return <Screen10 {...p} />;
    case 10: return <Screen11 {...p} />;
    default: return <Screen1 {...p} />;
  }
}
