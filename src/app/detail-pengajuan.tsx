import { View, Text, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Button from "../components/Button";
import Icon from "../components/Icon";
import StatusPill from "../components/StatusPill";
import { IconTile, KeyValue } from "../components/ListRow";
import { pengajuanSemua } from "../data/dummy";
import { IKON_JENIS } from "../constants/jenis";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

// st: 0 selesai, 1 sedang berjalan, 2 menunggu
function Langkah({ judul, ket, st, last }: { judul: string; ket: string; st: 0 | 1 | 2; last?: boolean }) {
  return (
    <View style={{ flexDirection: "row", gap: 14 }}>
      <View style={{ alignItems: "center" }}>
        <View style={[s.bulat, st < 2 ? { backgroundColor: colors.primary, borderColor: colors.primary } : { backgroundColor: "#fff", borderColor: "#CFCDE6" }]}>
          {st === 0 ? <Icon name="check" size={13} color="#fff" /> : null}
        </View>
        {!last ? <View style={s.garis} /> : null}
      </View>
      <View style={{ paddingBottom: 20 }}>
        <Text style={[s.lj, st === 2 && { color: colors.muted }]}>{judul}</Text>
        <Text style={s.lk}>{ket}</Text>
      </View>
    </View>
  );
}

export default function DetailPengajuan() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = pengajuanSemua.find((x) => x.id === Number(id));
  if (!p) return null;
  const menunggu = p.status === "Menunggu";

  const batalkan = () => {
    const i = pengajuanSemua.findIndex((x) => x.id === p.id);
    if (i >= 0) pengajuanSemua.splice(i, 1);
    notify("Dibatalkan", "Pengajuan Anda sudah dibatalkan.", () => router.back());
  };

  return (
    <Screen footer={menunggu ? <Button title="Batalkan pengajuan" variant="outline" onPress={batalkan} /> : undefined}>
      <Header title="Detail pengajuan" />
      <View style={s.atas}>
        <IconTile name={IKON_JENIS[p.jenis] ?? "file-text"} size={52} />
        <Text style={s.jenis}>{p.jenis}</Text>
        <StatusPill status={p.status} />
      </View>
      <KeyValue k="Tanggal" v={p.tanggal} />
      {p.durasi ? <KeyValue k="Durasi" v={p.durasi} /> : null}
      <KeyValue k="Diajukan" v={p.diajukan} last />

      <Text style={s.seksi}>Progres</Text>
      <Langkah judul="Diajukan" ket={p.diajukan} st={0} />
      <Langkah judul="Ditinjau HR" ket={menunggu ? "Sedang diproses" : "Selesai"} st={menunggu ? 1 : 0} />
      <Langkah judul={p.status === "Ditolak" ? "Ditolak" : p.status === "Disetujui" ? "Disetujui" : "Keputusan"} ket={menunggu ? "Menunggu" : p.catatanHR ? `Catatan HR: ${p.catatanHR}` : "Selesai"} st={menunggu ? 2 : 0} last />
    </Screen>
  );
}

const s = StyleSheet.create({
  atas: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 8 },
  jenis: { flex: 1, fontSize: 26, color: colors.text, fontFamily: fonts.serif },
  seksi: { fontSize: 12, color: colors.muted, fontFamily: fonts.bold, marginTop: 22, marginBottom: 10 },
  kotak: { backgroundColor: colors.surface, borderRadius: 14, padding: 16 },
  isi: { fontSize: 14, lineHeight: 22, color: colors.text, fontFamily: fonts.medium },
  bulat: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  garis: { width: 2, flex: 1, minHeight: 28, backgroundColor: colors.border },
  lj: { fontSize: 14.5, color: colors.text, fontFamily: fonts.semi },
  lk: { fontSize: 12.5, color: colors.muted, fontFamily: fonts.medium, marginTop: 2 },
});
