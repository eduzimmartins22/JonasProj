import { View, Text, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from "react-native"
import { useApp } from "../context/AppContext"
import ServiceBar from "../componetes/ServiceBar"

export default function ClientScreen({ route, navigation }: any) {
  const { clientId } = route.params
  const { clients, barbers } = useApp()
  const client = clients.find(c => c.id === clientId)
  const barber = barbers.find(b => b.id === client?.barberId)

  if (!client) {
    return (
      <View style={s.notFound}>
        <StatusBar barStyle="light-content" />
        <Text style={{ fontSize: 48 }}>😕</Text>
        <Text style={s.notFoundTitle}>Cliente não encontrado</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.btnBack}>
          <Text style={s.btnBackText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const activeServices = client.services.filter(s => s.used < s.total)
  const completedServices = client.services.filter(s => s.used >= s.total)

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <StatusBar barStyle="light-content" />

      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={s.backBtnText}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={s.profile}>
        <View style={s.idBadge}>
          <Text style={s.idBadgeNum}>#{client.numericId}</Text>
          <Text style={s.idBadgeLabel}>seu ID</Text>
        </View>
        <Text style={s.welcomeLabel}>Bem-vindo de volta</Text>
        <Text style={s.clientName}>{client.name}</Text>
        {barber && <Text style={s.barberName}>✂️ {barber.name}</Text>}
      </View>

      {/* Stats */}
      <View style={s.statsRow}>
        <View style={s.statCard}>
          <Text style={[s.statNum, { color: "#60a5fa" }]}>{activeServices.length}</Text>
          <Text style={s.statLabel}>Ativos</Text>
        </View>
        <View style={s.statCard}>
          <Text style={[s.statNum, { color: "#4ade80" }]}>{completedServices.length}</Text>
          <Text style={s.statLabel}>Concluídos</Text>
        </View>
        <View style={s.statCard}>
          <Text style={[s.statNum, { color: "#f59e0b" }]}>
            {client.services.reduce((a, s) => a + s.used, 0)}
          </Text>
          <Text style={s.statLabel}>Cortes</Text>
        </View>
      </View>

      {/* Active */}
      {activeServices.length > 0 && (
        <>
          <Text style={s.sectionLabel}>Pacotes Ativos</Text>
          {activeServices.map(service => (
            <ServiceBar key={service.id} clientId={client.id} service={service} />
          ))}
        </>
      )}

      {/* Completed */}
      {completedServices.length > 0 && (
        <>
          <Text style={[s.sectionLabel, { marginTop: 16 }]}>Concluídos</Text>
          {completedServices.map(service => (
            <ServiceBar key={service.id} clientId={client.id} service={service} />
          ))}
        </>
      )}

      {client.services.length === 0 && (
        <View style={s.empty}>
          <Text style={s.emptyText}>Nenhum pacote ativo</Text>
          <Text style={s.emptySub}>Fale com seu cabeleireiro</Text>
        </View>
      )}
    </ScrollView>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#09090b" },
  content: { padding: 24, paddingTop: 56, paddingBottom: 40 },
  notFound: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#09090b", gap: 12 },
  notFoundTitle: { color: "#ffffff", fontSize: 20, fontWeight: "bold" },
  btnBack: { marginTop: 8 },
  btnBackText: { color: "#f59e0b", fontSize: 15 },
  topBar: { marginBottom: 24 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", alignItems: "center", justifyContent: "center" },
  backBtnText: { color: "#f59e0b", fontSize: 20 },
  profile: { alignItems: "center", marginBottom: 32 },
  idBadge: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#f59e0b", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  idBadgeNum: { color: "#09090b", fontWeight: "bold", fontSize: 20 },
  idBadgeLabel: { color: "#78350f", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 },
  welcomeLabel: { color: "#f59e0b", fontSize: 11, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 },
  clientName: { color: "#ffffff", fontSize: 28, fontWeight: "bold" },
  barberName: { color: "#71717a", fontSize: 14, marginTop: 4 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 32 },
  statCard: { flex: 1, backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", borderRadius: 16, padding: 16, alignItems: "center" },
  statNum: { fontSize: 28, fontWeight: "bold" },
  statLabel: { color: "#71717a", fontSize: 11, marginTop: 4 },
  sectionLabel: { color: "#f59e0b", fontSize: 11, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 },
  empty: { alignItems: "center", paddingVertical: 40 },
  emptyText: { color: "#52525b", fontSize: 15 },
  emptySub: { color: "#3f3f46", fontSize: 13, marginTop: 4 },
})