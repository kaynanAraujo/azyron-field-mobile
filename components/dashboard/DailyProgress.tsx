import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import {
  colors,
  layout,
  radii,
  shadows,
  spacing,
  typography,
} from "@/constants/theme";
import type { DailyProgressData } from "@/types/dashboard";

type DailyProgressProps = {
  progress: DailyProgressData;
};

export function DailyProgress({ progress }: DailyProgressProps) {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const percentage =
    progress.total > 0
      ? Math.min(100, Math.max(0, (progress.completed / progress.total) * 100))
      : 0;
  const roundedPercentage = Math.round(percentage);

  useEffect(() => {
    animatedProgress.setValue(0);

    const animation = Animated.timing(animatedProgress, {
      toValue: percentage,
      duration: 650,
      useNativeDriver: false,
    });

    animation.start();

    return () => animation.stop();
  }, [animatedProgress, percentage]);

  const animatedWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="checkmark-done-outline"
              size={20}
              color={colors.success}
            />
          </View>

          <View style={styles.titleCopy}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              Progresso diário
            </Text>
            <Text
              style={styles.subtitle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Meta de atendimentos de hoje
            </Text>
          </View>
        </View>

        <Text style={styles.percentage}>{roundedPercentage}%</Text>
      </View>

      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel="Progresso diário de atendimentos"
        accessibilityValue={{
          min: 0,
          max: 100,
          now: roundedPercentage,
          text: `${progress.completed} de ${progress.total} atendimentos concluídos`,
        }}
        style={styles.progressTrack}
      >
        <Animated.View style={[styles.progressFill, { width: animatedWidth }]} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.progressText}>
          <Text style={styles.completed}>{progress.completed}</Text> de{" "}
          {progress.total} concluídos
        </Text>
        <Text style={styles.remainingText}>
          {Math.max(0, progress.total - progress.completed)} restantes
        </Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  titleGroup: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  titleCopy: {
    flex: 1,
    minWidth: 0,
  },
  iconContainer: {
    width: layout.mediumIconSize,
    height: layout.mediumIconSize,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.successSoft,
    borderRadius: radii.medium,
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
  percentage: {
    flexShrink: 0,
    color: colors.success,
    fontSize: typography.sizes.subtitle,
    lineHeight: typography.lineHeights.bodyLarge,
    fontWeight: typography.weights.bold,
  },
  progressTrack: {
    height: spacing.sm,
    overflow: "hidden",
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.pill,
    marginTop: spacing.lg,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.success,
    borderRadius: radii.pill,
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  progressText: {
    flexShrink: 1,
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.compact,
  },
  completed: {
    color: colors.text,
    fontWeight: typography.weights.bold,
  },
  remainingText: {
    flexShrink: 0,
    color: colors.textMuted,
    fontSize: typography.sizes.eyebrow,
    lineHeight: typography.lineHeights.compact,
  },
});
