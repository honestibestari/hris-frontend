import { Tabs } from "expo-router";
import Icon from "../../components/Icon";
import { useTabScreenOptions } from "../../components/tabOptions";

export default function KaryawanTabs() {
  const screenOptions = useTabScreenOptions();
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="beranda" options={{ title: "Beranda", tabBarIcon: ({ color }) => <Icon name="home" size={22} color={color} /> }} />
      <Tabs.Screen name="riwayat" options={{ title: "Riwayat", tabBarIcon: ({ color }) => <Icon name="clock" size={22} color={color} /> }} />
      <Tabs.Screen name="pengajuan" options={{ title: "Pengajuan", tabBarIcon: ({ color }) => <Icon name="file-text" size={22} color={color} /> }} />
      <Tabs.Screen name="profil" options={{ title: "Profil", tabBarIcon: ({ color }) => <Icon name="user" size={22} color={color} /> }} />
    </Tabs>
  );
}
