"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useKaarani } from "@/context/KaaraniContext";

import Screen1 from "@/components/modules/module2/Screen1MessyData";
import Screen2 from "@/components/modules/module2/Screen2DataSources";
import Screen3 from "@/components/modules/module2/Screen3PowerQueryTour";
import Screen4 from "@/components/modules/module2/Screen4ChangeTypes";
import Screen5 from "@/components/modules/module2/Screen5DuplicatesNulls";
import Screen6 from "@/components/modules/module2/Screen6TransformColumns";
import Screen7 from "@/components/modules/module2/Screen7FilterRows";
import Screen8 from "@/components/modules/module2/Screen8MergeAppend";
import Screen9 from "@/components/modules/module2/Screen9LoadModel";
import Screen10 from "@/components/modules/module2/Screen10Complete";

const TOTAL = 10;

export default function Module2Page() {
  const [screen, setScreen] = useState(0);
  const router = useRouter();
  const { markModuleComplete, setCurrentModule } = useKaarani();

  const next = () => {
    if (screen < TOTAL - 1) setScreen(s => s + 1);
    else { markModuleComplete(2); setCurrentModule(3); router.push("/module/3"); }
  };
  const prev = () => {
    if (screen > 0) setScreen(s => s - 1);
    else router.push("/module/1");
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
    default: return <Screen1 {...p} />;
  }
}
