import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts } from "../constants/theme";

// Gaya tab bar bawah yang dipakai bersama oleh menu Karyawan dan HR.
// Tinggi mengikuti safe area bawah agar tidak tertutup gesture bar / tombol navigasi.
export function useTabScreenOptions() {
  const { bottom } = useSafeAreaInsets();
  return {
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.inactive,
    tabBarStyle: {
      backgroundColor: colors.white,
      borderTopColor: "#EDECF6",
      height: 48.5 + bottom,
      paddingTop: 8,
      paddingBottom: Math.max(bottom - 12, 0),
    },
    tabBarLabelStyle: { fontFamily: fonts.semi, fontSize: 11, marginBottom: 4 },
  } as const;
}
