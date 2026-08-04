import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

export type DashboardIconName = ComponentProps<typeof Ionicons>["name"];

export type MetricTone =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export type DashboardMetric = {
  id: string;
  label: string;
  value: number | string;
  icon: DashboardIconName;
  tone: MetricTone;
};

export type ChartDataPoint = {
  id: string;
  label: string;
  value: number;
};

export type WeeklyPerformance = ChartDataPoint & {
  fullLabel?: string;
};

export type DailyProgressData = {
  completed: number;
  total: number;
};

export type NextOrder = {
  id: number;
  number: string;
  client: string;
  time: string;
  address: string;
  service: string;
  status: string;
};

export type QuickActionTarget =
  | "orders"
  | "reports"
  | "history"
  | "map";

export type QuickActionItem = {
  id: string;
  title: string;
  description: string;
  icon: DashboardIconName;
  target: QuickActionTarget;
};

export type RecentActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: DashboardIconName;
  tone: MetricTone;
};

export type ReportPeriod = "today" | "week" | "month";

export type ReportFilter = {
  id: ReportPeriod;
  label: string;
};

export type StatusDistributionItem = {
  id: string;
  label: string;
  value: number;
  percentage: number;
  tone: MetricTone;
};

export type PopularServiceItem = {
  id: string;
  name: string;
  count: number;
  percentage: number;
};

export type ReportData = {
  metrics: readonly DashboardMetric[];
  performance: readonly WeeklyPerformance[];
  statusDistribution: readonly StatusDistributionItem[];
  popularServices: readonly PopularServiceItem[];
};

export type ReportDataByPeriod = Record<ReportPeriod, ReportData>;
