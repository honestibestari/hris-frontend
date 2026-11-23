import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { colors, fonts } from "../../constants/theme";
import { Pressable } from "react-native";
import Icon, { IconName } from "../../components/Icon";
import { Chevron } from "../../components/ListRow";

function DataDiri({ icon, label, value, last }: { icon: IconName; label: string; value: string; last?: boolean }) {
  return (
    <View style={[s.baris, { gap: 16 }, !last && s.garis]}>
      <View style={s.tile}><Icon name={icon} size={20} color={colors.primary} /></View>
      <View>
        <Text style={s.dl}>{label}</Text>
        <Text style={s.dv}>{value}</Text>
      </View>
    </View>
  );
}

function Menu({ icon, title, right, onPress, last }: { icon: IconName; title: string; right?: React.ReactNode; onPress?: () => void; last?: boolean }) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={[s.baris, { gap: 16 }, !last && s.garis]}>
      <Icon name={icon} size={22} color={colors.primary} />
      <Text style={s.mt}>{title}</Text>
      <View style={{ flex: 1 }} />
      {right}
      <Chevron />
    </Pressable>
  );
}

export default function Profil() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  return (
    <Screen tab footer={<Button title="Keluar" icon="log-out" variant="outline" onPress={() => signOut()} />}>
      <View style={s.atas}>
        <Avatar label={user?.nama ?? "?"} size={76} filled />
        <View>
          <Text style={s.nama}>{user?.nama}</Text>
          <Text style={s.jabatan}>{user?.jabatan}</Text>
        </View>
      </View>
      <Text style={s.seksi}>Data diri</Text>
      <DataDiri icon="user" label="NIK" value={user?.nik ?? "-"} />
      <DataDiri icon="layers" label="Departemen" value={user?.departemen ?? "-"} />
      <DataDiri icon="phone" label="Nomor HP" value={user?.hp ?? "-"} last />
      <Text style={[s.seksi, { marginTop: 22 }]}>Akun dan dokumen</Text>
      <Menu icon="calendar" title="Kuota cuti" right={<Text style={s.kanan}>8 hari</Text>} />
      <Menu icon="briefcase" title="Kontrak kerja" onPress={() => router.push("/kontrak")} />
      <Menu icon="credit-card" title="Slip gaji" onPress={() => router.push("/slip-gaji")} />
      <Menu icon="lock" title="Ubah password" onPress={() => router.push("/ganti-password")} />
      <Menu icon="lock" title="Ubah PIN" onPress={() => router.push("/ubah-pin")} last />
    </Screen>
  );
}

const s = StyleSheet.create({
  atas: { flexDirection: "row", alignItems: "center", gap: 18, marginBottom: 26 },
  nama: { fontSize: 28, color: colors.text, fontFamily: fonts.serif, letterSpacing: -0.5 },
  jabatan: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 4 },
  seksi: { fontSize: 13, color: colors.muted, fontFamily: fonts.bold, marginBottom: 2 },
  kanan: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium },
  baris: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  garis: { borderBottomWidth: 1, borderBottomColor: colors.border },
  tile: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  dl: { fontSize: 13, color: colors.muted, fontFamily: fonts.regular },
  dv: { fontSize: 16, color: colors.text, fontFamily: fonts.semi, marginTop: 1 },
  mt: { fontSize: 16, color: colors.text, fontFamily: fonts.semi },
});
