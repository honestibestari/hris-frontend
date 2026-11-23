import { View, Text, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Screen from "../components/Screen";
import Button from "../components/Button";
import Icon from "../components/Icon";
import StatusPill from "../components/StatusPill";
import { KeyValue } from "../components/ListRow";
import { kantor } from "../data/dummy";
import { tanggalPanjang } from "../utils/format";
import { colors, fonts } from "../constants/theme";

export default function AbsenBerhasil() {
  const router = useRouter();
  const { jam, jarak } = useLocalSearchParams<{ jam: string; jarak: string }>();
  const terlambat = (jam ?? "00:00") > "08:00";
  return (
    <Screen padX={28} scroll={false} footer={<Button title="Selesai" onPress={() => router.replace("/beranda")} />}>
      <View style={{ height: 57 }} />
      <View style={{ alignItems: "center" }}>
        <View style={s.lingkaran}><Icon name="check-circle" size={48} color={colors.primary} /></View>
        <Text style={s.judul}>Absen berhasil</Text>
        <Text style={s.jam}>{jam}</Text>
        <Text style={s.tgl}>{tanggalPanjang()}</Text>
      </View>
      <View style={{ marginTop: 34 }}>
        <KeyValue k="Lokasi" v={`${kantor.nama}, ${jarak} m`} />
        <KeyValue k="Tipe" v="Absensi offline" />
        <View style={s.status}>
          <Text style={s.k}>Status</Text>
          <StatusPill status={terlambat ? "Terlambat" : "Hadir"} />
        </View>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  lingkaran: { width: 92, height: 92, borderRadius: 46, backgroundColor: colors.tint, alignItems: "center", justifyContent: "center" },
  judul: { fontSize: 34, color: colors.text, fontFamily: fonts.serif, letterSpacing: -0.6, marginTop: 20 },
  jam: { fontSize: 56, color: colors.text, fontFamily: fonts.serif, letterSpacing: -1.5, marginTop: 20 },
  tgl: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 4 },
  status: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 13 },
  k: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium },
});
