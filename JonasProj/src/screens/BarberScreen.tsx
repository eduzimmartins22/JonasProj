import { View, Text, TextInput, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Alert } from "react-native"
import { useState } from "react"
import { useApp } from "../context/AppContext"
import ServiceBar from "../componetes/ServiceBar"

export default function BarberScreen({ route, navigation }: any) {
  const { barberId, barberName } = route.params
  const { addClient, addService, useService, getBarberClients } = useApp()

  const [tab, setTab] = useState<"clients" | "add">("clients")
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [serviceName, setServiceName] = useState("")
  const [totalCuts, setTotalCuts] = useState("")
  const [addingServiceFor, setAddingServiceFor] = useState<string | null>(null)

  const clients = getBarberClients(barberId)

  const formatCpf = (text: string) => {
    const nums = text.replace(/\D/g, "").slice(0, 11)
    return nums
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
  }

  const handleAddClient = () => {
    if (!name.trim() || cpf.replace(/\D/g, "").length < 11) {
      Alert.alert("Preencha os campos", "Nome e CPF válido são obrigatórios.")
      return
    }
    addClient(name.trim(), cpf, barberId)
    setName(""); setCpf("")
    setTab("clients")
    Alert.alert("✅ Cadastrado!", `${name} foi adicionado.`)
  }

  const handleAddService = (clientId: string) => {
    if (!serviceName.trim() || Number(totalCuts) <= 0) {
      Alert.alert("Preencha os campos", "Nome do pacote e quantidade são obrigatórios.")
      return
    }
    addService(clientId, serviceName.trim(), Number(totalCuts))
    setServiceName(""); setTotalCuts("")
    setAddingServiceFor(null)
  }

  const handleRegisterCut = (clientId: string, serviceId: string, clientName: string, serviceName: string) => {
    Alert.alert(
      "Registrar corte",
      `Cliente: ${clientName}\nPacote: ${serviceName}`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "✅ Confirmar", onPress: () => useService(clientId, serviceId) }
      ]
    )
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={s.backBtnText}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={s.title}>{barberName}</Text>
          <Text style={s.titleSub}>{clients.length} cliente(s)</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={s.tabs}>
        <TouchableOpacity onPress={() => setTab("clients")} style={[s.tab, tab === "clients" && s.tabActive]}>
          <Text style={[s.tabText, tab === "clients" && s.tabTextActive]}>Meus Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("add")} style={[s.tab, tab === "add" && s.tabActive]}>
          <Text style={[s.tabText, tab === "add" && s.tabTextActive]}>+ Novo Cliente</Text>
        </TouchableOpacity>
      </View>

      {/* ADD CLIENT TAB */}
      {tab === "add" && (
        <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
          <Text style={s.sectionLabel}>Dados do Cliente</Text>
          <TextInput placeholder="Nome completo" placeholderTextColor="#71717a" value={name} onChangeText={setName} style={s.input} />
          <TextInput placeholder="CPF" placeholderTextColor="#71717a" value={cpf} onChangeText={t => setCpf(formatCpf(t))} keyboardType="numeric" style={s.input} />
          <TouchableOpacity onPress={handleAddClient} style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>Cadastrar Cliente</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* CLIENTS TAB */}
      {tab === "clients" && (
        <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
          {clients.length === 0 && (
            <View style={s.empty}>
              <Text style={s.emptyIcon}>👤</Text>
              <Text style={s.emptyText}>Nenhum cliente ainda</Text>
              <TouchableOpacity onPress={() => setTab("add")} style={s.btnPrimary}>
                <Text style={s.btnPrimaryText}>Cadastrar primeiro cliente</Text>
              </TouchableOpacity>
            </View>
          )}

          {clients.map(client => {
            const activeServices = client.services.filter(s => s.used < s.total)
            const isOpen = selectedClient === client.id

            return (
              <View key={client.id} style={s.clientCard}>
                {/* Client row */}
                <TouchableOpacity
                  onPress={() => setSelectedClient(isOpen ? null : client.id)}
                  style={s.clientRow}
                >
                  <View style={s.clientBadge}>
                    <Text style={s.clientBadgeText}>#{client.numericId}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.clientName}>{client.name}</Text>
                    <Text style={s.clientSub}>
                      {activeServices.length > 0
                        ? `${activeServices.length} pacote(s) ativo(s)`
                        : "Sem pacotes ativos"}
                    </Text>
                  </View>
                  <Text style={s.expandIcon}>{isOpen ? "−" : "›"}</Text>
                </TouchableOpacity>

                {isOpen && (
                  <View style={s.clientExpanded}>
                    <Text style={s.clientCpf}>CPF: {client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</Text>

                    {/* Pacotes com botão de corte */}
                    {client.services.length > 0 && (
                      <>
                        <Text style={s.sectionLabel}>Pacotes</Text>
                        {client.services.map(service => {
                          const isDone = service.used >= service.total
                          return (
                            <View key={service.id} style={s.serviceRow}>
                              <ServiceBar clientId={client.id} service={service} />
                              {!isDone && (
                                <TouchableOpacity
                                  onPress={() => handleRegisterCut(client.id, service.id, client.name, service.name)}
                                  style={s.cutBtn}
                                >
                                  <Text style={s.cutBtnText}>✂️ Registrar Corte</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          )
                        })}
                      </>
                    )}

                    {/* Adicionar pacote */}
                    {addingServiceFor === client.id ? (
                      <View style={s.addServiceForm}>
                        <Text style={s.sectionLabel}>Novo Pacote</Text>
                        <TextInput placeholder="Nome (ex: Corte + Barba)" placeholderTextColor="#71717a" value={serviceName} onChangeText={setServiceName} style={s.input} />
                        <TextInput placeholder="Qtd. de cortes" placeholderTextColor="#71717a" value={totalCuts} onChangeText={setTotalCuts} keyboardType="numeric" style={s.input} />
                        <View style={s.addServiceButtons}>
                          <TouchableOpacity onPress={() => setAddingServiceFor(null)} style={s.btnSecondary}>
                            <Text style={s.btnSecondaryText}>Cancelar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleAddService(client.id)} style={[s.btnPrimary, { flex: 1 }]}>
                            <Text style={s.btnPrimaryText}>Salvar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <TouchableOpacity onPress={() => setAddingServiceFor(client.id)} style={s.addServiceBtn}>
                        <Text style={s.addServiceBtnText}>+ Adicionar Pacote</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            )
          })}
        </ScrollView>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  topBar: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 24, paddingTop: 56, paddingBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", alignItems: "center", justifyContent: "center" },
  backBtnText: { color: "#f59e0b", fontSize: 20 },
  title: { color: "#ffffff", fontSize: 20, fontWeight: "bold" },
  titleSub: { color: "#71717a", fontSize: 12, marginTop: 2 },
  tabs: { flexDirection: "row", marginHorizontal: 24, marginBottom: 20, backgroundColor: "#18181b", borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "#f59e0b" },
  tabText: { color: "#71717a", fontWeight: "600", fontSize: 14 },
  tabTextActive: { color: "#09090b" },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  sectionLabel: { color: "#f59e0b", fontSize: 11, fontWeight: "bold", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 },
  input: { backgroundColor: "#18181b", color: "#ffffff", borderWidth: 1, borderColor: "#27272a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, marginBottom: 12 },
  btnPrimary: { backgroundColor: "#f59e0b", borderRadius: 12, paddingVertical: 14, alignItems: "center", marginBottom: 8 },
  btnPrimaryText: { color: "#09090b", fontWeight: "bold", fontSize: 13, letterSpacing: 1, textTransform: "uppercase" },
  btnSecondary: { backgroundColor: "#27272a", borderRadius: 12, paddingVertical: 14, alignItems: "center", flex: 1, marginRight: 8 },
  btnSecondaryText: { color: "#ffffff", fontWeight: "600", fontSize: 13 },
  empty: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyIcon: { fontSize: 48 },
  emptyText: { color: "#52525b", fontSize: 16, marginBottom: 8 },
  clientCard: { backgroundColor: "#18181b", borderWidth: 1, borderColor: "#27272a", borderRadius: 16, marginBottom: 12, overflow: "hidden" },
  clientRow: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  clientBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#f59e0b", alignItems: "center", justifyContent: "center" },
  clientBadgeText: { color: "#09090b", fontWeight: "bold", fontSize: 13 },
  clientName: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  clientSub: { color: "#71717a", fontSize: 12, marginTop: 2 },
  expandIcon: { color: "#f59e0b", fontSize: 22, fontWeight: "bold" },
  clientExpanded: { borderTopWidth: 1, borderTopColor: "#27272a", padding: 16 },
  clientCpf: { color: "#52525b", fontSize: 12, marginBottom: 16 },
  serviceRow: { marginBottom: 4 },
  cutBtn: { backgroundColor: "#09090b", borderWidth: 1, borderColor: "#f59e0b", borderRadius: 10, paddingVertical: 12, alignItems: "center", marginTop: -4, marginBottom: 12 },
  cutBtnText: { color: "#f59e0b", fontWeight: "bold", fontSize: 13 },
  addServiceBtn: { borderWidth: 1, borderColor: "#27272a", borderStyle: "dashed", borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 4 },
  addServiceBtnText: { color: "#71717a", fontSize: 14 },
  addServiceForm: { marginTop: 8 },
  addServiceButtons: { flexDirection: "row", gap: 8 },
})