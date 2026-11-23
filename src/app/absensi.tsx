import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Button from "../components/Button";
import Icon from "../components/Icon";
import MapPreview from "../components/MapPreview";
import { kantor, statusAbsen, riwayatAbsensi, daftarBulan } from "../data/dummy";
import { hitungJarakMeter } from "../utils/geo";
import { bulanTahun, hariSingkat, jamMenit } from "../utils/format";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

export default function Absensi() {
  const router = useRouter();
  const [jarak, setJarak] = useState<number | null>(null);
  const [pesan, setPesan] = useState("Mencari lokasi Anda...");
  const [foto, setFoto] = useState<string | null>(null);

  const cekLokasi = async () => {
    setJarak(null);
    setPesan("Mencari lokasi Anda...");
    try {
      const izin = await Location.requestForegroundPermissionsAsync();
      if (izin.status !== "granted") return setPesan("Izin lokasi ditolak. Aktifkan izin lokasi untuk absen.");
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const d = hitungJarakMeter(pos.coords.latitude, pos.coords.longitude, kantor.latitude, kantor.longitude);
      setJarak(Math.round(d));
      setPesan("");
    } catch {
      setPesan("Lokasi tidak ditemukan. Coba lagi.");
    }
  };

  useEffect(() => {
    cekLokasi();
  }, []);

  const ambilSelfie = async () => {
    try {
      const izin = await ImagePicker.requestCameraPermissionsAsync();
      if (!izin.granted) return notify("Kamera", "Izin kamera diperlukan untuk selfie.");
      const hasil = await ImagePicker.launchCameraAsync({ cameraType: ImagePicker.CameraType.front, quality: 0.6 });
      if (!hasil.canceled) setFoto(hasil.assets[0].uri);
    } catch {
      notify("Kamera", "Kamera tidak tersedia di perangkat ini.");
    }
  };

  const dalam = jarak !== null && jarak <= kantor.radiusMeter;
  const luar = jarak !== null && !dalam;

  const absen = () => {
    // TODO: kirim koordinat dan foto ke REST API. Server memvalidasi geofence ulang.
    const jam = jamMenit();
    statusAbsen.jam = jam;
    const bulan = bulanTahun();
    if (!daftarBulan.includes(bulan)) daftarBulan.push(bulan);
    riwayatAbsensi.unshift({
      id: Date.now(), bulan, tgl: String(new Date().getDate()), hari: hariSingkat(),
      jam: `${jam} sampai -`, ket: kantor.nama, status: jam > "08:00" ? "Terlambat" : "Hadir",
    });
    router.replace({ pathname: "/absen-berhasil", params: { jam, jarak: String(jarak) } });
  };

  return (
    <Screen
      footer={
        luar ? (
          <View style={{ gap: 12 }}>
            <Button title="Cek lokasi lagi" onPress={cekLokasi} />
            <Button title="Absen online sebagai gantinya" variant="outline" onPress={() => router.replace("/absensi-online")} />
          </View>
        ) : (
          <View>
            <Text style={s.catatan}>Waktu absen dicatat oleh server</Text>
            <Button title="Absen masuk" onPress={absen} disabled={!dalam || !foto} />
          </View>
        )
      }
    >
      <Header title="Absensi offline" />
      <View style={{ marginHorizontal: -4 }}>
        <MapPreview height={luar ? 200 : 252} user={luar ? { x: 78, y: 70 } : undefined} />
      </View>

      <View style={[s.status, { gap: luar ? 14 : 16 }]}>
        <View style={[s.ikon, luar ? { backgroundColor: "#FBEFE3" } : { width: 24, height: 24, backgroundColor: "transparent" }]}>
          <Icon name={luar ? "alert-triangle" : "check-circle"} size={luar ? 22 : 24} color={luar ? "#9A5B1F" : colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.statusJudul}>
            {pesan || (dalam ? "Anda berada di area kantor" : "Anda di luar area kantor")}
          </Text>
          {jarak !== null ? (
            <Text style={s.statusIsi}>
              {jarak} m dari {kantor.nama}. Batas radius {kantor.radiusMeter} m.
              {luar ? " Mendekatlah ke kantor lalu cek lokasi lagi." : ""}
            </Text>
          ) : null}
        </View>
      </View>

      {!luar ? (
        <Pressable style={s.selfie} onPress={ambilSelfie}>
          {foto ? <Image source={{ uri: foto }} style={s.foto} /> : (
            <View style={s.foto}><Icon name="camera" size={26} /></View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={s.selfieJudul}>Foto selfie</Text>
            <Text style={s.selfieIsi}>{foto ? "Ketuk untuk mengambil ulang" : "Pastikan wajah terlihat jelas."}</Text>
          </View>
          <View style={s.ambil}><Text style={s.ambilText}>{foto ? "Ulang" : "Ambil"}</Text></View>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const s = StyleSheet.create({
  status: { flexDirection: "row", gap: 14, alignItems: "flex-start", marginTop: 22 },
  ikon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.tint, alignItems: "center", justifyContent: "center" },
  statusJudul: { fontSize: 16, color: colors.text, fontFamily: fonts.bold },
  statusIsi: { fontSize: 13.5, lineHeight: 21, color: colors.muted, fontFamily: fonts.medium, marginTop: 4 },
  selfie: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 22, paddingTop: 20, borderTopWidth: 1, borderTopColor: colors.border },
  foto: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  selfieJudul: { fontSize: 15, color: colors.text, fontFamily: fonts.semi },
  selfieIsi: { fontSize: 13, color: colors.muted, fontFamily: fonts.medium, marginTop: 3, lineHeight: 19 },
  ambil: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 12, borderWidth: 1.5, borderColor: colors.primary },
  ambilText: { fontSize: 13, color: colors.primary, fontFamily: fonts.semi },
  catatan: { textAlign: "center", fontSize: 12, color: colors.muted, fontFamily: fonts.medium, marginBottom: 12 },
});
