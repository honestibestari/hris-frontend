import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../components/Screen";
import Field from "../components/Field";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";
import * as api from "../services/api";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";
import Header, { Judul } from "../components/Header";

function Syarat({ ok, text }: { ok: boolean; text: string }) {
  return (
    <View style={s.syarat}>
      <Icon name={ok ? "check-circle" : "circle"} size={18} color={ok ? colors.primary : "#B7B5D2"} />
      <Text style={[s.syaratText, ok && { color: colors.text }]}>{text}</Text>
    </View>
  );
}

// Ubah password (opsional) dari Profil atau Menu.
export default function GantiPassword() {
  const router = useRouter();
  const { user } = useAuth();
  const [lama, setLama] = useState("");
  const [baru, setBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [loading, setLoading] = useState(false);

  const panjangOk = baru.length >= 8;
  const kombinasiOk = /[A-Za-z]/.test(baru) && /\d/.test(baru);
  const samaOk = baru.length > 0 && baru === konfirmasi;
  const siap = !!lama && panjangOk && kombinasiOk && samaOk;

  const simpan = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await api.gantiPassword(user.email, lama, baru);
      notify("Berhasil", "Password Anda sudah diganti.", () => router.back());
    } catch (e) {
      notify("Gagal", e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen footer={<Button title="Simpan password" onPress={simpan} disabled={!siap} loading={loading} />}>
    <Judul>Buat password baru</Judul>
    <Text style={{ fontSize: 15, lineHeight: 22, color: colors.muted, fontFamily: fonts.regular, marginBottom: 28 }}>
      Password sementara dari HR hanya untuk login pertama.
    </Text>
<Field label="Password sementara" value={lama} onChangeText={setLama} placeholder="Dari email HR" secure />
      <Field label="Password baru" value={baru} onChangeText={setBaru} placeholder="Minimal 8 karakter" secure />
      <Field label="Konfirmasi password baru" value={konfirmasi} onChangeText={setKonfirmasi} placeholder="Ulangi password baru" secure />
      <Syarat ok={panjangOk} text="Minimal 8 karakter" />
      <Syarat ok={kombinasiOk} text="Mengandung huruf dan angka" />
      <Syarat ok={samaOk} text="Sama dengan konfirmasi" />
    </Screen>
  );
}

const s = StyleSheet.create({
  syarat: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  syaratText: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium },
});
