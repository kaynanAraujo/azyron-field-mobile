import Ionicons from "@expo/vector-icons/Ionicons";
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
import type { QuickActionItem } from "@/types/dashboard";

type QuickActionProps = {
  item: QuickActionItem;
  onPress: () => void;
  twoColumns?: boolean;
};

export function QuickAction({
  item,
  onPress,
  twoColumns = false,
}: QuickActionProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.72}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}. ${item.description}`}
      accessibilityHint="Toque duas vezes para abrir"
      hitSlop={touchInsets.comfortable}
      style={[styles.action, twoColumns && styles.twoColumnAction]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={22} color={colors.primaryLight} />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
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

      <View style={styles.chevronContainer}>
        <Ionicons
          name="chevron-forward"
          size={17}
          color={colors.textMuted}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action: {
    flexGrow: 1,
    flexBasis: "100%",
    minWidth: 0,
    minHeight: layout.quickActionMinHeight,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.large,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    ...shadows.card,
  },
  twoColumnAction: {
    flexBasis: "46%",
  },
  iconContainer: {
    width: layout.mediumIconSize,
    height: layout.mediumIconSize,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: radii.medium,
  },
  copy: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  },
  title: {
    flexShrink: 1,
    color: colors.text,
    fontSize: typography.sizes.body,
    lineHeight: typography.lineHeights.body,
    fontWeight: typography.weights.bold,
  },
  description: {
    flexShrink: 1,
    color: colors.textMuted,
    fontSize: typography.sizes.eyebrow,
    lineHeight: typography.lineHeights.compact,
    marginTop: spacing.xxs,
  },
  chevronContainer: {
    width: spacing.lg,
    flexShrink: 0,
    alignItems: "flex-end",
  },
});
