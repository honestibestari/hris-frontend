import { useState } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Select from "../components/Select";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { daftarKaryawan } from "../data/dummy";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

const PERIODE = ["Oktober 2026", "September 2026", "Agustus 2026", "Juli 2026", "Juni 2026"];

export default function SlipHR() {
  const router = useRouter();
  const [karyawan, setKaryawan] = useState("");
  const [periode, setPeriode] = useState("");
  const [file, setFile] = useState<string | null>(null);

  const pilih = async () => {
    const r = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true });
    if (!r.canceled) setFile(r.assets[0].name);
  };

  const unggah = () => {
    // TODO: unggah PDF ke Vercel Blob lewat REST API, simpan metadata, lalu kirim notifikasi ke karyawan.
    notify("Slip gaji terunggah", `${file} untuk ${karyawan} (${periode}).`, () => router.back());
  };

  return (
    <Screen footer={<Button title="Unggah slip gaji" onPress={unggah} disabled={!karyawan || !periode || !file} />}>
      <Header title="Unggah slip gaji" />
      <Text style={s.ket}>Slip diunggah per karyawan dan per periode. Karyawan akan menerima notifikasi.</Text>
      <Select label="Karyawan" value={karyawan} onChange={setKaryawan} placeholder="Pilih karyawan" options={daftarKaryawan.map((k) => k.nama)} />
      <Select label="Periode" value={periode} onChange={setPeriode} placeholder="Pilih periode" options={PERIODE} />
      <Text style={s.label}>File slip gaji (PDF)</Text>
      <Pressable style={s.drop} onPress={pilih}>
        <Icon name="upload" size={26} color={colors.primary} />
        <Text style={s.dropJudul}>{file ?? "Pilih file PDF"}</Text>
        <Text style={s.dropKet}>Maksimal 5 MB</Text>
      </Pressable>
    </Screen>
  );
}

const s = StyleSheet.create({
  ket: { fontSize: 15, lineHeight: 22, color: colors.muted, fontFamily: fonts.regular, marginBottom: 26 },
  label: { fontSize: 13, color: colors.muted, fontFamily: fonts.semi, marginBottom: 8 },
  drop: { height: 150, borderWidth: 1, borderStyle: "dashed", borderColor: "#CFCDE6", borderRadius: 18, alignItems: "center", justifyContent: "center", gap: 8 },
  dropJudul: { fontSize: 14, color: colors.text, fontFamily: fonts.semi },
  dropKet: { fontSize: 12, color: colors.muted, fontFamily: fonts.regular },
});