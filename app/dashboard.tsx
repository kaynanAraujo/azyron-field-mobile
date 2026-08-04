import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DailyProgress } from "@/components/dashboard/DailyProgress";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { NextOrderCard } from "@/components/dashboard/NextOrderCard";
import { QuickAction } from "@/components/dashboard/QuickAction";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import {
  colors,
  layout,
  radii,
  spacing,
  touchInsets,
  typography,
} from "@/constants/theme";
import {
  dailyProgress,
  dashboardMetrics,
  nextOrder,
  quickActions,
  recentActivities,
  weeklyPerformance,
} from "@/data/dashboard";
import type { QuickActionItem } from "@/types/dashboard";
import { formatUserName } from "@/utils/formatUserName";
import { getGreeting } from "@/utils/getGreeting";

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
});

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function formatCurrentDate() {
  const formattedDate = DATE_FORMATTER.format(new Date());

  return `${formattedDate.charAt(0).toLocaleUpperCase("pt-BR")}${formattedDate.slice(1)}`;
}

export default function DashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { email } = useLocalSearchParams<{
    email?: string | string[];
  }>();

  const isCompactScreen = width <= layout.compactScreenMaxWidth;
  const showTwoActionColumns =
    width >= layout.quickActionsTwoColumnMinWidth;
  const userName = formatUserName(getFirstParam(email));
  const greeting = getGreeting();
  const currentDate = formatCurrentDate();

  function sair() {
    router.replace("/");
  }

  function abrirProximaOrdem() {
    router.push({
      pathname: "/ordem/[id]",
      params: {
        id: String(nextOrder.id),
      },
    });
  }

  function mostrarEmBreve(feature: string) {
    Alert.alert(
      `${feature} em breve`,
      `Estamos preparando a área de ${feature.toLocaleLowerCase("pt-BR")} para uma próxima atualização.`
    );
  }

  function executarAcaoRapida(action: QuickActionItem) {
    switch (action.target) {
      case "orders":
        router.push("/ordens");
        return;
      case "reports":
        router.push("/relatorios");
        return;
      case "history":
        mostrarEmBreve("Histórico");
        return;
      case "map":
        mostrarEmBreve("Mapa");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          isCompactScreen && styles.compactContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.brand}>AZYRON FIELD</Text>

            <Text
              accessibilityRole="header"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.greeting}
            >
              {greeting}, {userName} 👋
            </Text>

            <Text style={styles.role}>Técnico de campo</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>

          <TouchableOpacity
            style={styles.exitButton}
            onPress={sair}
            activeOpacity={0.72}
            accessibilityRole="button"
            accessibilityLabel="Sair da conta"
            hitSlop={touchInsets.comfortable}
          >
            <Ionicons
              name="log-out-outline"
              size={18}
              color={colors.textSecondary}
            />
            <Text style={styles.exitButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeading}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Visão geral
          </Text>
          <View style={styles.todayBadge}>
            <Text style={styles.todayBadgeText}>Hoje</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          {dashboardMetrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </View>

        <View style={styles.section}>
          <WeeklyChart data={weeklyPerformance} />
        </View>

        <View style={styles.section}>
          <DailyProgress progress={dailyProgress} />
        </View>

        <View style={styles.section}>
          <NextOrderCard
            order={nextOrder}
            onPress={abrirProximaOrdem}
          />
        </View>

        <View style={styles.section}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Ações rápidas
          </Text>
          <Text style={styles.sectionDescription}>
            Acesse as ferramentas mais usadas no atendimento.
          </Text>

          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickAction
                key={action.id}
                item={action}
                twoColumns={showTwoActionColumns}
                onPress={() => executarAcaoRapida(action)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <RecentActivity items={recentActivities} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    width: "100%",
    maxWidth: layout.dashboardContentMaxWidth,
    alignSelf: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  compactContent: {
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacing.xxl,
  },
  headerCopy: {
    flex: 1,
    minWidth: 0,
    paddingRight: spacing.sm,
  },
  brand: {
    color: colors.primary,
    fontSize: typography.sizes.eyebrow,
    fontWeight: typography.weights.bold,
    letterSpacing: 2.2,
    marginBottom: spacing.sm,
  },
  greeting: {
    color: colors.text,
    fontSize: typography.sizes.title,
    lineHeight: typography.lineHeights.title,
    fontWeight: typography.weights.bold,
    flexShrink: 1,
  },
  role: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    marginTop: spacing.xs,
  },
  date: {
    color: colors.textMuted,
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.compact,
    marginTop: spacing.xxs,
  },
  exitButton: {
    minHeight: layout.minimumTouchTarget,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.medium,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  exitButtonText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.semibold,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    flexShrink: 1,
    color: colors.text,
    fontSize: typography.sizes.subtitle,
    lineHeight: typography.lineHeights.subtitle,
    fontWeight: typography.weights.bold,
  },
  sectionDescription: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    lineHeight: typography.lineHeights.body,
    marginTop: spacing.xxs,
    marginBottom: spacing.md,
  },
  todayBadge: {
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  todayBadgeText: {
    color: colors.primaryLight,
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.bold,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.sm,
  },
  section: {
    marginTop: layout.dashboardSectionGap,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.sm,
  },
});
