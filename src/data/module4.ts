// Module 4 — Visualise & Analyse
// Chart recommendations and examples per flavor

export interface ChartExample {
  primaryChart: string;
  primaryWhy: string;
  bestSlicers: string[];
  conditionalFormattingIdea: string;
  forecastField: string;
  aiInsight: string;
  kpiCards: { label: string; measure: string }[];
}

export const FLAVOR_CHART_EXAMPLES: Record<string, ChartExample> = {
  cricket: {
    primaryChart: "Clustered bar — runs by batsman",
    primaryWhy: "Comparing player totals is a classic ranking use case",
    bestSlicers: ["Season", "Team", "Venue", "Match Phase (powerplay/middle/death)"],
    conditionalFormattingIdea: "Colour batting average cells: red if < 20, amber 20–35, green > 35",
    forecastField: "Runs per match — forecast next 5 matches",
    aiInsight: "Key Influencers: 'What most influences a batsman scoring 50+'",
    kpiCards: [
      { label: "Total Runs", measure: "[Total Runs]" },
      { label: "Wickets", measure: "[Total Wickets]" },
      { label: "Strike Rate", measure: "[Strike Rate]" },
    ],
  },
  football: {
    primaryChart: "Scatter chart — xG vs actual goals per team",
    primaryWhy: "Reveals which teams over/under-perform their expected goals",
    bestSlicers: ["Season", "Club", "Home/Away", "Match result"],
    conditionalFormattingIdea: "Goals column: conditional icons —  if > xG,  if < xG",
    forecastField: "Goals per gameweek — forecast remainder of season",
    aiInsight: "Key Influencers: 'What increases probability of a win?'",
    kpiCards: [
      { label: "Total Goals", measure: "[Total Goals]" },
      { label: "Total xG", measure: "[Total xG]" },
      { label: "Conversion Rate", measure: "[Conversion Rate]" },
    ],
  },
  movies: {
    primaryChart: "100% stacked bar — revenue contribution by region",
    primaryWhy: "Shows which regions drive collection proportionally",
    bestSlicers: ["Genre", "Director", "Year", "OTT Platform"],
    conditionalFormattingIdea: "ROI column: gradient scale from red (negative) to green (>200%)",
    forecastField: "Weekly collections — forecast to end of theatrical run",
    aiInsight: "Smart Narrative: auto-summarise which genres outperformed",
    kpiCards: [
      { label: "Total Collection", measure: "[Total Collection]" },
      { label: "Avg ROI %", measure: "[ROI]" },
      { label: "Films Released", measure: "DISTINCTCOUNT(dim_Film[film_id])" },
    ],
  },
  ecommerce: {
    primaryChart: "Waterfall chart — revenue by category contribution",
    primaryWhy: "Shows which categories add to or subtract from total revenue",
    bestSlicers: ["Category", "Customer Segment", "Month", "Region"],
    conditionalFormattingIdea: "Return rate > 15%: red background on product table rows",
    forecastField: "Monthly revenue — forecast next 3 months",
    aiInsight: "Key Influencers: 'What drives high order value?'",
    kpiCards: [
      { label: "Revenue", measure: "[Revenue]" },
      { label: "Gross Margin", measure: "[Gross Margin]" },
      { label: "Return Rate", measure: "[Return Rate]" },
    ],
  },
  food: {
    primaryChart: "Line chart — avg delivery time by day of week + hour",
    primaryWhy: "Time patterns are the key driver of quality in delivery",
    bestSlicers: ["Restaurant", "Cuisine", "Area", "Day of Week"],
    conditionalFormattingIdea: "Rating cells: icon set — ⭐ ≥ 4.5,  3.5–4.5,  < 3.5",
    forecastField: "Orders per day — forecast peak days next month",
    aiInsight: "Q&A: 'Which restaurant has the best rating in Koramangala?'",
    kpiCards: [
      { label: "Total Orders", measure: "COUNTROWS(fact_Orders)" },
      { label: "Avg Delivery Time", measure: "[Avg Delivery Time]" },
      { label: "Avg Rating", measure: "[Avg Rating]" },
    ],
  },
  stocks: {
    primaryChart: "Line chart — closing price over time (multiple series)",
    primaryWhy: "Price movement is fundamentally a time series story",
    bestSlicers: ["Sector", "Stock Symbol", "Year", "Market cap tier"],
    conditionalFormattingIdea: "Daily return %: background rules — green positive, red negative",
    forecastField: "Volume trend — 30-day forecast",
    aiInsight: "Key Influencers: 'What sector characteristics predict high returns?'",
    kpiCards: [
      { label: "Return YTD %", measure: "[Return YTD %]" },
      { label: "52W High", measure: "[52W High]" },
      { label: "Avg Volume", measure: "[Avg Volume]" },
    ],
  },
  healthcare: {
    primaryChart: "Clustered column — admissions by department by month",
    primaryWhy: "Seasonal patterns and department comparisons are key management insights",
    bestSlicers: ["Department", "Ward Type", "Month", "Age Group"],
    conditionalFormattingIdea: "Readmission rate: data bars + red threshold line at 10%",
    forecastField: "Monthly admissions — flu season forecast",
    aiInsight: "Smart Narrative: auto-describe which departments have highest readmission",
    kpiCards: [
      { label: "Total Admissions", measure: "COUNTROWS(fact_Admissions)" },
      { label: "Avg LOS (days)", measure: "[Avg LOS]" },
      { label: "Readmission Rate", measure: "[Readmission Rate]" },
    ],
  },
  music: {
    primaryChart: "Area chart — weekly streams over time by artist",
    primaryWhy: "Streaming is a cumulative story; area charts show momentum",
    bestSlicers: ["Genre", "Artist", "Year", "Charting Status"],
    conditionalFormattingIdea: "Rank column: icon set —  top 10, ⬆ top 50, — outside 50",
    forecastField: "Weekly streams — forecast next 8 weeks for trending tracks",
    aiInsight: "Key Influencers: 'What makes a track chart for more than 10 weeks?'",
    kpiCards: [
      { label: "Total Streams (M)", measure: "[Total Streams]" },
      { label: "Avg Chart Position", measure: "[Avg Rank]" },
      { label: "Tracks On Chart", measure: "DISTINCTCOUNT(fact_Streams[track_id])" },
    ],
  },
  travel: {
    primaryChart: "Map visual — bookings by origin city (bubble size = volume)",
    primaryWhy: "Geographic distribution is the core story in travel data",
    bestSlicers: ["Airline", "Route", "Season", "Booking Class"],
    conditionalFormattingIdea: "Cancellation rate: colour scale from white to dark red",
    forecastField: "Monthly bookings — forecast peak holiday periods",
    aiInsight: "Q&A: 'Which route has the highest average fare in Q3?'",
    kpiCards: [
      { label: "Total Revenue", measure: "[Total Revenue]" },
      { label: "Cancellation Rate", measure: "[Cancellation Rate]" },
      { label: "Avg Lead Days", measure: "[Avg Lead Days]" },
    ],
  },
  gaming: {
    primaryChart: "Line chart — DAU over time with event annotations",
    primaryWhy: "Daily active users shows the health of the game in real time",
    bestSlicers: ["Match Type", "Device", "Region", "Day of Week"],
    conditionalFormattingIdea: "Churn risk flag: red icon on players with < 2 sessions in 14 days",
    forecastField: "DAU — forecast impact of next game update",
    aiInsight: "Key Influencers: 'What most predicts a player staying active?'",
    kpiCards: [
      { label: "DAU", measure: "[DAU]" },
      { label: "Avg Session Duration", measure: "[Avg Session Mins]" },
      { label: "Avg Kills/Session", measure: "[Avg Kills Per Session]" },
    ],
  },
};

export function getFlavorChartExample(flavorId: string): ChartExample {
  return FLAVOR_CHART_EXAMPLES[flavorId] ?? FLAVOR_CHART_EXAMPLES.cricket;
}
