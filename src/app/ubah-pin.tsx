import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import PinPad, { PinDots } from "../components/PinPad";
import Screen from "../components/Screen";
import Header from "../components/Header";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";
import { Pressable } from "react-native";

const JUDUL = ["Masukkan PIN lama", "Masukkan PIN baru", "Konfirmasi PIN baru"];

export default function UbahPin() {
  const router = useRouter();
  const { verifikasiPin, ubahPin, lupaPin } = useAuth();
  const [langkah, setLangkah] = useState(0);
  const [pin, setPin] = useState("");
  const [lama, setLama] = useState("");
  const [baru, setBaru] = useState("");

  useEffect(() => {
    if (pin.length !== 4) return;
    (async () => {
      if (langkah === 0) {
        if (await verifikasiPin(pin)) { setLama(pin); setLangkah(1); }
        else notify("PIN lama salah", "Coba lagi.");
      } else if (langkah === 1) {
        setBaru(pin); setLangkah(2);
      } else if (pin === baru) {
        await ubahPin(lama, baru);
        notify("Berhasil", "PIN Anda sudah diubah.", () => router.back());
      } else {
        notify("PIN tidak sama", "Ulangi PIN baru.");
        setLangkah(1);
      }
      setPin("");
    })();
  }, [pin]);

  return (
    <Screen
      scroll={false}
      footer={
        <Pressable onPress={() => lupaPin()}>
          <Text style={s.foot}>
            Lupa PIN? <Text style={{ color: colors.text, fontFamily: fonts.semi }}>Masuk dengan email</Text>
          </Text>
        </Pressable>
      }
    >
      <Header title="Ubah PIN" />
      <View style={s.bars}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[s.bar, i <= langkah && { backgroundColor: colors.primary }]} />
        ))}
      </View>
      <Text style={s.ket}>PIN lama, PIN baru, konfirmasi</Text>
      <Text style={s.title}>{JUDUL[langkah]}</Text>
      <PinDots count={pin.length} />
      <View style={{ height: 30 }} />
      <PinPad value={pin} onChange={setPin} />
    </Screen>
  );
}

const s = StyleSheet.create({
  bars: { flexDirection: "row", gap: 8, marginTop: 4 },
  bar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border },
  ket: { fontSize: 12, color: colors.muted, fontFamily: fonts.medium, marginTop: 10 },
  title: { fontSize: 32, color: colors.text, fontFamily: fonts.serif, letterSpacing: -0.5, textAlign: "center", marginTop: 30, marginBottom: 36 },
  foot: { textAlign: "center", fontSize: 13, color: colors.muted, fontFamily: fonts.regular },
});
