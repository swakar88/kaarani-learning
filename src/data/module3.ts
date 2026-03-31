// Module 3 — Model + DAX
// Flavor-aware star schema and DAX examples
// Column names match the practice CSV files in public/data/practice/

export interface StarSchemaExample {
  factTable: string;
  factDescription: string;
  factColumns: string[];
  dimensions: {
    name: string;
    icon: string;
    columns: string[];
    role: string;
  }[];
  measures: {
    name: string;
    dax: string;
    plain: string;
  }[];
  timeIntelligence: {
    measure: string;
    dax: string;
    plain: string;
  };
}

export const FLAVOR_STAR_SCHEMAS: Record<string, StarSchemaExample> = {
  baseball: {
    factTable: "fact_activity",
    factDescription: "One row per player per game — matches the baseball_model/fact_activity.csv you downloaded",
    factColumns: ["date", "entity_id", "category_id", "metric1", "metric2", "status"],
    dimensions: [
      { name: "dim_entities", icon: "👤", columns: ["entity_id", "entity_name"], role: "Player names (Ohtani, Judge, Messi…)" },
      { name: "dim_categories", icon: "🏟️", columns: ["category_id", "category_name"], role: "Team names (LA Dodgers, NY Yankees…)" },
      { name: "dim_Date", icon: "📅", columns: ["date", "year", "month", "day_of_week", "season"], role: "Date calendar — create in Power BI with CALENDAR()" },
    ],
    measures: [
      { name: "Total Hits", dax: "Total Hits = SUM(fact_activity[metric1])", plain: "Add up all hits across all games" },
      { name: "Total Home Runs", dax: "Total Home Runs = SUM(fact_activity[metric2])", plain: "Add up all home runs" },
      { name: "Avg Hits Per Game", dax: "Avg Hits = DIVIDE([Total Hits], COUNTROWS(fact_activity), 0)", plain: "Total hits divided by number of games played" },
      { name: "Home Run Rate", dax: "HR Rate = DIVIDE([Total Home Runs], [Total Hits], 0)", plain: "What fraction of hits went for a home run" },
      { name: "Games Played", dax: "Games Played = COUNTROWS(FILTER(fact_activity, fact_activity[status] = \"Played\"))", plain: "Count only rows where the game was actually played" },
    ],
    timeIntelligence: {
      measure: "Hits YTD",
      dax: "Hits YTD = TOTALYTD(SUM(fact_activity[metric1]), dim_Date[date])",
      plain: "Total hits from the start of the year to the selected date",
    },
  },

  nfl: {
    factTable: "fact_activity",
    factDescription: "One row per QB per game week — matches the nfl_model/fact_activity.csv you downloaded",
    factColumns: ["date", "entity_id", "category_id", "metric1", "metric2", "status"],
    dimensions: [
      { name: "dim_entities", icon: "👤", columns: ["entity_id", "entity_name"], role: "Player names (Mahomes, Allen, Jackson…)" },
      { name: "dim_categories", icon: "🏈", columns: ["category_id", "category_name"], role: "Team names (Kansas City Chiefs, Buffalo Bills…)" },
      { name: "dim_Date", icon: "📅", columns: ["date", "year", "month", "week_number", "season"], role: "Date calendar — create in Power BI with CALENDAR()" },
    ],
    measures: [
      { name: "Total Pass Yards", dax: "Total Pass Yards = SUM(fact_activity[metric1])", plain: "Add up all passing yards across all games" },
      { name: "Total Touchdowns", dax: "Total TDs = SUM(fact_activity[metric2])", plain: "Add up all touchdowns thrown" },
      { name: "Avg Yards Per Game", dax: "Avg Yards = DIVIDE([Total Pass Yards], COUNTROWS(fact_activity), 0)", plain: "Total passing yards divided by games played" },
      { name: "TD Rate Per 100 Yards", dax: "TD Rate = DIVIDE([Total TDs], [Total Pass Yards], 0) * 100", plain: "How many TDs are thrown per 100 yards passed" },
      { name: "Games Played", dax: "Games Played = COUNTROWS(FILTER(fact_activity, fact_activity[status] = \"Played\"))", plain: "Count only rows where the game was actually played" },
    ],
    timeIntelligence: {
      measure: "Pass Yards Last 4 Weeks",
      dax: "Pass Yards L4W = CALCULATE(SUM(fact_activity[metric1]), DATESINPERIOD(dim_Date[date], MAX(dim_Date[date]), -28, DAY))",
      plain: "Total passing yards in the last 4 game weeks",
    },
  },

  soccer: {
    factTable: "fact_activity",
    factDescription: "One row per player per match — matches the soccer_model/fact_activity.csv you downloaded",
    factColumns: ["date", "entity_id", "category_id", "metric1", "metric2", "status"],
    dimensions: [
      { name: "dim_entities", icon: "👤", columns: ["entity_id", "entity_name"], role: "Player names (Messi, Insigne, Puig…)" },
      { name: "dim_categories", icon: "⚽", columns: ["category_id", "category_name"], role: "Club names (Inter Miami, LA Galaxy…)" },
      { name: "dim_Date", icon: "📅", columns: ["date", "year", "month", "match_week", "season"], role: "Date calendar — create in Power BI with CALENDAR()" },
    ],
    measures: [
      { name: "Total Goals", dax: "Total Goals = SUM(fact_activity[metric1])", plain: "Add up all goals scored" },
      { name: "Total Assists", dax: "Total Assists = SUM(fact_activity[metric2])", plain: "Add up all assists" },
      { name: "Goal Contributions", dax: "Goal Contributions = [Total Goals] + [Total Assists]", plain: "Goals plus assists — measures overall attacking impact" },
      { name: "Goals Per Match", dax: "Goals Per Match = DIVIDE([Total Goals], COUNTROWS(fact_activity), 0)", plain: "Average goals per match played" },
      { name: "Matches Played", dax: "Matches Played = COUNTROWS(FILTER(fact_activity, fact_activity[status] = \"Played\"))", plain: "Count only rows where the match was actually played" },
    ],
    timeIntelligence: {
      measure: "Goals Last 30 Days",
      dax: "Goals L30D = CALCULATE(SUM(fact_activity[metric1]), DATESINPERIOD(dim_Date[date], MAX(dim_Date[date]), -30, DAY))",
      plain: "Goals scored in the last 30 days — useful for recent form tracking",
    },
  },

  music: {
    factTable: "fact_activity",
    factDescription: "One row per artist per week — matches the music_model/fact_activity.csv you downloaded",
    factColumns: ["date", "entity_id", "category_id", "metric1", "metric2", "status"],
    dimensions: [
      { name: "dim_entities", icon: "🎤", columns: ["entity_id", "entity_name"], role: "Artist names (Taylor Swift, Drake, Bad Bunny…)" },
      { name: "dim_categories", icon: "🎵", columns: ["category_id", "category_name"], role: "Genre names (Pop, Hip-Hop, Latin…)" },
      { name: "dim_Date", icon: "📅", columns: ["date", "year", "month", "week_number"], role: "Date calendar — create in Power BI with CALENDAR()" },
    ],
    measures: [
      { name: "Total Streams (M)", dax: "Total Streams = SUM(fact_activity[metric1])", plain: "Add up all streaming numbers (in millions)" },
      { name: "Best Chart Position", dax: "Best Position = MIN(fact_activity[metric2])", plain: "Lowest (best) chart position ever reached — lower is better" },
      { name: "Avg Chart Position", dax: "Avg Position = AVERAGE(fact_activity[metric2])", plain: "Average chart ranking across all charted weeks" },
      { name: "Weeks Charted", dax: "Weeks Charted = COUNTROWS(FILTER(fact_activity, fact_activity[status] = \"Active\"))", plain: "Number of weeks an artist appeared on the chart" },
    ],
    timeIntelligence: {
      measure: "Streams This Month vs Last",
      dax: "Streams MoM = [Total Streams] - CALCULATE([Total Streams], DATEADD(dim_Date[date], -1, MONTH))",
      plain: "Change in total streams compared to the previous calendar month",
    },
  },

  netflix: {
    factTable: "fact_activity",
    factDescription: "One row per show per week — matches the netflix_model/fact_activity.csv you downloaded",
    factColumns: ["date", "entity_id", "category_id", "metric1", "metric2", "status"],
    dimensions: [
      { name: "dim_entities", icon: "📺", columns: ["entity_id", "entity_name"], role: "Show names (Stranger Things, Wednesday, Squid Game…)" },
      { name: "dim_categories", icon: "🎬", columns: ["category_id", "category_name"], role: "Genre names (Sci-Fi, Drama, Comedy…)" },
      { name: "dim_Date", icon: "📅", columns: ["date", "year", "month", "week_number"], role: "Date calendar — create in Power BI with CALENDAR()" },
    ],
    measures: [
      { name: "Total Hours Watched (M)", dax: "Total Hours = SUM(fact_activity[metric1])", plain: "Add up all hours watched (in millions)" },
      { name: "Avg Rating", dax: "Avg Rating = AVERAGE(fact_activity[metric2])", plain: "Average audience rating across all weeks" },
      { name: "Peak Hours Week", dax: "Peak Hours = MAX(fact_activity[metric1])", plain: "The single best week by hours watched" },
      { name: "Weeks in Top 10", dax: "Weeks Active = COUNTROWS(FILTER(fact_activity, fact_activity[status] = \"Active\"))", plain: "Number of weeks a show was actively charting" },
    ],
    timeIntelligence: {
      measure: "Hours Watched YTD",
      dax: "Hours YTD = TOTALYTD(SUM(fact_activity[metric1]), dim_Date[date])",
      plain: "Total hours watched from the start of the year to the selected date",
    },
  },

  shopping: {
    factTable: "fact_activity",
    factDescription: "One row per product per week — matches the shopping_model/fact_activity.csv you downloaded",
    factColumns: ["date", "entity_id", "category_id", "metric1", "metric2", "status"],
    dimensions: [
      { name: "dim_entities", icon: "📦", columns: ["entity_id", "entity_name"], role: "Product names (iPhone 15 Pro, AirPods Pro 2…)" },
      { name: "dim_categories", icon: "🛒", columns: ["category_id", "category_name"], role: "Category names (Electronics, Accessories…)" },
      { name: "dim_Date", icon: "📅", columns: ["date", "year", "month", "week_number", "is_holiday_week"], role: "Date calendar — create in Power BI with CALENDAR()" },
    ],
    measures: [
      { name: "Total Revenue ($)", dax: "Total Revenue = SUM(fact_activity[metric1])", plain: "Add up all revenue dollars across all products and weeks" },
      { name: "Total Returns", dax: "Total Returns = SUM(fact_activity[metric2])", plain: "Add up all return counts" },
      { name: "Return Rate", dax: "Return Rate = DIVIDE([Total Returns], COUNTROWS(fact_activity), 0)", plain: "Average returns per week — lower is better" },
      { name: "Revenue Per Week", dax: "Avg Weekly Revenue = DIVIDE([Total Revenue], DISTINCTCOUNT(fact_activity[date]), 0)", plain: "Average weekly revenue across all selected products" },
    ],
    timeIntelligence: {
      measure: "Revenue vs Same Period Last Year",
      dax: "Revenue SPLY = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(dim_Date[date]))",
      plain: "Revenue in the same week/month last year — for year-over-year comparison",
    },
  },

  retail: {
    factTable: "fact_activity",
    factDescription: "One row per product per week — matches the retail_model/fact_activity.csv you downloaded",
    factColumns: ["date", "entity_id", "category_id", "metric1", "metric2", "status"],
    dimensions: [
      { name: "dim_entities", icon: "🏷️", columns: ["entity_id", "entity_name"], role: "Product names (Standing Desk, Yoga Mat, Winter Jacket…)" },
      { name: "dim_categories", icon: "🏪", columns: ["category_id", "category_name"], role: "Department names (Home Office, Fitness, Apparel…)" },
      { name: "dim_Date", icon: "📅", columns: ["date", "year", "month", "week_number", "season"], role: "Date calendar — create in Power BI with CALENDAR()" },
    ],
    measures: [
      { name: "Total Units Sold", dax: "Total Units = SUM(fact_activity[metric1])", plain: "Add up all units sold across all products and weeks" },
      { name: "Total Margin ($)", dax: "Total Margin = SUM(fact_activity[metric2])", plain: "Add up all gross margin dollars" },
      { name: "Margin Per Unit", dax: "Margin Per Unit = DIVIDE([Total Margin], [Total Units], 0)", plain: "Average margin earned per unit sold" },
      { name: "Units Per Week", dax: "Avg Weekly Units = DIVIDE([Total Units], DISTINCTCOUNT(fact_activity[date]), 0)", plain: "Average weekly units sold across selected products" },
    ],
    timeIntelligence: {
      measure: "Units Sold YTD",
      dax: "Units YTD = TOTALYTD(SUM(fact_activity[metric1]), dim_Date[date])",
      plain: "Total units sold from the start of the year to the selected date",
    },
  },
};

export function getFlavorStarSchema(flavorId: string): StarSchemaExample {
  return FLAVOR_STAR_SCHEMAS[flavorId] ?? FLAVOR_STAR_SCHEMAS.baseball;
}
