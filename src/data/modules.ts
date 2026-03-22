import { ModuleInfo } from "@/types";

export const MODULES: ModuleInfo[] = [
  {
    id: 0,
    title: "Setup",
    subtitle: "Get ready to learn",
    description:
      "Install Power BI Desktop, pick your flavor, and preview your learning path.",
    screenCount: 3,
    color: "#2563EB",
    icon: "",
    topics: ["Install Power BI Desktop", "Choose your data flavor", "Course roadmap"],
  },
  {
    id: 1,
    title: "What is Data Analytics?",
    subtitle: "Stories before tables",
    description:
      "Understand the four types of analytics through real-world stories — no spreadsheets yet.",
    screenCount: 8,
    color: "#3B82F6",
    icon: "",
    topics: [
      "Descriptive analytics",
      "Diagnostic analytics",
      "Predictive analytics",
      "Prescriptive analytics",
      "Data roles & tools",
      "The Power BI ecosystem",
    ],
  },
  {
    id: 2,
    title: "Prepare & Clean Data",
    subtitle: "Real data, real mess",
    description:
      "Connect to open datasets, fix messy data in Power Query, and shape it for analysis.",
    screenCount: 10,
    color: "#8B5CF6",
    icon: "",
    topics: [
      "Data sources & connectors",
      "Power Query Editor",
      "Remove duplicates & errors",
      "Transform columns",
      "Merge & append queries",
      "Load to data model",
    ],
  },
  {
    id: 3,
    title: "Model + DAX",
    subtitle: "Ask questions in plain English",
    description:
      "Build a star schema, set up relationships, and write DAX like plain English questions.",
    screenCount: 12,
    color: "#10B981",
    icon: "⭐",
    topics: [
      "Star schema design",
      "Table relationships",
      "DAX fundamentals",
      "Measures vs columns",
      "Time intelligence",
      "DAX best practices",
    ],
  },
  {
    id: 4,
    title: "Visualise & Analyse",
    subtitle: "Every chart, every insight",
    description:
      "Build every chart type, add slicers, conditional formatting, forecasting and AI visuals.",
    screenCount: 15,
    color: "#F59E0B",
    icon: "",
    topics: [
      "Bar & column charts",
      "Line & area charts",
      "Maps & geo visuals",
      "Slicers & filters",
      "Conditional formatting",
      "Forecasting & AI visuals",
    ],
  },
  {
    id: 5,
    title: "Manage & Share",
    subtitle: "Publish, protect, automate",
    description:
      "Publish to the web, manage workspaces, set Row-Level Security, and schedule refreshes.",
    screenCount: 10,
    color: "#EF4444",
    icon: "",
    topics: [
      "Publish to Power BI Service",
      "Workspaces & apps",
      "Row-Level Security",
      "Scheduled refresh",
      "Sharing & permissions",
      "Microsoft Fabric intro",
    ],
  },
];

export function getModuleById(id: number): ModuleInfo {
  return MODULES.find((m) => m.id === id) ?? MODULES[0];
}
