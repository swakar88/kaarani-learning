"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const KAARANI_TEXT =
  "Diagnostic analytics means finding the reason behind a surprising result. You see something unexpected in the numbers, and you keep asking 'why' — drilling deeper — until you find the root cause.";

const KAARANI_HINT =
  "Think of it like a doctor: first they spot a symptom (the anomaly), then they run tests (drill down), and finally they find the diagnosis (root cause).";

// Flavor-aware diagnostic data: each step shows real tables, not just text
const DIAGNOSTIC_DATA: Record<string, {
  anomalyLabel: string;
  anomalyTable: { headers: string[]; rows: (string | number)[][] };
  drillLabel: string;
  drillTable: { headers: string[]; rows: (string | number)[][] };
  rootCause: string;
}> = {
  baseball: {
    anomalyLabel: "Aaron Judge's hit rate collapsed over 3 games — something doesn't look right:",
    anomalyTable: {
      headers: ["Date", "Player", "Hits", "Home Runs", "Status"],
      rows: [
        ["2022-04-07", "Aaron Judge", 5, 1, "Played ✓"],
        ["2022-04-12", "Aaron Judge", 3, 0, "Played ✓"],
        ["2022-04-15", "Aaron Judge", 0, 0, "Postponed ⚠️"],
        ["2022-04-18", "Aaron Judge", 0, 0, "Postponed ⚠️"],
        ["2022-04-21", "Aaron Judge", 0, 0, "Postponed ⚠️"],
      ],
    },
    drillLabel: "Filter by status — the Postponed rows are pulling down the averages:",
    drillTable: {
      headers: ["Status", "Games", "Avg Hits", "Avg Home Runs"],
      rows: [
        ["Played ✓", 98, 1.8, 0.4],
        ["Postponed ⚠️", 34, "0.0 ⚠️", "0.0 ⚠️"],
      ],
    },
    rootCause: "Postponed game rows have 0 hits and 0 home runs — they drag down averages by 26%. Filtering to status = 'Played' reveals the true performance.",
  },

  nfl: {
    anomalyLabel: "Patrick Mahomes' passing yards dropped to zero across multiple rows — look:",
    anomalyTable: {
      headers: ["Date", "Player", "Pass Yards", "Touchdowns", "Status"],
      rows: [
        ["2022-09-08", "Patrick Mahomes", 360, 5, "Played ✓"],
        ["2022-09-15", "Patrick Mahomes", 0, 0, "Bye ⚠️"],
        ["2022-09-22", "Patrick Mahomes", 338, 3, "Played ✓"],
        ["2022-10-06", "Patrick Mahomes", 0, 0, "Bye ⚠️"],
        ["2022-10-13", "Patrick Mahomes", 423, 4, "Played ✓"],
      ],
    },
    drillLabel: "We segment by status — Bye weeks inflate game count but show zero stats:",
    drillTable: {
      headers: ["Status", "Weeks", "Avg Pass Yards", "Avg TDs"],
      rows: [
        ["Played ✓", 51, 312, 2.8],
        ["Bye ⚠️", 3, "0 ⚠️", "0 ⚠️"],
      ],
    },
    rootCause: "Bye-week rows count as game entries but record zero stats — they lower per-game averages by 5–8%. Filter to status = 'Played' for accurate numbers.",
  },

  soccer: {
    anomalyLabel: "Inter Miami's goal total collapsed in May 2023 — 3 rows show zero goals:",
    anomalyTable: {
      headers: ["Date", "Player", "Goals", "Assists", "Status"],
      rows: [
        ["2023-04-08", "Lionel Messi", 2, 1, "Played ✓"],
        ["2023-04-15", "Lionel Messi", 1, 0, "Played ✓"],
        ["2023-05-06", "Lionel Messi", 0, 0, "Postponed ⚠️"],
        ["2023-05-13", "Lionel Messi", 0, 0, "Postponed ⚠️"],
        ["2023-05-20", "Lionel Messi", 1, 2, "Played ✓"],
      ],
    },
    drillLabel: "Filter by status — postponed matches show no activity and skew the stats:",
    drillTable: {
      headers: ["Status", "Matches", "Avg Goals", "Avg Assists"],
      rows: [
        ["Played ✓", 38, 0.9, 1.1],
        ["Postponed ⚠️", 8, "0.0 ⚠️", "0.0 ⚠️"],
      ],
    },
    rootCause: "Postponed match rows count in totals but have 0 stats — removing them increases Messi's average goals per match from 0.65 to 0.9.",
  },

  music: {
    anomalyLabel: "Taylor Swift's stream count suddenly spiked to 900M in 3 rows — look at the status:",
    anomalyTable: {
      headers: ["Week", "Artist", "Streams (M)", "Chart Position", "Status"],
      rows: [
        ["2022-10-14", "Taylor Swift", 142, 1, "Active ✓"],
        ["2022-10-21", "Taylor Swift", 138, 1, "Active ✓"],
        ["2022-10-28", "Taylor Swift", 900, 1, "TEST ⚠️"],
        ["2022-11-04", "Taylor Swift", 900, 1, "TEST ⚠️"],
        ["2022-11-11", "Taylor Swift", 135, 2, "Active ✓"],
      ],
    },
    drillLabel: "Filter by status — TEST rows are QA entries with inflated values:",
    drillTable: {
      headers: ["Status", "Rows", "Avg Streams (M)", "% of Total"],
      rows: [
        ["Active ✓", 412, 89, "92%"],
        ["TEST ⚠️", 8, "900 ⚠️", "8% ⚠️"],
      ],
    },
    rootCause: "TEST-status rows are internal QA entries with placeholder data (900M streams). They inflate total stream counts by 12%. Filter to Active only.",
  },

  netflix: {
    anomalyLabel: "Stranger Things suddenly shows 1,200M hours watched in 2 rows — is that real?",
    anomalyTable: {
      headers: ["Week", "Show", "Hours (M)", "Rating", "Status"],
      rows: [
        ["2022-05-27", "Stranger Things", 335, 9.4, "Active ✓"],
        ["2022-06-03", "Stranger Things", 301, 9.4, "Active ✓"],
        ["2022-06-10", "Stranger Things", 1200, 9.4, "TEST ⚠️"],
        ["2022-06-17", "Stranger Things", 1200, 9.4, "TEST ⚠️"],
        ["2022-06-24", "Stranger Things", 289, 9.3, "Active ✓"],
      ],
    },
    drillLabel: "Filter by status — TEST rows are QA placeholders with fake numbers:",
    drillTable: {
      headers: ["Status", "Rows", "Avg Hours (M)", "Impact"],
      rows: [
        ["Active ✓", 338, 178, "Real data ✓"],
        ["TEST ⚠️", 12, "1200 ⚠️", "Inflates average ⚠️"],
      ],
    },
    rootCause: "TEST rows are internal QA entries — not real viewership. They push the average hours watched up by 31%. Filter status = 'Active' before any analysis.",
  },

  shopping: {
    anomalyLabel: "iPhone 15 Pro shows $50,000 revenue in 2 rows — way above normal:",
    anomalyTable: {
      headers: ["Week", "Product", "Revenue ($)", "Returns", "Status"],
      rows: [
        ["2023-09-22", "iPhone 15 Pro", 2100, 12, "Active ✓"],
        ["2023-09-29", "iPhone 15 Pro", 1980, 10, "Active ✓"],
        ["2023-10-06", "iPhone 15 Pro", 50000, 0, "TEST ⚠️"],
        ["2023-10-13", "iPhone 15 Pro", 50000, 0, "TEST ⚠️"],
        ["2023-10-20", "iPhone 15 Pro", 1750, 8, "Active ✓"],
      ],
    },
    drillLabel: "Filter by status — TEST rows are fake QA orders inflating revenue:",
    drillTable: {
      headers: ["Status", "Rows", "Avg Revenue ($)", "Returns"],
      rows: [
        ["Active ✓", 460, 1840, 9],
        ["TEST ⚠️", 20, "50000 ⚠️", "0 ⚠️"],
      ],
    },
    rootCause: "TEST orders use a placeholder $50,000 value and 0 returns. Leaving them in doubles the reported revenue. Filter to Active rows for accurate totals.",
  },

  retail: {
    anomalyLabel: "Standing Desk shows 9,999 units sold in 2 rows — 200× the weekly normal:",
    anomalyTable: {
      headers: ["Week", "Product", "Units Sold", "Margin ($)", "Status"],
      rows: [
        ["2024-01-05", "Standing Desk", 48, 720, "Active ✓"],
        ["2024-01-12", "Standing Desk", 51, 765, "Active ✓"],
        ["2024-01-19", "Standing Desk", 9999, 0, "TEST ⚠️"],
        ["2024-01-26", "Standing Desk", 9999, 0, "TEST ⚠️"],
        ["2024-02-02", "Standing Desk", 45, 675, "Active ✓"],
      ],
    },
    drillLabel: "Filter by status — TEST rows are inventory audit entries with dummy values:",
    drillTable: {
      headers: ["Status", "Rows", "Avg Units", "Avg Margin ($)"],
      rows: [
        ["Active ✓", 400, 52, 780],
        ["TEST ⚠️", 20, "9999 ⚠️", "0 ⚠️"],
      ],
    },
    rootCause: "TEST rows are inventory system audit entries — not real sales. They inflate unit count totals by 14×. Filter to status = 'Active' for accurate sales data.",
  },
};

