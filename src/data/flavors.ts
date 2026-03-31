import { Flavor } from "@/types";

export const FLAVORS: Flavor[] = [
  {
    id: "baseball",
    label: "Baseball (MLB)",
    emoji: "⚾",
    description: "MLB player stats — hits, home runs & game performance",
    sampleMetric: "hits per game",
    dimension1Label: "Player",
    dimension2Label: "Team",
    metric1Label: "Hits",
    metric2Label: "Home Runs",
  },
  {
    id: "nfl",
    label: "American Football (NFL)",
    emoji: "🏈",
    description: "NFL quarterback stats — pass yards, touchdowns & more",
    sampleMetric: "passing yards",
    dimension1Label: "Player",
    dimension2Label: "Team",
    metric1Label: "Pass Yards",
    metric2Label: "Touchdowns",
  },
  {
    id: "soccer",
    label: "Soccer (MLS)",
    emoji: "⚽",
    description: "MLS player stats — goals, assists & match performance",
    sampleMetric: "goals per match",
    dimension1Label: "Player",
    dimension2Label: "Club",
    metric1Label: "Goals",
    metric2Label: "Assists",
  },
  {
    id: "music",
    label: "Music & Streaming",
    emoji: "🎵",
    description: "Spotify-style weekly streams, chart positions & artist trends",
    sampleMetric: "streams (millions)",
    dimension1Label: "Artist",
    dimension2Label: "Genre",
    metric1Label: "Streams (M)",
    metric2Label: "Chart Position",
  },
  {
    id: "netflix",
    label: "TV & Streaming",
    emoji: "📺",
    description: "Netflix-style weekly viewing hours, ratings & show trends",
    sampleMetric: "hours watched (millions)",
    dimension1Label: "Show",
    dimension2Label: "Genre",
    metric1Label: "Hours Watched (M)",
    metric2Label: "Rating",
  },
  {
    id: "shopping",
    label: "Online Shopping",
    emoji: "🛒",
    description: "E-commerce weekly revenue, returns & product performance",
    sampleMetric: "weekly revenue ($)",
    dimension1Label: "Product",
    dimension2Label: "Category",
    metric1Label: "Revenue ($)",
    metric2Label: "Returns",
  },
  {
    id: "retail",
    label: "Retail",
    emoji: "🏪",
    description: "Retail store weekly units sold, margins & department trends",
    sampleMetric: "units sold per week",
    dimension1Label: "Product",
    dimension2Label: "Department",
    metric1Label: "Units Sold",
    metric2Label: "Margin ($)",
  },
];

export const DEFAULT_FLAVOR_ID = "baseball";

export function getFlavorById(id: string): Flavor {
  return FLAVORS.find((f) => f.id === id) ?? FLAVORS[0];
}
