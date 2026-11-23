import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Icon from "../components/Icon";
import StatusPill from "../components/StatusPill";
import { Chevron } from "../components/ListRow";
import { daftarKaryawan } from "../data/dummy";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

const JATAH = 12;

export default function KuotaCuti() {
  const [q, setQ] = useState("");
  const data = daftarKaryawan.filter((k) => k.nama.toLowerCase().includes(q.toLowerCase()));

  return (
    <Screen footer={<Button title="Atur kuota tahunan" onPress={() => notify("Atur kuota", "Pengaturan kuota tahunan dibuat pada tahap integrasi API.")} />}>
      <Header title="Kuota cuti" />
      <View style={s.cari}>
        <Icon name="search" size={19} color={colors.muted} />
        <TextInput style={s.cariInput} value={q} onChangeText={setQ} placeholder="Cari nama karyawan" placeholderTextColor={colors.muted} />
      </View>
      <View style={s.tahun}>
        <Text style={s.tahunText}>Tahun 2026</Text>
        <StatusPill status="Aktif" />
      </View>
      {data.length === 0 ? <Text style={s.kosong}>Karyawan tidak ditemukan.</Text> : null}
      {data.map((k) => (
        <View key={k.id} style={s.item}>
          <View style={s.baris}>
            <Avatar label={k.nama} />
            <View style={{ flex: 1 }}>
              <Text style={s.nama}>{k.nama}</Text>
              <Text style={s.sisa}>Sisa {k.sisaCuti} dari {JATAH} hari</Text>
            </View>
            <Chevron />
          </View>
          <View style={s.track}><View style={[s.isi, { width: `${Math.min(100, (k.sisaCuti / JATAH) * 100)}%` }]} /></View>
        </View>
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  cari: { flexDirection: "row", alignItems: "center", gap: 12, height: 50, paddingHorizontal: 16, borderRadius: 14, backgroundColor: colors.surface, marginBottom: 20 },
  cariInput: { flex: 1, fontSize: 14, color: colors.text, fontFamily: fonts.medium },
  tahun: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  tahunText: { fontSize: 13, color: colors.muted, fontFamily: fonts.bold },
  item: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  baris: { flexDirection: "row", alignItems: "center", gap: 14 },
  nama: { fontSize: 16, color: colors.text, fontFamily: fonts.semi },
  sisa: { fontSize: 13, color: colors.muted, fontFamily: fonts.regular, marginTop: 2 },
  track: { height: 6, borderRadius: 3, backgroundColor: colors.tint, marginTop: 9 },
  isi: { height: 6, borderRadius: 3, backgroundColor: colors.primary },
  kosong: { textAlign: "center", fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 32 },
});