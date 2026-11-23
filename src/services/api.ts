import { storage } from "../utils/storage";

export type Role = "KARYAWAN" | "HR";
export type User = { email: string; nama: string; jabatan: string; role: Role; nik?: string; departemen?: string; hp?: string };

// AKUN CONTOH. Nanti diganti pemanggilan REST API (Express.js).
const AKUN = [
  { email: "emp@test.com", password: "123456", nama: "Karyawan", jabatan: "Staf Operasional", role: "KARYAWAN" as Role },
  { email: "hr@test.com", password: "123456", nama: "Tim HR", jabatan: "Human Resources", role: "HR" as Role },
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function passwordSaatIni(email: string) {
  const akun = AKUN.find((a) => a.email === email);
  if (!akun) return null;
  return (await storage.get(`pw:${email}`)) ?? akun.password;
}

export async function login(email: string, password: string): Promise<User> {
  await delay(400);
  const e = email.trim().toLowerCase();
  const akun = AKUN.find((a) => a.email === e);
  if (!akun || (await passwordSaatIni(e)) !== password) throw new Error("Email atau password salah.");
  return { email: akun.email, nama: akun.nama, jabatan: akun.jabatan, role: akun.role };
}

export async function gantiPassword(email: string, lama: string, baru: string) {
  await delay(300);
  if ((await passwordSaatIni(email)) !== lama) throw new Error("Password saat ini tidak sesuai.");
  await storage.set(`pw:${email}`, baru);
}
