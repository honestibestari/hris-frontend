import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Icon, { IconName } from "../../components/Icon";
import ListRow from "../../components/ListRow";
import StatusPill from "../../components/StatusPill";
import { useAuth } from "../../context/AuthContext";
import { pengajuanSemua, kehadiranHariIni } from "../../data/dummy";
import { salam } from "../../utils/format";
import { useFocusRefresh } from "../../utils/useFocusRefresh";
import { colors, fonts } from "../../constants/theme";

function Pintasan({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return (
    <Pressable style={s.pintas} onPress={onPress}>
      <View style={s.pintasIkon}><Icon name={icon} size={26} color={colors.primary} /></View>
      <Text style={s.pintasLabel}>{label}</Text>
    </Pressable>
  );
}

function Stat({ n, label, last }: { n: number; label: string; last?: boolean }) {
  return (
    <View style={[s.stat, !last && { borderRightWidth: 1, borderRightColor: colors.border }]}>
      <Text style={s.statN}>{n}</Text>
      <Text style={s.statL}>{label}</Text>
    </View>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  useFocusRefresh();
  const menunggu = pengajuanSemua.filter((p) => p.status === "Menunggu");

  return (
    <Screen tab>
      <View style={s.atas}>
        <Avatar label={user?.nama ?? "H"} size={46} filled />
        <View style={{ flex: 1 }}>
          <Text style={s.sapa}>{salam()}</Text>
          <Text style={s.nama}>{user?.nama}</Text>
        </View>

        {/* Tombol notifikasi */}
        <View>
          <Pressable
            onPress={() => {
              console.log("tombol notifikasi ditekan");
              router.push("/notifikasi");
            }}
            hitSlop={8}
            style={s.tombolBel}
          >
            <Icon name="bell" size={22} color={colors.primary} />
          </Pressable>
          {menunggu.length > 0 ? <View style={s.titik} pointerEvents="none" /> : null}
        </View>
      </View>

      <View style={s.hero}>
        <Text style={s.heroLabel}>Menunggu approval</Text>
        <View style={s.heroBaris}>
          <Text style={s.heroAngka}>{menunggu.length}</Text>
          <Text style={s.heroKet}>pengajuan perlu ditinjau</Text>
        </View>
        <Button title="Tinjau sekarang" onPress={() => router.push("/persetujuan")} />
      </View>

      <View style={s.statRow}>
        <Stat n={42} label="Hadir" />
        <Stat n={3} label="Terlambat" />
        <Stat n={5} label="Belum absen" last />
      </View>

      <View style={s.pintasRow}>
        <Pintasan icon="users" label="Karyawan" onPress={() => router.push("/data-karyawan")} />
        <Pintasan icon="map-pin" label="Lokasi" onPress={() => router.push("/lokasi-kantor")} />
        <Pintasan icon="calendar" label="Kuota cuti" onPress={() => router.push("/kuota-cuti")} />
        <Pintasan icon="credit-card" label="Slip gaji" onPress={() => router.push("/slip-hr")} />
      </View>

      <View style={s.judulRow}>
        <Text style={s.judul}>Pengajuan terbaru</Text>
        <Pressable onPress={() => router.push("/persetujuan")}><Text style={s.lihat}>Lihat semua</Text></Pressable>
      </View>
      {menunggu.slice(0, 2).map((p, i, arr) => (
        <ListRow
          key={p.id}
          lead={<Avatar label={p.nama} />}
          title={p.nama}
          subtitle={`${p.jenis}, ${p.tanggal}`}
          right={<StatusPill status={p.status} />}
          last={i === arr.length - 1}
          onPress={() => router.push({ pathname: "/approval", params: { id: String(p.id) } })}
        />
      ))}
      {menunggu.length === 0 ? <Text style={s.kosong}>Tidak ada pengajuan yang menunggu.</Text> : null}
      <Pressable onPress={() => router.push("/monitoring")} style={{ marginTop: 18 }}>
        <Text style={s.lihat}>Monitoring kehadiran ({kehadiranHariIni.length} data)</Text>
      </Pressable>
    </Screen>
  );
}

const s = StyleSheet.create({
  atas: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 22 },
  sapa: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium },
  nama: { fontSize: 18, color: colors.text, fontFamily: fonts.bold, marginTop: 1 },
  tombolBel: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  titik: { position: "absolute", top: 10, right: 11, width: 10, height: 10, borderRadius: 5, backgroundColor: colors.peach, borderWidth: 2, borderColor: "#fff" },
  hero: { marginHorizontal: -4, backgroundColor: colors.tint, borderWidth: 1, borderColor: colors.tintBorder, borderRadius: 26, padding: 22 },
  heroLabel: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium },
  heroBaris: { flexDirection: "row", alignItems: "baseline", gap: 10, marginTop: 12, marginBottom: 22 },
  heroAngka: { fontSize: 60, lineHeight: 64, color: colors.text, fontFamily: fonts.serif, letterSpacing: -1.5 },
  heroKet: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium },
  statRow: { marginHorizontal: -4, flexDirection: "row", paddingVertical: 18, borderWidth: 1, borderColor: colors.border, borderRadius: 20, marginTop: 20 },
  stat: { flex: 1, alignItems: "center" },
  statN: { fontSize: 30, color: colors.text, fontFamily: fonts.serif },
  statL: { fontSize: 12, color: colors.muted, fontFamily: fonts.medium, marginTop: 4 },
  pintasRow: { flexDirection: "row", gap: 10, marginTop: 24 },
  pintas: { flex: 1, alignItems: "center", gap: 8 },
  pintasIkon: { width: 60, height: 60, borderRadius: 20, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  pintasLabel: { fontSize: 12, color: colors.text, fontFamily: fonts.semi },
  judulRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginTop: 26, marginBottom: 4 },
  judul: { fontSize: 20, color: colors.text, fontFamily: fonts.serif },
  lihat: { fontSize: 13, color: colors.muted, fontFamily: fonts.semi },
  kosong: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium, paddingVertical: 16 },
});