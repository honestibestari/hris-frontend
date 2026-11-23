import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

// Di HP memakai SecureStore (terenkripsi). Di web memakai localStorage (hanya untuk uji coba).
const k = (key: string) => key.replace(/[^\w.-]/g, "_");

export const storage = {
  async get(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") return window.localStorage.getItem(k(key));
      return await SecureStore.getItemAsync(k(key));
    } catch {
      return null;
    }
  },
  async set(key: string, value: string) {
    try {
      if (Platform.OS === "web") window.localStorage.setItem(k(key), value);
      else await SecureStore.setItemAsync(k(key), value);
    } catch {}
  },
  async remove(key: string) {
    try {
      if (Platform.OS === "web") window.localStorage.removeItem(k(key));
      else await SecureStore.deleteItemAsync(k(key));
    } catch {}
  },
};
