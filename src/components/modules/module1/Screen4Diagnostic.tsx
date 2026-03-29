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
  music: {
    anomalyLabel: "A new album's play rate collapsed after Track 3 — look at the drop:",
    anomalyTable: {
      headers: ["Track #", "Song", "Duration", "Play Rate"],
      rows: [
        ["1", "Opening Act", "3:12", "100%"],
        ["2", "Rising Up", "3:28", "94%"],
        ["3", "The Moment", "3:05", "87%"],
        ["4", "Deep Dive", "5:48", "19% ⚠️"],
        ["5", "Outro", "5:21", "17% ⚠️"],
      ],
    },
    drillLabel: "We drill down: compare track duration vs skip rate — the pattern appears:",
    drillTable: {
      headers: ["Track Length", "Avg Skip Rate", "Example"],
      rows: [
        ["Under 3:30", "8%", "Tracks 1–3"],
        ["3:30 – 5:00", "34%", "—"],
        ["Over 5:00 ⚠️", "76%", "Tracks 4–5"],
      ],
    },
    rootCause: "Tracks over 5 minutes skip at 76%. Track 4 is 40% longer than the platform's typical engagement threshold.",
  },
  cricket: {
    anomalyLabel: "Mumbai Indians lost 6 straight matches — the wins vs losses look very different:",
    anomalyTable: {
      headers: ["Match", "Result", "Powerplay Runs Conceded"],
      rows: [
        ["vs CSK", "Win ✓", 42],
        ["vs RCB", "Win ✓", 38],
        ["vs DC", "Loss ⚠️", 67],
        ["vs KKR", "Loss ⚠️", 71],
        ["vs SRH", "Loss ⚠️", 63],
      ],
    },
    drillLabel: "We filter by powerplay (overs 1–6) — the pattern is clear:",
    drillTable: {
      headers: ["Powerplay Runs", "Matches", "Win Rate"],
      rows: [
        ["Under 50", 8, "87% ✓"],
        ["50 – 59", 4, "50%"],
        ["60+ ⚠️", 6, "0% ⚠️"],
      ],
    },
    rootCause: "Every loss happened when the powerplay conceded 60+ runs. The bowling attack has no plan for aggressive openers.",
  },
  football: {
    anomalyLabel: "Arsenal lost 5 of 8 away games — when did they concede?",
    anomalyTable: {
      headers: ["Match", "Result", "Goals Conceded", "Minute"],
      rows: [
        ["vs City (A)", "Loss ⚠️", 2, "78, 89"],
        ["vs Liverpool (A)", "Loss ⚠️", 1, "83"],
        ["vs Chelsea (A)", "Draw", 1, "71"],
        ["vs Spurs (A)", "Win ✓", 0, "—"],
        ["vs Wolves (A)", "Loss ⚠️", 2, "76, 90+2"],
      ],
    },
    drillLabel: "We segment goals conceded by match minute — the late-game problem jumps out:",
    drillTable: {
      headers: ["Match Phase", "Goals Conceded", "% of Total"],
      rows: [
        ["0–60 min", 3, "18%"],
        ["61–75 min", 2, "12%"],
        ["76–90 min ⚠️", 12, "70% ⚠️"],
      ],
    },
    rootCause: "70% of conceded goals come in the final 15 minutes — a clear fitness or tactical breakdown late in games.",
  },
  movies: {
    anomalyLabel: "3 big-budget films flopped despite star casts — what do they share?",
    anomalyTable: {
      headers: ["Film", "Budget (₹Cr)", "Week 1 (₹Cr)", "ROI"],
      rows: [
        ["Film A", 180, 32, "−82% ⚠️"],
        ["Film B", 220, 41, "−81% ⚠️"],
        ["Film C", 150, 29, "−81% ⚠️"],
        ["Pathaan", 250, 300, "+20% ✓"],
      ],
    },
    drillLabel: "We split revenue by region — all 3 flops share one pattern:",
    drillTable: {
      headers: ["Region", "Pathaan Share", "Flop Films Share"],
      rows: [
        ["North India", "38%", "39%"],
        ["West India", "29%", "28%"],
        ["South India ⚠️", "26%", "8% ⚠️"],
        ["East India", "7%", "25%"],
      ],
    },
    rootCause: "All 3 flops earned less than 10% of revenue from South India. No regional marketing, no dubbed versions.",
  },
  ecommerce: {
    anomalyLabel: "Cart abandonment jumped 24% in October — something changed:",
    anomalyTable: {
      headers: ["Week", "Abandonment Rate", "Change"],
      rows: [
        ["Sep W3", "31%", "normal"],
        ["Sep W4", "32%", "normal"],
        ["Oct W1", "38%", "+6pts ⚠️"],
        ["Oct W2", "41%", "+9pts ⚠️"],
        ["Oct W3", "43%", "+11pts ⚠️"],
      ],
    },
    drillLabel: "We join cart data with inventory — abandoned carts vs in-stock items:",
    drillTable: {
      headers: ["Cart Status", "All Items In Stock", "≥1 Item Out of Stock"],
      rows: [
        ["Completed ✓", "74%", "26%"],
        ["Abandoned ⚠️", "18%", "82% ⚠️"],
      ],
    },
    rootCause: "82% of abandoned carts had at least one out-of-stock item at checkout. Inventory sync with the cart is broken.",
  },
  food: {
    anomalyLabel: "Ratings dropped 0.6 stars on weekends — what changed?",
    anomalyTable: {
      headers: ["Day", "Avg Delivery (min)", "Avg Rating"],
      rows: [
        ["Monday", 26, 4.4],
        ["Wednesday", 28, 4.3],
        ["Friday", 31, 4.1],
        ["Saturday ⚠️", 49, "3.7 ⚠️"],
        ["Sunday ⚠️", 52, "3.6 ⚠️"],
      ],
    },
    drillLabel: "We filter by time of day on weekends — the peak hours show the crisis:",
    drillTable: {
      headers: ["Weekend Time Slot", "Avg Delivery (min)", "Delivery Partners"],
      rows: [
        ["12–3 PM", 34, 18],
        ["3–6 PM", 38, 15],
        ["6–9 PM ⚠️", 58, "8 ⚠️"],
        ["9 PM+ ⚠️", 61, "6 ⚠️"],
      ],
    },
    rootCause: "Weekend evenings have 3× the orders but only 44% of the weekday delivery staff. The shortfall causes long delays and rating drops.",
  },
  stocks: {
    anomalyLabel: "IT sector fell 12% in Q2 — why when the broader market was up?",
    anomalyTable: {
      headers: ["Sector", "Q2 Return", "vs Nifty 50"],
      rows: [
        ["Banking", "+8.2%", "+5.1% ✓"],
        ["FMCG", "+5.4%", "+2.3% ✓"],
        ["IT ⚠️", "−12.1%", "−15.2% ⚠️"],
        ["Energy", "+11.3%", "+8.2% ✓"],
      ],
    },
    drillLabel: "We correlate IT returns with macroeconomic events — the link is clear:",
    drillTable: {
      headers: ["US Fed Rate Decision", "India IT Sector Return", "FII Flows"],
      rows: [
        ["Hold (no change)", "+4.1%", "Positive"],
        ["Hike +0.25%", "−5.8%", "Outflow"],
        ["Hike ≥0.5% ⚠️", "−12.4% ⚠️", "Heavy outflow"],
      ],
    },
    rootCause: "US rate hikes of 0.5%+ trigger foreign investor outflows from Indian IT stocks. Q2 had two consecutive hikes.",
  },
  healthcare: {
    anomalyLabel: "ER wait times increased 35% in January — something went wrong:",
    anomalyTable: {
      headers: ["Month", "Avg Wait (min)", "ER Admissions", "Night Staff"],
      rows: [
        ["October", 22, 820, 11],
        ["November", 24, 890, 10],
        ["December", 26, 960, 9],
        ["January ⚠️", 41, "1,240 ⚠️", "6 ⚠️"],
      ],
    },
    drillLabel: "We cross-reference shift rosters with admission volumes — the gap is stark:",
    drillTable: {
      headers: ["Night Staff Count", "Avg Wait (min)", "Admissions/Staff"],
      rows: [
        ["10–12 staff", 22, 81],
        ["7–9 staff", 29, 106],
        ["< 7 staff ⚠️", 43, "177 ⚠️"],
      ],
    },
    rootCause: "When night staff falls below 7, each person handles 2× the normal load. January had a flu spike AND 3 staff on leave simultaneously.",
  },
  travel: {
    anomalyLabel: "Goa hotel bookings dropped 32% vs last year — the weekly pattern tells a story:",
    anomalyTable: {
      headers: ["Week", "Bookings", "Cancellations", "Net"],
      rows: [
        ["Week 1 (Jun)", 420, 38, 382],
        ["Week 2 (Jun)", 390, 62, 328],
        ["Week 3 (Jun) ⚠️", 280, "189 ⚠️", "91 ⚠️"],
        ["Week 4 (Jun) ⚠️", 190, "162 ⚠️", "28 ⚠️"],
      ],
    },
    drillLabel: "We join booking dates with weather data — the cancellation trigger is obvious:",
    drillTable: {
      headers: ["Days to Arrival", "Cancellation Rate (Normal)", "Cancellation Rate (Monsoon early)"],
      rows: [
        ["14+ days ahead", "8%", "11%"],
        ["7–13 days", "14%", "22%"],
        ["< 3 days ⚠️", "19%", "67% ⚠️"],
      ],
    },
    rootCause: "Monsoon arrived 2 weeks early. 67% of bookings within 3 days of arrival were cancelled once the weather turned — most hotels had no early-warning refund policy.",
  },
  gaming: {
    anomalyLabel: "Churn jumped 18% after patch v2.5 — but not for all players equally:",
    anomalyTable: {
      headers: ["Player Level", "Pre-patch Churn", "Post-patch Churn", "Change"],
      rows: [
        ["Level 1–20", "12%", "13%", "+1%"],
        ["Level 21–50", "9%", "11%", "+2%"],
        ["Level 51–80 ⚠️", "7%", "24%", "+17% ⚠️"],
        ["Level 80+ ⚠️", "5%", "31%", "+26% ⚠️"],
      ],
    },
    drillLabel: "We segment churn by 'main weapon used' — veteran players share something:",
    drillTable: {
      headers: ["Main Weapon", "Churn Rate Post-patch", "Patch Change"],
      rows: [
        ["Shotgun", "9%", "No nerf"],
        ["Sniper", "11%", "Minor nerf"],
        ["M416 ⚠️", "34% ⚠️", "−22% damage nerf"],
        ["AKM ⚠️", "29% ⚠️", "−18% damage nerf"],
      ],
    },
    rootCause: "The two most popular weapons among high-level players (M416 and AKM) were nerfed heavily. Veterans feel their skill advantage was removed.",
  },
};

const DEFAULT_DIAG = DIAGNOSTIC_DATA.cricket;

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
