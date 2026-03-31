import { PracticeData } from "./types";

const data: PracticeData = {
  flavorId: "nfl",
  columns: ["date", "player_name", "team_name", "pass_yards", "touchdowns", "status"],
  rawRows: [
  {
    "date": "2022-09-07",
    "entity_name": "CJ Stroud",
    "category_name": "Houston Texans",
    "metric1": 360,
    "metric2": 5,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-09-13",
    "entity_name": "Jalen Hurts",
    "category_name": "Philadelphia Eagles",
    "metric1": 168,
    "metric2": 3,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-10-04",
    "entity_name": "Patrick Mahomes",
    "category_name": "Kansas City Chiefs",
    "metric1": 403,
    "metric2": 5,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-11-27",
    "entity_name": "Josh Allen",
    "category_name": "Buffalo Bills",
    "metric1": 173,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-12-17",
    "entity_name": "Tua Tagovailoa",
    "category_name": "Miami Dolphins",
    "metric1": 197,
    "metric2": 2,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-10-16",
    "entity_name": "Dak Prescott",
    "category_name": "Dallas Cowboys",
    "metric1": 357,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-11-26",
    "entity_name": "Lamar Jackson",
    "category_name": "Baltimore Ravens",
    "metric1": 401,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  }
],
  groupedRows: [
  {
    "category_name": "Houston Texans",
    "total_metric1": 2170,
    "avg_metric2": 4,
    "row_count": 8
  },
  {
    "category_name": "Philadelphia Eagles",
    "total_metric1": 1934,
    "avg_metric2": 2.8,
    "row_count": 6
  },
  {
    "category_name": "Baltimore Ravens",
    "total_metric1": 1342,
    "avg_metric2": 1.5,
    "row_count": 4
  },
  {
    "category_name": "Kansas City Chiefs",
    "total_metric1": 2780,
    "avg_metric2": 2.9,
    "row_count": 9
  },
  {
    "category_name": "Buffalo Bills",
    "total_metric1": 875,
    "avg_metric2": 3,
    "row_count": 4
  }
],
  insightRows: [
  {
    "label": "Top pass yards — Patrick Mahomes",
    "value": "2780 total",
    "interpretation": "Highest cumulative pass yards across all activity in the dataset"
  },
  {
    "label": "Missing touchdowns data",
    "value": "15% of rows",
    "interpretation": "15% of records have no touchdowns value — these need to be handled in Power Query"
  },
  {
    "label": "Zero / inactive rows",
    "value": "22% of rows",
    "interpretation": "22% of rows have pass_yards = 0. These are likely postponed or cancelled events that should be filtered out"
  }
],
  anomalyRows: [
  {
    "date": "2022-09-20",
    "entity_name": "Lamar Jackson",
    "category_name": "Baltimore Ravens",
    "metric1": 288,
    "metric2": null,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-09-27",
    "entity_name": "Josh Allen",
    "category_name": "Buffalo Bills",
    "metric1": 0,
    "metric2": 0,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2022-10-17",
    "entity_name": "Jalen Hurts",
    "category_name": "Philadelphia Eagles",
    "metric1": 0,
    "metric2": 2,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2022-10-24",
    "entity_name": "Josh Allen",
    "category_name": "Buffalo Bills",
    "metric1": 0,
    "metric2": 0,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2022-11-13",
    "entity_name": "Lamar Jackson",
    "category_name": "Baltimore Ravens",
    "metric1": 312,
    "metric2": null,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-12-04",
    "entity_name": "Dak Prescott",
    "category_name": "Dallas Cowboys",
    "metric1": 337,
    "metric2": null,
    "status": "Played",
    "notes": ""
  }
],
  drillRows: [
  {
    "date": "2022-10-04",
    "entity_name": "Patrick Mahomes",
    "category_name": "Kansas City Chiefs",
    "metric1": 403,
    "metric2": 5,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-11-20",
    "entity_name": "Patrick Mahomes",
    "category_name": "Kansas City Chiefs",
    "metric1": 300,
    "metric2": 4,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-12-10",
    "entity_name": "Patrick Mahomes",
    "category_name": "Kansas City Chiefs",
    "metric1": 173,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-09-26",
    "entity_name": "Patrick Mahomes",
    "category_name": "Kansas City Chiefs",
    "metric1": 368,
    "metric2": 4,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-12-09",
    "entity_name": "Patrick Mahomes",
    "category_name": "Kansas City Chiefs",
    "metric1": 201,
    "metric2": 5,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-12-23",
    "entity_name": "Patrick Mahomes",
    "category_name": "Kansas City Chiefs",
    "metric1": 327,
    "metric2": 5,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2024-09-24",
    "entity_name": "Patrick Mahomes",
    "category_name": "Kansas City Chiefs",
    "metric1": 404,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2024-11-04",
    "entity_name": "Patrick Mahomes",
    "category_name": "Kansas City Chiefs",
    "metric1": 275,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  }
],
  downloadFileName: "nfl_messy.csv",
  downloadLabel: "American Football (NFL) practice dataset",
};

export default data;
