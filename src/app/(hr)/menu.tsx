import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";
import { Judul } from "../../components/Header";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import ListRow, { IconTile, Chevron } from "../../components/ListRow";
import { useAuth } from "../../context/AuthContext";
import { colors, fonts } from "../../constants/theme";
import type { IconName } from "../../components/Icon";

export default function MenuHR() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const item = (icon: IconName, title: string, to: string, last = false) => (
    <ListRow lead={<IconTile name={icon} />} title={title} right={<Chevron />} onPress={() => router.push(to as never)} last={last} />
  );
  return (
    <Screen tab footer={<Button title="Keluar" icon="log-out" variant="outline" onPress={() => signOut()} />}>
      <Judul>Menu</Judul>
      <View style={s.profil}>
        <Avatar label={user?.nama ?? "H"} size={52} filled />
        <View>
          <Text style={s.nama}>{user?.nama}</Text>
          <Text style={s.email}>{user?.email}</Text>
        </View>
      </View>
      {item("map-pin", "Lokasi kantor", "/lokasi-kantor")}
      {item("calendar", "Kuota cuti", "/kuota-cuti")}
      {item("briefcase", "Kontrak kerja", "/kontrak-hr")}
      {item("users", "Monitoring kehadiran", "/monitoring")}
      {item("credit-card", "Unggah slip gaji", "/slip-hr", true)}
      <Text style={s.seksi}>Akun</Text>
      {item("lock", "Ubah password", "/ganti-password")}
      {item("lock", "Ubah PIN", "/ubah-pin", true)}
    </Screen>
  );
}

const s = StyleSheet.create({
  profil: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16, backgroundColor: colors.tint, borderWidth: 1, borderColor: colors.tintBorder, borderRadius: 20, marginBottom: 12 },
  nama: { fontSize: 16, color: colors.text, fontFamily: fonts.bold },
  email: { fontSize: 12.5, color: colors.muted, fontFamily: fonts.medium, marginTop: 2 },
  seksi: { fontSize: 13, color: colors.muted, fontFamily: fonts.bold, marginTop: 20 },
});
