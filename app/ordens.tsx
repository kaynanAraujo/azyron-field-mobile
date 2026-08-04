import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ordens } from "@/data/ordens";

export default function OrdensScreen() {
  const router = useRouter();

  function voltar() {
    router.back();
  }

  function abrirOrdem(id: number) {
    router.push({
      pathname: "/ordem/[id]",
      params: {
        id: String(id),
      },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity onPress={voltar} activeOpacity={0.7}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.logo}>AZYRON FIELD</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Ordens de serviço</Text>

        <Text style={styles.description}>
          Confira os atendimentos programados para hoje.
        </Text>

        <View style={styles.orderList}>
          {ordens.map((ordem) => (
            <TouchableOpacity
              key={ordem.id}
              style={styles.orderCard}
              onPress={() => abrirOrdem(ordem.id)}
              activeOpacity={0.8}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>{ordem.numero}</Text>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{ordem.status}</Text>
                </View>
              </View>

              <Text style={styles.clientName}>{ordem.cliente}</Text>

              <Text style={styles.serviceDescription}>
                {ordem.servico}
              </Text>

              <Text style={styles.time}>
                Horário: {ordem.horario}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0D12",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },

  backText: {
    color: "#A7ABB7",
    fontSize: 16,
    fontWeight: "600",
  },

  logo: {
    color: "#7C5CFC",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },

  description: {
    color: "#A7ABB7",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
    marginBottom: 28,
  },

  orderList: {
    gap: 14,
  },

  orderCard: {
    backgroundColor: "#151820",
    borderWidth: 1,
    borderColor: "#292D38",
    borderRadius: 16,
    padding: 18,
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  orderNumber: {
    color: "#7C5CFC",
    fontSize: 14,
    fontWeight: "700",
  },

  statusBadge: {
    backgroundColor: "#252035",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },

  statusText: {
    color: "#B9A8FF",
    fontSize: 12,
    fontWeight: "700",
  },

  clientName: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
  },

  serviceDescription: {
    color: "#A7ABB7",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },

  time: {
    color: "#D8DAE2",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 16,
  },
});
