import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, typography } from "@/constants/theme";

export function DataSourceNotice() {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Os dados exibidos são demonstrativos e serão conectados ao Supabase futuramente."
    >
      <View style={styles.iconContainer}>
        <Ionicons
          accessibilityElementsHidden
          name="cloud-outline"
          size={22}
          color={colors.info}
        />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title}>Dados demonstrativos</Text>
        <Text style={styles.text}>
          Estes indicadores serão conectados ao Supabase em uma próxima etapa.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    padding: spacing.md,
    marginTop: spacing.section,
    backgroundColor: colors.infoSoft,
    borderWidth: 1,
    borderColor: colors.info,
    borderRadius: radii.medium,
  },
  iconContainer: {
    width: 40,
    height: 40,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.small,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xxs,
  },
  text: {
    color: colors.textSecondary,
    fontSize: typography.sizes.small,
    lineHeight: typography.lineHeights.small,
  },
});
