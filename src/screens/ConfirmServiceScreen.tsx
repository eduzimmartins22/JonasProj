import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar, StyleSheet } from "react-native"
import { useApp } from "../context/AppContext"

export default function ConfirmServiceScreen() {
  const [clientId, setClientId] = useState("")
  const { confirmServiceByClientId } = useApp()

  const handleConfirm = () => {
    if (!clientId.trim()) {
      Alert.alert("Erro", "Digite o ID do cliente.")
      return
    }
    const success = confirmServiceByClientId(clientId)
    if (success) {
      Alert.alert("✅ Sucesso", "Serviço confirmado com sucesso!")
      setClientId("")
    } else {
      Alert.alert("❌ Erro", "Cliente não encontrado ou sem serviços disponíveis.")
    }
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      <View style={s.iconWrap}>
        <View style={s.iconCircle}>
          <Text style={{ fontSize: 36 }}>✂️</Text>
        </View>
        <Text style={s.title}>Confirmar Serviço</Text>
        <Text style={s.subtitle}>Insira o ID do cliente para registrar o corte</Text>
      </View>

      <TextInput
        placeholder="ID do cliente"
        placeholderTextColor="#71717a"
        value={clientId}
        onChangeText={setClientId}
        style={s.input}
        autoCapitalize="none"
      />

      <TouchableOpacity onPress={handleConfirm} style={s.btn}>
        <Text style={s.btnText}>Confirmar Serviço</Text>
      </TouchableOpacity>
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b", paddingHorizontal: 24, justifyContent: "center" },
  iconWrap: { alignItems: "center", marginBottom: 40 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(245,158,11,0.1)", borderWidth: 1, borderColor: "rgba(245,158,11,0.3)", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  title: { color: "#ffffff", fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "#71717a", fontSize: 13, marginTop: 8, textAlign: "center" },
  input: { backgroundColor: "#18181b", color: "#ffffff", borderWidth: 1, borderColor: "#3f3f46", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, marginBottom: 16 },
  btn: { backgroundColor: "#f59e0b", borderRadius: 12, paddingVertical: 16, alignItems: "center" },
  btnText: { color: "#09090b", fontWeight: "bold", fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
})