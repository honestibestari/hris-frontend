import { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";
import { Judul } from "../../components/Header";
import FilterTabs from "../../components/Tabs";
import ListRow, { IconTile } from "../../components/ListRow";
import StatusPill from "../../components/StatusPill";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { pengajuanSemua } from "../../data/dummy";
import { useFocusRefresh } from "../../utils/useFocusRefresh";
import { colors, fonts } from "../../constants/theme";
import { IKON_JENIS } from "../../constants/jenis";

export default function Pengajuan() {
  const router = useRouter();
  const { user } = useAuth();
  const [filter, setFilter] = useState("Semua");
  useFocusRefresh();
  const data = pengajuanSemua.filter((p) => p.nama === user?.nama && (filter === "Semua" || p.status === filter));

  return (
    <Screen tab footer={<Button title="Buat pengajuan" icon="plus" onPress={() => router.push("/buat-pengajuan")} />}>
      <Judul>Pengajuan</Judul>
      <FilterTabs items={["Semua", "Menunggu", "Disetujui", "Ditolak"]} active={filter} onChange={setFilter} />
      {data.length === 0 ? <Text style={s.kosong}>Belum ada pengajuan dengan status ini.</Text> : null}
      {data.map((p, i) => (
        <ListRow
          key={p.id}
          lead={<IconTile name={IKON_JENIS[p.jenis] ?? "file-text"} />}
          title={p.jenis}
          subtitle={p.tanggal}
          right={<StatusPill status={p.status} />}
          last={i === data.length - 1}
          onPress={() => router.push({ pathname: "/detail-pengajuan", params: { id: String(p.id) } })}
        />
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({ kosong: { textAlign: "center", fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 32 } });
