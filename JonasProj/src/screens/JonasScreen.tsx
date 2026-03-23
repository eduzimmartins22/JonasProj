import React from "react"
import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from "react-native"
import { useApp } from "../context/AppContext"

export default function JonasScreen({ navigation }: any) {
  const { clients } = useApp()

  const totalServices = clients.reduce((acc, c) => acc + c.services.length, 0)
  const totalCuts = clients.reduce((acc, c) => acc + c.services.reduce((a, s) => a + s.used, 0), 0)

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <StatusBar barStyle="light-content" />

      <View style={s.header}>
        <View style={s.iconCircle}>
          <Text style={{ fontSize: 44 }}>✂️</Text>
        </View>
        <Text style={s.title}>Jonas</Text>
        <Text style={s.subtitle}>Barbearia Premium</Text>
      </View>

      <View style={s.statsRow}>
        <View style={[s.statCard, { backgroundColor: "#f59e0b" }]}>
          <Text style={[s.statNumber, { color: "#09090b" }]}>{clients.length}</Text>
          <Text style={[s.statLabel, { color: "#78350f" }]}>Clientes</Text>
        </View>
        <View style={s.statCardDark}>
          <Text style={[s.statNumber, { color: "#ffffff" }]}>{totalServices}</Text>
          <Text style={s.statLabel}>Serviços</Text>
        </View>
        <View style={s.statCardDark}>
          <Text style={[s.statNumber, { color: "#4ade80" }]}>{totalCuts}</Text>
          <Text style={s.statLabel}>Cortes</Text>
        </View>
      </View>

      <Text style={s.sectionLabel}>Ações</Text>

      <TouchableOpacity onPress={() => navigation?.navigate("Barber")} style={s.btnPrimary}>
        <Text style={s.btnPrimaryText}>👥  Gerenciar Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation?.navigate("Admin")} style={s.btnSecondary}>
        <Text style={s.btnSecondaryText}>📊  Ver Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation?.navigate("Confirm")} style={s.btnSecondary}>
        <Text style={s.btnSecondaryText}>✅  Confirmar Serviço</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.btnDisabled}>
        <Text style={s.btnDisabledText}>📷  Gerar QR Code</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#09090b" },
  content: { padding: 24, paddingTop: 56 },
  header: { alignItems: "center", marginBottom: 40 },
  iconCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: "#f59e0b", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  title: { color: "#ffffff", fontSize: 40, fontWeight: "bold", letterSpacing: 8, textTransform: "uppercase" },
  subtitle: { color: "#f59e0b", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginTop: 4 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 32 },
  statCard: { flex: 1, borderRadius: 16, padding: 16, alignItems: "center" },
  statCardDark: { flex: 1, backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", borderRadius: 16, padding: 16, alignItems: "center" },
  statNumber: { fontSize: 28, fontWeight: "bold" },
  statLabel: { color: "#71717a", fontSize: 11, marginTop: 4 },
  sectionLabel: { color: "#f59e0b", fontSize: 11, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 },
  btnPrimary: { backgroundColor: "#f59e0b", borderRadius: 16, paddingVertical: 18, alignItems: "center", marginBottom: 12 },
  btnPrimaryText: { color: "#09090b", fontWeight: "bold", fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
  btnSecondary: { backgroundColor: "#18181b", borderWidth: 1, borderColor: "#3f3f46", borderRadius: 16, paddingVertical: 18, alignItems: "center", marginBottom: 12 },
  btnSecondaryText: { color: "#ffffff", fontWeight: "bold", fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
  btnDisabled: { backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", borderRadius: 16, paddingVertical: 18, alignItems: "center" },
  btnDisabledText: { color: "#52525b", fontWeight: "bold", fontSize: 15, letterSpacing: 1, textTransform: "uppercase" },
})