import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, radii, shadows, spacing, typography } from "@/constants/theme";
import type { ReportFilter, ReportPeriod } from "@/types/dashboard";

type ReportFiltersProps = {
  filters: readonly ReportFilter[];
  selectedPeriod: ReportPeriod;
  onSelect: (period: ReportPeriod) => void;
};

export function ReportFilters({
  filters,
  selectedPeriod,
  onSelect,
}: ReportFiltersProps) {
  return (
    <View accessibilityLabel="Período do relatório" style={styles.container}>
      {filters.map((filter) => {
        const isSelected = selectedPeriod === filter.id;

        return (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.button,
              isSelected && styles.selectedButton,
            ]}
            onPress={() => onSelect(filter.id)}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={`Exibir relatório de ${filter.label.toLocaleLowerCase("pt-BR")}`}
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[
                styles.label,
                isSelected && styles.selectedLabel,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.xs,
    padding: spacing.xxs,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.medium,
  },
  button: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.small,
  },
  selectedButton: {
    backgroundColor: colors.primary,
    ...shadows.primary,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
  },
  selectedLabel: {
    color: colors.white,
  },
});
