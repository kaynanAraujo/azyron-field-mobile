import { useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function voltar() {
    router.back();
  }

  function entrar() {
    if (email.trim() === "" || senha.trim() === "") {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha o e-mail e a senha."
      );

      return;
    }

    router.replace({
      pathname: "/dashboard",
      params: {
        email: email.trim(),
      },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={voltar}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Voltar para a tela inicial"
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.logo}>AZYRON FIELD</Text>

          <Text style={styles.title}>Acesse sua conta</Text>

          <Text style={styles.description}>
            Entre para visualizar seus atendimentos e ordens de serviço.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>E-mail</Text>

            <TextInput
              style={styles.input}
              accessibilityLabel="E-mail"
              placeholder="seuemail@empresa.com"
              placeholderTextColor="#656A78"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha</Text>

            <TextInput
              style={styles.input}
              accessibilityLabel="Senha"
              placeholder="Digite sua senha"
              placeholderTextColor="#656A78"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={entrar}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Entrar no Azyron Field"
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0D12",
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 14,
  },

  backButtonText: {
    color: "#A7ABB7",
    fontSize: 16,
    fontWeight: "600",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 60,
  },

  logo: {
    color: "#7C5CFC",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
  },

  description: {
    color: "#A7ABB7",
    fontSize: 17,
    lineHeight: 25,
    marginTop: 14,
    marginBottom: 32,
  },

  form: {
    gap: 12,
  },

  label: {
    color: "#E7E8EC",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },

  input: {
    backgroundColor: "#151820",
    borderWidth: 1,
    borderColor: "#292D38",
    borderRadius: 14,
    color: "#FFFFFF",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  loginButton: {
    backgroundColor: "#7C5CFC",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 14,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
