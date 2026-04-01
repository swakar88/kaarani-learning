"use client";

import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader, PowerBICallout } from "@/components/ui/ScreenSection";
import { Placeholder } from "@/components/ui/Placeholder";
import { useBlockReveal } from "@/hooks/useBlockReveal";
import { useSpeechContext } from "@/context/SpeechContext";

const M_COLOR = "#2563EB";

const MAP_TYPES = [
  { label: "Map (Bubble)", icon: "", desc: "Circles on a map. Size = metric value. Best for city/point data.", fields: "Location + Size + Colour" },
  { label: "Filled Map", icon: "", desc: "Shaded regions. Best for country/state/district boundaries.", fields: "Location + Colour saturation" },
  { label: "Azure Maps", icon: "", desc: "Advanced mapping with layers, heatmaps, and custom tiles. Needs Azure account.", fields: "Location + Colour + Size + Tooltip" },
  { label: "Shape Map", icon: "", desc: "Custom geography shapes (e.g. sales territories, custom regions).", fields: "Location key + Colour saturation" },
];

export default function Screen6Maps({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor, unlockVoice } = useKaarani();
  const { speak } = useSpeechContext();
  const flavor = getFlavorById(selectedFlavor);

  const hasGeoStory = ["shopping", "retail"].includes(selectedFlavor);

  const { step, next, isComplete, blockClass, tapLabel } = useBlockReveal(hasGeoStory ? 4 : 3);

  const narrationScript = [
    "Maps are the most impactful visual for geographical data. When you have cities, states, or countries in your data, a map instantly shows patterns that tables can't.",
    `Power BI auto-geocodes city and country names — you just drag the location field on. Here's the ${flavor.label} data plotted geographically with bubble size showing ${flavor.metric1Label}.`,
    "Four map types: the Bubble Map for city-level point data, the Filled Map for shading regions, Azure Maps for advanced heatmaps, and Shape Map for custom territories.",
    hasGeoStory ? `For ${flavor.label}, maps are especially powerful — geographic patterns in your data tell a story that numbers alone can't convey. Always set the data category on your location column to help Power BI geocode correctly.` : "Always check geocoding accuracy — Power BI sometimes maps ambiguous city names to the wrong country. Add a Country column alongside your city column to help Power BI geocode correctly.",
  ];

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Maps are the most impactful visual for geographical data. When you have cities, states, or countries in your data, a map instantly shows patterns that tables can't. Power BI auto-geocodes city and country names — you just drag the location field on."
      kaaraniHint="Always check geocoding accuracy — Power BI sometimes maps ambiguous city names to the wrong country. Add a Country column alongside your city column to help Power BI geocode correctly."
      onPrev={onPrev}
      primaryAction={isComplete
        ? { label: "Slicers & filters →", onClick: onNext }
        : { label: "Slicers & filters →", onClick: onNext, disabled: true }}
    >
      <div className="max-w-2xl mx-auto">
        <div className={blockClass(0)}>
          <ScreenHeader moduleId={4} label="Module 4 · Screen 6" title="Maps & Geo visuals "
            subtitle="Location data becomes visual instantly. Power BI auto-geocodes city names." moduleColor={M_COLOR} />
        </div>

        {/* Map placeholder */}
        <div className={`${blockClass(1)} mb-5`}>
          <Placeholder type="report" label={`[Power BI Map: ${flavor.label} data plotted by geography — bubble size = ${flavor.metric1Label}]`} height="180px" />
        </div>

        {/* Map types */}
        <div className={`${blockClass(2)} grid grid-cols-2 gap-3 mb-5`}>
          {MAP_TYPES.map(m => (
            <div key={m.label} className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
              <p className="font-bold text-sm mt-1.5 mb-0.5" style={{ color: "#111827" }}>{m.label}</p>
              <p className="text-xs mb-1.5" style={{ color: "#6B7280" }}>{m.desc}</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFFFFF"}}>{m.fields}</span>
            </div>
          ))}
        </div>

        {hasGeoStory && (
          <div className={`${blockClass(3)} rounded-xl p-3 mb-4`} style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold mb-1" style={{ color: "#2563EB" }}>{flavor.label} map use case</p>
            <p className="text-xs" style={{ color: "#111827" }}>
              {selectedFlavor === "shopping" && "Filled map showing state-level revenue — colour intensity = total sales per state"}
              {selectedFlavor === "retail" && "Bubble map of store locations — size = units sold, colour = margin"}
            </p>
          </div>
        )}

        {!hasGeoStory && (
          <div className={`${blockClass(3)} mb-4`}>
            <PowerBICallout title="Map fields & settings"
              items={["Location: City or Country column", "Size: Any numeric measure", "Colour saturation: Another measure", "Enable Map in Tenant Settings (admin)", "Data category: set 'City', 'Country', 'Postcode' on location column"]} />
          </div>
        )}

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
