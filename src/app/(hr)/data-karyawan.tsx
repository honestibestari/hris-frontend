import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";
import { Judul } from "../../components/Header";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import ListRow, { Chevron } from "../../components/ListRow";
import { daftarKaryawan } from "../../data/dummy";
import { useFocusRefresh } from "../../utils/useFocusRefresh";
import { colors, fonts } from "../../constants/theme";

export default function DataKaryawan() {
  const router = useRouter();
  const [q, setQ] = useState("");
  useFocusRefresh();

  // Pencarian menyaring berdasarkan nama atau NIK.
  const data = daftarKaryawan.filter((k) =>
    `${k.nama} ${k.nik}`.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <Screen
      tab
      footer={<Button title="Tambah karyawan" icon="plus" onPress={() => router.push("/tambah-karyawan")} />}
    >
      <Judul>Karyawan</Judul>

      <View style={s.cari}>
        <Icon name="search" size={19} color={colors.muted} />
        <TextInput
          style={s.input}
          value={q}
          onChangeText={setQ}
          placeholder="Cari nama atau NIK"
          placeholderTextColor={colors.muted}
        />
      </View>

      {data.length === 0 ? <Text style={s.kosong}>Karyawan tidak ditemukan.</Text> : null}

      {data.map((k, i) => (
        <ListRow
          key={k.id}
          lead={<Avatar label={k.nama} />}
          title={k.nama}
          subtitle={`${k.jabatan}  •  NIK ${k.nik}`}
          right={<Chevron />}
          last={i === data.length - 1}
          onPress={() => router.push({ pathname: "/detail-karyawan", params: { id: String(k.id) } })}
        />
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({
  cari: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.surface,
    marginBottom: 6,
  },
  input: { flex: 1, fontSize: 14, color: colors.text, fontFamily: fonts.medium },
  kosong: { textAlign: "center", fontSize: 14, color: colors.muted, fontFamily: fonts.medium, marginTop: 32 },
});