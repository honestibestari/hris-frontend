import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Screen from "../components/Screen";
import Field from "../components/Field";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const masuk = async () => {
    if (!email || !password) return notify("Login gagal", "Email dan password wajib diisi.");
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (e) {
      notify("Login gagal", e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen padX={28}
      footer={
        <Text style={s.foot}>
          Login email hanya sekali di perangkat ini.{"\n"}Berikutnya cukup dengan PIN.
        </Text>
      }
    >
        {/* Screen sudah menambah insets.top + 16, jadi total logo 92 dp dari atas layar */}
        <View style={{ height: Math.max(0, 92 - 16 - insets.top) }} />
        <View style={s.brand}>
          <View style={s.logo}><Icon name="check-circle" size={22} color="#fff" /></View>
          <Text style={s.brandText}>HRIS</Text>
        </View>
        <Text style={s.title}>Selamat datang kembali</Text>
        <Field label="Email" value={email} onChangeText={setEmail} placeholder="nama@perusahaan.com" keyboardType="email-address" />
        <Field label="Password" value={password} onChangeText={setPassword} placeholder="Masukkan password" secure />
        <View style={{ height: 6 }} />
        <Button title="Masuk" onPress={masuk} loading={loading} />
    </Screen>
  );
}

const s = StyleSheet.create({
  brand: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 40 },
  logo: { width: 42, height: 42, borderRadius: 12, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  brandText: { fontSize: 18, color: colors.text, fontFamily: fonts.bold, letterSpacing: 0.5 },
  title: { fontSize: 38, lineHeight: 42, color: colors.text, fontFamily: fonts.serif, letterSpacing: -0.8, marginBottom: 52 },
  foot: { textAlign: "center", fontSize: 13, lineHeight: 17, color: colors.muted, fontFamily: fonts.regular },
});