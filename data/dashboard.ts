import type {
  DashboardMetric,
  DailyProgressData,
  NextOrder,
  QuickActionItem,
  RecentActivityItem,
  ReportDataByPeriod,
  ReportFilter,
  WeeklyPerformance,
} from "@/types/dashboard";

export const dashboardMetrics: readonly DashboardMetric[] = [
  {
    id: "today-orders",
    label: "Ordens de hoje",
    value: 8,
    icon: "calendar-outline",
    tone: "primary",
  },
  {
    id: "in-progress",
    label: "Em andamento",
    value: 1,
    icon: "time-outline",
    tone: "warning",
  },
  {
    id: "completed",
    label: "Concluídas",
    value: 5,
    icon: "checkmark-done-outline",
    tone: "success",
  },
  {
    id: "overdue",
    label: "Atrasadas",
    value: 2,
    icon: "alert-circle-outline",
    tone: "danger",
  },
];

export const weeklyPerformance: readonly WeeklyPerformance[] = [
  { id: "monday", label: "Seg", fullLabel: "Segunda-feira", value: 4 },
  { id: "tuesday", label: "Ter", fullLabel: "Terça-feira", value: 6 },
  { id: "wednesday", label: "Qua", fullLabel: "Quarta-feira", value: 5 },
  { id: "thursday", label: "Qui", fullLabel: "Quinta-feira", value: 8 },
  { id: "friday", label: "Sex", fullLabel: "Sexta-feira", value: 7 },
  { id: "saturday", label: "Sáb", fullLabel: "Sábado", value: 3 },
  { id: "sunday", label: "Dom", fullLabel: "Domingo", value: 2 },
];

export const dailyProgress: DailyProgressData = {
  completed: 5,
  total: 8,
};

export const nextOrder: NextOrder = {
  id: 3,
  number: "OS-003",
  client: "Mercado Central",
  time: "14:30",
  address: "Rua São Paulo, 870",
  service: "Verificação do sistema de câmeras",
  status: "Pendente",
};

export const quickActions: readonly QuickActionItem[] = [
  {
    id: "orders",
    title: "Ver ordens",
    description: "Agenda do dia",
    icon: "list-outline",
    target: "orders",
  },
  {
    id: "reports",
    title: "Relatórios",
    description: "Indicadores",
    icon: "bar-chart-outline",
    target: "reports",
  },
  {
    id: "history",
    title: "Histórico",
    description: "Últimos serviços",
    icon: "time-outline",
    target: "history",
  },
  {
    id: "map",
    title: "Mapa",
    description: "Rotas e clientes",
    icon: "map-outline",
    target: "map",
  },
];

export const recentActivities: readonly RecentActivityItem[] = [
  {
    id: "activity-started",
    title: "Ordem iniciada",
    description: "OS-002 · Clínica Vida",
    time: "10:04",
    icon: "play-circle-outline",
    tone: "warning",
  },
  {
    id: "activity-completed",
    title: "Atendimento concluído",
    description: "OS-007 · Auto Center Brasil",
    time: "09:18",
    icon: "checkmark-circle-outline",
    tone: "success",
  },
  {
    id: "activity-photo",
    title: "Foto registrada",
    description: "Evidência adicionada à OS-005",
    time: "08:46",
    icon: "camera-outline",
    tone: "info",
  },
  {
    id: "activity-signature",
    title: "Assinatura coletada",
    description: "Cliente confirmou o atendimento",
    time: "08:32",
    icon: "create-outline",
    tone: "primary",
  },
];

export const reportFilters: readonly ReportFilter[] = [
  { id: "today", label: "Hoje" },
  { id: "week", label: "Semana" },
  { id: "month", label: "Mês" },
];

