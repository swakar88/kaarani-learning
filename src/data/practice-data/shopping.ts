import { PracticeData } from "./types";

const data: PracticeData = {
  flavorId: "shopping",
  columns: ["date", "player_name", "team_name", "revenue_usd", "returns", "status"],
  rawRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Nike Air Max 270",
    "category_name": "Clothing & Shoes",
    "metric1": 370,
    "metric2": 22,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Sony WH-1000XM5",
    "category_name": "Audio",
    "metric1": 520,
    "metric2": 26,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 838,
    "metric2": 4,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "iPhone 15 Pro",
    "category_name": "Electronics",
    "metric1": 646,
    "metric2": 20,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "AirPods Pro 2",
    "category_name": "Audio",
    "metric1": 139,
    "metric2": 38,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "Samsung 65\" 4K TV",
    "category_name": "Electronics",
    "metric1": 1075,
    "metric2": 7,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-01-14",
    "entity_name": "iPad Air 5",
    "category_name": "Electronics",
    "metric1": 183,
    "metric2": 1,
    "status": "Delivered",
    "notes": ""
  }
],
  groupedRows: [
  {
    "category_name": "Audio",
    "total_metric1": 156516,
    "avg_metric2": 19,
    "row_count": 263
  },
  {
    "category_name": "Clothing & Shoes",
    "total_metric1": 78932,
    "avg_metric2": 21.4,
    "row_count": 125
  },
  {
    "category_name": "Kitchen & Home",
    "total_metric1": 83185,
    "avg_metric2": 20.2,
    "row_count": 129
  },
  {
    "category_name": "Electronics",
    "total_metric1": 236798,
    "avg_metric2": 20.3,
    "row_count": 379
  }
],
  insightRows: [
  {
    "label": "Top revenue usd — Instant Pot Duo",
    "value": "83185 total",
    "interpretation": "Highest cumulative revenue usd across all activity in the dataset"
  },
  {
    "label": "Missing returns data",
    "value": "8% of rows",
    "interpretation": "8% of records have no returns value — these need to be handled in Power Query"
  },
  {
    "label": "Zero / inactive rows",
    "value": "18% of rows",
    "interpretation": "18% of rows have revenue_usd = 0. These are likely postponed or cancelled events that should be filtered out"
  }
],
  anomalyRows: [
  {
    "date": "2021-12-31",
    "entity_name": "iPhone 15 Pro",
    "category_name": "Electronics",
    "metric1": 0,
    "metric2": null,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "AirPods Pro 2",
    "category_name": "Audio",
    "metric1": 71,
    "metric2": null,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "iPad Air 5",
    "category_name": "Electronics",
    "metric1": 0,
    "metric2": 40,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Samsung 65\" 4K TV",
    "category_name": "Electronics",
    "metric1": 0,
    "metric2": 15,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "iPad Air 5",
    "category_name": "Electronics",
    "metric1": 0,
    "metric2": 20,
    "status": "Cancelled",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 0,
    "metric2": 35,
    "status": "Cancelled",
    "notes": ""
  }
],
  drillRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 838,
    "metric2": 4,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-01-14",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 1188,
    "metric2": 3,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-01-21",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 348,
    "metric2": 24,
    "status": "Returned",
    "notes": ""
  },
  {
    "date": "2022-01-28",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 192,
    "metric2": 0,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-02-04",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 554,
    "metric2": 33,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-02-11",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 196,
    "metric2": 3,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-02-25",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 879,
    "metric2": 19,
    "status": "Delivered",
    "notes": ""
  },
  {
    "date": "2022-03-04",
    "entity_name": "Instant Pot Duo",
    "category_name": "Kitchen & Home",
    "metric1": 246,
    "metric2": 38,
    "status": "Delivered",
    "notes": ""
  }
],
  downloadFileName: "shopping_messy.csv",
  downloadLabel: "Online Shopping practice dataset",
};

export default data;
