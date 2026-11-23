import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, fonts } from "../constants/theme";

// Tab filter bergaris bawah.
export default function FilterTabs({ items, active, onChange }: { items: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <View style={s.row}>
      {items.map((t) => (
        <Pressable key={t} onPress={() => onChange(t)} style={[s.tab, active === t && s.aktif]}>
          <Text style={[s.text, active === t && s.textAktif]}>{t}</Text>
        </Pressable>
      ))}
    </View>
  );
}

// Kontrol segmen (misalnya Setengah hari, WFH, Perdin).
export function Segmented({ items, active, onChange }: { items: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <View style={s.seg}>
      {items.map((t) => (
        <Pressable key={t} onPress={() => onChange(t)} style={[s.segItem, active === t && s.segAktif]}>
          <Text style={[s.segText, active === t && { color: colors.primary }]}>{t}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: colors.border, marginBottom: 6, flexWrap: "wrap" },
  tab: { paddingVertical: 12, marginRight: 22, borderBottomWidth: 2.5, borderBottomColor: "transparent" },
  aktif: { borderBottomColor: colors.primary },
  text: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium },
  textAktif: { color: colors.primary, fontFamily: fonts.semi },
  seg: { flexDirection: "row", backgroundColor: colors.surface, borderRadius: 14, padding: 4, marginBottom: 22 },
  segItem: { flex: 1, alignItems: "center", paddingVertical: 11, borderRadius: 11 },
  segAktif: { backgroundColor: colors.white },
  segText: { fontSize: 13, color: colors.muted, fontFamily: fonts.semi },
});
