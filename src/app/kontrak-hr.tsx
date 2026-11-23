import { useState } from "react";
import { View } from "react-native";
import Screen from "../components/Screen";
import Header, { CircleButton } from "../components/Header";
import FilterTabs from "../components/Tabs";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import ListRow from "../components/ListRow";
import StatusPill from "../components/StatusPill";
import { daftarKaryawan } from "../data/dummy";
import { notify } from "../utils/notify";

export default function KontrakHR() {
  const [filter, setFilter] = useState("Semua");
  const data = daftarKaryawan.filter((k) => filter === "Semua" || k.kontrakStatus === filter);
  const tambah = () => notify("Tambah kontrak", "Form kontrak dibuat pada tahap integrasi API.");
  return (
    <Screen footer={<Button title="Tambah kontrak" icon="plus" onPress={tambah} />}>
      <Header title="Kontrak kerja" right={<View><CircleButton name="plus" size={40} onPress={tambah} /></View>} />
      <FilterTabs items={["Semua", "Aktif", "Hampir habis"]} active={filter} onChange={setFilter} />
      {data.map((k, i) => (
        <ListRow
          key={k.id}
          lead={<Avatar label={k.nama} />}
          title={k.nama}
          subtitle={k.kontrakBerakhir === "Tetap" ? `${k.kontrak}, tetap` : `${k.kontrak}, berakhir ${k.kontrakBerakhir}`}
          right={<StatusPill status={k.kontrakStatus} />}
          last={i === data.length - 1}
        />
      ))}
    </Screen>
  );
}
