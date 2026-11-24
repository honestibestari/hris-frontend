// Data contoh di memori. Nanti diganti data dari REST API.
import type { IconName } from "../components/Icon";

export type StatusPengajuan = "Menunggu" | "Disetujui" | "Ditolak";

export type PengajuanItem = {
  id: number;
  nama: string;
  jabatan: string;
  jenis: string;
  tanggal: string;
  durasi?: string;
  alasan: string;
  lampiran?: string;
  sisaCuti?: number;
  status: StatusPengajuan;
  catatanHR?: string;
  diajukan: string;
};

export const pengajuanSemua: PengajuanItem[] = [
  { id: 1, nama: "Karyawan", jabatan: "Staf Operasional", jenis: "Cuti", tanggal: "12 sampai 14 Okt", durasi: "3 hari", alasan: "Keperluan keluarga di luar kota.", lampiran: "surat-keterangan.pdf", sisaCuti: 8, status: "Menunggu", diajukan: "9 Okt 2026" },
  { id: 2, nama: "Karyawan", jabatan: "Staf Operasional", jenis: "Lembur", tanggal: "8 Okt, 2 jam", alasan: "Menyelesaikan laporan akhir bulan.", status: "Disetujui", diajukan: "8 Okt 2026" },
  { id: 3, nama: "Karyawan", jabatan: "Staf Operasional", jenis: "Koreksi absensi", tanggal: "3 Okt", alasan: "Lupa absen pulang.", status: "Disetujui", diajukan: "4 Okt 2026" },
  { id: 4, nama: "Karyawan", jabatan: "Staf Operasional", jenis: "Force majeure", tanggal: "28 Sep", alasan: "Banjir di sekitar rumah.", status: "Ditolak", catatanHR: "Lampiran belum ada.", diajukan: "28 Sep 2026" },
  { id: 5, nama: "Karyawan A", jabatan: "Staf Keuangan", jenis: "Cuti", tanggal: "15 sampai 16 Okt", alasan: "Acara keluarga.", sisaCuti: 6, status: "Menunggu", diajukan: "10 Okt 2026" },
  { id: 6, nama: "Karyawan B", jabatan: "Staf Pemasaran", jenis: "Lembur", tanggal: "9 Okt, 3 jam", alasan: "Persiapan event.", status: "Menunggu", diajukan: "9 Okt 2026" },
  { id: 7, nama: "Karyawan C", jabatan: "Staf IT", jenis: "Koreksi absensi", tanggal: "5 Okt", alasan: "Jaringan gangguan saat absen.", status: "Menunggu", diajukan: "6 Okt 2026" },
];

export type Riwayat = { id: number; bulan: string; hari: string; tgl: string; jam: string; ket: string; status: "Hadir" | "Terlambat" | "Menunggu" };

export const riwayatAbsensi: Riwayat[] = [
  { id: 1, bulan: "Oktober 2026", tgl: "19", hari: "Sen", jam: "07:56 sampai 17:03", ket: "Kantor Pusat", status: "Hadir" },
  { id: 2, bulan: "Oktober 2026", tgl: "16", hari: "Jum", jam: "08:12 sampai 17:00", ket: "Kantor Pusat", status: "Terlambat" },
  { id: 3, bulan: "Oktober 2026", tgl: "15", hari: "Kam", jam: "07:50 sampai 17:10", ket: "Kantor Pusat", status: "Hadir" },
  { id: 4, bulan: "Oktober 2026", tgl: "14", hari: "Rab", jam: "Absensi WFH", ket: "Menunggu approval HR", status: "Menunggu" },
  { id: 5, bulan: "Oktober 2026", tgl: "13", hari: "Sel", jam: "07:58 sampai 17:05", ket: "Kantor Pusat", status: "Hadir" },
];

export const daftarBulan = ["Agustus 2026", "September 2026", "Oktober 2026"];

// Status absen hari ini (diubah saat karyawan absen).
export const statusAbsen = { jam: null as string | null };

export type KaryawanItem = {
  id: number; nama: string; jabatan: string; departemen: string; nik: string; email: string; hp: string;
  sisaCuti: number; kontrak: string; kontrakBerakhir: string; kontrakStatus: "Aktif" | "Hampir habis";
};

