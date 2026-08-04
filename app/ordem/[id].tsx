import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ordens } from "@/data/ordens";

export default function OrdemDetalhesScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const ordemId = Number(id);

  const ordem = ordens.find((item) => item.id === ordemId);

  const [statusAtual, setStatusAtual] = useState(
    ordem?.status ?? "Pendente"
  );

  function voltar() {
    router.back();
  }

  function abrirAtendimento(id: number) {
  router.push({
    pathname: "/atendimento/[id]",
    params: {
      id: String(id),
    },
  });
}

  function iniciarAtendimento() {
    setStatusAtual("Em andamento");

    Alert.alert(
      "Atendimento iniciado",
      `A ordem ${ordem?.numero} está em andamento.`
    );
  }

  if (!ordem) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>
            Ordem não encontrada
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={voltar}
          >
            <Text style={styles.primaryButtonText}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={voltar}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.orderNumber}>
          {ordem.numero}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {statusAtual}
          </Text>
        </View>

        <Text style={styles.clientName}>
          {ordem.cliente}
        </Text>

        <Text style={styles.serviceTitle}>
          {ordem.servico}
        </Text>

        <View style={styles.informationCard}>
          <Text style={styles.label}>Horário</Text>
          <Text style={styles.value}>
            {ordem.horario}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Endereço</Text>
          <Text style={styles.value}>
            {ordem.endereco}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.value}>
            {ordem.telefone}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Descrição do atendimento
        </Text>

        <View style={styles.descriptionCard}>
          <Text style={styles.description}>
            {ordem.descricao}
          </Text>
        </View>

        {statusAtual !== "Em andamento" && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={iniciarAtendimento}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              Iniciar atendimento
            </Text>
          </TouchableOpacity>
        )}

        {statusAtual === "Em andamento" && (
  <TouchableOpacity
    style={styles.startedMessage}
    onPress={() => abrirAtendimento(ordem.id)}
    activeOpacity={0.8}
  >
    <Text style={styles.startedMessageText}>
      Preencher atendimento
    </Text>
  </TouchableOpacity>
)}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },

  backText: {
    color: "#A7ABB7",
    fontSize: 16,
    fontWeight: "600",
  },

  orderNumber: {
    color: "#7C5CFC",
    fontSize: 14,
    fontWeight: "700",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },

  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#252035",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 20,
  },

  statusText: {
    color: "#B9A8FF",
    fontSize: 13,
    fontWeight: "700",
  },

  clientName: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },

  serviceTitle: {
    color: "#A7ABB7",
    fontSize: 17,
    lineHeight: 25,
    marginTop: 10,
    marginBottom: 28,
  },

  informationCard: {
    backgroundColor: "#151820",
    borderWidth: 1,
    borderColor: "#292D38",
    borderRadius: 16,
    padding: 18,
  },

  label: {
    color: "#7D8290",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 23,
  },

  divider: {
    height: 1,
    backgroundColor: "#292D38",
    marginVertical: 16,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 12,
  },

  descriptionCard: {
    backgroundColor: "#151820",
    borderWidth: 1,
    borderColor: "#292D38",
    borderRadius: 16,
    padding: 18,
  },

  description: {
    color: "#D8DAE2",
    fontSize: 15,
    lineHeight: 23,
  },

  primaryButton: {
    backgroundColor: "#7C5CFC",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 28,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  startedMessage: {
    backgroundColor: "#172A22",
    borderWidth: 1,
    borderColor: "#285A43",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 28,
  },

  startedMessageText: {
    color: "#73D6A5",
    fontSize: 16,
    fontWeight: "700",
  },

  notFound: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  notFoundTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
});
