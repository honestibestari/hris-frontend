import { useState } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Field from "../components/Field";
import Select from "../components/Select";
import Button from "../components/Button";
import { daftarKaryawan } from "../data/dummy";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

const JABATAN = ["Staf Keuangan", "Staf Pemasaran", "Staf IT", "Staf Umum", "Staf Operasional"];
const DEPARTEMEN = ["Keuangan", "Pemasaran", "Teknologi", "Umum", "Operasional"];
const LOKASI = ["Kantor Pusat", "Cabang Bandung"];

export default function TambahKaryawan() {
  const router = useRouter();
  const [f, setF] = useState({ nama: "", nik: "", email: "", hp: "", jabatan: "", departemen: "", lokasi: "" });
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });

  const simpan = () => {
    if (!f.nama.trim() || !f.nik.trim() || !f.email.trim()) return notify("Data belum lengkap", "Nama, NIK, dan email wajib diisi.");
    daftarKaryawan.push({
      id: Date.now(), nama: f.nama.trim(), nik: f.nik.trim(), email: f.email.trim(), hp: f.hp.trim(),
      jabatan: f.jabatan || "-", departemen: f.departemen || "-",
      sisaCuti: 12, kontrak: "PKWT", kontrakBerakhir: "-", kontrakStatus: "Aktif",
    });
    // TODO: server membuat akun role KARYAWAN dan mengirim password sementara ke email.
    notify("Akun dibuat", "Password sementara dikirim ke email karyawan.", () => router.back());
  };

  return (
    <Screen footer={<Button title="Simpan dan kirim akun" onPress={simpan} />}>
      <Header title="Tambah karyawan" />
      <Field label="Nama lengkap" value={f.nama} onChangeText={set("nama")} placeholder="Nama sesuai KTP" autoCapitalize="words" />
      <Field label="NIK" value={f.nik} onChangeText={set("nik")} placeholder="Nomor induk karyawan" />
      <Field label="Email" value={f.email} onChangeText={set("email")} placeholder="nama@perusahaan.com" keyboardType="email-address" />
      <Field label="Nomor HP" value={f.hp} onChangeText={set("hp")} placeholder="08xxxxxxxxxx" keyboardType="phone-pad" />
      <Select label="Jabatan" value={f.jabatan} onChange={set("jabatan")} placeholder="Pilih jabatan" options={JABATAN} />
      <Select label="Departemen" value={f.departemen} onChange={set("departemen")} placeholder="Pilih departemen" options={DEPARTEMEN} />
      <Select label="Lokasi kantor" value={f.lokasi} onChange={set("lokasi")} placeholder="Pilih lokasi absensi" options={LOKASI} />
      <Text style={{ fontSize: 12, lineHeight: 19, color: colors.muted, fontFamily: fonts.regular }}>
        Password sementara dikirim ke email karyawan. Karyawan wajib menggantinya saat login pertama.
      </Text>
    </Screen>
  );
}