import { useEffect } from "react";
import { Stack, useRouter, useRootNavigationState } from "expo-router";
import { useFonts, PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold } from "@expo-google-fonts/plus-jakarta-sans";
import { Newsreader_500Medium } from "@expo-google-fonts/newsreader";
import { AuthProvider, useAuth } from "../context/AuthContext";

// Mengarahkan pengguna ke layar yang sesuai dengan status sesi dan perannya.
function Gate() {
  const { status, user } = useAuth();
  const router = useRouter();
  const nav = useRootNavigationState();

  useEffect(() => {
    if (!nav?.key || status === "loading") return;
    const tujuan =
      status === "out" ? "/login"
      : status === "needPin" ? "/buat-pin"
      : status === "locked" ? "/masuk-pin"
      : user?.role === "HR" ? "/dashboard"
      : "/beranda";
    router.replace(tujuan as never);
  }, [nav?.key, status, user?.role]);

  if (status === "loading") return null;
  return <Stack screenOptions={{ headerShown: false, animation: "fade" }} />;
}

export default function RootLayout() {
  const [loaded] = useFonts({ PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, Newsreader_500Medium });  if (!loaded) return null;
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
