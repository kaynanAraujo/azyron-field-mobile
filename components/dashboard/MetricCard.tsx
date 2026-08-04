import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import {
  colors,
  layout,
  radii,
  shadows,
  spacing,
  tones,
  typography,
} from "@/constants/theme";
import type { DashboardMetric } from "@/types/dashboard";

type MetricCardProps = {
  metric: DashboardMetric;
  index?: number;
};

export function MetricCard({ metric, index = 0 }: MetricCardProps) {
  const entrance = useRef(new Animated.Value(0)).current;
  const tone = tones[metric.tone];

  useEffect(() => {
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: 360,
      delay: index * 70,
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
  }, [entrance, index]);

  const translateY = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [spacing.md, 0],
  });

  return (
    <Animated.View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`${metric.label}: ${metric.value}`}
      style={[
        styles.card,
        {
          opacity: entrance,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: tone.background }]}>
        <Ionicons name={metric.icon} size={20} color={tone.accent} />
      </View>

      <Text
        style={styles.value}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
        ellipsizeMode="tail"
      >
        {metric.value}
      </Text>
      <Text style={styles.label} numberOfLines={2} ellipsizeMode="tail">
        {metric.label}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: "46%",
    minWidth: layout.metricCardMinWidth,
    minHeight: layout.metricCardMinHeight,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.large,
    padding: spacing.md,
    ...shadows.card,
  },
  iconContainer: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.medium,
    marginBottom: spacing.md,
  },
  value: {
    color: colors.text,
    fontSize: typography.sizes.metric,
    lineHeight: typography.lineHeights.title,
    fontWeight: typography.weights.bold,
  },
  label: {
    flexShrink: 1,
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.compact,
    fontWeight: typography.weights.medium,
    marginTop: spacing.xxs,
  },
});
