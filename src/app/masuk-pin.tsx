import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import PinPad, { PinDots } from "../components/PinPad";
import Screen from "../components/Screen";
import Avatar from "../components/Avatar";
import { salam } from "../utils/format";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

const MAKS_SALAH = 5;

export default function MasukPin() {
  const { user, verifikasiPin, bukaKunci, signOut, lupaPin } = useAuth();
  const [pin, setPin] = useState("");
  const [salah, setSalah] = useState(0);
  const [pesan, setPesan] = useState("Masukkan PIN Anda");

  useEffect(() => {
    if (pin.length !== 4) return;
    (async () => {
      if (await verifikasiPin(pin)) return bukaKunci();
      const n = salah + 1;
      setSalah(n);
      setPin("");
      if (n >= MAKS_SALAH) {
        notify("PIN salah 5 kali", "Demi keamanan, silakan login dengan email lagi.", () => signOut());
      } else {
        setPesan(`PIN salah. Sisa percobaan ${MAKS_SALAH - n}.`);
      }
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
      <View style={{ height: 21 }} />
      <View style={{ alignItems: "center" }}>
        <Avatar label={user?.nama ?? "?"} size={68} filled />
        <Text style={s.sapa}>{salam()}</Text>
        <Text style={s.nama}>{user?.nama}</Text>
        <Text style={[s.pesan, salah > 0 && { color: colors.danger }]}>{pesan}</Text>
      </View>
      <View style={{ height: 34 }} />
      <PinDots count={pin.length} />
      <View style={{ height: 30 }} />
      <PinPad value={pin} onChange={setPin} />
    </Screen>
  );
}

const s = StyleSheet.create({
  sapa: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 16 },
  nama: { fontSize: 30, color: colors.text, fontFamily: fonts.serif, letterSpacing: -0.5, marginTop: 2 },
  pesan: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 10 },
  foot: { textAlign: "center", fontSize: 13, color: colors.muted, fontFamily: fonts.regular },
});