export const reportData: ReportDataByPeriod = {
  today: {
    metrics: [
      {
        id: "today-total",
        label: "Atendimentos",
        value: 8,
        icon: "calendar-outline",
        tone: "primary",
      },
      {
        id: "today-completed",
        label: "Concluídos",
        value: 5,
        icon: "checkmark-circle-outline",
        tone: "success",
      },
      {
        id: "today-rate",
        label: "Taxa de conclusão",
        value: "63%",
        icon: "analytics-outline",
        tone: "info",
      },
      {
        id: "today-average",
        label: "Tempo médio",
        value: "1h 18m",
        icon: "time-outline",
        tone: "warning",
      },
    ],
    performance: [
      { id: "08", label: "08h", value: 1 },
      { id: "10", label: "10h", value: 2 },
      { id: "12", label: "12h", value: 1 },
      { id: "14", label: "14h", value: 3 },
      { id: "16", label: "16h", value: 1 },
    ],
    statusDistribution: [
      { id: "done", label: "Concluídas", value: 5, percentage: 63, tone: "success" },
      { id: "active", label: "Em andamento", value: 1, percentage: 12, tone: "warning" },
      { id: "pending", label: "Pendentes", value: 2, percentage: 25, tone: "primary" },
    ],
    popularServices: [
      { id: "maintenance", name: "Manutenção preventiva", count: 3, percentage: 60 },
      { id: "installation", name: "Instalação de equipamentos", count: 2, percentage: 40 },
      { id: "network", name: "Suporte de rede", count: 1, percentage: 20 },
    ],
  },
  week: {
    metrics: [
      {
        id: "week-total",
        label: "Atendimentos",
        value: 38,
        icon: "calendar-outline",
        tone: "primary",
      },
      {
        id: "week-completed",
        label: "Concluídos",
        value: 31,
        icon: "checkmark-circle-outline",
        tone: "success",
      },
      {
        id: "week-rate",
        label: "Taxa de conclusão",
        value: "82%",
        icon: "analytics-outline",
        tone: "info",
      },
      {
        id: "week-average",
        label: "Tempo médio",
        value: "1h 12m",
        icon: "time-outline",
        tone: "warning",
      },
    ],
    performance: [
      { id: "monday", label: "Seg", fullLabel: "Segunda-feira", value: 4 },
      { id: "tuesday", label: "Ter", fullLabel: "Terça-feira", value: 6 },
      { id: "wednesday", label: "Qua", fullLabel: "Quarta-feira", value: 5 },
      { id: "thursday", label: "Qui", fullLabel: "Quinta-feira", value: 8 },
      { id: "friday", label: "Sex", fullLabel: "Sexta-feira", value: 7 },
      { id: "saturday", label: "Sáb", fullLabel: "Sábado", value: 5 },
      { id: "sunday", label: "Dom", fullLabel: "Domingo", value: 3 },
    ],
    statusDistribution: [
      { id: "done", label: "Concluídas", value: 31, percentage: 82, tone: "success" },
      { id: "active", label: "Em andamento", value: 3, percentage: 8, tone: "warning" },
      { id: "pending", label: "Pendentes", value: 3, percentage: 8, tone: "primary" },
      { id: "late", label: "Atrasadas", value: 1, percentage: 2, tone: "danger" },
    ],
    popularServices: [
      { id: "maintenance", name: "Manutenção preventiva", count: 12, percentage: 100 },
      { id: "installation", name: "Instalação de equipamentos", count: 9, percentage: 75 },
      { id: "network", name: "Suporte de rede", count: 7, percentage: 58 },
    ],
  },
  month: {
    metrics: [
      {
        id: "month-total",
        label: "Atendimentos",
        value: 146,
        icon: "calendar-outline",
        tone: "primary",
      },
      {
        id: "month-completed",
        label: "Concluídos",
        value: 124,
        icon: "checkmark-circle-outline",
        tone: "success",
      },
      {
        id: "month-rate",
        label: "Taxa de conclusão",
        value: "85%",
        icon: "analytics-outline",
        tone: "info",
      },
      {
        id: "month-average",
        label: "Tempo médio",
        value: "1h 09m",
        icon: "time-outline",
        tone: "warning",
      },
    ],
    performance: [
      { id: "week-1", label: "S1", value: 31 },
      { id: "week-2", label: "S2", value: 36 },
      { id: "week-3", label: "S3", value: 38 },
      { id: "week-4", label: "S4", value: 41 },
    ],
    statusDistribution: [
      { id: "done", label: "Concluídas", value: 124, percentage: 85, tone: "success" },
      { id: "active", label: "Em andamento", value: 7, percentage: 5, tone: "warning" },
      { id: "pending", label: "Pendentes", value: 10, percentage: 7, tone: "primary" },
      { id: "late", label: "Atrasadas", value: 5, percentage: 3, tone: "danger" },
    ],
    popularServices: [
      { id: "maintenance", name: "Manutenção preventiva", count: 46, percentage: 100 },
      { id: "installation", name: "Instalação de equipamentos", count: 34, percentage: 74 },
      { id: "network", name: "Suporte de rede", count: 28, percentage: 61 },
    ],
  },
};
