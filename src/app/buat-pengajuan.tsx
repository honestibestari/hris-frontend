import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Field from "../components/Field";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Info from "../components/Info";
import Lampiran from "../components/Lampiran";
import { useAuth } from "../context/AuthContext";
import { pengajuanSemua } from "../data/dummy";
import { IKON_JENIS, JENIS_PENGAJUAN } from "../constants/jenis";
import { notify } from "../utils/notify";
import { tanggalPanjang } from "../utils/format";
import { colors, fonts } from "../constants/theme";

export default function BuatPengajuan() {
  const router = useRouter();
  const { user } = useAuth();
  const [jenis, setJenis] = useState("Cuti");
  const [mulai, setMulai] = useState("");
  const [selesai, setSelesai] = useState("");
  const [alasan, setAlasan] = useState("");
  const [file, setFile] = useState<string | null>(null);

  const kirim = () => {
    if (!mulai.trim() || !alasan.trim()) return notify("Data belum lengkap", "Isi tanggal dan alasan pengajuan.");
    const id = Math.max(0, ...pengajuanSemua.map((p) => p.id)) + 1;
    pengajuanSemua.unshift({
      id, nama: user?.nama ?? "", jabatan: user?.jabatan ?? "", jenis,
      tanggal: selesai.trim() ? `${mulai.trim()} sampai ${selesai.trim()}` : mulai.trim(),
      alasan: alasan.trim(), lampiran: file ?? undefined, sisaCuti: jenis === "Cuti" ? 8 : undefined,
      status: "Menunggu", diajukan: tanggalPanjang(),
    });
    notify("Terkirim", "Pengajuan Anda diteruskan ke HR.", () => router.back());
  };

  return (
    <Screen footer={<Button title="Kirim pengajuan" onPress={kirim} />}>
      <Header title="Buat pengajuan" />
      <View style={s.grid}>
        {JENIS_PENGAJUAN.map((j) => {
          const aktif = jenis === j;
          return (
            <Pressable key={j} onPress={() => setJenis(j)} style={[s.tile, aktif && s.tileAktif]}>
              <Icon name={IKON_JENIS[j]} size={19} color={colors.primary} />
              <Text style={s.tileText}>{j}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{ flexDirection: "row", gap: 18 }}>
        <Field label="Tanggal mulai" value={mulai} onChangeText={setMulai} placeholder="12 Okt 2026" autoCapitalize="words" />
        <Field label="Tanggal selesai" value={selesai} onChangeText={setSelesai} placeholder="14 Okt 2026" autoCapitalize="words" />
      </View>
      <Field label="Alasan" value={alasan} onChangeText={setAlasan} placeholder="Tulis alasan pengajuan" multiline autoCapitalize="sentences" />
      <Lampiran nama={file} onChange={setFile} />
      {jenis === "Cuti" ? <Info>Sisa kuota cuti Anda 8 hari.</Info> : null}
    </Screen>
  );
}

const s = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 22 },
  tile: { width: "48%", flexGrow: 1, flexDirection: "row", alignItems: "center", gap: 10, padding: 14, borderRadius: 14, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.white },
  tileAktif: { borderColor: colors.primary, backgroundColor: colors.tint },
  tileText: { fontSize: 13.5, color: colors.text, fontFamily: fonts.semi },
});
