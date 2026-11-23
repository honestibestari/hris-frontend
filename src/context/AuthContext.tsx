import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { AppState } from "react-native";
import { storage } from "../utils/storage";
import * as api from "../services/api";

export type Status = "loading" | "out" | "needPin" | "locked" | "in";

type Ctx = {
  status: Status;
  user: api.User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  lupaPin: () => Promise<void>;
  buatPin: (pin: string) => Promise<void>;
  verifikasiPin: (pin: string) => Promise<boolean>;
  bukaKunci: () => void;
  ubahPin: (lama: string, baru: string) => Promise<boolean>;
};

const AuthContext = createContext<Ctx>(null as unknown as Ctx);
export const useAuth = () => useContext(AuthContext);

const KUNCI_SETELAH_MS = 30000; // kunci ulang bila aplikasi di latar belakang lebih dari 30 detik

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<api.User | null>(null);
  const waktuKeluar = useRef<number | null>(null);
  const statusRef = useRef<Status>("loading");
  statusRef.current = status;

  // Pulihkan sesi saat aplikasi dibuka.
  useEffect(() => {
    (async () => {
      const raw = await storage.get("session");
      if (!raw) return setStatus("out");
      let u: api.User;
      try {
        u = JSON.parse(raw);
      } catch {
        await storage.remove("session");
        return setStatus("out");
      }
      setUser(u);
      const pin = await storage.get("pin");
      setStatus(pin ? "locked" : "needPin");
    })();
  }, []);

  // Kunci otomatis setelah aplikasi lama di latar belakang.
  useEffect(() => {
    const sub = AppState.addEventListener("change", (s) => {
      if (s !== "active") waktuKeluar.current = Date.now();
      else if (waktuKeluar.current && Date.now() - waktuKeluar.current > KUNCI_SETELAH_MS && statusRef.current === "in") {
        setStatus("locked");
      }
    });
    return () => sub.remove();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const u = await api.login(email, password);
    await storage.set("session", JSON.stringify(u));
    setUser(u);
    const pin = await storage.get("pin");
    setStatus(pin ? "in" : "needPin");
  }, []);

  const signOut = useCallback(async () => {
    await storage.remove("session");
    await storage.remove("pin");
    setUser(null);
    setStatus("out");
  }, []);

  const buatPin = useCallback(async (pin: string) => {
    // CATATAN: ini hanya untuk prototipe. Pada versi final, PIN diverifikasi dengan hash.
    await storage.set("pin", pin);
    setStatus("in");
  }, []);

  const verifikasiPin = useCallback(async (pin: string) => (await storage.get("pin")) === pin, []);
  const bukaKunci = useCallback(() => setStatus("in"), []);

  const ubahPin = useCallback(async (lama: string, baru: string) => {
    if ((await storage.get("pin")) !== lama) return false;
    await storage.set("pin", baru);
    return true;
  }, []);

  // Lupa PIN: hapus sesi dan PIN, pengguna harus login email lagi lalu membuat PIN baru.
  const lupaPin = signOut;

  return (
    <AuthContext.Provider value={{ status, user, signIn, signOut, lupaPin, buatPin, verifikasiPin, bukaKunci, ubahPin }}>
      {children}
    </AuthContext.Provider>
  );
}
