import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { KeyValue } from "../components/ListRow";
import { daftarKaryawan } from "../data/dummy";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

export default function DetailKaryawan() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const k = daftarKaryawan.find((x) => x.id === Number(id));
  if (!k) return null;

  const nonaktifkan = () => {
    const i = daftarKaryawan.findIndex((x) => x.id === k.id);
    if (i >= 0) daftarKaryawan.splice(i, 1);
    // TODO: server menonaktifkan akun (bukan menghapus data).
    notify("Akun dinonaktifkan", `${k.nama} tidak dapat login lagi.`, () => router.back());
  };

  return (
    <Screen
      footer={
        <View style={{ gap: 12 }}>
          <Button title="Atur kuota cuti" variant="outline" onPress={() => router.push("/kuota-cuti")} />
          <Button title="Kelola kontrak" variant="outline" onPress={() => router.push("/kontrak-hr")} />
          <Pressable onPress={nonaktifkan}><Text style={s.bahaya}>Nonaktifkan akun</Text></Pressable>
        </View>
      }
    >
      <Header title="Detail karyawan" />
      <View style={s.atas}>
        <Avatar label={k.nama} size={72} />
        <View>
          <Text style={s.nama}>{k.nama}</Text>
          <Text style={s.jabatan}>{k.jabatan}</Text>
        </View>
      </View>
      <View style={s.statRow}>
        <View style={[s.stat, { borderRightWidth: 1, borderRightColor: colors.border }]}><Text style={s.n}>{k.sisaCuti}</Text><Text style={s.l}>Sisa cuti</Text></View>
        <View style={s.stat}><Text style={s.n}>14</Text><Text style={s.l}>Hadir bulan ini</Text></View>
      </View>
      <KeyValue k="NIK" v={k.nik} />
      <KeyValue k="Email" v={k.email} />
      <KeyValue k="Nomor HP" v={k.hp || "-"} />
      <KeyValue k="Lokasi kantor" v="Kantor Pusat" last />
    </Screen>
  );
}

const s = StyleSheet.create({
  atas: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 14 },
  nama: { fontSize: 28, color: colors.text, fontFamily: fonts.serif },
  jabatan: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 6 },
  statRow: { flexDirection: "row", paddingVertical: 16, borderWidth: 1, borderColor: colors.border, borderRadius: 20, marginBottom: 8 },
  stat: { flex: 1, alignItems: "center" },
  n: { fontSize: 30, color: colors.text, fontFamily: fonts.serif },
  l: { fontSize: 12, color: colors.muted, fontFamily: fonts.medium, marginTop: 4 },
  bahaya: { textAlign: "center", fontSize: 14, color: colors.danger, fontFamily: fonts.semi, paddingTop: 8 },
});
