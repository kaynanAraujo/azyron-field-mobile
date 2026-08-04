import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  function entrar() {
  router.push("/login");
}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.logo}>AZYRON FIELD</Text>

      <Text style={styles.title}>
        Gestão de serviços em campo
      </Text>

      <Text style={styles.description}>
        Organize ordens de serviço, clientes e atendimentos em um só lugar.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={entrar}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0D12",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  logo: {
    color: "#7C5CFC",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 43,
  },

  description: {
    color: "#A7ABB7",
    fontSize: 17,
    lineHeight: 25,
    marginTop: 16,
    marginBottom: 36,
  },

  button: {
    backgroundColor: "#7C5CFC",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
