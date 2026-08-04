import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, typography } from "@/constants/theme";
import type { PopularServiceItem } from "@/types/dashboard";
import { getPercentageWidth } from "@/utils/getPercentageWidth";

import { ReportSection } from "./ReportSection";

type PopularServicesProps = {
  items: readonly PopularServiceItem[];
};

export function PopularServices({ items }: PopularServicesProps) {
  return (
    <ReportSection
      title="Serviços mais realizados"
      description="Atividades com maior volume."
      icon="construct-outline"
    >
      <View>
        {items.map((service, index) => (
          <View
            key={service.id}
            style={[
              styles.item,
              index < items.length - 1 && styles.itemWithBorder,
            ]}
            accessible
            accessibilityLabel={`${service.name}: ${service.count} atendimentos`}
          >
            <View style={styles.header}>
              <Text style={styles.name}>{service.name}</Text>
              <Text style={styles.count}>{service.count}</Text>
            </View>

            <View
              style={styles.track}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              <View
                style={[
                  styles.fill,
                  { width: getPercentageWidth(service.percentage) },
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
  item: {
    paddingVertical: spacing.md,
  },
  itemWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  name: {
    flex: 1,
    color: colors.text,
    fontSize: typography.sizes.body,
    lineHeight: typography.lineHeights.body,
    fontWeight: typography.weights.semibold,
  },
  count: {
    color: colors.primaryLight,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.bold,
  },
  track: {
    height: 6,
    overflow: "hidden",
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.pill,
  },
  fill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
  },
});
