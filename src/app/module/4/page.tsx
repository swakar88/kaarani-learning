"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKaarani } from "@/context/KaaraniContext";

import Screen1 from "@/components/modules/module4/Screen1CanvasIntro";
import Screen2 from "@/components/modules/module4/Screen2BarColumnCharts";
import Screen3 from "@/components/modules/module4/Screen3LineAreaCharts";
import Screen4 from "@/components/modules/module4/Screen4CardsKPIs";
import Screen5 from "@/components/modules/module4/Screen5TablesMatrices";
import Screen6 from "@/components/modules/module4/Screen6Maps";
import Screen7 from "@/components/modules/module4/Screen7Slicers";
import Screen8 from "@/components/modules/module4/Screen8CrossFiltering";
import Screen9 from "@/components/modules/module4/Screen9ConditionalFormatting";
import Screen10 from "@/components/modules/module4/Screen10Bookmarks";
import Screen11 from "@/components/modules/module4/Screen11Forecasting";
import Screen12 from "@/components/modules/module4/Screen12AIVisuals";
import Screen13 from "@/components/modules/module4/Screen13DesignPrinciples";
import Screen14 from "@/components/modules/module4/Screen14OtherCharts";
import Screen15 from "@/components/modules/module4/Screen15Complete";

const TOTAL = 15;

export default function Module4Page() {
  const [screen, setScreen] = useState(0);
  const router = useRouter();
  const { markModuleComplete, setCurrentModule } = useKaarani();

  const next = () => {
    if (screen < TOTAL - 1) setScreen(s => s + 1);
    else { markModuleComplete(4); setCurrentModule(5); router.push("/module/5"); }
  };
  const prev = () => {
    if (screen > 0) setScreen(s => s - 1);
    else router.push("/module/3");
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
    case 13: return <Screen14 {...p} />;
    case 14: return <Screen15 {...p} />;
    default: return <Screen1 {...p} />;
  }
}
