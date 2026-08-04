import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MetricCard } from "@/components/dashboard/MetricCard";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { DataSourceNotice } from "@/components/reports/DataSourceNotice";
import { PopularServices } from "@/components/reports/PopularServices";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { StatusDistribution } from "@/components/reports/StatusDistribution";
import { colors, spacing, typography } from "@/constants/theme";
import { reportData, reportFilters } from "@/data/dashboard";
import type { ReportPeriod } from "@/types/dashboard";

const MAX_CONTENT_WIDTH = 760;

export default function ReportsScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] =
    useState<ReportPeriod>("week");

  const selectedReport = reportData[selectedPeriod];
  const selectedFilter = reportFilters.find(
    (filter) => filter.id === selectedPeriod
  );

  function voltar() {
    router.back();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={voltar}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Voltar para a tela anterior"
            hitSlop={8}
          >
            <Ionicons
              accessibilityElementsHidden
              name="arrow-back"
              size={20}
              color={colors.textSecondary}
            />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <Text style={styles.brand}>AZYRON FIELD</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.eyebrow}>DESEMPENHO</Text>
          <Text accessibilityRole="header" style={styles.title}>
            Relatórios
          </Text>
          <Text style={styles.description}>
            Acompanhe a produtividade e os resultados dos atendimentos.
          </Text>

          <ReportFilters
            filters={reportFilters}
            selectedPeriod={selectedPeriod}
            onSelect={setSelectedPeriod}
          />

          <View style={styles.metricsGrid}>
            {selectedReport.metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </View>

          <View style={styles.chartSection}>
            <WeeklyChart
              data={selectedReport.performance}
              title={`Desempenho · ${selectedFilter?.label ?? "Período"}`}
              subtitle="Atendimentos no período"
            />
          </View>

          <StatusDistribution items={selectedReport.statusDistribution} />
          <PopularServices items={selectedReport.popularServices} />
          <DataSourceNotice />
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
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    width: "100%",
    maxWidth: MAX_CONTENT_WIDTH,
    minHeight: 60,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.screen,
  },
  backButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  backButtonText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
  },
  brand: {
    color: colors.primary,
    fontSize: typography.sizes.eyebrow,
    fontWeight: typography.weights.bold,
    letterSpacing: 2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xxxl,
  },
  content: {
    width: "100%",
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: "center",
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xl,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typography.sizes.eyebrow,
    fontWeight: typography.weights.bold,
    letterSpacing: 1.8,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.display,
    lineHeight: typography.lineHeights.display,
    fontWeight: typography.weights.bold,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.sizes.bodyLarge,
    lineHeight: typography.lineHeights.bodyLarge,
    marginTop: spacing.xs,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chartSection: {
    marginTop: spacing.section,
  },
});
