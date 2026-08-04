import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

import {
  colors,
  layout,
  radii,
  shadows,
  spacing,
  tones,
  typography,
} from "@/constants/theme";
import type { RecentActivityItem } from "@/types/dashboard";

type RecentActivityProps = {
  items: readonly RecentActivityItem[];
};

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Atividades recentes
        </Text>
        <Ionicons name="pulse-outline" size={20} color={colors.textMuted} />
      </View>

      <View style={styles.card}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma atividade recente.</Text>
        ) : (
          items.map((item, index) => {
            const tone = tones[item.tone];

            return (
              <View key={item.id}>
                <View
                  accessible
                  accessibilityRole="summary"
                  accessibilityLabel={`${item.title}. ${item.description}. Às ${item.time}`}
                  style={styles.activity}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: tone.background },
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={tone.accent}
                    />
                  </View>

                  <View style={styles.copy}>
                    <Text
                      style={styles.title}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={styles.description}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.description}
                    </Text>
                  </View>

                  <Text style={styles.time}>{item.time}</Text>
                </View>

                {index === items.length - 1 ? null : <View style={styles.divider} />}
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    color: colors.text,
    fontSize: typography.sizes.subtitle,
    lineHeight: typography.lineHeights.subtitle,
    fontWeight: typography.weights.bold,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.large,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  activity: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  iconContainer: {
    width: layout.mediumIconSize,
    height: layout.mediumIconSize,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.medium,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.body,
    lineHeight: typography.lineHeights.body,
    fontWeight: typography.weights.semibold,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.compact,
    marginTop: spacing.xxs,
  },
  time: {
    minWidth: 36,
    flexShrink: 0,
    alignSelf: "flex-start",
    color: colors.textSecondary,
    fontSize: typography.sizes.eyebrow,
    lineHeight: typography.lineHeights.compact,
    fontWeight: typography.weights.semibold,
    marginTop: spacing.xxs,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: layout.mediumIconSize + spacing.sm,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.sizes.body,
    lineHeight: typography.lineHeights.body,
    textAlign: "center",
    paddingVertical: spacing.xl,
  },
});
