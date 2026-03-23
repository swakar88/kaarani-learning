"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader, PowerBICallout } from "@/components/ui/ScreenSection";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

// Simple SVG line chart
function LineChart({ hasForecast, hasArea }: { hasForecast?: boolean, hasArea?: boolean }) {
  const points = [30, 45, 38, 60, 52, 70, 65, 80];
  const forecast = [85, 90, 95];
  const w = 280, h = 100, pad = 20;
  const allPts = [...points, ...(hasForecast ? forecast : [])];
  const max = Math.max(...allPts);
  const xs = allPts.map((_, i) => pad + (i / (allPts.length - 1)) * (w - pad * 2));
  const ys = allPts.map(v => h - pad - ((v / max) * (h - pad * 2)));
  const histXs = xs.slice(0, points.length);
  const histYs = ys.slice(0, points.length);
  const foreXs = xs.slice(points.length - 1);
  const foreYs = ys.slice(points.length - 1);
  const toPath = (xArr: number[], yArr: number[]) => xArr.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${yArr[i]}`).join(" ");
  const areaPath = `${toPath(histXs, histYs)} L ${histXs[histXs.length - 1]} ${h - pad} L ${histXs[0]} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: "100px" }}>
      {hasArea && <path d={areaPath} fill="#2563EB22" />}
      <path d={toPath(histXs, histYs)} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
      {hasForecast && <path d={toPath(foreXs, foreYs)} fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="5,4" strokeLinecap="round" />}
      {hasForecast && <text x={foreXs[foreXs.length - 1] - 5} y={foreYs[foreYs.length - 1] - 5} fontSize="8" fill="#2563EB">forecast</text>}
    </svg>
  );
}

export default function Screen3LineAreaCharts({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(4);

  const narrationScript = [
    "Line charts are the language of time. Whenever your x-axis is a date or time period, a line chart is almost always the right choice.",
    "The slope of the line tells the story faster than any number. Upward means good growth. Downward means time to investigate. Three variants exist: basic line, area, and line with forecast.",
    `For your ${flavor.label} data, plot Total ${flavor.metric1Label} over time — by month and year. Add ${flavor.dimension2Label} as the legend to compare multiple lines on one chart.`,
    "Two advanced options: the combo chart overlays a line on bars — great for showing Revenue as bars alongside Growth percentage as a line. The secondary axis handles two very different scales.",
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Line charts are the language of time. Whenever your x-axis is a date or time period, a line chart is almost always the right choice. The slope of the line tells the story faster than any number. Upward = good growth. Downward = need to investigate."
      kaaraniHint="Use area charts to emphasise cumulative volume over time — like total streaming minutes or total revenue. Use line charts when you have multiple series to compare."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Pie, donut & cards →", onClick: onNext }
        : { label: "Pie, donut & cards →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={4} label="Module 4 · Screen 3" title="Line & Area charts "
            subtitle="The language of time. Use whenever x-axis = date." moduleColor={M_COLOR} />
        </div>

        <div className={`${blockClass(1)} grid grid-cols-3 gap-3 mb-5`}>
          {[
            { label: "Line chart", desc: "Multiple series, compare trends", el: <LineChart /> },
            { label: "Area chart", desc: "Emphasise volume over time", el: <LineChart hasArea /> },
            { label: "Line + Forecast", desc: "Add forecast in Analytics pane", el: <LineChart hasForecast /> },
          ].map(c => (
            <div key={c.label} className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <div className="rounded overflow-hidden mb-2">{c.el}</div>
              <p className="text-xs font-bold" style={{ color: "#111827" }}>{c.label}</p>
              <p className="text-[10px]" style={{ color: "#6B7280" }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className={`${blockClass(2)} rounded-2xl p-4 mb-4`} style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E8E8E8" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: M_COLOR }}>{flavor.label} use case</p>
          <p className="text-sm font-semibold" style={{ color: "#111827" }}>Total {flavor.metric1Label} over time — by month and year</p>
          <p className="text-xs mt-1" style={{ color: "#6B7280" }}>Add {flavor.dimension2Label} as the legend series to compare multiple lines.</p>
        </div>

        <div className={`${blockClass(3)} mb-4`}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Combo chart", desc: "Line + column on same chart. E.g. Revenue (bars) + Growth % (line)" },
              { label: "Line with secondary axis", desc: "Two different scales. E.g. Runs (left) + Strike Rate (right)" },
            ].map(v => (
              <div key={v.label} className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E8E8" }}>
                <p className="text-xs font-bold mb-0.5" style={{ color: M_COLOR }}>{v.label}</p>
                <p className="text-[10px]" style={{ color: "#6B7280" }}>{v.desc}</p>
              </div>
            ))}
          </div>
          <PowerBICallout title="Line/Area chart fields"
            items={["X-axis: Date column (from dim_Date)", "Y-axis: Your measure (e.g. Total Runs)", "Legend: Dimension for multiple lines (e.g. Team)", "Secondary Y-axis: A second measure at different scale"]} />
        </div>

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
