import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  colors,
  layout,
  radii,
  shadows,
  spacing,
  touchInsets,
  typography,
} from "@/constants/theme";
import type { NextOrder } from "@/types/dashboard";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type NextOrderCardProps = {
  order: NextOrder;
  onPress: () => void;
};

type DetailRowProps = {
  icon: IoniconName;
  label: string;
  value: string;
};

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIcon}>
        <Ionicons name={icon} size={17} color={colors.textSecondary} />
      </View>

      <View style={styles.detailCopy}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

export function NextOrderCard({ order, onPress }: NextOrderCardProps) {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Próximo atendimento
        </Text>
        <Text style={styles.sectionEyebrow}>Agenda</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.orderHeader}>
          <View style={styles.orderIdentity}>
            <Text style={styles.orderNumber}>{order.number}</Text>
            <Text style={styles.client} numberOfLines={2}>
              {order.client}
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.details}>
          <DetailRow icon="time-outline" label="Horário" value={order.time} />
          <DetailRow
            icon="location-outline"
            label="Endereço"
            value={order.address}
          />
          <DetailRow
            icon="construct-outline"
            label="Serviço"
            value={order.service}
          />
        </View>

        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.78}
          accessibilityRole="button"
          accessibilityLabel={`Abrir ordem ${order.number} de ${order.client}`}
          hitSlop={touchInsets.comfortable}
          style={styles.button}
        >
          <Text style={styles.buttonText} numberOfLines={1}>
            Abrir ordem
          </Text>
          <Ionicons name="arrow-forward" size={18} color={colors.white} />
        </TouchableOpacity>
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
  sectionEyebrow: {
    flexShrink: 0,
    color: colors.textMuted,
    fontSize: typography.sizes.eyebrow,
    lineHeight: typography.lineHeights.compact,
    fontWeight: typography.weights.semibold,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.large,
    padding: spacing.lg,
    ...shadows.card,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  orderIdentity: {
    flex: 1,
    minWidth: 0,
  },
  orderNumber: {
    color: colors.primaryLight,
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.compact,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.8,
  },
  client: {
    color: colors.text,
    fontSize: typography.sizes.subtitle,
    lineHeight: typography.lineHeights.subtitle,
    fontWeight: typography.weights.bold,
    marginTop: spacing.xxs,
  },
  statusBadge: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
    backgroundColor: colors.warningSoft,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    backgroundColor: colors.warning,
    borderRadius: radii.pill,
  },
  statusText: {
    color: colors.warning,
    fontSize: typography.sizes.eyebrow,
    lineHeight: typography.lineHeights.compact,
    fontWeight: typography.weights.bold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  details: {
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  detailIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.small,
  },
  detailCopy: {
    flex: 1,
    minWidth: 0,
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: typography.sizes.eyebrow,
    lineHeight: typography.lineHeights.compact,
    fontWeight: typography.weights.medium,
  },
  detailValue: {
    flexShrink: 1,
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    lineHeight: typography.lineHeights.body,
    fontWeight: typography.weights.medium,
    marginTop: spacing.xxs,
  },
  button: {
    minHeight: layout.minimumTouchTarget,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: radii.medium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginTop: spacing.lg,
    ...shadows.primary,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.body,
    lineHeight: typography.lineHeights.body,
    fontWeight: typography.weights.bold,
  },
});
