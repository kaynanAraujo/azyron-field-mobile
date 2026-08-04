import { useEffect, useMemo } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import {
  colors,
  radii,
  shadows,
  spacing,
  typography,
} from "@/constants/theme";
import type { WeeklyPerformance } from "@/types/dashboard";

const CHART_HEIGHT = 120;
const MINIMUM_BAR_HEIGHT = spacing.xxs;

type WeeklyChartProps = {
  data: readonly WeeklyPerformance[];
  title?: string;
  subtitle?: string;
};

export function WeeklyChart({
  data,
  title = "Desempenho semanal",
  subtitle = "Atendimentos por dia",
}: WeeklyChartProps) {
  const animatedBars = useMemo(
    () => data.map(() => new Animated.Value(0)),
    [data],
  );
  const maximumValue = Math.max(1, ...data.map((item) => item.value));

  useEffect(() => {
    animatedBars.forEach((value) => value.setValue(0));

    const animation = Animated.stagger(
      65,
      animatedBars.map((value) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 460,
          useNativeDriver: false,
        }),
      ),
    );

    animation.start();

    return () => animation.stop();
  }, [animatedBars]);

  const accessibilitySummary = data
    .map((item) => `${item.fullLabel ?? item.label}: ${item.value}`)
    .join(", ");

  return (
    <View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`${title}. ${accessibilitySummary}`}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.legend}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Maior resultado</Text>
        </View>
      </View>

      <View style={styles.chart}>
        {data.map((item, index) => {
          const isHighest = item.value === maximumValue;
          const targetHeight = Math.max(
            MINIMUM_BAR_HEIGHT,
            (item.value / maximumValue) * CHART_HEIGHT,
          );
          const animatedHeight = animatedBars[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, targetHeight],
          });

          return (
            <View key={item.id} style={styles.barColumn}>
              <Text style={[styles.value, isHighest && styles.highlightedValue]}>
                {item.value}
              </Text>

              <View style={styles.barTrack}>
                <Animated.View
                  style={[
                    styles.bar,
                    isHighest ? styles.highlightedBar : styles.defaultBar,
                    { height: animatedHeight },
                  ]}
                />
              </View>

              <Text style={[styles.day, isHighest && styles.highlightedDay]}>
                {item.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.large,
    padding: spacing.lg,
    ...shadows.card,
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  headerCopy: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 148,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.bodyLarge,
    lineHeight: typography.lineHeights.bodyLarge,
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.compact,
    marginTop: spacing.xxs,
  },
  legend: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: spacing.xxs,
    marginTop: spacing.xxs,
  },
  legendDot: {
    width: spacing.xs,
    height: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  legendText: {
    flexShrink: 1,
    color: colors.textMuted,
    fontSize: typography.sizes.eyebrow,
    lineHeight: typography.lineHeights.compact,
    textAlign: "right",
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: spacing.xxs,
  },
  barColumn: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
  },
  value: {
    color: colors.textMuted,
    fontSize: typography.sizes.eyebrow,
    lineHeight: typography.lineHeights.compact,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
  },
  highlightedValue: {
    color: colors.primaryLight,
  },
  barTrack: {
    width: "100%",
    maxWidth: 22,
    height: CHART_HEIGHT,
    justifyContent: "flex-end",
    overflow: "hidden",
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.pill,
  },
  bar: {
    width: "100%",
    borderRadius: radii.pill,
  },
  defaultBar: {
    backgroundColor: colors.borderStrong,
  },
  highlightedBar: {
    backgroundColor: colors.primary,
  },
  day: {
    color: colors.textSecondary,
    fontSize: typography.sizes.eyebrow,
    lineHeight: typography.lineHeights.compact,
    fontWeight: typography.weights.medium,
    marginTop: spacing.xs,
  },
  highlightedDay: {
    color: colors.primaryLight,
    fontWeight: typography.weights.bold,
  },
});
