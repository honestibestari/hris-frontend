import { useState } from "react";
import { Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Field from "../components/Field";
import Button from "../components/Button";
import MapPreview from "../components/MapPreview";
import { kantor } from "../data/dummy";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

export default function LokasiKantor() {
  const router = useRouter();
  const [aktif, setAktif] = useState("Kantor Pusat");
  const [nama, setNama] = useState(kantor.nama);
  const [lat, setLat] = useState(String(kantor.latitude));
  const [lng, setLng] = useState(String(kantor.longitude));
  const [radius, setRadius] = useState(String(kantor.radiusMeter));

  const simpan = () => {
    const la = Number(lat), lo = Number(lng), r = Number(radius);
    if (!nama.trim() || Number.isNaN(la) || Number.isNaN(lo) || Number.isNaN(r) || r < 20) {
      return notify("Data tidak valid", "Periksa nama, koordinat, dan radius (minimal 20 m).");
    }
    kantor.nama = nama.trim(); kantor.latitude = la; kantor.longitude = lo; kantor.radiusMeter = r;
    // TODO: simpan ke REST API agar validasi geofence di server memakai data yang sama.
    notify("Tersimpan", "Lokasi kantor diperbarui.", () => router.back());
  };

  return (
    <Screen footer={<Button title="Simpan lokasi" onPress={simpan} />}>
      <Header title="Lokasi kantor" />
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 14 }}>
        {["Kantor Pusat", "Cabang Bandung", "+ Tambah"].map((t) => {
          const on = aktif === t;
          return (
            <Pressable key={t} onPress={() => setAktif(t)} style={[s.chip, on && s.chipOn]}>
              <Text style={[s.chipText, on && { color: colors.white }]}>{t}</Text>
            </Pressable>
          );
        })}
      </View>
      <MapPreview height={170} />
      <View style={{ height: 20 }} />
      <Field label="Nama lokasi" value={nama} onChangeText={setNama} placeholder="Kantor Pusat" autoCapitalize="words" />
      <View style={{ flexDirection: "row", gap: 18 }}>
        <Field label="Latitude" value={lat} onChangeText={setLat} placeholder="-6.1754" keyboardType="numbers-and-punctuation" />
        <Field label="Longitude" value={lng} onChangeText={setLng} placeholder="106.8272" keyboardType="numbers-and-punctuation" />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={s.lbl}>Radius absensi</Text>
      <Text style={s.val}>{radius} m</Text>
    </View>
    <Slider
      minimumValue={20} maximumValue={500} step={10}
      value={Number(radius)} onValueChange={(v) => setRadius(String(v))}
      minimumTrackTintColor={colors.primary} maximumTrackTintColor={colors.tint} thumbTintColor="#FFFFFF"
    />
    </Screen>
  );
}

const s = StyleSheet.create({
  tabs: { flexDirection: "row", gap: 10, marginBottom: 14 },
  chip: { height: 44, paddingHorizontal: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border, justifyContent: "center" },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 14, color: colors.muted, fontFamily: fonts.semi },
  radiusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  lbl: { fontSize: 13, color: colors.muted, fontFamily: fonts.semi },
  val: { fontSize: 13, color: colors.text, fontFamily: fonts.semi },
});