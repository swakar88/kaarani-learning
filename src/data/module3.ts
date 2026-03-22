// Module 3 — Model + DAX
// Flavor-aware star schema and DAX examples

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
  cricket: {
    factTable: "fact_Deliveries",
    factDescription: "One row per delivery bowled in every IPL match",
    factColumns: ["delivery_id", "match_id", "over", "ball", "runs_batsman", "runs_extras", "is_wicket"],
    dimensions: [
      { name: "dim_Match", icon: "", columns: ["match_id", "date_key", "venue", "season"], role: "Links to date calendar" },
      { name: "dim_Batsman", icon: "", columns: ["player_id", "player_name", "country", "batting_style"], role: "Who hit the ball" },
      { name: "dim_Bowler", icon: "", columns: ["player_id", "player_name", "country", "bowling_style"], role: "Who bowled it" },
      { name: "dim_Team", icon: "", columns: ["team_id", "team_name", "city", "home_ground"], role: "Batting and bowling teams" },
      { name: "dim_Date", icon: "", columns: ["date_key", "date", "year", "month", "season"], role: "Date calendar table" },
    ],
    measures: [
      { name: "Total Runs", dax: "Total Runs = SUM(fact_Deliveries[runs_batsman])", plain: "Add up all the runs scored by batsmen" },
      { name: "Total Wickets", dax: "Total Wickets = SUM(fact_Deliveries[is_wicket])", plain: "Count all deliveries where a wicket fell" },
      { name: "Strike Rate", dax: "Strike Rate = DIVIDE([Total Runs], [Balls Faced], 0) * 100", plain: "Runs per 100 balls faced" },
      { name: "Economy Rate", dax: "Economy Rate = DIVIDE([Total Runs], [Overs Bowled], 0)", plain: "Runs conceded per over by the bowler" },
      { name: "Average", dax: "Batting Average = DIVIDE([Total Runs], [Total Wickets], 0)", plain: "Runs scored divided by number of times dismissed" },
    ],
    timeIntelligence: {
      measure: "Runs YTD",
      dax: "Runs YTD = TOTALYTD(SUM(fact_Deliveries[runs_batsman]), dim_Date[date])",
      plain: "Total runs scored from the start of the year up to the selected date",
    },
  },

  football: {
    factTable: "fact_Shots",
    factDescription: "One row per shot taken in every Premier League match",
    factColumns: ["shot_id", "match_id", "minute", "player_id", "team_id", "xG", "result", "location_x", "location_y"],
    dimensions: [
      { name: "dim_Match", icon: "", columns: ["match_id", "date_key", "home_team_id", "away_team_id", "season"], role: "Match context" },
      { name: "dim_Player", icon: "", columns: ["player_id", "name", "position", "nationality"], role: "The shooter" },
      { name: "dim_Team", icon: "", columns: ["team_id", "team_name", "city", "league_position"], role: "Club context" },
      { name: "dim_Date", icon: "", columns: ["date_key", "date", "gameweek", "season"], role: "Time dimension" },
    ],
    measures: [
      { name: "Total Goals", dax: "Total Goals = COUNTROWS(FILTER(fact_Shots, fact_Shots[result] = \"Goal\"))", plain: "Count shots where result was a goal" },
      { name: "Total xG", dax: "Total xG = SUM(fact_Shots[xG])", plain: "Add up all expected goals values" },
      { name: "Conversion Rate", dax: "Conversion Rate = DIVIDE([Total Goals], COUNTROWS(fact_Shots), 0)", plain: "What fraction of shots became goals" },
      { name: "Goals vs xG", dax: "Goals vs xG = [Total Goals] - [Total xG]", plain: "Are we outperforming or underperforming expectations?" },
    ],
    timeIntelligence: {
      measure: "Goals Last 5 GW",
      dax: "Goals Last 5 GW = CALCULATE([Total Goals], DATESINPERIOD(dim_Date[date], MAX(dim_Date[date]), -35, DAY))",
      plain: "Goals scored in the last 5 gameweeks (35 days)",
    },
  },

  movies: {
    factTable: "fact_BoxOffice",
    factDescription: "One row per film's weekly box office collection per region",
    factColumns: ["record_id", "film_id", "date_key", "region_id", "week_number", "weekly_collection", "screens"],
    dimensions: [
      { name: "dim_Film", icon: "", columns: ["film_id", "title", "genre", "director_id", "budget_cr", "release_date_key"], role: "Film details" },
      { name: "dim_Director", icon: "", columns: ["director_id", "name", "num_films", "avg_rating"], role: "Director lookup" },
      { name: "dim_Region", icon: "", columns: ["region_id", "region_name", "country", "language"], role: "Where it was collected" },
      { name: "dim_Date", icon: "", columns: ["date_key", "date", "week", "month", "quarter", "year"], role: "Weekly collections over time" },
    ],
    measures: [
      { name: "Total Collection", dax: "Total Collection = SUM(fact_BoxOffice[weekly_collection])", plain: "Add up all box office collections" },
      { name: "ROI", dax: "ROI % = DIVIDE([Total Collection] - MAX(dim_Film[budget_cr]), MAX(dim_Film[budget_cr]), 0) * 100", plain: "How much profit relative to budget" },
      { name: "Avg Collection Per Screen", dax: "Avg Per Screen = DIVIDE([Total Collection], SUM(fact_BoxOffice[screens]), 0)", plain: "Revenue generated per screen on average" },
    ],
    timeIntelligence: {
      measure: "Collection vs Same Week LY",
      dax: "Collection SPŁY = CALCULATE([Total Collection], SAMEPERIODLASTYEAR(dim_Date[date]))",
      plain: "Box office collection in the same week of last year",
    },
  },

  ecommerce: {
    factTable: "fact_Orders",
    factDescription: "One row per order line item",
    factColumns: ["line_id", "order_id", "date_key", "customer_id", "product_id", "quantity", "unit_price", "discount", "is_return"],
    dimensions: [
      { name: "dim_Product", icon: "", columns: ["product_id", "product_name", "category", "sub_category", "cost_price"], role: "What was ordered" },
      { name: "dim_Customer", icon: "", columns: ["customer_id", "segment", "city", "state", "first_order_date"], role: "Who ordered" },
      { name: "dim_Date", icon: "", columns: ["date_key", "date", "weekday", "month", "quarter", "is_festival"], role: "When ordered" },
    ],
    measures: [
      { name: "Revenue", dax: "Revenue = SUMX(fact_Orders, fact_Orders[quantity] * fact_Orders[unit_price] * (1 - fact_Orders[discount]))", plain: "Quantity × Price × (1 − Discount) for each line" },
      { name: "Gross Margin", dax: "Gross Margin = [Revenue] - SUMX(fact_Orders, RELATED(dim_Product[cost_price]) * fact_Orders[quantity])", plain: "Revenue minus cost of goods sold" },
      { name: "Return Rate", dax: "Return Rate = DIVIDE(COUNTROWS(FILTER(fact_Orders, fact_Orders[is_return] = TRUE)), COUNTROWS(fact_Orders), 0)", plain: "What fraction of orders were returned" },
    ],
    timeIntelligence: {
      measure: "Revenue MoM Growth",
      dax: "Revenue MoM % = DIVIDE([Revenue] - CALCULATE([Revenue], DATEADD(dim_Date[date], -1, MONTH)), CALCULATE([Revenue], DATEADD(dim_Date[date], -1, MONTH)), 0)",
      plain: "Percentage change in revenue vs the previous month",
    },
  },

  food: {
    factTable: "fact_Orders",
    factDescription: "One row per food delivery order",
    factColumns: ["order_id", "date_key", "restaurant_id", "customer_id", "order_value", "delivery_mins", "rating"],
    dimensions: [
      { name: "dim_Restaurant", icon: "", columns: ["restaurant_id", "name", "cuisine", "city", "area", "avg_prep_time"], role: "The restaurant" },
      { name: "dim_Customer", icon: "", columns: ["customer_id", "city", "age_group", "loyalty_tier"], role: "Who ordered" },
      { name: "dim_Date", icon: "", columns: ["date_key", "date", "day_of_week", "hour_slot", "is_weekend"], role: "When and what time" },
    ],
    measures: [
      { name: "Avg Delivery Time", dax: "Avg Delivery Time = AVERAGE(fact_Orders[delivery_mins])", plain: "Average minutes from order to doorstep" },
      { name: "Avg Rating", dax: "Avg Rating = AVERAGE(fact_Orders[rating])", plain: "Average customer rating across all orders" },
      { name: "Orders on Time", dax: "On Time % = DIVIDE(COUNTROWS(FILTER(fact_Orders, fact_Orders[delivery_mins] <= 35)), COUNTROWS(fact_Orders), 0)", plain: "Fraction of orders delivered in 35 minutes or less" },
    ],
    timeIntelligence: {
      measure: "Orders This Week vs Last",
      dax: "Orders WoW = CALCULATE(COUNTROWS(fact_Orders)) - CALCULATE(COUNTROWS(fact_Orders), DATEADD(dim_Date[date], -7, DAY))",
      plain: "Change in order count vs the same day last week",
    },
  },

  stocks: {
    factTable: "fact_OHLCV",
    factDescription: "One row per stock per trading day",
    factColumns: ["record_id", "stock_id", "date_key", "open", "high", "low", "close", "volume", "turnover"],
    dimensions: [
      { name: "dim_Stock", icon: "", columns: ["stock_id", "symbol", "company_name", "sector", "market_cap_tier"], role: "The listed company" },
      { name: "dim_Date", icon: "", columns: ["date_key", "date", "month", "quarter", "year", "is_trading_day"], role: "Trading calendar" },
    ],
    measures: [
      { name: "Daily Return %", dax: "Daily Return % = DIVIDE([Close] - [Prev Close], [Prev Close], 0) * 100", plain: "How much the stock price changed today vs yesterday" },
      { name: "Avg Volume", dax: "Avg Volume = AVERAGE(fact_OHLCV[volume])", plain: "Average shares traded per day in the selected period" },
      { name: "52W High", dax: "52W High = CALCULATE(MAX(fact_OHLCV[high]), DATESINPERIOD(dim_Date[date], MAX(dim_Date[date]), -365, DAY))", plain: "Highest price reached in the last 52 weeks" },
    ],
    timeIntelligence: {
      measure: "Return YTD",
      dax: "Return YTD % = DIVIDE(MAX(fact_OHLCV[close]) - CALCULATE(FIRSTNONBLANK(fact_OHLCV[close], 1), DATESYTD(dim_Date[date])), CALCULATE(FIRSTNONBLANK(fact_OHLCV[close], 1), DATESYTD(dim_Date[date])), 0) * 100",
      plain: "Total price return from Jan 1 to the selected date",
    },
  },

  healthcare: {
    factTable: "fact_Admissions",
    factDescription: "One row per patient admission episode",
    factColumns: ["admission_id", "patient_id", "admit_date_key", "discharge_date_key", "department_id", "los_days", "readmitted_30d"],
    dimensions: [
      { name: "dim_Patient", icon: "", columns: ["patient_id", "age_group", "gender", "chronic_conditions"], role: "Anonymised patient" },
      { name: "dim_Department", icon: "", columns: ["dept_id", "dept_name", "ward_type", "avg_cost_per_day"], role: "Hospital department" },
      { name: "dim_Date", icon: "", columns: ["date_key", "date", "month", "quarter", "is_flu_season"], role: "Admission and discharge dates" },
    ],
    measures: [
      { name: "Avg LOS", dax: "Avg LOS = AVERAGE(fact_Admissions[los_days])", plain: "Average number of days patients stay" },
      { name: "Readmission Rate", dax: "Readmission Rate = DIVIDE(COUNTROWS(FILTER(fact_Admissions, fact_Admissions[readmitted_30d] = TRUE)), COUNTROWS(fact_Admissions), 0)", plain: "Fraction of patients readmitted within 30 days" },
      { name: "Bed Occupancy", dax: "Bed Days Used = SUMX(fact_Admissions, fact_Admissions[los_days])", plain: "Total bed-nights consumed in the selected period" },
    ],
    timeIntelligence: {
      measure: "Admissions YoY Change",
      dax: "Admissions YoY = COUNTROWS(fact_Admissions) - CALCULATE(COUNTROWS(fact_Admissions), SAMEPERIODLASTYEAR(dim_Date[date]))",
      plain: "Change in admissions vs the same period last year",
    },
  },

  music: {
    factTable: "fact_Streams",
    factDescription: "One row per track per week on the charts",
    factColumns: ["record_id", "track_id", "date_key", "rank", "streams", "peak_rank", "weeks_on_chart"],
    dimensions: [
      { name: "dim_Track", icon: "", columns: ["track_id", "title", "artist_id", "genre", "duration_secs", "release_date_key"], role: "The song" },
      { name: "dim_Artist", icon: "", columns: ["artist_id", "name", "country", "genre"], role: "The performer" },
      { name: "dim_Date", icon: "", columns: ["date_key", "week_start_date", "month", "year"], role: "Chart week" },
    ],
    measures: [
      { name: "Total Streams", dax: "Total Streams = SUM(fact_Streams[streams])", plain: "Add up all stream counts" },
      { name: "Avg Chart Position", dax: "Avg Rank = AVERAGE(fact_Streams[rank])", plain: "Average ranking across all charting weeks" },
      { name: "Debut Peak", dax: "Debut Peak Rank = CALCULATE(MIN(fact_Streams[peak_rank]), fact_Streams[weeks_on_chart] = 1)", plain: "Highest position reached in the debut week" },
    ],
    timeIntelligence: {
      measure: "Streams This Month vs Last",
      dax: "Streams MoM = [Total Streams] - CALCULATE([Total Streams], DATEADD(dim_Date[date], -1, MONTH))",
      plain: "Change in total streams vs the previous calendar month",
    },
  },

  travel: {
    factTable: "fact_Bookings",
    factDescription: "One row per flight booking",
    factColumns: ["booking_id", "booking_date_key", "flight_date_key", "route_id", "airline_id", "class", "fare", "cancelled", "lead_days"],
    dimensions: [
      { name: "dim_Route", icon: "", columns: ["route_id", "origin", "destination", "distance_km", "is_metro"], role: "Origin–destination pair" },
      { name: "dim_Airline", icon: "", columns: ["airline_id", "airline_name", "type", "hub"], role: "Carrier" },
      { name: "dim_Date", icon: "", columns: ["date_key", "date", "day_of_week", "is_holiday", "season"], role: "Booking and travel dates" },
    ],
    measures: [
      { name: "Total Revenue", dax: "Total Revenue = SUMX(FILTER(fact_Bookings, NOT fact_Bookings[cancelled]), fact_Bookings[fare])", plain: "Total fares from non-cancelled bookings" },
      { name: "Cancellation Rate", dax: "Cancellation Rate = DIVIDE(COUNTROWS(FILTER(fact_Bookings, fact_Bookings[cancelled] = TRUE)), COUNTROWS(fact_Bookings), 0)", plain: "Fraction of bookings that were cancelled" },
      { name: "Avg Lead Days", dax: "Avg Lead Days = AVERAGE(fact_Bookings[lead_days])", plain: "How far in advance bookings are made on average" },
    ],
    timeIntelligence: {
      measure: "Revenue QoQ",
      dax: "Revenue QoQ % = DIVIDE([Total Revenue] - CALCULATE([Total Revenue], DATEADD(dim_Date[date], -1, QUARTER)), CALCULATE([Total Revenue], DATEADD(dim_Date[date], -1, QUARTER)), 0)",
      plain: "Revenue change vs the previous quarter",
    },
  },

  gaming: {
    factTable: "fact_Sessions",
    factDescription: "One row per player game session",
    factColumns: ["session_id", "player_id", "date_key", "match_type_id", "duration_mins", "kills", "position", "in_game_earnings"],
    dimensions: [
      { name: "dim_Player", icon: "", columns: ["player_id", "username", "level_tier", "device", "region"], role: "The player" },
      { name: "dim_MatchType", icon: "", columns: ["match_type_id", "type_name", "max_players", "is_ranked"], role: "Solo, duo, squad etc." },
      { name: "dim_Date", icon: "", columns: ["date_key", "date", "hour", "day_of_week", "is_weekend"], role: "Session time" },
    ],
    measures: [
      { name: "Avg Session Duration", dax: "Avg Session Mins = AVERAGE(fact_Sessions[duration_mins])", plain: "Average minutes per game session" },
      { name: "Avg Kill/Death Ratio", dax: "Avg Kills Per Session = AVERAGE(fact_Sessions[kills])", plain: "Average kills a player gets per game" },
      { name: "Churn Risk Players", dax: "At Risk Players = CALCULATE(DISTINCTCOUNT(fact_Sessions[player_id]), DATESINPERIOD(dim_Date[date], MAX(dim_Date[date]), -14, DAY))", plain: "Players who have played in the last 14 days" },
    ],
    timeIntelligence: {
      measure: "DAU (Daily Active Users)",
      dax: "DAU = CALCULATE(DISTINCTCOUNT(fact_Sessions[player_id]), FILTER(dim_Date, dim_Date[date] = MAX(dim_Date[date])))",
      plain: "Number of unique players on the selected day",
    },
  },
};

export function getFlavorStarSchema(flavorId: string): StarSchemaExample {
  return FLAVOR_STAR_SCHEMAS[flavorId] ?? FLAVOR_STAR_SCHEMAS.cricket;
}
