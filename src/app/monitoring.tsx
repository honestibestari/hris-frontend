import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Header, { CircleButton } from "../components/Header";
import FilterTabs from "../components/Tabs";
import Avatar from "../components/Avatar";
import ListRow from "../components/ListRow";
import StatusPill from "../components/StatusPill";
import { kehadiranHariIni } from "../data/dummy";
import { tanggalPanjang } from "../utils/format";
import { colors, fonts } from "../constants/theme";

function Stat({ n, label, last }: { n: number; label: string; last?: boolean }) {
  return (
    <View style={[s.stat, !last && { borderRightWidth: 1, borderRightColor: colors.border }]}>
      <Text style={s.n}>{n}</Text>
      <Text style={s.l}>{label}</Text>
    </View>
  );
}

export default function Monitoring() {
  const [filter, setFilter] = useState("Semua");
  const data = kehadiranHariIni.filter((k) => filter === "Semua" || k.status === filter);
  return (
    <Screen>
      <Header title="Monitoring kehadiran" />
      <View style={s.tgl}>
        <CircleButton name="chevron-left" size={40} />
        <Text style={s.tglText}>{tanggalPanjang()}</Text>
        <CircleButton name="chevron-right" size={40} />
      </View>
      <View style={s.statRow}>
        <Stat n={42} label="Hadir" />
        <Stat n={3} label="Terlambat" />
        <Stat n={5} label="Belum absen" last />
      </View>
      <FilterTabs items={["Semua", "Terlambat", "Belum absen"]} active={filter} onChange={setFilter} />
      {data.map((k, i) => (
        <ListRow key={k.id} lead={<Avatar label={k.nama} />} title={k.nama} subtitle={k.ket} right={<StatusPill status={k.status} />} last={i === data.length - 1} />
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  tgl: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  tglText: { fontSize: 15, color: colors.text, fontFamily: fonts.bold },
  statRow: { flexDirection: "row", paddingVertical: 16, borderWidth: 1, borderColor: colors.border, borderRadius: 20, marginBottom: 10 },
  stat: { flex: 1, alignItems: "center" },
  n: { fontSize: 30, color: colors.text, fontFamily: fonts.serif },
  l: { fontSize: 12, color: colors.muted, fontFamily: fonts.medium, marginTop: 4 },
});
