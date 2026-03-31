// Module 2 — Prepare & Clean Data
// Flavor-aware dataset descriptions and common data quality issues

export interface FlavorDataset {
  name: string;
  description: string;
  fileType: string;
  rows: string;
  source: string;
  columns: string[];
  issues: { issue: string; fix: string }[];
  sampleRow: Record<string, string>;
}

export const FLAVOR_DATASETS: Record<string, FlavorDataset> = {
  baseball: {
    name: "MLB Player Game Stats 2022–2024",
    description: "One row per player per game — hits, home runs, and game status",
    fileType: "CSV",
    rows: "~360",
    source: "Kaarani sample dataset",
    columns: ["date", "player_name", "team_name", "hits", "home_runs", "status", "notes"],
    issues: [
      { issue: "'hits' column contains text like '3 hits' in some rows (wrong data type)", fix: "Transform → Replace Values to remove ' hits', then Change Type → Whole Number" },
      { issue: "~8% of 'home_runs' rows are blank/null", fix: "Replace null → 0 for numeric calculations" },
      { issue: "4 exact duplicate rows in the export", fix: "Remove Rows → Remove Duplicates" },
      { issue: "Rows with status = 'Postponed' skew averages", fix: "Filter Rows → Keep where status = 'Played'" },
    ],
    sampleRow: {
      date: "2022-04-07",
      player_name: "Aaron Judge",
      team_name: "NY Yankees",
      hits: "5",
      home_runs: "1",
      status: "Played",
    },
  },

  nfl: {
    name: "NFL Quarterback Stats 2022–2024",
    description: "One row per QB per game week — passing yards and touchdowns",
    fileType: "CSV",
    rows: "~280",
    source: "Kaarani sample dataset",
    columns: ["date", "player_name", "team_name", "pass_yards", "touchdowns", "status", "notes"],
    issues: [
      { issue: "'pass_yards' stored as text in some rows (e.g. '312 yds')", fix: "Replace Values to strip ' yds', then Change Type → Whole Number" },
      { issue: "~8% of 'touchdowns' rows are blank/null", fix: "Replace null → 0" },
      { issue: "4 exact duplicate rows in the export", fix: "Remove Rows → Remove Duplicates" },
      { issue: "Bye-week rows with status = 'Bye' included in averages", fix: "Filter Rows → Keep where status = 'Played'" },
    ],
    sampleRow: {
      date: "2022-09-08",
      player_name: "Patrick Mahomes",
      team_name: "Kansas City Chiefs",
      pass_yards: "360",
      touchdowns: "5",
      status: "Played",
    },
  },

  soccer: {
    name: "MLS Player Match Stats 2023–2024",
    description: "One row per player per match — goals and assists",
    fileType: "CSV",
    rows: "~200",
    source: "Kaarani sample dataset",
    columns: ["date", "player_name", "club_name", "goals", "assists", "status", "notes"],
    issues: [
      { issue: "'goals' column contains text like '2 goals' in some rows", fix: "Replace Values to strip ' goals', then Change Type → Whole Number" },
      { issue: "~8% of 'assists' rows are blank/null", fix: "Replace null → 0" },
      { issue: "4 exact duplicate rows in the export", fix: "Remove Rows → Remove Duplicates" },
      { issue: "Rows with status = 'Postponed' should be excluded", fix: "Filter Rows → Keep where status = 'Played'" },
    ],
    sampleRow: {
      date: "2023-03-04",
      player_name: "Lionel Messi",
      club_name: "Inter Miami",
      goals: "2",
      assists: "1",
      status: "Played",
    },
  },

  music: {
    name: "Music Streaming Weekly Charts 2022–2024",
    description: "One row per artist per week — streams and chart position",
    fileType: "CSV",
    rows: "~420",
    source: "Kaarani sample dataset",
    columns: ["week_start", "artist_name", "genre_name", "streams_millions", "chart_position", "status", "notes"],
    issues: [
      { issue: "'streams_millions' stored as text like '142.3 M' in some rows", fix: "Replace ' M' → '', then Change Type → Decimal Number" },
      { issue: "~8% of 'chart_position' rows are null (charted but position unranked)", fix: "Replace null → 999 as a sentinel, or exclude from ranking analysis" },
      { issue: "4 exact duplicate rows in the export", fix: "Remove Rows → Remove Duplicates" },
      { issue: "Rows with status = 'TEST' are internal QA rows", fix: "Filter Rows → Remove where status = 'TEST'" },
    ],
    sampleRow: {
      week_start: "2022-10-21",
      artist_name: "Taylor Swift",
      genre_name: "Pop",
      streams_millions: "142.3",
      chart_position: "1",
      status: "Active",
    },
  },

  netflix: {
    name: "TV Streaming Weekly Viewership 2022–2024",
    description: "One row per show per week — hours watched and rating",
    fileType: "CSV",
    rows: "~350",
    source: "Kaarani sample dataset",
    columns: ["week_start", "show_name", "genre_name", "hours_watched_millions", "rating", "status", "notes"],
    issues: [
      { issue: "'hours_watched_millions' stored as text like '134.5 M' in some rows", fix: "Replace ' M' → '', then Change Type → Decimal Number" },
      { issue: "~8% of 'rating' rows are null (new shows with no rating yet)", fix: "Replace null → 0 or exclude from average rating calculations" },
      { issue: "4 exact duplicate rows in the export", fix: "Remove Rows → Remove Duplicates" },
      { issue: "Rows with status = 'TEST' are internal QA rows", fix: "Filter Rows → Remove where status = 'TEST'" },
    ],
    sampleRow: {
      week_start: "2022-05-27",
      show_name: "Stranger Things",
      genre_name: "Sci-Fi",
      hours_watched_millions: "335.0",
      rating: "9.4",
      status: "Active",
    },
  },

  shopping: {
    name: "Online Shopping Weekly Sales 2022–2024",
    description: "One row per product per week — revenue and returns",
    fileType: "CSV",
    rows: "~480",
    source: "Kaarani sample dataset",
    columns: ["week_start", "product_name", "category_name", "revenue_dollars", "returns", "status", "notes"],
    issues: [
      { issue: "'revenue_dollars' stored as text like '$2,100' in some rows", fix: "Replace '$' and ',' → '', then Change Type → Decimal Number" },
      { issue: "~8% of 'returns' rows are blank/null", fix: "Replace null → 0" },
      { issue: "4 exact duplicate rows in the export", fix: "Remove Rows → Remove Duplicates" },
      { issue: "Rows with status = 'TEST' are internal QA rows — not real sales", fix: "Filter Rows → Remove where status = 'TEST'" },
    ],
    sampleRow: {
      week_start: "2023-09-22",
      product_name: "iPhone 15 Pro",
      category_name: "Electronics",
      revenue_dollars: "2100.00",
      returns: "12",
      status: "Active",
    },
  },

  retail: {
    name: "Retail Store Weekly Sales 2022–2024",
    description: "One row per product per week — units sold and margin",
    fileType: "CSV",
    rows: "~420",
    source: "Kaarani sample dataset",
    columns: ["week_start", "product_name", "department_name", "units_sold", "margin_dollars", "status", "notes"],
    issues: [
      { issue: "'units_sold' stored as text like '120 units' in some rows", fix: "Replace ' units' → '', then Change Type → Whole Number" },
      { issue: "~8% of 'margin_dollars' rows are blank/null", fix: "Replace null → 0" },
      { issue: "4 exact duplicate rows in the export", fix: "Remove Rows → Remove Duplicates" },
      { issue: "Rows with status = 'TEST' are internal QA rows", fix: "Filter Rows → Remove where status = 'TEST'" },
    ],
    sampleRow: {
      week_start: "2024-01-05",
      product_name: "Standing Desk",
      department_name: "Home Office",
      units_sold: "48",
      margin_dollars: "720.00",
      status: "Active",
    },
  },
};

export function getFlavorDataset(flavorId: string): FlavorDataset {
  return FLAVOR_DATASETS[flavorId] ?? FLAVOR_DATASETS.baseball;
}
