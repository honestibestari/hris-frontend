import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Field from "../components/Field";
import StatusPill from "../components/StatusPill";
import { KeyValue } from "../components/ListRow";
import { pengajuanSemua } from "../data/dummy";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

export default function Approval() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = pengajuanSemua.find((x) => x.id === Number(id));
  const [catatan, setCatatan] = useState("");
  if (!p) return null;
  const selesai = p.status !== "Menunggu";

  const putuskan = (setuju: boolean) => {
    if (!setuju && !catatan.trim()) return notify("Catatan wajib diisi", "Isi catatan HR saat menolak pengajuan.");
    p.status = setuju ? "Disetujui" : "Ditolak";
    p.catatanHR = catatan.trim() || undefined;
    // TODO: kirim keputusan ke REST API. Server memperbarui kuota cuti dan mengirim notifikasi ke karyawan.
    notify(setuju ? "Disetujui" : "Ditolak", "Keputusan tersimpan dan karyawan akan diberi notifikasi.", () => router.back());
  };

  return (
    <Screen
      footer={
        selesai ? undefined : (
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}><Button title="Tolak" variant="outline" onPress={() => putuskan(false)} /></View>
            <View style={{ flex: 1 }}><Button title="Setujui" onPress={() => putuskan(true)} /></View>
          </View>
        )
      }
    >
      <Header title="Detail pengajuan" />
      <View style={s.atas}>
        <Avatar label={p.nama} size={52} />
        <View style={{ flex: 1 }}>
          <Text style={s.nama}>{p.nama}</Text>
          <Text style={s.jabatan}>{p.jabatan}</Text>
        </View>
        <StatusPill status={p.status} />
      </View>
      <KeyValue k="Jenis" v={p.jenis} />
      <KeyValue k="Tanggal" v={p.tanggal} />
      {p.sisaCuti !== undefined ? <KeyValue k="Sisa kuota cuti" v={`${p.sisaCuti} hari`} /> : null}
      <KeyValue k="Lampiran" v={p.lampiran ?? "Tidak ada"} />
      <Text style={s.seksi}>Alasan</Text>
      <View style={s.kotak}><Text style={s.isi}>{p.alasan}</Text></View>
      <View style={{ height: 20 }} />
      {selesai ? (
        <>
          <Text style={s.seksi}>Catatan HR</Text>
          <Text style={s.isi}>{p.catatanHR ?? "Tidak ada catatan."}</Text>
        </>
      ) : (
        <Field label="Catatan HR" value={catatan} onChangeText={setCatatan} placeholder="Wajib diisi jika ditolak" autoCapitalize="sentences" />
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  atas: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 10 },
  nama: { fontSize: 22, color: colors.text, fontFamily: fonts.serif },
  jabatan: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium, marginTop: 2 },
  seksi: { fontSize: 12, color: colors.muted, fontFamily: fonts.bold, marginTop: 20, marginBottom: 8 },
  kotak: { backgroundColor: colors.surface, borderRadius: 14, padding: 16 },
  isi: { fontSize: 14, lineHeight: 22, color: colors.text, fontFamily: fonts.medium },
});
