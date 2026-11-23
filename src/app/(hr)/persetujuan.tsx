import { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";
import { Judul } from "../../components/Header";
import FilterTabs from "../../components/Tabs";
import Avatar from "../../components/Avatar";
import ListRow from "../../components/ListRow";
import StatusPill from "../../components/StatusPill";
import { pengajuanSemua } from "../../data/dummy";
import { useFocusRefresh } from "../../utils/useFocusRefresh";
import { colors, fonts } from "../../constants/theme";

export default function Persetujuan() {
  const router = useRouter();
  const [filter, setFilter] = useState("Menunggu");
  useFocusRefresh();
  const data = pengajuanSemua.filter((p) => filter === "Semua" || p.status === filter);

  return (
    <Screen tab>
      <Judul>Pengajuan</Judul>
      <FilterTabs items={["Semua", "Menunggu", "Disetujui", "Ditolak"]} active={filter} onChange={setFilter} />
      {data.length === 0 ? <Text style={s.kosong}>Tidak ada pengajuan dengan status ini.</Text> : null}
      {data.map((p, i) => (
        <ListRow
          key={p.id}
          lead={<Avatar label={p.nama} />}
          title={p.nama}
          subtitle={`${p.jenis}, ${p.tanggal}`}
          right={<StatusPill status={p.status} />}
          last={i === data.length - 1}
          onPress={() => router.push({ pathname: "/approval", params: { id: String(p.id) } })}
        />
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({ kosong: { textAlign: "center", fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 32 } });
