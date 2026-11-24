import { View, Text, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Screen from "../components/Screen";
import Button from "../components/Button";
import Icon from "../components/Icon";
import StatusPill from "../components/StatusPill";
import { KeyValue } from "../components/ListRow";
import { useAuth } from "../context/AuthContext";
import { kantor } from "../data/dummy";
import { MODE_SS, karyawanDemo } from "../data/demo";
import { tanggalPanjang } from "../utils/format";
import { colors, fonts } from "../constants/theme";

export default function AbsenBerhasil() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ jam: string; jarak: string }>();
  const jam = params.jam ?? (MODE_SS ? karyawanDemo.jam : "00:00");
  const jarak = params.jarak ?? (MODE_SS ? String(karyawanDemo.jarak) : "0");
  const terlambat = jam > "08:00";

  const karyawan = MODE_SS
    ? karyawanDemo
    : {
        nama: user?.nama ?? "-",
        nik: user?.nik ?? "-",
        jabatan: user?.jabatan ?? "-",
        departemen: user?.departemen ?? "-",
      };

  return (
    <Screen footer={<Button title="Selesai" onPress={() => router.replace("/beranda")} />}>
      <View style={{ height: 24 }} />
      <View style={{ alignItems: "center" }}>
        <View style={s.lingkaran}><Icon name="check-circle" size={48} color={colors.primary} /></View>
        <Text style={s.judul}>Absen berhasil</Text>
        <Text style={s.jam}>{jam}</Text>
        <Text style={s.tgl}>{tanggalPanjang()}</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <KeyValue k="Nama" v={karyawan.nama} />
        <KeyValue k="NIK" v={karyawan.nik} />
        <KeyValue k="Jabatan" v={karyawan.jabatan} />
        <KeyValue k="Departemen" v={karyawan.departemen} />
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