
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts } from "../constants/theme";

export function useTabScreenOptions() {
  const { bottom } = useSafeAreaInsets();

  return {
    headerShown: false,

    tabBarShowLabel: true,

    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.inactive,

    tabBarStyle: {
      backgroundColor: colors.white,
      borderTopColor: "#EDECF6",

      // Tambah tinggi agar ikon dan tulisan tidak terpotong.
      height: 65 + bottom,

      paddingTop: 6,
      paddingBottom: bottom,
    },

    tabBarLabelStyle: {
      fontFamily: fonts.semi,
      fontSize: 11,
      marginTop: 2,
      marginBottom: 2,
    },

    tabBarIconStyle: {
      marginTop: 0,
    },
  } as const;
}
