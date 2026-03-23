"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { getFlavorStarSchema } from "@/data/module3";
import { ScreenHeader, CodeBlock } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

export default function Screen10Variables({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const schema = getFlavorStarSchema(selectedFlavor);

  // 4 blocks: header(0), without VAR(1), with VAR(2), benefits + debug trick(3)
  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `DAX variables are a simple idea that makes a huge difference. Once you start using them, you'll never go back.`,
    `Here's the problem with writing DAX without variables. If you reference the same sub-expression twice — like SAMEPERIODLASTYEAR — DAX evaluates it twice. That's slower. And the measure becomes a wall of nested functions that's almost impossible to read or debug.`,
    `With VAR and RETURN, the same measure becomes readable. You name each sub-expression, store it in a variable, then compose the final result at the bottom using RETURN. Power BI evaluates each variable once. The measure is fast, clear, and easy to maintain.`,
    `Here's a bonus technique: while debugging, temporarily change RETURN to return one of your intermediate variables. This lets you inspect the value at any step in the calculation. It's one of the most useful debugging tricks in DAX.`,
  ];

  return (
    <ModuleLayout moduleId={3} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="DAX variables make complex measures readable and faster. Instead of repeating the same sub-expression multiple times, you store it in a VAR and reference it. This also improves performance because the sub-expression is only evaluated once."
      kaaraniHint="Always use VAR/RETURN in any measure that references the same calculation twice. It prevents double-evaluation and makes debugging much easier."
      onPrev={onPrev}
      primaryAction={{ label: "DAX best practices →", onClick: onNext, disabled: !isComplete }}
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — header */}
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={3} label="Module 3 · Screen 10" title="DAX Variables — cleaner measures "
            subtitle="VAR and RETURN — write DAX like a pro." moduleColor={M_COLOR} />
        </div>

        {/* Block 1 — Without VAR */}
        <div className={`${blockClass(1)} mb-4`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>Without VAR — repeated calculations</p>
            <CodeBlock code={`// This calls SUM() twice — inefficient\nChange vs LY = \nDIVIDE(\n    [Total ${flavor.metric1Label}] - CALCULATE([Total ${flavor.metric1Label}], SAMEPERIODLASTYEAR(dim_Date[date])),\n    CALCULATE([Total ${flavor.metric1Label}], SAMEPERIODLASTYEAR(dim_Date[date]))\n)`} color={M_COLOR} />
          </div>
        </div>

        {/* Block 2 — With VAR */}
        <div className={`${blockClass(2)} mb-4`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}> With VAR — readable and fast</p>
            <CodeBlock code={`// VAR stores the sub-expression once\nChange vs LY =\nVAR CurrentPeriod = [Total ${flavor.metric1Label}]\nVAR LastYear = CALCULATE([Total ${flavor.metric1Label}], SAMEPERIODLASTYEAR(dim_Date[date]))\nVAR Change = CurrentPeriod - LastYear\nRETURN\n    DIVIDE(Change, LastYear)`} color={M_COLOR} />
          </div>
        </div>

        {/* Block 3 — Benefits + debug trick */}
        <div className={`${blockClass(3)} mb-4`}>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { icon: "", label: "Readable", desc: "Each VAR has a name that explains what it does" },
              { icon: "", label: "Fast", desc: "Sub-expressions are evaluated once, not repeatedly" },
              { icon: "", label: "Debuggable", desc: "Return a VAR to inspect its value during debugging" },
            ].map(b => (
              <div key={b.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: "#F9FAFB", border: "1.5px solid #E5E7EB" }}>
                <p className="font-bold text-sm mt-2 mb-1" style={{ color: M_COLOR }}>{b.label}</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>{b.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock code={`// Debug trick: temporarily return a VAR to inspect it\nChange vs LY =\nVAR LastYear = CALCULATE([Total ${flavor.metric1Label}], SAMEPERIODLASTYEAR(dim_Date[date]))\nRETURN\n    LastYear  // ← temporarily return this to check the value`} label=" Debugging with VAR" color="#2563EB" />
        </div>

        {/* Tap to reveal */}
        {!isComplete && (
          <button type="button"
            onClick={() => { unlockVoice(); if (narrationScript[step + 1]) speak(narrationScript[step + 1]); next(); }}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#EFF6FF", color: "#2563EB", border: "1.5px dashed #93C5FD" }}
          >
            {tapLabel} →
          </button>
        )}

      </div>
    </ModuleLayout>
  );
}
