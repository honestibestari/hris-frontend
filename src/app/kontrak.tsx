import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Button from "../components/Button";
import StatusPill from "../components/StatusPill";
import ListRow, { IconTile, Chevron, KeyValue } from "../components/ListRow";
import { useAuth } from "../context/AuthContext";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

export default function Kontrak() {
  const { user } = useAuth();
  return (
    <Screen footer={<Button title="Lihat dokumen" icon="file-text" onPress={() => notify("Dokumen kontrak", "Dokumen PDF akan dibuka dari server pada tahap integrasi API.")} />}>
      <Header title="Kontrak kerja" />
      <View style={s.kartu}>
        <View style={s.baris}>
          <Text style={s.ket}>Kontrak aktif</Text>
          <StatusPill status="Aktif" />
        </View>
        <Text style={s.jenis}>PKWT</Text>
        <Text style={s.ket}>Nomor PKWT/2026/014</Text>
        <View style={s.track}><View style={s.isi} /></View>
        <View style={s.baris}>
          <Text style={s.ket}>1 Jan 2026</Text>
          <Text style={s.ket}>31 Des 2026</Text>
        </View>
      </View>
      <View style={{ marginTop: 18 }}>
        <KeyValue k="Sisa masa kontrak" v="72 hari" />
        <KeyValue k="Jabatan" v={user?.jabatan ?? "-"} last />
      </View>
      <Text style={s.seksi}>Riwayat kontrak</Text>
      <ListRow lead={<IconTile name="briefcase" />} title="PKWT 2025" subtitle="1 Jan sampai 31 Des 2025" right={<Chevron />} last />
    </Screen>
  );
}

const s = StyleSheet.create({
  kartu: { backgroundColor: colors.tint, borderWidth: 1, borderColor: colors.tintBorder, borderRadius: 24, padding: 22 },
  baris: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  ket: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium },
  jenis: { fontSize: 40, color: colors.text, fontFamily: fonts.serif, marginTop: 12, marginBottom: 4 },
  track: { height: 6, borderRadius: 3, backgroundColor: colors.tintBorder, marginTop: 18, marginBottom: 10 },
  isi: { width: "78%", height: 6, borderRadius: 3, backgroundColor: colors.primary },
  seksi: { fontSize: 13, color: colors.muted, fontFamily: fonts.bold, marginTop: 18 },
});
