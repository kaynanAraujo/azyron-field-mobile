import type { TextStyle, ViewStyle } from "react-native";

import type { MetricTone } from "@/types/dashboard";

export const colors = {
  background: "#0B0D12",
  surface: "#151820",
  surfaceElevated: "#1B1F29",
  border: "#292D38",
  borderStrong: "#373C49",
  primary: "#7C5CFC",
  primarySoft: "#252035",
  primaryLight: "#B9A8FF",
  text: "#FFFFFF",
  textSecondary: "#A7ABB7",
  textMuted: "#7D8290",
  success: "#59D49C",
  successSoft: "#172A22",
  warning: "#F2B65D",
  warningSoft: "#2E2618",
  danger: "#FF7185",
  dangerSoft: "#311C24",
  info: "#6CB6FF",
  infoSoft: "#172637",
  black: "#000000",
  white: "#FFFFFF",
  overlay: "rgba(5, 6, 10, 0.72)",
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  section: 28,
  screen: 24,
} as const;

export const radii = {
  small: 10,
  medium: 14,
  large: 18,
  xlarge: 24,
  pill: 999,
} as const;

export const layout = {
  dashboardContentMaxWidth: 720,
  compactScreenMaxWidth: 359,
  quickActionsTwoColumnMinWidth: 430,
  minimumTouchTarget: 44,
  mediumIconSize: 40,
  metricCardMinWidth: 132,
  metricCardMinHeight: 150,
  quickActionMinHeight: 104,
  dashboardSectionGap: spacing.xxl,
} as const;

export const touchInsets = {
  comfortable: {
    top: spacing.xs,
    right: spacing.xs,
    bottom: spacing.xs,
    left: spacing.xs,
  },
} as const;

export const typography = {
  sizes: {
    eyebrow: 12,
    caption: 13,
    small: 14,
    body: 15,
    bodyLarge: 17,
    subtitle: 20,
    title: 28,
    display: 34,
    metric: 32,
  },
  lineHeights: {
    compact: 18,
    caption: 18,
    small: 20,
    body: 22,
    bodyLarge: 25,
    subtitle: 27,
    title: 34,
    display: 40,
  },
  weights: {
    regular: "400" as TextStyle["fontWeight"],
    medium: "500" as TextStyle["fontWeight"],
    semibold: "600" as TextStyle["fontWeight"],
    bold: "700" as TextStyle["fontWeight"],
  },
} as const;

export const shadows: Record<"card" | "floating" | "primary", ViewStyle> = {
  card: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 3,
  },
  floating: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 22,
    elevation: 6,
  },
  primary: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 5,
  },
};

export const tones = {
  primary: {
    accent: colors.primary,
    background: colors.primarySoft,
    border: colors.primary,
  },
  success: {
    accent: colors.success,
    background: colors.successSoft,
    border: colors.success,
  },
  warning: {
    accent: colors.warning,
    background: colors.warningSoft,
    border: colors.warning,
  },
  danger: {
    accent: colors.danger,
    background: colors.dangerSoft,
    border: colors.danger,
  },
  info: {
    accent: colors.info,
    background: colors.infoSoft,
    border: colors.info,
  },
  neutral: {
    accent: colors.textSecondary,
    background: colors.surfaceElevated,
    border: colors.borderStrong,
  },
} as const satisfies Record<
  MetricTone,
  { accent: string; background: string; border: string }
>;

export const theme = {
  colors,
  spacing,
  radii,
  layout,
  touchInsets,
  typography,
  shadows,
  tones,
} as const;
