import { PracticeData } from "./types";

const data: PracticeData = {
  flavorId: "baseball",
  columns: ["date", "player_name", "team_name", "hits", "home_runs", "status"],
  rawRows: [
  {
    "date": "2022-04-06",
    "entity_name": "Mookie Betts",
    "category_name": "LA Dodgers",
    "metric1": 1,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-04-07",
    "entity_name": "Aaron Judge",
    "category_name": "NY Yankees",
    "metric1": 5,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-04-10",
    "entity_name": "Juan Soto",
    "category_name": "NY Yankees",
    "metric1": 1,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-04-25",
    "entity_name": "Ronald Acuña Jr.",
    "category_name": "Atlanta Braves",
    "metric1": 1,
    "metric2": 2,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-04-27",
    "entity_name": "Yordan Alvarez",
    "category_name": "Houston Astros",
    "metric1": 2,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-05-18",
    "entity_name": "Shohei Ohtani",
    "category_name": "LA Dodgers",
    "metric1": 1,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-05-24",
    "entity_name": "Freddie Freeman",
    "category_name": "LA Dodgers",
    "metric1": 5,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  }
],
  groupedRows: [
  {
    "category_name": "LA Dodgers",
    "total_metric1": 312,
    "avg_metric2": 0.9,
    "row_count": 99
  },
  {
    "category_name": "NY Yankees",
    "total_metric1": 226,
    "avg_metric2": 0.9,
    "row_count": 76
  },
  {
    "category_name": "Atlanta Braves",
    "total_metric1": 74,
    "avg_metric2": 0.9,
    "row_count": 29
  },
  {
    "category_name": "Houston Astros",
    "total_metric1": 113,
    "avg_metric2": 1.2,
    "row_count": 36
  }
],
  insightRows: [
  {
    "label": "Top hits — Juan Soto",
    "value": "125 total",
    "interpretation": "Highest cumulative hits across all activity in the dataset"
  },
  {
    "label": "Missing home runs data",
    "value": "7% of rows",
    "interpretation": "7% of records have no home runs value — these need to be handled in Power Query"
  },
  {
    "label": "Zero / inactive rows",
    "value": "33% of rows",
    "interpretation": "33% of rows have hits = 0. These are likely postponed or cancelled events that should be filtered out"
  }
],
  anomalyRows: [
  {
    "date": "2022-04-09",
    "entity_name": "Ronald Acuña Jr.",
    "category_name": "Atlanta Braves",
    "metric1": 0,
    "metric2": 2,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-04-13",
    "entity_name": "Shohei Ohtani",
    "category_name": "LA Dodgers",
    "metric1": 0,
    "metric2": 2,
    "status": "Postponed",
    "notes": ""
  },
  {
    "date": "2022-04-15",
    "entity_name": "Freddie Freeman",
    "category_name": "LA Dodgers",
    "metric1": 0,
    "metric2": 2,
    "status": "Postponed",
    "notes": ""
  },
  {
    "date": "2022-04-18",
    "entity_name": "Yordan Alvarez",
    "category_name": "Houston Astros",
    "metric1": 0,
    "metric2": 0,
    "status": "Postponed",
    "notes": ""
  },
  {
    "date": "2022-04-24",
    "entity_name": "Freddie Freeman",
    "category_name": "LA Dodgers",
    "metric1": 0,
    "metric2": 1,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-04-30",
    "entity_name": "Shohei Ohtani",
    "category_name": "LA Dodgers",
    "metric1": 0,
    "metric2": 2,
    "status": "Postponed",
    "notes": ""
  }
],
  drillRows: [
  {
    "date": "2022-04-10",
    "entity_name": "Juan Soto",
    "category_name": "NY Yankees",
    "metric1": 1,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-04-12",
    "entity_name": "Juan Soto",
    "category_name": "NY Yankees",
    "metric1": 4,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-04-16",
    "entity_name": "Juan Soto",
    "category_name": "NY Yankees",
    "metric1": 1,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-04-22",
    "entity_name": "Juan Soto",
    "category_name": "NY Yankees",
    "metric1": 4,
    "metric2": 2,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-05-19",
    "entity_name": "Juan Soto",
    "category_name": "NY Yankees",
    "metric1": 3,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-05-31",
    "entity_name": "Juan Soto",
    "category_name": "NY Yankees",
    "metric1": 3,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-06-05",
    "entity_name": "Juan Soto",
    "category_name": "NY Yankees",
    "metric1": 4,
    "metric2": 2,
    "status": "Played",
    "notes": ""
  },
  {
    "date": "2022-06-18",
    "entity_name": "Juan Soto",
    "category_name": "NY Yankees",
    "metric1": 5,
    "metric2": 0,
    "status": "Played",
    "notes": ""
  }
],
  downloadFileName: "baseball_messy.csv",
  downloadLabel: "Baseball (MLB) practice dataset",
};

export default data;
