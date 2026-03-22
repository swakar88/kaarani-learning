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
  cricket: {
    name: "IPL Match Stats 2008–2023",
    description: "Ball-by-ball delivery data from all IPL seasons",
    fileType: "CSV",
    rows: "~220,000",
    source: "Kaggle — IPL Complete Dataset",
    columns: ["match_id", "season", "date", "batting_team", "bowling_team", "batsman", "bowler", "runs_batsman", "wicket_type"],
    issues: [
      { issue: "Some 'date' values stored as text (e.g. '15/03/2019')", fix: "Change Type → Date in Power Query" },
      { issue: "Blank 'wicket_type' when no wicket — loaded as null", fix: "Replace null → 'not out'" },
      { issue: "Team names inconsistent: 'MI', 'Mumbai Indians', 'Mumbai'", fix: "Replace Values to standardise" },
      { issue: "Duplicate match IDs in source export", fix: "Remove Rows → Remove Duplicates" },
    ],
    sampleRow: {
      match_id: "335987",
      date: "18-04-2008",
      batting_team: "Kolkata Knight Riders",
      batsman: "SC Ganguly",
      runs_batsman: "2",
      wicket_type: "",
    },
  },

  football: {
    name: "Premier League 2018–2023",
    description: "Match results, shots, goals, xG and player stats",
    fileType: "Excel (.xlsx)",
    rows: "~3,800",
    source: "FBref / understat export",
    columns: ["Date", "HomeTeam", "AwayTeam", "HomeGoals", "AwayGoals", "xG_Home", "xG_Away", "Referee"],
    issues: [
      { issue: "'Date' column in mixed formats (DD/MM and YYYY-MM-DD)", fix: "Transform → Parse as Date" },
      { issue: "xG values missing for early seasons (nulls)", fix: "Replace null → 0 for pre-2019 rows" },
      { issue: "Team names changed: 'Man Utd' vs 'Manchester United'", fix: "Replace Values → canonical names" },
      { issue: "Postponed matches have 'PP' in score columns", fix: "Filter Rows → Remove 'PP' rows" },
    ],
    sampleRow: {
      Date: "09/08/2019",
      HomeTeam: "Liverpool",
      AwayTeam: "Norwich City",
      HomeGoals: "4",
      AwayGoals: "1",
      xG_Home: "2.61",
    },
  },

  movies: {
    name: "Bollywood Box Office 2000–2023",
    description: "Release dates, budgets, box office earnings and OTT premiere data",
    fileType: "CSV",
    rows: "~2,400",
    source: "Box Office India / public scrape",
    columns: ["Title", "Release_Date", "Genre", "Director", "Stars", "Budget_Cr", "BoxOffice_Cr", "OTT_Platform"],
    issues: [
      { issue: "Budget values like '₹ 120 Cr' stored as text", fix: "Extract numbers → Change Type to Decimal" },
      { issue: "Multiple genres in one cell: 'Action, Drama'", fix: "Split Column by Delimiter → Unpivot" },
      { issue: "Missing OTT platform for theatrical-only films", fix: "Replace null → 'Theatrical Only'" },
      { issue: "Dates in multiple formats: '15-Jan-2020' and '2020/01/15'", fix: "Custom column with Date.FromText" },
    ],
    sampleRow: {
      Title: "3 Idiots",
      Release_Date: "25-Dec-2009",
      Genre: "Comedy, Drama",
      Budget_Cr: "₹ 55 Cr",
      BoxOffice_Cr: "392",
      OTT_Platform: "Netflix",
    },
  },

  ecommerce: {
    name: "Online Retail Transactions FY2023",
    description: "Order-level sales data with product, customer and returns",
    fileType: "Excel (.xlsx)",
    rows: "~50,000",
    source: "Internal export / Kaggle UCI Online Retail",
    columns: ["OrderID", "OrderDate", "CustomerID", "Product", "Category", "Quantity", "UnitPrice", "Country", "Returned"],
    issues: [
      { issue: "Negative quantities = returns — mixed with sales", fix: "Add custom column: Type = if Qty < 0 then 'Return' else 'Sale'" },
      { issue: "UnitPrice has null for some gift voucher rows", fix: "Replace null → 0" },
      { issue: "Duplicate OrderID rows for split shipments", fix: "Keep duplicates — they are valid; group by OrderID" },
      { issue: "Country listed as country code in some rows: 'IN' vs 'India'", fix: "Replace Values to unify country names" },
    ],
    sampleRow: {
      OrderID: "INV-10401",
      OrderDate: "2023-03-15",
      CustomerID: "C-14792",
      Product: "Wireless Earbuds",
      Quantity: "2",
      UnitPrice: "1299",
      Country: "India",
    },
  },

  food: {
    name: "Restaurant Orders & Delivery FY2023",
    description: "Order logs from a multi-outlet chain with delivery times and ratings",
    fileType: "CSV",
    rows: "~180,000",
    source: "Simulated POS export",
    columns: ["OrderID", "OrderTime", "DeliveryTime", "RestaurantID", "Cuisine", "Items", "OrderValue", "Rating", "DeliveryPartner"],
    issues: [
      { issue: "OrderTime and DeliveryTime in epoch timestamps (Unix)", fix: "DateTime.FromFileTime() to convert" },
      { issue: "Items is a comma-separated list in one column", fix: "Split Column → expand (or keep for text analysis)" },
      { issue: "Rating column has 'NR' where customer didn't rate", fix: "Replace 'NR' → null → excluded from averages" },
      { issue: "RestaurantID missing for delivery orders placed via aggregator", fix: "Map via aggregator export → Merge Queries" },
    ],
    sampleRow: {
      OrderID: "ORD-881042",
      OrderTime: "1711362000",
      Cuisine: "North Indian",
      OrderValue: "485",
      Rating: "4.2",
      DeliveryPartner: "Swiggy",
    },
  },

  stocks: {
    name: "NSE Daily OHLCV 2018–2023",
    description: "Daily open/high/low/close/volume for Nifty 50 stocks",
    fileType: "CSV (one per symbol)",
    rows: "~60,000 across all files",
    source: "NSE historical data download",
    columns: ["Symbol", "Date", "Open", "High", "Low", "Close", "Volume", "Turnover"],
    issues: [
      { issue: "One CSV per stock symbol — 50 separate files", fix: "Folder connector → Combine Files → Append" },
      { issue: "Dates as text in DD-MMM-YYYY format ('15-APR-2022')", fix: "Replace '-' then Date.FromText with culture" },
      { issue: "Volume = 0 on exchange holidays (rows present)", fix: "Filter Rows where Volume > 0" },
      { issue: "Corporate actions (splits) cause price discontinuity", fix: "Add 'Adjusted Close' column — mark for later" },
    ],
    sampleRow: {
      Symbol: "RELIANCE",
      Date: "15-APR-2022",
      Open: "2680.00",
      High: "2720.45",
      Close: "2701.30",
      Volume: "8241000",
    },
  },

  healthcare: {
    name: "Hospital Admissions & Discharge FY2023",
    description: "Patient admission records with diagnosis, department and outcomes",
    fileType: "Excel (.xlsx)",
    rows: "~14,000",
    source: "Anonymised hospital system export",
    columns: ["PatientID", "AdmissionDate", "DischargeDate", "Department", "Diagnosis_ICD", "LOS_Days", "Readmitted_30d", "Ward"],
    issues: [
      { issue: "Diagnosis codes in ICD-10 format — cryptic without lookup", fix: "Merge Queries with ICD-10 reference table" },
      { issue: "LOS_Days calculated incorrectly for cross-midnight admits", fix: "Custom column: Duration.Days([Discharge]-[Admit])" },
      { issue: "PatientIDs re-used across years — not globally unique", fix: "Add custom key: PatientID & Year" },
      { issue: "Readmitted_30d column has Y/N/blank — blanks = unknown", fix: "Replace blank → null — don't treat as 'No'" },
    ],
    sampleRow: {
      PatientID: "P-04921",
      AdmissionDate: "2023-01-08",
      Department: "Cardiology",
      Diagnosis_ICD: "I21.0",
      LOS_Days: "4",
      Readmitted_30d: "N",
    },
  },

  music: {
    name: "Spotify India Charts 2019–2023",
    description: "Weekly top 200 tracks with streams, artist and genre data",
    fileType: "CSV",
    rows: "~52,000",
    source: "Spotify Charts export / Kaggle",
    columns: ["Week", "Rank", "Track", "Artist", "Streams", "Peak_Rank", "Weeks_On_Chart", "Genre"],
    issues: [
      { issue: "Genre field blank for many tracks — not in source data", fix: "Replace null → 'Unclassified'; merge with genre lookup later" },
      { issue: "Streams formatted with commas: '1,234,567'", fix: "Replace ',' → '' then Change Type to Whole Number" },
      { issue: "Same track appears with slightly different names: 'Kesariya' vs 'Kesariya (From Brahmastra)'", fix: "Clean using Text.Trim and fuzzy merge later" },
      { issue: "Week column is date range text: '2022-10-14 - 2022-10-20'", fix: "Split Column by ' - ' → take first date → Change Type" },
    ],
    sampleRow: {
      Week: "2023-01-06 - 2023-01-12",
      Rank: "1",
      Track: "Kesariya",
      Artist: "Arijit Singh",
      Streams: "9,821,440",
      Genre: "",
    },
  },

  travel: {
    name: "Flight Bookings India 2022–2023",
    description: "Domestic flight bookings with routes, fares and cancellations",
    fileType: "CSV",
    rows: "~95,000",
    source: "Simulated booking engine export",
    columns: ["BookingID", "BookingDate", "FlightDate", "Route", "Airline", "Class", "Fare", "Cancelled", "LeadDays"],
    issues: [
      { issue: "Route stored as 'BLR-DEL' — need separate Origin/Dest columns", fix: "Split Column by Delimiter '-'" },
      { issue: "Fare includes taxes in some rows, excludes in others", fix: "Flag column: 'TaxIncluded' based on fare range threshold" },
      { issue: "Cancelled = 1/0 and also True/False in different exports", fix: "Replace 0/'False' → 'No', 1/'True' → 'Yes'" },
      { issue: "LeadDays is negative for group bookings made day-of", fix: "Replace negative values → 0" },
    ],
    sampleRow: {
      BookingID: "BK-552910",
      BookingDate: "2023-01-20",
      FlightDate: "2023-02-04",
      Route: "BLR-DEL",
      Airline: "IndiGo",
      Fare: "4299",
      Cancelled: "0",
      LeadDays: "15",
    },
  },

  gaming: {
    name: "BGMI Player Sessions 2022–2023",
    description: "Player session logs with match type, duration, kills and earnings",
    fileType: "JSON → CSV",
    rows: "~500,000",
    source: "Game analytics pipeline export",
    columns: ["PlayerID", "SessionStart", "SessionEnd", "MatchType", "Kills", "Position", "InGameEarnings", "Device"],
    issues: [
      { issue: "SessionStart/End in UTC — India is UTC+5:30", fix: "DateTimeZone.ToLocal() or add 5h30m offset" },
      { issue: "InGameEarnings is null for spectator sessions", fix: "Replace null → 0 for numeric calculations" },
      { issue: "Kills column has '-1' for 'unknown' (data loss)", fix: "Replace -1 → null — don't average in unknowns" },
      { issue: "Device column has 200+ raw device model strings", fix: "Group into: iPhone, Android, Tablet using Text.Contains" },
    ],
    sampleRow: {
      PlayerID: "PLR-8812041",
      SessionStart: "2023-03-15T14:32:00Z",
      MatchType: "Squad",
      Kills: "4",
      Position: "3",
      InGameEarnings: "1850",
      Device: "samsung SM-G998B",
    },
  },
};

export function getFlavorDataset(flavorId: string): FlavorDataset {
  return FLAVOR_DATASETS[flavorId] ?? FLAVOR_DATASETS.cricket;
}