const DEFAULT_DIAG = DIAGNOSTIC_DATA.baseball;

// Small reusable table renderer
function DataTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
            {headers.map(h => (
              <th key={h} className="px-3 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid #F3F4F6" }}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 font-mono" style={{ color: "#374151" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Screen4Diagnostic({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);
  const diag = DIAGNOSTIC_DATA[selectedFlavor] ?? DEFAULT_DIAG;

  const { step: revealStep, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    `Diagnostic analytics is like being a detective. You spot a number that doesn't look right — and then you keep asking why until you find the real reason.`,
    `Here's a real ${flavor.label} example. Look at this data. Something is clearly wrong — can you spot the anomaly?`,
    `Now we drill down. Instead of guessing, we compare the data by a different dimension. Watch — the pattern becomes obvious immediately.`,
    `There it is — the root cause. That is diagnostic analytics. You didn't guess. The data told you exactly what went wrong and why.`,
  ];

  return (
    <ModuleLayout
      moduleId={1}
      screenIndex={screenIndex}
      totalScreens={totalScreens}
      kaaraniText={KAARANI_TEXT}
      kaaraniHint={KAARANI_HINT}
      onPrev={onPrev}
      primaryAction={
        isComplete
          ? { label: "Next: Predictive Analytics →", onClick: onNext }
          : { label: "Next: Predictive Analytics →", onClick: onNext, disabled: true }
      }
    >
      <div className="max-w-2xl mx-auto">

        {/* Block 0 — heading */}
        <div className={blockClass(0)} style={{ marginBottom: "2rem" }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider text-white" style={{ backgroundColor: "#2563EB" }}>
              Type 2 of 4
            </span>
            <span className="px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider" style={{ backgroundColor: "#FFFFFF", color: "#2563EB", border: "1.5px solid #BFDBFE" }}>
              Diagnostic
            </span>
          </div>
          <h1 className="text-3xl font-black" style={{ color: "#111827" }}>Why did it happen?</h1>
          <p className="text-base mt-2" style={{ color: "#6B7280" }}>
            Something surprising shows up in your data. Diagnostic analytics is how you find the reason — by drilling into the data like a detective.
          </p>
        </div>

        {/* Block 1 — Step 1: The anomaly */}
        <div className={`${blockClass(1)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>1</div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Spot the anomaly</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>{diag.anomalyLabel}</p>
              </div>
            </div>
            <DataTable headers={diag.anomalyTable.headers} rows={diag.anomalyTable.rows} />
          </div>
        </div>

        {/* Block 2 — Step 2: Drill down */}
        <div className={`${blockClass(2)} mb-3`}>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>2</div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Drill down — ask why</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>{diag.drillLabel}</p>
              </div>
            </div>
            <DataTable headers={diag.drillTable.headers} rows={diag.drillTable.rows} />
          </div>
        </div>

        {/* Block 3 — Root cause + Power BI tools */}
        <div className={`${blockClass(3)} mb-6`}>
          <div className="rounded-2xl border overflow-hidden mb-3" style={{ borderColor: "#BFDBFE" }}>
            <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#EFF6FF", borderBottom: "1px solid #BFDBFE" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "#2563EB" }}>3</div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#111827" }}>Root cause found</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>The data told us exactly what went wrong</p>
              </div>
            </div>
            <div className="px-5 py-4" style={{ backgroundColor: "#FFFFFF" }}>
              <p className="text-sm font-semibold leading-relaxed" style={{ color: "#1E40AF" }}>
                🔍 {diag.rootCause}
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2563EB" }}>
              In Power B.I., you do this with…
            </p>
            <div className="flex flex-wrap gap-2">
              {["Drill-through pages", "Cross-filter on click", "Slicers & filters", "Decomposition tree", "Q&A visual"].map(item => (
                <span key={item} className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "#FFFFFF", color: "#2563EB", border: "1px solid #BFDBFE" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {!isComplete && (
          <button
            type="button"
            onClick={() => {
              unlockVoice();
              if (narrationScript[revealStep + 1]) speak(narrationScript[revealStep + 1]);
              next();
            }}
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
