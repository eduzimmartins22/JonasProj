import { View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet, TextInput, Alert } from "react-native"
import { useState } from "react"
import { useApp } from "../context/AppContext"

export default function AdminDashboard({ navigation }: any) {
  const { clients, barbers, addBarber, removeBarber } = useApp()
  const [showAddBarber, setShowAddBarber] = useState(false)
  const [newName, setNewName] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const totalCuts = clients.reduce((acc, c) => acc + c.services.reduce((a, s) => a + s.used, 0), 0)

  const handleAddBarber = () => {
    if (!newName.trim() || !newPassword.trim()) {
      Alert.alert("Preencha os campos", "Nome e senha são obrigatórios.")
      return
    }
    addBarber(newName.trim(), newPassword.trim())
    setNewName(""); setNewPassword("")
    setShowAddBarber(false)
    Alert.alert("✅ Cabeleireiro adicionado!", `${newName} foi cadastrado.`)
  }

  const handleRemoveBarber = (id: string, name: string) => {
    Alert.alert(
      "Remover cabeleireiro",
      `Remover ${name}? Os clientes dele serão mantidos.`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => removeBarber(id) }
      ]
    )
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <StatusBar barStyle="light-content" />

      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={s.backBtnText}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={s.label}>Administração</Text>
          <Text style={s.title}>Dashboard</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={s.statsRow}>
        <View style={[s.statCard, { backgroundColor: "#f59e0b" }]}>
          <Text style={[s.statNum, { color: "#09090b" }]}>{clients.length}</Text>
          <Text style={[s.statLabel, { color: "#78350f" }]}>Clientes</Text>
        </View>
        <View style={s.statCardDark}>
          <Text style={[s.statNum, { color: "#ffffff" }]}>{barbers.length}</Text>
          <Text style={s.statLabel}>Cabeleireiros</Text>
        </View>
        <View style={s.statCardDark}>
          <Text style={[s.statNum, { color: "#4ade80" }]}>{totalCuts}</Text>
          <Text style={s.statLabel}>Cortes</Text>
        </View>
      </View>

      {/* Barbers */}
      <View style={s.sectionHeader}>
        <Text style={s.sectionLabel}>Cabeleireiros</Text>
        <TouchableOpacity onPress={() => setShowAddBarber(!showAddBarber)} style={s.addBtn}>
          <Text style={s.addBtnText}>{showAddBarber ? "Cancelar" : "+ Adicionar"}</Text>
        </TouchableOpacity>
      </View>

      {showAddBarber && (
        <View style={s.addForm}>
          <TextInput placeholder="Nome do cabeleireiro" placeholderTextColor="#71717a" value={newName} onChangeText={setNewName} style={s.input} />
          <TextInput placeholder="Senha de acesso" placeholderTextColor="#71717a" value={newPassword} onChangeText={setNewPassword} secureTextEntry style={s.input} />
          <TouchableOpacity onPress={handleAddBarber} style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>Cadastrar Cabeleireiro</Text>
          </TouchableOpacity>
        </View>
      )}

      {barbers.map(barber => {
        const barberClients = clients.filter(c => c.barberId === barber.id)
        const barberCuts = barberClients.reduce((a, c) => a + c.services.reduce((b, s) => b + s.used, 0), 0)
        return (
          <View key={barber.id} style={s.barberCard}>
            <View style={s.barberRow}>
              <View style={s.barberIcon}>
                <Text style={s.barberIconText}>✂️</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.barberName}>{barber.name}</Text>
                <Text style={s.barberSub}>
                  {barberClients.length} cliente(s) · {barberCuts} corte(s)
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveBarber(barber.id, barber.name)} style={s.removeBtn}>
                <Text style={s.removeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {barberClients.length > 0 && (
              <View style={s.clientsList}>
                {barberClients.map(client => (
                  <View key={client.id} style={s.clientItem}>
                    <View style={s.clientBadge}>
                      <Text style={s.clientBadgeText}>#{client.numericId}</Text>
                    </View>
                    <Text style={s.clientName}>{client.name}</Text>
                    <Text style={s.clientPackages}>{client.services.length} pacote(s)</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )
      })}
    </ScrollView>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#09090b" },
  content: { padding: 24, paddingTop: 56, paddingBottom: 40 },
  topBar: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 32 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", alignItems: "center", justifyContent: "center" },
  backBtnText: { color: "#f59e0b", fontSize: 20 },
  label: { color: "#f59e0b", fontSize: 11, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase" },
  title: { color: "#ffffff", fontSize: 28, fontWeight: "bold" },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 32 },
  statCard: { flex: 1, borderRadius: 16, padding: 16, alignItems: "center" },
  statCardDark: { flex: 1, backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", borderRadius: 16, padding: 16, alignItems: "center" },
  statNum: { fontSize: 28, fontWeight: "bold" },
  statLabel: { color: "#71717a", fontSize: 11, marginTop: 4 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  sectionLabel: { color: "#f59e0b", fontSize: 11, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase" },
  addBtn: { backgroundColor: "#18181b", borderWidth: 1, borderColor: "#f59e0b", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  addBtnText: { color: "#f59e0b", fontSize: 12, fontWeight: "bold" },
  addForm: { backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", borderRadius: 16, padding: 16, marginBottom: 16 },
  input: { backgroundColor: "#27272a", color: "#ffffff", borderWidth: 1, borderColor: "#3f3f46", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, marginBottom: 12 },
  btnPrimary: { backgroundColor: "#f59e0b", borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  btnPrimaryText: { color: "#09090b", fontWeight: "bold", fontSize: 13, letterSpacing: 1, textTransform: "uppercase" },
  barberCard: { backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", borderRadius: 16, marginBottom: 12, overflow: "hidden" },
  barberRow: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  barberIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#27272a", alignItems: "center", justifyContent: "center" },
  barberIconText: { fontSize: 20 },
  barberName: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  barberSub: { color: "#71717a", fontSize: 12, marginTop: 2 },
  removeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#27272a", alignItems: "center", justifyContent: "center" },
  removeBtnText: { color: "#ef4444", fontSize: 14 },
  clientsList: { borderTopWidth: 1, borderTopColor: "#27272a", paddingHorizontal: 16, paddingBottom: 12 },
  clientItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#1c1c1e" },
  clientBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#27272a", alignItems: "center", justifyContent: "center" },
  clientBadgeText: { color: "#f59e0b", fontWeight: "bold", fontSize: 10 },
  clientName: { color: "#ffffff", fontSize: 13, flex: 1 },
  clientPackages: { color: "#52525b", fontSize: 11 },
})