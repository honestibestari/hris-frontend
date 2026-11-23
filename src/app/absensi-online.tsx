import { useState } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Field from "../components/Field";
import Button from "../components/Button";
import Info from "../components/Info";
import Lampiran from "../components/Lampiran";
import { Segmented } from "../components/Tabs";
import { useAuth } from "../context/AuthContext";
import { pengajuanSemua, riwayatAbsensi, daftarBulan } from "../data/dummy";
import { notify } from "../utils/notify";
import { bulanTahun, hariSingkat, tanggalPanjang } from "../utils/format";
import { colors, fonts } from "../constants/theme";

export default function AbsensiOnline() {
  const router = useRouter();
  const { user } = useAuth();
  const [tipe, setTipe] = useState("Setengah hari");
  const [ket, setKet] = useState("");
  const [file, setFile] = useState<string | null>(null);

  const kirim = () => {
    if (!ket.trim()) return notify("Keterangan kosong", "Isi keterangan terlebih dahulu.");
    const id = Math.max(0, ...pengajuanSemua.map((p) => p.id)) + 1;
    pengajuanSemua.unshift({
      id, nama: user?.nama ?? "", jabatan: user?.jabatan ?? "", jenis: `Absensi Online (${tipe})`,
      tanggal: tanggalPanjang(), alasan: ket, lampiran: file ?? undefined, status: "Menunggu", diajukan: tanggalPanjang(),
    });
    if (!daftarBulan.includes(bulanTahun())) daftarBulan.push(bulanTahun());
    riwayatAbsensi.unshift({ id: Date.now(), bulan: bulanTahun(), tgl: String(new Date().getDate()), hari: hariSingkat(), jam: `Absensi ${tipe}`, ket: "Menunggu approval HR", status: "Menunggu" });
    notify("Terkirim", "Absensi online diteruskan ke HR untuk disetujui.", () => router.back());
  };

  return (
    <Screen footer={<Button title="Kirim untuk approval" onPress={kirim} />}>
      <Header title="Absensi online" />
      <Text style={{ fontSize: 14, lineHeight: 22, color: colors.muted, fontFamily: fonts.medium, marginBottom: 20 }}>Pilih jenis kerja di luar kantor.</Text>
      <Segmented items={["Setengah hari", "WFH", "Perdin"]} active={tipe} onChange={setTipe} />
      <Field label="Keterangan" value={ket} onChangeText={setKet} placeholder="Contoh: bekerja dari rumah, ada kunjungan klien." multiline autoCapitalize="sentences" />
      <Text style={{ fontSize: 12, color: colors.muted, fontFamily: fonts.semi, marginBottom: 6 }}>Lampiran (opsional)</Text>
      <Lampiran nama={file} onChange={setFile} />
      <Info>Absensi online diteruskan ke HR dan baru tercatat setelah disetujui.</Info>
    </Screen>
  );
}
