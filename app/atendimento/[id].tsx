import { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import SignatureScreen, {
  type SignatureViewRef,
} from "react-native-signature-canvas";

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ordens } from "../../data/ordens";

const estiloAssinatura = `
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #FFFFFF;
  }

  .m-signature-pad {
    width: 100%;
    height: 100%;
    margin: 0;
    box-shadow: none;
    border: none;
  }

  .m-signature-pad--body {
    top: 0;
    right: 0;
    bottom: 0 !important;
    left: 0;
    border: none;
  }

  .m-signature-pad--footer {
    display: none;
    margin: 0;
  }
`;

export default function AtendimentoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const assinaturaRef = useRef<SignatureViewRef>(null);
  const { id } = useLocalSearchParams<{ id: string }>();

  const ordemId = Number(id);
  const ordem = ordens.find((item) => item.id === ordemId);

  const [laudo, setLaudo] = useState("");
  const [materiais, setMateriais] = useState("");
  const [fotoAntes, setFotoAntes] = useState<string | null>(null);
  const [fotoDepois, setFotoDepois] = useState<string | null>(null);
  const [assinatura, setAssinatura] = useState<string | null>(null);
  const [modalAssinaturaVisivel, setModalAssinaturaVisivel] =
    useState(false);

  function voltar() {
    router.back();
  }

  async function tirarFotoAntes() {
    const permissao =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para registrar a foto."
      );

      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setFotoAntes(resultado.assets[0].uri);
    }
  }

  async function tirarFotoDepois() {
    const permissao =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para registrar a foto."
      );

      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setFotoDepois(resultado.assets[0].uri);
    }
  }

  function abrirAssinatura() {
    setModalAssinaturaVisivel(true);
  }

  function fecharAssinatura() {
    setModalAssinaturaVisivel(false);
  }

  function salvarAssinatura(imagem: string) {
    setAssinatura(imagem);
    setModalAssinaturaVisivel(false);

    Alert.alert(
      "Assinatura registrada",
      "A assinatura do cliente foi salva."
    );
  }

  function assinaturaVazia() {
    Alert.alert(
      "Assinatura vazia",
      "Peça para o cliente assinar antes de confirmar."
    );
  }

  function limparAssinatura() {
    assinaturaRef.current?.clearSignature();
  }

  function confirmarAssinatura() {
    assinaturaRef.current?.readSignature();
  }

  function finalizarAtendimento() {
    if (laudo.trim() === "") {
      Alert.alert(
        "Laudo obrigatório",
        "Descreva o serviço realizado antes de finalizar."
      );

      return;
    }

    if (!fotoAntes) {
      Alert.alert(
        "Foto obrigatória",
        "Registre uma foto antes do serviço."
      );

      return;
    }

    if (!fotoDepois) {
      Alert.alert(
        "Foto obrigatória",
        "Registre uma foto depois do serviço."
      );

      return;
    }

    if (!assinatura) {
      Alert.alert(
        "Assinatura obrigatória",
        "Solicite a assinatura do cliente antes de finalizar."
      );

      return;
    }

    Alert.alert(
      "Atendimento concluído",
      `A ordem ${ordem?.numero} foi preenchida com sucesso.`,
      [
        {
          text: "Voltar às ordens",
          onPress: () => router.replace("/ordens"),
        },
      ]
    );
  }

  if (!ordem) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundTitle}>
            Ordem não encontrada
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={voltar}
            activeOpacity={0.8}
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

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            Registrar atendimento
          </Text>

          <Text style={styles.description}>
            Preencha as informações do serviço realizado para{" "}
            {ordem.cliente}.
          </Text>

          <Text style={styles.label}>
            Laudo técnico *
          </Text>

          <TextInput
            style={styles.largeInput}
            placeholder="Descreva o problema encontrado e o serviço realizado..."
            placeholderTextColor="#656A78"
            multiline
            textAlignVertical="top"
            value={laudo}
            onChangeText={setLaudo}
          />

          <Text style={styles.label}>
            Materiais utilizados
          </Text>

          <TextInput
            style={styles.largeInput}
            placeholder="Exemplo: cabo de rede, conector, fonte..."
            placeholderTextColor="#656A78"
            multiline
            textAlignVertical="top"
            value={materiais}
            onChangeText={setMateriais}
          />

          <Text style={styles.label}>
            Foto antes do serviço
          </Text>

          <TouchableOpacity
            style={styles.photoButton}
            onPress={tirarFotoAntes}
            activeOpacity={0.8}
          >
            <Text style={styles.photoButtonText}>
              {fotoAntes
                ? "Tirar outra foto"
                : "Abrir câmera"}
            </Text>
          </TouchableOpacity>

          {fotoAntes && (
            <Image
              source={{ uri: fotoAntes }}
              style={styles.photoPreview}
            />
          )}

          <Text style={styles.label}>
            Foto depois do serviço
          </Text>

          <TouchableOpacity
            style={styles.photoButton}
            onPress={tirarFotoDepois}
            activeOpacity={0.8}
          >
            <Text style={styles.photoButtonText}>
              {fotoDepois
                ? "Tirar outra foto"
                : "Abrir câmera"}
            </Text>
          </TouchableOpacity>

          {fotoDepois && (
            <Image
              source={{ uri: fotoDepois }}
              style={styles.photoPreview}
            />
          )}

          <Text style={styles.label}>
            Assinatura do cliente
          </Text>

          <TouchableOpacity
            style={styles.photoButton}
            onPress={abrirAssinatura}
            activeOpacity={0.8}
          >
            <Text style={styles.photoButtonText}>
              {assinatura
                ? "Refazer assinatura"
                : "Coletar assinatura"}
            </Text>
          </TouchableOpacity>

          {assinatura && (
            <View style={styles.signaturePreview}>
              <Image
                source={{ uri: assinatura }}
                style={styles.signatureImage}
                resizeMode="contain"
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={finalizarAtendimento}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              Finalizar atendimento
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={modalAssinaturaVisivel}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={fecharAssinatura}
      >
        <View style={styles.signatureModal}>
          <StatusBar style="light" />

          <View
            style={[
              styles.signatureHeader,
              { paddingTop: insets.top + 12 },
            ]}
          >
            <Text style={styles.signatureTitle}>
              Assinatura do cliente
            </Text>

            <TouchableOpacity
              onPress={fecharAssinatura}
              activeOpacity={0.7}
            >
              <Text style={styles.signatureClose}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.signatureInstruction}>
            Assine com o dedo dentro do quadro branco.
          </Text>

          <View style={styles.signatureCanvas}>
            <SignatureScreen
              ref={assinaturaRef}
              onOK={salvarAssinatura}
              onEmpty={assinaturaVazia}
              descriptionText=""
              penColor="#0B0D12"
              backgroundColor="#FFFFFF"
              webStyle={estiloAssinatura}
              autoClear={false}
              imageType="image/png"
            />
          </View>

          <View
            style={[
              styles.signatureActions,
              { paddingBottom: insets.bottom + 16 },
            ]}
          >
            <TouchableOpacity
              style={styles.signatureClearButton}
              onPress={limparAssinatura}
              activeOpacity={0.8}
            >
              <Text style={styles.signatureClearButtonText}>
                Limpar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signatureConfirmButton}
              onPress={confirmarAssinatura}
              activeOpacity={0.8}
            >
              <Text style={styles.signatureConfirmButtonText}>
                Confirmar assinatura
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0D12",
  },

  keyboardView: {
    flex: 1,
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
    paddingBottom: 60,
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
    marginBottom: 30,
  },

  label: {
    color: "#E7E8EC",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 16,
  },

  largeInput: {
    minHeight: 140,
    backgroundColor: "#151820",
    borderWidth: 1,
    borderColor: "#292D38",
    borderRadius: 16,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 23,
    padding: 16,
  },

  photoButton: {
    backgroundColor: "#151820",
    borderWidth: 1,
    borderColor: "#343844",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
  },

  photoButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  photoPreview: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginTop: 14,
  },

  signaturePreview: {
    height: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginTop: 14,
    overflow: "hidden",
  },

  signatureImage: {
    width: "100%",
    height: "100%",
  },

  signatureModal: {
    flex: 1,
    backgroundColor: "#0B0D12",
  },

  signatureHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 18,
  },

  signatureTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  signatureClose: {
    color: "#B9A8FF",
    fontSize: 16,
    fontWeight: "700",
  },

  signatureInstruction: {
    color: "#A7ABB7",
    fontSize: 15,
    lineHeight: 21,
    paddingHorizontal: 24,
    marginBottom: 12,
  },

  signatureCanvas: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
  },

  signatureActions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  signatureClearButton: {
    flex: 1,
    minHeight: 54,
    borderWidth: 1,
    borderColor: "#343844",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  signatureClearButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  signatureConfirmButton: {
    flex: 2,
    minHeight: 54,
    backgroundColor: "#7C5CFC",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  signatureConfirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  primaryButton: {
    backgroundColor: "#7C5CFC",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 30,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  notFoundContainer: {
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