export const daftarKaryawan: KaryawanItem[] = [
  { id: 1, nama: "Andini Putri", jabatan: "Staf Keuangan", departemen: "Keuangan", nik: "1001", email: "andini.putri@perusahaan.com", hp: "081234567801", sisaCuti: 8, kontrak: "PKWT", kontrakBerakhir: "31 Des 2026", kontrakStatus: "Aktif" },
  { id: 2, nama: "Bagas Setiawan", jabatan: "Staf Pemasaran", departemen: "Pemasaran", nik: "1002", email: "bagas.setiawan@perusahaan.com", hp: "081234567802", sisaCuti: 11, kontrak: "PKWT", kontrakBerakhir: "15 Des 2026", kontrakStatus: "Hampir habis" },
  { id: 3, nama: "Citra Maharani", jabatan: "Staf IT", departemen: "Teknologi", nik: "1003", email: "citra.maharani@perusahaan.com", hp: "081234567803", sisaCuti: 3, kontrak: "PKWTT", kontrakBerakhir: "Tetap", kontrakStatus: "Aktif" },
  { id: 4, nama: "Dimas Prakoso", jabatan: "Staf Umum", departemen: "Umum", nik: "1004", email: "dimas.prakoso@perusahaan.com", hp: "081234567804", sisaCuti: 12, kontrak: "PKWT", kontrakBerakhir: "10 Des 2026", kontrakStatus: "Hampir habis" },
  { id: 5, nama: "Rizky Pratama", jabatan: "Staf Operasional", departemen: "Operasional", nik: "1005", email: "rizky.pratama@perusahaan.com", hp: "081234567805", sisaCuti: 9, kontrak: "PKWT", kontrakBerakhir: "31 Des 2026", kontrakStatus: "Aktif" },
  { id: 6, nama: "Salsabila Nur", jabatan: "Staf HRD", departemen: "Sumber Daya Manusia", nik: "1006", email: "salsabila.nur@perusahaan.com", hp: "081234567806", sisaCuti: 7, kontrak: "PKWTT", kontrakBerakhir: "Tetap", kontrakStatus: "Aktif" },
  { id: 7, nama: "Teguh Wibowo", jabatan: "Staf Gudang", departemen: "Logistik", nik: "1007", email: "teguh.wibowo@perusahaan.com", hp: "081234567807", sisaCuti: 10, kontrak: "PKWT", kontrakBerakhir: "28 Feb 2027", kontrakStatus: "Aktif" },
  { id: 8, nama: "Vina Anggraini", jabatan: "Staf Administrasi", departemen: "Umum", nik: "1008", email: "vina.anggraini@perusahaan.com", hp: "081234567808", sisaCuti: 5, kontrak: "PKWT", kontrakBerakhir: "31 Jan 2027", kontrakStatus: "Aktif" },
];

export const kehadiranHariIni = [
  { id: 1, nama: "Karyawan A", ket: "Masuk 07:52, Kantor Pusat", status: "Hadir" },
  { id: 2, nama: "Karyawan B", ket: "Masuk 08:14, Kantor Pusat", status: "Terlambat" },
  { id: 3, nama: "Karyawan C", ket: "Absensi WFH", status: "Menunggu" },
  { id: 4, nama: "Karyawan D", ket: "Belum ada absensi", status: "Belum absen" },
];

export const notifikasiSaya = [
  { id: 1, ikon: "check-circle", judul: "Cuti disetujui", isi: "Pengajuan cuti 12 sampai 14 Okt disetujui HR.", waktu: "09.40", baru: true },
  { id: 2, ikon: "credit-card", judul: "Slip gaji tersedia", isi: "Slip gaji Oktober 2026 sudah diunggah.", waktu: "Kemarin", baru: true },
  { id: 3, ikon: "alert-triangle", judul: "Pengajuan ditolak", isi: "Force majeure 28 Sep ditolak. Lihat catatan HR.", waktu: "2 hari", baru: false },
  { id: 4, ikon: "briefcase", judul: "Kontrak hampir berakhir", isi: "Kontrak berakhir dalam 72 hari.", waktu: "1 minggu", baru: false },
] as const;

export const slipSaya = [
  { id: 1, periode: "Oktober 2026", diunggah: "25 Okt" },
  { id: 2, periode: "September 2026", diunggah: "25 Sep" },
  { id: 3, periode: "Agustus 2026", diunggah: "25 Agu" },
  { id: 4, periode: "Juli 2026", diunggah: "25 Jul" },
  { id: 5, periode: "Juni 2026", diunggah: "25 Jun" },
];

export function notifikasiHR() {
  return pengajuanSemua
    .filter((p) => p.status === "Menunggu")
    .map((p) => ({
      id: p.id,
      ikon: "file-text" as IconName,
      judul: `Pengajuan ${p.jenis}`,
      isi: `${p.nama} mengajukan ${p.jenis}, ${p.tanggal}.`,
      waktu: p.diajukan,
      baru: true,
    }));
}

// Ganti dengan koordinat kantor Anda. Validasi resmi tetap dilakukan di server.
export const kantor = { nama: "Kantor Pusat", latitude: -6.1754, longitude: 106.8272, radiusMeter: 100 };
