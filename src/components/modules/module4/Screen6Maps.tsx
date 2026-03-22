"use client";

import React from "react";
import { ModuleLayout } from "@/components/layout/ModuleLayout";
import { ScreenProps } from "@/types";
import { useKaarani } from "@/context/KaaraniContext";
import { getFlavorById } from "@/data/flavors";
import { ScreenHeader, PowerBICallout } from "@/components/ui/ScreenSection";
import { Placeholder } from "@/components/ui/Placeholder";

const M_COLOR = "#2563EB";

const MAP_TYPES = [
  { label: "Map (Bubble)", icon: "", desc: "Circles on a map. Size = metric value. Best for city/point data.", fields: "Location + Size + Colour" },
  { label: "Filled Map", icon: "", desc: "Shaded regions. Best for country/state/district boundaries.", fields: "Location + Colour saturation" },
  { label: "Azure Maps", icon: "", desc: "Advanced mapping with layers, heatmaps, and custom tiles. Needs Azure account.", fields: "Location + Colour + Size + Tooltip" },
  { label: "Shape Map", icon: "", desc: "Custom geography shapes (e.g. sales territories, cricket zones).", fields: "Location key + Colour saturation" },
];

export default function Screen6Maps({ onNext, onPrev, screenIndex, totalScreens }: ScreenProps) {
  const { selectedFlavor } = useKaarani();
  const flavor = getFlavorById(selectedFlavor);

  const hasGeoStory = ["travel", "ecommerce", "food", "healthcare"].includes(selectedFlavor);

  return (
    <ModuleLayout moduleId={4} screenIndex={screenIndex} totalScreens={totalScreens}
      kaaraniText="Maps are the most impactful visual for geographical data. When you have cities, states, or countries in your data, a map instantly shows patterns that tables can't. Power BI auto-geocodes city and country names — you just drag the location field on."
      kaaraniHint="Always check geocoding accuracy — Power BI sometimes maps ambiguous city names to the wrong country. Add a Country column alongside your city column to help Power BI geocode correctly."
      onPrev={onPrev}
      primaryAction={{ label: "Slicers & filters →", onClick: onNext }}
    >
      <div className="max-w-2xl mx-auto">
        <ScreenHeader moduleId={4} label="Module 4 · Screen 6" title="Maps & Geo visuals "
          subtitle="Location data becomes visual instantly. Power BI auto-geocodes city names." moduleColor={M_COLOR} />

        {/* Map placeholder */}
        <div className="mb-5">
          <Placeholder type="report" label={`[Power BI Map: ${flavor.label} data plotted by geography — bubble size = ${flavor.metric1Label}]`} height="180px" />
        </div>

        {/* Map types */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {MAP_TYPES.map(m => (
            <div key={m.label} className="rounded-xl p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}>
                            <p className="font-bold text-sm mt-1.5 mb-0.5" style={{ color: "#111827" }}>{m.label}</p>
              <p className="text-xs mb-1.5" style={{ color: "#6B7280" }}>{m.desc}</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFFFFF"}}>{m.fields}</span>
            </div>
          ))}
        </div>

        {hasGeoStory && (
          <div className="rounded-xl p-3 mb-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-bold mb-1" style={{ color: "#2563EB" }}>{flavor.label} map use case</p>
            <p className="text-xs" style={{ color: "#111827" }}>
              {selectedFlavor === "travel" && "Plot booking volumes by origin city — bubble map with city = Location, bookings = Size"}
              {selectedFlavor === "ecommerce" && "Filled map of India — state-level revenue shown as colour intensity"}
              {selectedFlavor === "food" && "Bubble map of restaurant locations — size = orders, colour = average rating"}
              {selectedFlavor === "healthcare" && "State-level filled map — admissions per lakh population as colour scale"}
            </p>
          </div>
        )}

        <PowerBICallout title="Map fields & settings"
          items={["Location: City or Country column", "Size: Any numeric measure", "Colour saturation: Another measure", "Enable Map in Tenant Settings (admin)", "Data category: set 'City', 'Country', 'Postcode' on location column"]} />
      </div>
    </ModuleLayout>
  );
}
