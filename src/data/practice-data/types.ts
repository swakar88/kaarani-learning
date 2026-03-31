export interface RawRow {
  date: string;
  entity_name: string;
  category_name: string;
  metric1: number | null;
  metric2: number | null;
  status: string;
  notes: string;
}

export interface GroupedRow {
  category_name: string;
  total_metric1: number;
  avg_metric2: number | null;
  row_count: number;
}

export interface InsightRow {
  label: string;
  value: string;
  interpretation: string;
}

export interface PracticeData {
  flavorId: string;
  /** Column headers for the raw data table (matches CSV headers) */
  columns: string[];
  /** 10 sample rows shown in Screen2 raw table */
  rawRows: RawRow[];
  /** Aggregated rows for Screen2 "Info" table */
  groupedRows: GroupedRow[];
  /** Pattern rows for Screen2 "Insight" table */
  insightRows: InsightRow[];
  /** Suspicious/anomaly rows for Screen4Diagnostic */
  anomalyRows: RawRow[];
  /** Drill-down rows for Screen4Diagnostic */
  drillRows: RawRow[];
  /** Filename for the practice download */
  downloadFileName: string;
  /** Human-readable label for download link */
  downloadLabel: string;
}
