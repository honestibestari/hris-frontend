import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Icon, { IconName } from "../../components/Icon";
import { CircleButton } from "../../components/Header";
import ListRow, { IconTile, Chevron } from "../../components/ListRow";
import StatusPill from "../../components/StatusPill";
import { useAuth } from "../../context/AuthContext";
import { pengajuanSemua, statusAbsen } from "../../data/dummy";
import { salam, jamMenit, tanggalPanjang } from "../../utils/format";
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

export default function Beranda() {
  const router = useRouter();
  const { user } = useAuth();
  const [now, setNow] = useState(new Date());
  useFocusRefresh();
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(t);
  }, []);

  const terbaru = pengajuanSemua.filter((p) => p.nama === user?.nama).slice(0, 2);
  const sudah = !!statusAbsen.jam;

  return (
    <Screen tab>
      <View style={s.atas}>
        <Avatar label={user?.nama ?? "?"} size={46} filled />
        <View style={{ flex: 1 }}>
          <Text style={s.sapa}>{salam(now)}</Text>
          <Text style={s.nama}>{user?.nama}</Text>
        </View>
        <View>
          <CircleButton name="bell" onPress={() => router.push("/notifikasi")} />
          <View style={s.titik} />
        </View>
      </View>

      <View style={s.hero}>
        <View style={s.heroBaris}>
          <Text style={s.heroTanggal}>{tanggalPanjang(now)}</Text>
          <View style={s.status}>
            <View style={[s.dot, sudah && { backgroundColor: colors.primary }]} />
            <Text style={s.statusText}>{sudah ? `Absen ${statusAbsen.jam}` : "Belum absen"}</Text>
          </View>
        </View>
        <Text style={s.jam}>{jamMenit(now)}</Text>
        <Text style={s.jamKet}>Jam kerja 08.00 sampai 17.00</Text>
        <Button title={sudah ? "Sudah absen masuk" : "Absen masuk"} icon="map-pin" disabled={sudah} onPress={() => router.push("/absensi")} />
      </View>

      <View style={s.pintasRow}>
        <Pintasan icon="file-text" label="Pengajuan" onPress={() => router.push("/pengajuan")} />
        <Pintasan icon="clock" label="Riwayat" onPress={() => router.push("/riwayat")} />
        <Pintasan icon="briefcase" label="Kontrak" onPress={() => router.push("/kontrak")} />
        <Pintasan icon="credit-card" label="Slip gaji" onPress={() => router.push("/slip-gaji")} />
      </View>

      <View style={s.judulRow}>
        <Text style={s.judul}>Aktivitas terbaru</Text>
        <Pressable onPress={() => router.push("/pengajuan")}><Text style={s.lihat}>Lihat semua</Text></Pressable>
      </View>
      {terbaru.map((p, i) => (
        <ListRow
          key={p.id}
          lead={<IconTile name={p.jenis === "Cuti" ? "calendar" : "clock"} />}
          title={p.jenis}
          subtitle={p.tanggal}
          right={<StatusPill status={p.status} />}
          last={i === terbaru.length - 1}
          onPress={() => router.push({ pathname: "/detail-pengajuan", params: { id: String(p.id) } })}
        />
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  atas: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 22 },
  sapa: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium },
  nama: { fontSize: 18, color: colors.text, fontFamily: fonts.bold, marginTop: 1 },
  titik: { position: "absolute", top: 10, right: 11, width: 10, height: 10, borderRadius: 5, backgroundColor: colors.peach, borderWidth: 2, borderColor: "#fff" },
  hero: { marginHorizontal: -4, backgroundColor: colors.tint, borderWidth: 1, borderColor: colors.tintBorder, borderRadius: 26, padding: 22 },
  heroBaris: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  heroTanggal: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium },
  status: { flexDirection: "row", alignItems: "center", gap: 7 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.peach },
  statusText: { fontSize: 12, color: colors.text, fontFamily: fonts.semi },
  jam: { fontSize: 60, lineHeight: 64, color: colors.text, fontFamily: fonts.serif, letterSpacing: -1.5, marginTop: 14 },
  jamKet: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium, marginTop: 4, marginBottom: 20 },
  pintasRow: { flexDirection: "row", gap: 10, marginTop: 26 },
  pintas: { flex: 1, alignItems: "center", gap: 8 },
  pintasIkon: { width: 60, height: 60, borderRadius: 20, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  pintasLabel: { fontSize: 12, color: colors.text, fontFamily: fonts.semi },
  judulRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginTop: 28, marginBottom: 4 },
  judul: { fontSize: 20, color: colors.text, fontFamily: fonts.serif },
  lihat: { fontSize: 13, color: colors.muted, fontFamily: fonts.semi },
});
