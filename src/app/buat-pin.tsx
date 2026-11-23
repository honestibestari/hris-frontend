import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { PinDots } from "../components/PinPad";
import PinPad from "../components/PinPad";
import Screen from "../components/Screen";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";
import { CircleButton } from "../components/Header";

export default function BuatPin() {
  const { buatPin, signOut } = useAuth();
  const [langkah, setLangkah] = useState<1 | 2>(1);
  const [pin, setPin] = useState("");
  const [pertama, setPertama] = useState("");

  useEffect(() => {
    if (pin.length !== 4) return;
    if (langkah === 1) {
      setPertama(pin);
      setPin("");
      setLangkah(2);
    } else if (pin === pertama) {
      buatPin(pin);
    } else {
      notify("PIN tidak sama", "Silakan ulangi pembuatan PIN.");
      setPin("");
      setPertama("");
      setLangkah(1);
    }
  }, [pin]);

  return (
    <Screen scroll={false} footer={<Text style={s.foot}>Jangan bagikan PIN kepada siapa pun.</Text>}>
      <CircleButton name="arrow-left" onPress={() => signOut()} />
      <View style={{ height: 28 }} />
      <View style={{ alignItems: "center", paddingHorizontal: 4 }}>
        <Text style={s.title}>{langkah === 1 ? "Buat PIN Anda" : "Konfirmasi PIN"}</Text>
        <Text style={s.sub}>
          {langkah === 1 ? "PIN 4 digit untuk masuk lebih cepat saat absen atau mengurus pengajuan." : "Masukkan PIN yang sama sekali lagi."}
        </Text>
      </View>
      <View style={{ height: 34 }} />
      <PinDots count={pin.length} />
      <View style={{ height: 34 }} />
      <PinPad value={pin} onChange={setPin} />
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 34, color: colors.text, fontFamily: fonts.serif, letterSpacing: -0.6, textAlign: "center" },
  sub: { fontSize: 14, lineHeight: 22, color: colors.muted, fontFamily: fonts.medium, textAlign: "center", marginTop: 16, maxWidth: 290 },
  foot: { textAlign: "center", fontSize: 12, color: colors.muted, fontFamily: fonts.regular },
});
