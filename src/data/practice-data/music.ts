import { PracticeData } from "./types";

const data: PracticeData = {
  flavorId: "music",
  columns: ["date", "player_name", "team_name", "streams_millions", "chart_position", "status"],
  rawRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Taylor Swift",
    "category_name": "Pop",
    "metric1": 13,
    "metric2": 41,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Drake",
    "category_name": "Hip-Hop/Rap",
    "metric1": 7,
    "metric2": 11,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Bad Bunny",
    "category_name": "Latin",
    "metric1": 37,
    "metric2": 57,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "The Weeknd",
    "category_name": "R&B/Soul",
    "metric1": 50,
    "metric2": 15,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Billie Eilish",
    "category_name": "Alternative/Indie",
    "metric1": 21,
    "metric2": 57,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "SZA",
    "category_name": "R&B/Soul",
    "metric1": 12,
    "metric2": 66,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "Morgan Wallen",
    "category_name": "Country",
    "metric1": 88,
    "metric2": 82,
    "status": "Active",
    "notes": ""
  }
],
  groupedRows: [
  {
    "category_name": "Pop",
    "total_metric1": 5764,
    "avg_metric2": 50.7,
    "row_count": 129
  },
  {
    "category_name": "Hip-Hop/Rap",
    "total_metric1": 6217,
    "avg_metric2": 49.6,
    "row_count": 130
  },
  {
    "category_name": "Latin",
    "total_metric1": 6556,
    "avg_metric2": 50.3,
    "row_count": 135
  },
  {
    "category_name": "R&B/Soul",
    "total_metric1": 12098,
    "avg_metric2": 50.8,
    "row_count": 262
  },
  {
    "category_name": "Alternative/Indie",
    "total_metric1": 6445,
    "avg_metric2": 51.4,
    "row_count": 130
  }
],
  insightRows: [
  {
    "label": "Top streams millions — Bad Bunny",
    "value": "6556 total",
    "interpretation": "Highest cumulative streams millions across all activity in the dataset"
  },
  {
    "label": "Missing chart position data",
    "value": "9% of rows",
    "interpretation": "9% of records have no chart position value — these need to be handled in Power Query"
  },
  {
    "label": "Zero / inactive rows",
    "value": "17% of rows",
    "interpretation": "17% of rows have streams_millions = 0. These are likely postponed or cancelled events that should be filtered out"
  }
],
  anomalyRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Morgan Wallen",
    "category_name": "Country",
    "metric1": 36,
    "metric2": null,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-14",
    "entity_name": "Taylor Swift",
    "category_name": "Pop",
    "metric1": 73,
    "metric2": null,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-14",
    "entity_name": "The Weeknd",
    "category_name": "R&B/Soul",
    "metric1": 0,
    "metric2": 45,
    "status": "Inactive",
    "notes": ""
  },
  {
    "date": "2022-01-21",
    "entity_name": "Billie Eilish",
    "category_name": "Alternative/Indie",
    "metric1": 0,
    "metric2": 27,
    "status": "Inactive",
    "notes": ""
  },
  {
    "date": "2022-01-21",
    "entity_name": "Morgan Wallen",
    "category_name": "Country",
    "metric1": 0,
    "metric2": 64,
    "status": "Inactive",
    "notes": ""
  },
  {
    "date": "2022-01-28",
    "entity_name": "Drake",
    "category_name": "Hip-Hop/Rap",
    "metric1": 72,
    "metric2": null,
    "status": "Active",
    "notes": ""
  }
],
  drillRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Bad Bunny",
    "category_name": "Latin",
    "metric1": 37,
    "metric2": 57,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "Bad Bunny",
    "category_name": "Latin",
    "metric1": 10,
    "metric2": 14,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-14",
    "entity_name": "Bad Bunny",
    "category_name": "Latin",
    "metric1": 17,
    "metric2": 59,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-21",
    "entity_name": "Bad Bunny",
    "category_name": "Latin",
    "metric1": 80,
    "metric2": 47,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-28",
    "entity_name": "Bad Bunny",
    "category_name": "Latin",
    "metric1": 47,
    "metric2": 71,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-02-04",
    "entity_name": "Bad Bunny",
    "category_name": "Latin",
    "metric1": 45,
    "metric2": 67,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-02-11",
    "entity_name": "Bad Bunny",
    "category_name": "Latin",
    "metric1": 7,
    "metric2": 11,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-02-25",
    "entity_name": "Bad Bunny",
    "category_name": "Latin",
    "metric1": 50,
    "metric2": 26,
    "status": "Active",
    "notes": ""
  }
],
  downloadFileName: "music_messy.csv",
  downloadLabel: "Music & Streaming practice dataset",
};

export default data;
