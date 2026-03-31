import { PracticeData } from "./types";

const data: PracticeData = {
  flavorId: "netflix",
  columns: ["date", "player_name", "team_name", "hours_watched_millions", "rating", "status"],
  rawRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 12,
    "metric2": 8,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Bridgerton",
    "category_name": "Romance",
    "metric1": 61,
    "metric2": 9,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "The Crown",
    "category_name": "Drama",
    "metric1": 67,
    "metric2": 6,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Beef",
    "category_name": "Drama",
    "metric1": 57,
    "metric2": 8,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "Squid Game",
    "category_name": "Thriller",
    "metric1": 51,
    "metric2": 9,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-14",
    "entity_name": "Stranger Things",
    "category_name": "Sci-Fi",
    "metric1": 39,
    "metric2": 9,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-14",
    "entity_name": "Ozark",
    "category_name": "Crime",
    "metric1": 16,
    "metric2": 10,
    "status": "Active",
    "notes": ""
  }
],
  groupedRows: [
  {
    "category_name": "Drama",
    "total_metric1": 16045,
    "avg_metric2": 8.1,
    "row_count": 392
  },
  {
    "category_name": "Thriller",
    "total_metric1": 5493,
    "avg_metric2": 8.1,
    "row_count": 133
  },
  {
    "category_name": "Romance",
    "total_metric1": 5268,
    "avg_metric2": 7.9,
    "row_count": 127
  },
  {
    "category_name": "Sci-Fi",
    "total_metric1": 5431,
    "avg_metric2": 7.9,
    "row_count": 138
  },
  {
    "category_name": "Crime",
    "total_metric1": 5089,
    "avg_metric2": 8.1,
    "row_count": 128
  }
],
  insightRows: [
  {
    "label": "Top hours watched millions — Wednesday",
    "value": "5681 total",
    "interpretation": "Highest cumulative hours watched millions across all activity in the dataset"
  },
  {
    "label": "Missing rating data",
    "value": "8% of rows",
    "interpretation": "8% of records have no rating value — these need to be handled in Power Query"
  },
  {
    "label": "Zero / inactive rows",
    "value": "16% of rows",
    "interpretation": "16% of rows have hours_watched_millions = 0. These are likely postponed or cancelled events that should be filtered out"
  }
],
  anomalyRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Stranger Things",
    "category_name": "Sci-Fi",
    "metric1": 0,
    "metric2": 8,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Squid Game",
    "category_name": "Thriller",
    "metric1": 43,
    "metric2": null,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Ozark",
    "category_name": "Crime",
    "metric1": 0,
    "metric2": 6,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "Stranger Things",
    "category_name": "Sci-Fi",
    "metric1": 6,
    "metric2": null,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 0,
    "metric2": 10,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "Ozark",
    "category_name": "Crime",
    "metric1": 0,
    "metric2": 6,
    "status": "Cancelled",
    "notes": ""
  }
],
  drillRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 12,
    "metric2": 8,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-14",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 78,
    "metric2": 6,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-01-28",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 65,
    "metric2": 6,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-02-04",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 47,
    "metric2": 10,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-02-11",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 60,
    "metric2": 8,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-02-25",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 46,
    "metric2": 10,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-03-11",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 18,
    "metric2": 8,
    "status": "Active",
    "notes": ""
  },
  {
    "date": "2022-03-18",
    "entity_name": "Wednesday",
    "category_name": "Drama",
    "metric1": 11,
    "metric2": 7,
    "status": "Active",
    "notes": ""
  }
],
  downloadFileName: "netflix_messy.csv",
  downloadLabel: "TV & Streaming practice dataset",
};

export default data;
