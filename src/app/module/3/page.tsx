"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKaarani } from "@/context/KaaraniContext";

import Screen1 from "@/components/modules/module3/Screen1WhatIsModel";
import Screen2 from "@/components/modules/module3/Screen2StarSchema";
import Screen3 from "@/components/modules/module3/Screen3Relationships";
import Screen4 from "@/components/modules/module3/Screen4DAXIntro";
import Screen5 from "@/components/modules/module3/Screen5MeasuresVsColumns";
import Screen6 from "@/components/modules/module3/Screen6BasicDAX";
import Screen7 from "@/components/modules/module3/Screen7Calculate";
import Screen8 from "@/components/modules/module3/Screen8FilterContext";
import Screen9 from "@/components/modules/module3/Screen9TimeIntelligence";
import Screen10 from "@/components/modules/module3/Screen10Variables";
import Screen11 from "@/components/modules/module3/Screen11BestPractices";
import Screen12 from "@/components/modules/module3/Screen12KnowledgeCheck";
import Screen13 from "@/components/modules/module3/Screen12Complete";

const TOTAL = 13;

export default function Module3Page() {
  const [screen, setScreen] = useState(0);
  const router = useRouter();
  const { markModuleComplete, setCurrentModule } = useKaarani();

  const next = () => {
    if (screen < TOTAL - 1) setScreen(s => s + 1);
    else { markModuleComplete(3); setCurrentModule(4); router.push("/module/4"); }
  };
  const prev = () => {
    if (screen > 0) setScreen(s => s - 1);
    else router.push("/module/2");
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
    case 11: return <Screen12 {...p} />;
    case 12: return <Screen13 {...p} />;
    default: return <Screen1 {...p} />;
  }
}
