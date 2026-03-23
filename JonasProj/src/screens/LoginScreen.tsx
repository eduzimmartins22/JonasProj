import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, Alert } from "react-native"
import { useState } from "react"
import { useApp } from "../context/AppContext"

type Mode = "home" | "client" | "barber" | "admin"

export default function LoginScreen({ navigation }: any) {
  const [mode, setMode] = useState<Mode>("home")
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const { findClientByCpf, findBarberByPassword } = useApp()

  const formatCpf = (text: string) => {
    const nums = text.replace(/\D/g, "").slice(0, 11)
    return nums
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
  }

  const handleClientLogin = () => {
    const clean = cpf.replace(/\D/g, "")
    if (clean.length < 11) { Alert.alert("CPF inválido", "Digite um CPF com 11 dígitos."); return }
    const client = findClientByCpf(clean)
    if (!client) { Alert.alert("Não encontrado", "CPF não cadastrado.\nFale com seu cabeleireiro."); return }
    navigation.navigate("Client", { clientId: client.id })
    setCpf("")
  }

  const handleBarberLogin = () => {
    if (!password.trim()) { Alert.alert("Digite a senha", ""); return }
    const barber = findBarberByPassword(password)
    if (!barber) { Alert.alert("Senha incorreta", "Tente novamente."); return }
    navigation.navigate("Barber", { barberId: barber.id, barberName: barber.name })
    setPassword("")
  }

  const handleAdminLogin = () => {
    if (password === "adm123") {
      navigation.navigate("Admin")
      setPassword("")
    } else {
      Alert.alert("Senha incorreta", "Tente novamente.")
    }
  }

  const reset = () => { setMode("home"); setCpf(""); setPassword("") }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Logo */}
      <View style={s.header}>
        <View style={s.iconCircle}>
          <Text style={{ fontSize: 36 }}>✂️</Text>
        </View>
        <Text style={s.title}>Jonas</Text>
        <Text style={s.subtitle}>Barbearia Premium</Text>
      </View>

      {/* HOME */}
      {mode === "home" && (
        <View style={s.options}>
          <TouchableOpacity onPress={() => setMode("client")} style={s.optionCard}>
            <Text style={s.optionIcon}>👤</Text>
            <View style={s.optionText}>
              <Text style={s.optionTitle}>Sou Cliente</Text>
              <Text style={s.optionSub}>Ver meus pacotes</Text>
            </View>
            <Text style={s.optionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMode("barber")} style={s.optionCard}>
            <Text style={s.optionIcon}>✂️</Text>
            <View style={s.optionText}>
              <Text style={s.optionTitle}>Sou Cabeleireiro</Text>
              <Text style={s.optionSub}>Gerenciar clientes</Text>
            </View>
            <Text style={s.optionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMode("admin")} style={[s.optionCard, s.optionCardAdmin]}>
            <Text style={s.optionIcon}>🔐</Text>
            <View style={s.optionText}>
              <Text style={[s.optionTitle, { color: "#71717a" }]}>Administração</Text>
              <Text style={s.optionSub}>Acesso restrito</Text>
            </View>
            <Text style={[s.optionArrow, { color: "#52525b" }]}>›</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* CLIENT LOGIN */}
      {mode === "client" && (
        <View>
          <Text style={s.formLabel}>Digite seu CPF</Text>
          <TextInput
            placeholder="000.000.000-00"
            placeholderTextColor="#71717a"
            value={cpf}
            onChangeText={t => setCpf(formatCpf(t))}
            keyboardType="numeric"
            style={s.input}
            autoFocus
          />
          <TouchableOpacity onPress={handleClientLogin} style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={reset} style={s.btnBack}>
            <Text style={s.btnBackText}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* BARBER LOGIN */}
      {mode === "barber" && (
        <View>
          <Text style={s.formLabel}>Senha do Cabeleireiro</Text>
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#71717a"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={s.input}
            autoFocus
          />
          <TouchableOpacity onPress={handleBarberLogin} style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={reset} style={s.btnBack}>
            <Text style={s.btnBackText}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ADMIN LOGIN */}
      {mode === "admin" && (
        <View>
          <Text style={s.formLabel}>Senha do Administrador</Text>
          <TextInput
            placeholder="Digite a senha"
            placeholderTextColor="#71717a"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={s.input}
            autoFocus
          />
          <TouchableOpacity onPress={handleAdminLogin} style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={reset} style={s.btnBack}>
            <Text style={s.btnBackText}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b", paddingHorizontal: 24, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 48 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#f59e0b", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  title: { color: "#ffffff", fontSize: 36, fontWeight: "bold", letterSpacing: 8, textTransform: "uppercase" },
  subtitle: { color: "#f59e0b", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginTop: 4 },
  options: { gap: 12 },
  optionCard: { backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", borderRadius: 16, padding: 18, flexDirection: "row", alignItems: "center", gap: 14 },
  optionCardAdmin: { borderColor: "#1c1c1e" },
  optionIcon: { fontSize: 26 },
  optionText: { flex: 1 },
  optionTitle: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },
  optionSub: { color: "#71717a", fontSize: 12, marginTop: 2 },
  optionArrow: { color: "#f59e0b", fontSize: 24, fontWeight: "bold" },
  formLabel: { color: "#71717a", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 },
  input: { backgroundColor: "#18181b", color: "#ffffff", borderWidth: 1, borderColor: "#27272a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, marginBottom: 12 },
  btnPrimary: { backgroundColor: "#f59e0b", borderRadius: 12, paddingVertical: 16, alignItems: "center", marginBottom: 12 },
  btnPrimaryText: { color: "#09090b", fontWeight: "bold", fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
  btnBack: { paddingVertical: 12, alignItems: "center" },
  btnBackText: { color: "#71717a", fontSize: 14 },
})