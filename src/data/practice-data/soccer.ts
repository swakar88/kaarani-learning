import { PracticeData } from "./types";

const data: PracticeData = {
  flavorId: "soccer",
  columns: ["date", "player_name", "team_name", "goals", "assists", "status"],
  rawRows: [
  {
    "date": "2023-02-24",
    "entity_name": "Nani",
    "category_name": "Orlando City SC",
    "metric1": 2,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-03-14",
    "entity_name": "Xherdan Shaqiri",
    "category_name": "Chicago Fire FC",
    "metric1": 2,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-03-23",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 2,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-04-01",
    "entity_name": "Cucho Hernandez",
    "category_name": "Columbus Crew",
    "metric1": 3,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-05-16",
    "entity_name": "Riqui Puig",
    "category_name": "LA Galaxy",
    "metric1": 3,
    "metric2": 2,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-05-25",
    "entity_name": "Lorenzo Insigne",
    "category_name": "Toronto FC",
    "metric1": 3,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  }
],
  groupedRows: [
  {
    "category_name": "Orlando City SC",
    "total_metric1": 2,
    "avg_metric2": 1,
    "row_count": 1
  },
  {
    "category_name": "Chicago Fire FC",
    "total_metric1": 13,
    "avg_metric2": 0.7,
    "row_count": 6
  },
  {
    "category_name": "Inter Miami CF",
    "total_metric1": 23,
    "avg_metric2": 0.7,
    "row_count": 10
  },
  {
    "category_name": "Columbus Crew",
    "total_metric1": 12,
    "avg_metric2": 0.5,
    "row_count": 6
  },
  {
    "category_name": "LA Galaxy",
    "total_metric1": 19,
    "avg_metric2": 1.5,
    "row_count": 8
  }
],
  insightRows: [
  {
    "label": "Top goals — Lionel Messi",
    "value": "23 total",
    "interpretation": "Highest cumulative goals across all activity in the dataset"
  },
  {
    "label": "Missing assists data",
    "value": "4% of rows",
    "interpretation": "4% of records have no assists value — these need to be handled in Power Query"
  },
  {
    "label": "Zero / inactive rows",
    "value": "36% of rows",
    "interpretation": "36% of rows have goals = 0. These are likely postponed or cancelled events that should be filtered out"
  }
],
  anomalyRows: [
  {
    "date": "2023-03-05",
    "entity_name": "Lorenzo Insigne",
    "category_name": "Toronto FC",
    "metric1": 0,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-04-28",
    "entity_name": "Xherdan Shaqiri",
    "category_name": "Chicago Fire FC",
    "metric1": 0,
    "metric2": 2,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-06-03",
    "entity_name": "Lorenzo Insigne",
    "category_name": "Toronto FC",
    "metric1": 0,
    "metric2": 1,
    "status": "Postponed",
    "notes": ""
  },
  {
    "date": "2023-07-09",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 0,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-07-18",
    "entity_name": "Nani",
    "category_name": "Orlando City SC",
    "metric1": 0,
    "metric2": 1,
    "status": "Postponed",
    "notes": ""
  },
  {
    "date": "2023-08-05",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 0,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  }
],
  drillRows: [
  {
    "date": "2023-03-23",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 2,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-10-16",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 3,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2023-10-25",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 3,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2024-03-03",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 2,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2024-04-17",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 2,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2024-06-10",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 1,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2024-06-19",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 3,
    "metric2": 2,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2024-07-25",
    "entity_name": "Lionel Messi",
    "category_name": "Inter Miami CF",
    "metric1": 2,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  }
],
  downloadFileName: "soccer_messy.csv",
  downloadLabel: "Soccer (MLS) practice dataset",
};

export default data;
