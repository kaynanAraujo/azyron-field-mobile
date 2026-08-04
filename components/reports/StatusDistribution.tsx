import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, tones, typography } from "@/constants/theme";
import type { StatusDistributionItem } from "@/types/dashboard";
import { getPercentageWidth } from "@/utils/getPercentageWidth";

import { ReportSection } from "./ReportSection";

type StatusDistributionProps = {
  items: readonly StatusDistributionItem[];
};

export function StatusDistribution({ items }: StatusDistributionProps) {
  return (
    <ReportSection
      title="Distribuição por status"
      description="Situação das ordens no período."
      icon="options-outline"
    >
      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.itemHeader}>
              <View style={styles.labelGroup}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: tones[item.tone].accent },
                  ]}
                />
                <Text style={styles.label}>{item.label}</Text>
              </View>

              <Text style={styles.value}>
                {item.value} · {item.percentage}%
              </Text>
            </View>

            <View
              style={styles.track}
              accessibilityRole="progressbar"
              accessibilityLabel={`${item.label}: ${item.value}, ${item.percentage}%`}
              accessibilityValue={{
                min: 0,
                max: 100,
                now: item.percentage,
              }}
            >
              <View
                style={[
                  styles.fill,
                  {
                    width: getPercentageWidth(item.percentage),
                    backgroundColor: tones[item.tone].accent,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </ReportSection>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.lg,
  },
  item: {
    gap: spacing.sm,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  labelGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  statusDot: {
    width: spacing.xs,
    height: spacing.xs,
    flexShrink: 0,
    borderRadius: radii.pill,
  },
  label: {
    flexShrink: 1,
    color: colors.text,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
  },
  value: {
    color: colors.textSecondary,
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.semibold,
  },
  track: {
    height: spacing.xs,
    overflow: "hidden",
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.pill,
  },
  fill: {
    height: "100%",
    borderRadius: radii.pill,
  },
});
