export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleQuiz {
  moduleId: number;
  questions: QuizQuestion[];
}

export const MODULE_QUIZZES: Record<number, ModuleQuiz> = {
  2: {
    moduleId: 2,
    questions: [
      {
        id: "m2q1",
        question: "What does clicking 'Transform Data' do that 'Load' doesn't?",
        options: [
          "Loads data directly without any preview",
          "Opens Power Query Editor so you can clean data before loading",
          "Converts all columns to text type automatically",
          "Creates a duplicate of the data source connection",
        ],
        correctIndex: 1,
        explanation:
          "Transform Data opens Power Query Editor first, giving you the full cleaning and shaping toolkit before any data enters your model. Load skips straight to the model with no transformation step.",
      },
      {
        id: "m2q2",
        question: "Where does Power Query record every step you take?",
        options: [
          "The Queries pane on the left",
          "The formula bar at the top",
          "Applied Steps pane",
          "The data preview grid",
        ],
        correctIndex: 2,
        explanation:
          "Every transformation you apply is logged as a step in the Applied Steps pane on the right side of Power Query Editor. Each step generates an M formula you can inspect or edit.",
      },
      {
        id: "m2q3",
        question:
          "What's the key difference between a Power Query filter and a report slicer?",
        options: [
          "Slicers work faster than Power Query filters",
          "Power Query filters only work on text columns",
          "Power Query filter permanently removes rows before load; slicer just hides rows visually",
          "There is no difference — both are stored in the model",
        ],
        correctIndex: 2,
        explanation:
          "A Power Query filter is applied before the data reaches the model — those rows never load. A slicer operates at the report layer and only hides rows from visuals temporarily; all the data is still in the model.",
      },
    ],
  },
  3: {
    moduleId: 3,
    questions: [
      {
        id: "m3q1",
        question: "In a star schema, what goes in the centre?",
        options: [
          "The dimension table with the most columns",
          "The date table — always",
          "The Fact table (stores all the numbers/events)",
          "The largest file you imported",
        ],
        correctIndex: 2,
        explanation:
          "The Fact table sits at the centre of the star. It stores all the measurable events — sales, deliveries, streams, orders. Dimension tables radiate outward and provide the descriptive context.",
      },
      {
        id: "m3q2",
        question: "What does CALCULATE() do in DAX?",
        options: [
          "Adds up a column of numbers",
          "Modifies the filter context for an expression",
          "Counts the number of rows in a table",
          "Joins two tables together",
        ],
        correctIndex: 1,
        explanation:
          "CALCULATE() is DAX's most powerful function — it evaluates an expression after modifying the filter context. For example, CALCULATE(SUM(Sales[Amount]), Region = \"South\") gives you the total for South only, regardless of what's selected in the report.",
      },
      {
        id: "m3q3",
        question:
          "Measures vs Calculated Columns — what's the main difference?",
        options: [
          "Measures can only use SUM; Calculated Columns can use any function",
          "Calculated Columns are faster than Measures",
          "Measures compute at query time (no storage); Calculated Columns are stored row by row in the table",
          "There is no difference — they produce the same result",
        ],
        correctIndex: 2,
        explanation:
          "Measures are calculated on the fly at query time based on the current filter context — they use no storage. Calculated Columns are computed once at refresh time and stored in the table row by row. Measures are almost always preferred for aggregations.",
      },
    ],
  },
  4: {
    moduleId: 4,
    questions: [
      {
        id: "m4q1",
        question:
          "Which visual type is best for showing how parts add up to a whole?",
        options: [
          "Line chart",
          "Scatter chart",
          "Pie or Donut chart",
          "Waterfall chart",
        ],
        correctIndex: 2,
        explanation:
          "Pie and Donut charts are designed to show part-to-whole relationships — how each category contributes to the total. Keep them to 5–6 slices maximum, or the chart becomes unreadable.",
      },
      {
        id: "m4q2",
        question: "What does a Slicer do in a report?",
        options: [
          "Permanently removes rows from the dataset",
          "Filters all connected visuals on the page interactively",
          "Creates a calculated column based on a condition",
          "Exports selected data to CSV",
        ],
        correctIndex: 1,
        explanation:
          "A Slicer is an interactive filter control on the report canvas. When a user clicks a value in a Slicer, all connected visuals on the page update to show only data matching that selection — no data is removed from the model.",
      },
      {
        id: "m4q3",
        question:
          "Which Power BI AI visual finds what drives a metric up or down?",
        options: [
          "Q&A visual",
          "Decomposition Tree",
          "Smart Narrative",
          "Key Influencers visual",
        ],
        correctIndex: 3,
        explanation:
          "The Key Influencers visual uses machine learning to analyse your data and identify which factors (columns) are most responsible for a metric being high or low. You tell it the metric to analyse and it does the rest.",
      },
    ],
  },
  5: {
    moduleId: 5,
    questions: [
      {
        id: "m5q1",
        question: "What is a Workspace in Power BI Service?",
        options: [
          "The canvas where you build visuals in Desktop",
          "A shared folder/container for reports, dashboards, and datasets",
          "A premium feature only available on paid plans",
          "A local folder on your computer that syncs to the cloud",
        ],
        correctIndex: 1,
        explanation:
          "A Workspace in Power BI Service is a shared container where teams collaborate. It holds reports, dashboards, datasets, and dataflows. 'My Workspace' is your personal space; team workspaces let multiple people access and edit shared content.",
      },
      {
        id: "m5q2",
        question: "What does Row Level Security (RLS) do?",
        options: [
          "Encrypts the report so it can only be opened with a password",
          "Hides specific columns from certain users",
          "Controls which rows each user can see based on their identity",
          "Prevents users from exporting data to Excel",
        ],
        correctIndex: 2,
        explanation:
          "Row Level Security (RLS) uses DAX filter rules mapped to user roles. When a user opens the report, Power BI applies their role's filter automatically — they only see the rows they're allowed to see, without any visible UI change.",
      },
      {
        id: "m5q3",
        question:
          "What's the difference between a Report and a Dashboard in Power BI Service?",
        options: [
          "Dashboards have multiple pages; Reports have only one page",
          "Reports are built in the cloud; Dashboards are built in Desktop",
          "Dashboard is a single canvas of tiles pinned from one or more reports; Reports have multiple pages",
          "There is no difference — they are two names for the same thing",
        ],
        correctIndex: 2,
        explanation:
          "A Report is a multi-page interactive document built in Power BI Desktop (or Service). A Dashboard is a single-page canvas in Power BI Service made by pinning tiles from one or more reports — it gives a at-a-glance overview with no drill-through by default.",
      },
    ],
  },
};

