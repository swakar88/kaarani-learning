// Module 5 — Manage & Share
// Flavor-aware sharing, RLS, and governance scenarios

export interface SharingScenario {
  reportName: string;
  primaryAudience: string;
  workspaceName: string;
  rlsRoles: { role: string; filter: string; description: string }[];
  refreshSchedule: string;
  refreshReason: string;
  mobileKPIs: string[];
  fabricUseCase: string;
}

export const FLAVOR_SHARING_SCENARIOS: Record<string, SharingScenario> = {
  cricket: {
    reportName: "IPL Performance Dashboard",
    primaryAudience: "Team management, coaching staff, franchise owners",
    workspaceName: "IPL Analytics — Mumbai Indians",
    rlsRoles: [
      { role: "CoachingStaff", filter: "fact_Deliveries[batting_team] = 'Mumbai Indians' OR fact_Deliveries[bowling_team] = 'Mumbai Indians'", description: "Only see MI match data" },
      { role: "FranchiseOwner", filter: "(none)", description: "See all teams for benchmarking" },
      { role: "PlayerAgent", filter: "dim_Batsman[player_id] = USERPRINCIPALNAME()", description: "Each agent sees only their client's data" },
    ],
    refreshSchedule: "Daily at 6 AM during tournament season",
    refreshReason: "Match data uploaded to cloud after each day's play",
    mobileKPIs: ["Total Runs Today", "Wickets Taken", "Net Run Rate", "Points Table Position"],
    fabricUseCase: "Use Fabric Lakehouse to ingest live ball-by-ball data via API → Power BI reports update in near real-time during matches",
  },

  football: {
    reportName: "Premier League Analytics Hub",
    primaryAudience: "Head coach, scouts, club analysts, board",
    workspaceName: "Football Analytics — Scouting Team",
    rlsRoles: [
      { role: "HeadCoach", filter: "dim_Team[team_name] = LOOKUPVALUE(dim_Team[team_name], dim_Team[coach_email], USERPRINCIPALNAME())", description: "Coach sees only their own club's data" },
      { role: "Scout", filter: "(none — scouts need all clubs for comparison)", description: "Full access for talent identification" },
    ],
    refreshSchedule: "After every gameweek (every Saturday/Sunday night)",
    refreshReason: "FBref updates match stats within 2 hours of final whistle",
    mobileKPIs: ["Last Match Score", "xG For/Against", "League Position", "Form (last 5)"],
    fabricUseCase: "Fabric Event Streams to ingest live tracking data → Power BI Analytics pane updates mid-match for live tactical decisions",
  },

  movies: {
    reportName: "Box Office Intelligence Report",
    primaryAudience: "Producers, distributors, marketing heads, exhibitors",
    workspaceName: "Film Analytics — Production House",
    rlsRoles: [
      { role: "Producer", filter: "dim_Film[producer_id] = LOOKUPVALUE(dim_Film[producer_id], dim_Film[producer_email], USERPRINCIPALNAME())", description: "Producers only see their own films" },
      { role: "Distributor", filter: "dim_Region[region_name] IN {\"North\", \"South\"}", description: "Regional distributors see their territory" },
      { role: "Executive", filter: "(none)", description: "Full portfolio view" },
    ],
    refreshSchedule: "Daily at 8 AM (Monday–Sunday)",
    refreshReason: "Daily box office numbers published by distributors each morning",
    mobileKPIs: ["Today's Collection", "Total Till Date", "Rank in Week", "Days to Break Even"],
    fabricUseCase: "Fabric Pipelines to scrape daily box office data → auto-refresh dashboards → trigger Power Automate alerts when a film crosses ₹100Cr",
  },

  ecommerce: {
    reportName: "Sales & Operations Dashboard",
    primaryAudience: "Category managers, logistics team, CEO, investor board",
    workspaceName: "E-commerce Analytics — Operations",
    rlsRoles: [
      { role: "CategoryManager", filter: "dim_Product[category] = LOOKUPVALUE(dim_Product[category], dim_Product[manager_email], USERPRINCIPALNAME())", description: "Each manager sees their own category" },
      { role: "RegionalOps", filter: "fact_Orders[ship_state] IN LOOKUPVALUE(dim_Region[states], dim_Region[ops_email], USERPRINCIPALNAME())", description: "Ops teams see their states only" },
      { role: "CEO", filter: "(none)", description: "Full company view" },
    ],
    refreshSchedule: "Every 6 hours (4× daily)",
    refreshReason: "Orders stream in continuously; management needs near-real-time view",
    mobileKPIs: ["Revenue Today", "Orders Placed", "Pending Shipments", "Return Rate"],
    fabricUseCase: "Fabric Real-Time Analytics to stream order events → live dashboard with < 5 minute latency during sale events",
  },

  food: {
    reportName: "Restaurant Chain Operations Report",
    primaryAudience: "Restaurant managers, area managers, operations head",
    workspaceName: "Food Analytics — Restaurant Chain",
    rlsRoles: [
      { role: "RestaurantManager", filter: "dim_Restaurant[manager_email] = USERPRINCIPALNAME()", description: "Each manager sees only their outlet" },
      { role: "AreaManager", filter: "dim_Restaurant[area_manager_email] = USERPRINCIPALNAME()", description: "Area manager sees their cluster of outlets" },
      { role: "OpsHead", filter: "(none)", description: "Full chain view" },
    ],
    refreshSchedule: "Every 30 minutes during peak hours (12–2 PM, 7–10 PM)",
    refreshReason: "Delivery platform syncs order data in near-real-time",
    mobileKPIs: ["Orders This Hour", "Avg Delivery Time", "Live Rating", "Revenue Today"],
    fabricUseCase: "Fabric Event Streams for live order ingestion → outlet managers get real-time alerts when delivery time exceeds 40 mins",
  },

  stocks: {
    reportName: "Portfolio Performance Dashboard",
    primaryAudience: "Fund managers, analysts, compliance team, investors",
    workspaceName: "Equity Analytics — Research Desk",
    rlsRoles: [
      { role: "FundManager", filter: "dim_Portfolio[manager_id] = LOOKUPVALUE(dim_Portfolio[manager_id], dim_Portfolio[manager_email], USERPRINCIPALNAME())", description: "Managers see their own fund only" },
      { role: "Compliance", filter: "(none — compliance must see all)", description: "Full view for regulatory monitoring" },
      { role: "Investor", filter: "dim_Portfolio[investor_id] = LOOKUPVALUE(dim_Portfolio[investor_id], dim_Portfolio[investor_email], USERPRINCIPALNAME())", description: "Investors see their own holdings" },
    ],
    refreshSchedule: "Every 15 minutes during market hours (9:15 AM – 3:30 PM IST)",
    refreshReason: "NSE publishes OHLCV data every 15 minutes on trading days",
    mobileKPIs: ["Portfolio Value", "Day Return %", "Top Gainer", "Top Loser"],
    fabricUseCase: "Fabric Direct Lake for zero-copy NSE data ingestion → Power BI reports update in seconds after market data arrives",
  },

  healthcare: {
    reportName: "Hospital Quality & Performance Dashboard",
    primaryAudience: "Clinical directors, ward heads, hospital administrator, board",
    workspaceName: "Clinical Analytics — Hospital Group",
    rlsRoles: [
      { role: "WardHead", filter: "dim_Department[head_email] = USERPRINCIPALNAME()", description: "Department heads see their ward only" },
      { role: "ClinicalDirector", filter: "dim_Department[facility_id] = LOOKUPVALUE(dim_Department[facility_id], dim_Department[director_email], USERPRINCIPALNAME())", description: "Director sees their facility" },
      { role: "Administrator", filter: "(none)", description: "Full group view across all hospitals" },
    ],
    refreshSchedule: "Daily at midnight (HIPAA-compliant anonymised refresh)",
    refreshReason: "Daily patient records export from HIS system; anonymisation applied before load",
    mobileKPIs: ["Beds Available", "Admissions Today", "Avg ER Wait Time", "Discharge Target"],
    fabricUseCase: "Fabric Medallion Architecture (Bronze/Silver/Gold) for anonymisation pipeline → ensures HIPAA compliance before data reaches Power BI",
  },

  music: {
    reportName: "Artist & Catalogue Performance Report",
    primaryAudience: "A&R team, artist managers, label executives, royalty team",
    workspaceName: "Music Analytics — Label Dashboard",
    rlsRoles: [
      { role: "ArtistManager", filter: "dim_Artist[manager_email] = USERPRINCIPALNAME()", description: "Managers see their artist's streams only" },
      { role: "ARTeam", filter: "(none)", description: "Full catalogue view for discovery" },
      { role: "RoyaltyTeam", filter: "(none — needs full data for payments)", description: "Full access for royalty calculation" },
    ],
    refreshSchedule: "Weekly on Monday mornings (chart data updates weekly)",
    refreshReason: "Spotify and Apple Music chart data refreshes every Friday night",
    mobileKPIs: ["Streams This Week", "Chart Position", "New Listeners", "Royalties Estimate"],
    fabricUseCase: "Fabric Lakehouse to aggregate streams across Spotify, Apple Music, JioSaavn → unified artist analytics across platforms",
  },

  travel: {
    reportName: "Booking & Revenue Operations Dashboard",
    primaryAudience: "Revenue management, operations, airline partners, exec team",
    workspaceName: "Travel Analytics — Revenue Management",
    rlsRoles: [
      { role: "AirlinePartner", filter: "dim_Airline[partner_email] = USERPRINCIPALNAME()", description: "Each airline sees their routes only" },
      { role: "RevenueManager", filter: "(none)", description: "Full multi-airline view for pricing strategy" },
      { role: "OpsTeam", filter: "dim_Route[region] = LOOKUPVALUE(dim_Route[region], dim_Route[ops_email], USERPRINCIPALNAME())", description: "Regional ops see their routes" },
    ],
    refreshSchedule: "Every hour (booking engine data is near real-time)",
    refreshReason: "Bookings happen around the clock; revenue management needs hourly yield visibility",
    mobileKPIs: ["Bookings Today", "Revenue Today", "Load Factor", "Cancellations"],
    fabricUseCase: "Fabric Real-Time Hub to stream booking events → Power BI live dashboard for revenue team to adjust dynamic pricing in real-time",
  },

  gaming: {
    reportName: "Player Engagement & Monetisation Dashboard",
    primaryAudience: "Game designers, marketing, live ops team, C-suite",
    workspaceName: "Game Analytics — Live Ops",
    rlsRoles: [
      { role: "LiveOpsTeam", filter: "(none — needs full player data)", description: "Full access for event management" },
      { role: "RegionalMarketing", filter: "dim_Player[region] = LOOKUPVALUE(dim_Player[region], dim_Player[region_email], USERPRINCIPALNAME())", description: "Regional teams see their players" },
    ],
    refreshSchedule: "Every 5 minutes during peak play hours",
    refreshReason: "Player sessions stream continuously; live ops needs real-time visibility to detect crashes or abuse",
    mobileKPIs: ["DAU Right Now", "Matches Played Today", "Revenue This Hour", "Active Incidents"],
    fabricUseCase: "Fabric Event Streams for real-time session data → Power BI auto-pause alert fires when DAU drops > 20% in 10 mins (potential server issue)",
  },
};

export function getFlavorSharingScenario(flavorId: string): SharingScenario {
  return FLAVOR_SHARING_SCENARIOS[flavorId] ?? FLAVOR_SHARING_SCENARIOS.cricket;
}
