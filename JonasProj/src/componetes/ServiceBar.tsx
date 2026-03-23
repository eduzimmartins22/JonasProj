import { View, Text, StyleSheet } from "react-native"
import { Service } from "../types"

type Props = {
  clientId: string
  service: Service
}

export default function ServiceBar({ service }: Props) {
  const percentage = service.total > 0 ? (service.used / service.total) * 100 : 0
  const isComplete = service.used >= service.total
  const remaining = service.total - service.used
  const barColor = isComplete ? "#4ade80" : percentage >= 75 ? "#fbbf24" : "#f59e0b"

  return (
    <View style={[s.card, isComplete && s.cardComplete]}>
      <View style={s.header}>
        <Text style={s.name}>{service.name}</Text>
        <View style={[s.badge, isComplete ? s.badgeComplete : s.badgeActive]}>
          <Text style={[s.badgeText, isComplete ? s.badgeTextComplete : s.badgeTextActive]}>
            {isComplete ? "✓ Concluído" : `${remaining} restante(s)`}
          </Text>
        </View>
      </View>

      {/* Dots */}
      <View style={s.dots}>
        {Array.from({ length: Math.min(service.total, 20) }).map((_, i) => (
          <View key={i} style={[s.dot, { backgroundColor: i < service.used ? barColor : "#3f3f46" }]} />
        ))}
      </View>

      {/* Bar */}
      <View style={s.barBg}>
        <View style={[s.barFill, { width: `${percentage}%` as any, backgroundColor: barColor }]} />
      </View>

      <View style={s.footer}>
        <Text style={s.footerText}>{service.used} de {service.total} cortes utilizados</Text>
        <Text style={[s.footerText, { color: barColor }]}>{Math.round(percentage)}%</Text>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  card: { backgroundColor: "#27272a", borderWidth: 1, borderColor: "#3f3f46", borderRadius: 16, padding: 16, marginBottom: 12 },
  cardComplete: { borderColor: "rgba(74,222,128,0.3)" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  name: { color: "#ffffff", fontWeight: "600", fontSize: 15, flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  badgeComplete: { backgroundColor: "rgba(74,222,128,0.1)", borderColor: "rgba(74,222,128,0.4)" },
  badgeActive: { backgroundColor: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.3)" },
  badgeText: { fontSize: 11, fontWeight: "bold" },
  badgeTextComplete: { color: "#4ade80" },
  badgeTextActive: { color: "#f59e0b" },
  dots: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 12 },
  dot: { width: 14, height: 14, borderRadius: 7 },
  barBg: { width: "100%", height: 6, backgroundColor: "#3f3f46", borderRadius: 3, overflow: "hidden", marginBottom: 10 },
  barFill: { height: "100%", borderRadius: 3 },
  footer: { flexDirection: "row", justifyContent: "space-between" },
  footerText: { color: "#71717a", fontSize: 11 },
})