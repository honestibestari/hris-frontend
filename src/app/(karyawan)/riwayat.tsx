import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import { Judul, CircleButton } from "../../components/Header";
import ListRow from "../../components/ListRow";
import StatusPill from "../../components/StatusPill";
import { riwayatAbsensi, daftarBulan } from "../../data/dummy";
import { useFocusRefresh } from "../../utils/useFocusRefresh";
import { colors, fonts } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { pengajuanSemua } from "../../data/dummy";

function Stat({ n, label, last }: { n: number; label: string; last?: boolean }) {
  return (
    <View style={[s.stat, !last && { borderRightWidth: 1, borderRightColor: colors.border }]}>
      <Text style={s.statN}>{n}</Text>
      <Text style={s.statL}>{label}</Text>
    </View>
  );
}

export default function Riwayat() {
  const [i, setI] = useState(daftarBulan.length - 1);
  useFocusRefresh();
  const bulan = daftarBulan[Math.min(i, daftarBulan.length - 1)];
  const data = riwayatAbsensi.filter((r) => r.bulan === bulan);
  const hitung = (st: string) => data.filter((r) => r.status === st).length;
  const { user } = useAuth();
const cuti = pengajuanSemua.filter((p) => p.nama === user?.nama && p.jenis === "Cuti" && p.status === "Disetujui").length;

  return (
    <Screen tab>
      <Judul>Riwayat</Judul>
      <View style={s.bulanRow}>
        <CircleButton name="chevron-left" size={42} onPress={() => setI(Math.max(0, i - 1))} />
        <Text style={s.bulan}>{bulan}</Text>
        <CircleButton name="chevron-right" size={42} onPress={() => setI(Math.min(daftarBulan.length - 1, i + 1))} />
      </View>
      <View style={s.statRow}>
        <Stat n={hitung("Hadir")} label="Hadir" />
        <Stat n={hitung("Terlambat")} label="Terlambat" />
        <Stat n={cuti} label="Cuti" last />
      </View>
      {data.length === 0 ? <Text style={s.kosong}>Belum ada data absensi bulan ini.</Text> : null}
      {data.map((r, idx) => (
        <ListRow
          key={r.id}
          lead={
            <View style={{ width: 44, alignItems: "center" }}>
              <Text style={s.tgl}>{r.tgl}</Text>
              <Text style={s.hari}>{r.hari}</Text>
            </View>
          }
          title={r.jam}
          subtitle={r.ket}
          right={<StatusPill status={r.status} />}
          last={idx === data.length - 1}
        />
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  bulanRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  bulan: { fontSize: 16, color: colors.text, fontFamily: fonts.bold },
  statRow: { flexDirection: "row", paddingVertical: 18, borderWidth: 1, borderColor: colors.border, borderRadius: 20, marginBottom: 10 },
  stat: { flex: 1, alignItems: "center" },
  statN: { fontSize: 30, color: colors.text, fontFamily: fonts.serif },
  statL: { fontSize: 12, color: colors.muted, fontFamily: fonts.medium, marginTop: 4 },
  tgl: { fontSize: 26, color: colors.text, fontFamily: fonts.serif },
  hari: { fontSize: 11, color: colors.muted, fontFamily: fonts.medium, marginTop: 2 },
  kosong: { textAlign: "center", fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 32 },
});