export const KAGGLE_LINKS: Record<string, { label: string; url: string; modelUrl?: string }> = {
  baseball: {
    label: "Baseball (MLB) practice dataset",
    url: "/data/practice/baseball_messy.csv",
    modelUrl: "/data/practice/baseball_model/fact_activity.csv",
  },
  nfl: {
    label: "American Football (NFL) practice dataset",
    url: "/data/practice/nfl_messy.csv",
    modelUrl: "/data/practice/nfl_model/fact_activity.csv",
  },
  soccer: {
    label: "Soccer (MLS) practice dataset",
    url: "/data/practice/soccer_messy.csv",
    modelUrl: "/data/practice/soccer_model/fact_activity.csv",
  },
  music: {
    label: "Music & Streaming practice dataset",
    url: "/data/practice/music_messy.csv",
    modelUrl: "/data/practice/music_model/fact_activity.csv",
  },
  netflix: {
    label: "TV & Streaming practice dataset",
    url: "/data/practice/netflix_messy.csv",
    modelUrl: "/data/practice/netflix_model/fact_activity.csv",
  },
  shopping: {
    label: "Online Shopping practice dataset",
    url: "/data/practice/shopping_messy.csv",
    modelUrl: "/data/practice/shopping_model/fact_activity.csv",
  },
  retail: {
    label: "Retail practice dataset",
    url: "/data/practice/retail_messy.csv",
    modelUrl: "/data/practice/retail_model/fact_activity.csv",
  },
};
