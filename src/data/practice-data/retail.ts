import { PracticeData } from "./types";

const data: PracticeData = {
  flavorId: "retail",
  columns: ["date", "player_name", "team_name", "units_sold", "margin_usd", "status"],
  rawRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Organic Whole Milk",
    "category_name": "Grocery",
    "metric1": 455,
    "metric2": 723,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "65\" 4K Smart TV",
    "category_name": "Electronics",
    "metric1": 80,
    "metric2": 345,
    "status": "Returned",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Men's Running Shoes",
    "category_name": "Clothing & Shoes",
    "metric1": 263,
    "metric2": 9,
    "status": "Returned",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 258,
    "metric2": 595,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Standing Desk Converter",
    "category_name": "Office Supplies",
    "metric1": 119,
    "metric2": 250,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Winter Down Jacket",
    "category_name": "Clothing & Shoes",
    "metric1": 342,
    "metric2": 712,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2021-12-31",
    "entity_name": "Yoga Mat Premium",
    "category_name": "Fitness & Sports",
    "metric1": 352,
    "metric2": 97,
    "status": "Returned",
    "notes": ""
  }
],
  groupedRows: [
  {
    "category_name": "Grocery",
    "total_metric1": 39584,
    "avg_metric2": 405.8,
    "row_count": 157
  },
  {
    "category_name": "Electronics",
    "total_metric1": 39408,
    "avg_metric2": 398.4,
    "row_count": 157
  },
  {
    "category_name": "Clothing & Shoes",
    "total_metric1": 78068,
    "avg_metric2": 407.8,
    "row_count": 314
  },
  {
    "category_name": "Kitchen",
    "total_metric1": 40160,
    "avg_metric2": 356.5,
    "row_count": 157
  },
  {
    "category_name": "Office Supplies",
    "total_metric1": 39134,
    "avg_metric2": 386.1,
    "row_count": 157
  }
],
  insightRows: [
  {
    "label": "Top units sold — Keurig K-Elite",
    "value": "40160 total",
    "interpretation": "Highest cumulative units sold across all activity in the dataset"
  },
  {
    "label": "Missing margin usd data",
    "value": "8% of rows",
    "interpretation": "8% of records have no margin usd value — these need to be handled in Power Query"
  },
  {
    "label": "Zero / inactive rows",
    "value": "0% of rows",
    "interpretation": "0% of rows have units_sold = 0. These are likely postponed or cancelled events that should be filtered out"
  }
],
  anomalyRows: [
  {
    "date": "2022-01-14",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 482,
    "metric2": null,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2022-01-21",
    "entity_name": "Organic Whole Milk",
    "category_name": "Grocery",
    "metric1": 182,
    "metric2": null,
    "status": "Returned",
    "notes": ""
  },
  {
    "date": "2022-01-21",
    "entity_name": "Yoga Mat Premium",
    "category_name": "Fitness & Sports",
    "metric1": 236,
    "metric2": null,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2022-02-04",
    "entity_name": "Standing Desk Converter",
    "category_name": "Office Supplies",
    "metric1": 81,
    "metric2": null,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2022-02-04",
    "entity_name": "Winter Down Jacket",
    "category_name": "Clothing & Shoes",
    "metric1": 210,
    "metric2": null,
    "status": "Returned",
    "notes": ""
  },
  {
    "date": "2022-02-18",
    "entity_name": "Winter Down Jacket",
    "category_name": "Clothing & Shoes",
    "metric1": 262,
    "metric2": null,
    "status": "Sold",
    "notes": ""
  }
],
  drillRows: [
  {
    "date": "2021-12-31",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 258,
    "metric2": 595,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2022-01-07",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 88,
    "metric2": 102,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2022-01-21",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 18,
    "metric2": 502,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2022-01-28",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 170,
    "metric2": 661,
    "status": "Returned",
    "notes": ""
  },
  {
    "date": "2022-02-04",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 286,
    "metric2": 745,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2022-02-11",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 224,
    "metric2": 236,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2022-02-18",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 41,
    "metric2": 470,
    "status": "Sold",
    "notes": ""
  },
  {
    "date": "2022-02-25",
    "entity_name": "Keurig K-Elite",
    "category_name": "Kitchen",
    "metric1": 385,
    "metric2": 330,
    "status": "Sold",
    "notes": ""
  }
],
  downloadFileName: "retail_messy.csv",
  downloadLabel: "Retail practice dataset",
};

export default data;
