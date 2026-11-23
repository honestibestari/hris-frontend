import { Tabs } from "expo-router";
import Icon from "../../components/Icon";
import { useTabScreenOptions } from "../../components/tabOptions";

export default function HRTabs() {
  const screenOptions = useTabScreenOptions();
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="dashboard" options={{ title: "Beranda", tabBarIcon: ({ color }) => <Icon name="home" size={22} color={color} /> }} />
      <Tabs.Screen name="persetujuan" options={{ title: "Pengajuan", tabBarIcon: ({ color }) => <Icon name="file-text" size={22} color={color} /> }} />
      <Tabs.Screen name="data-karyawan" options={{ title: "Karyawan", tabBarIcon: ({ color }) => <Icon name="users" size={22} color={color} /> }} />
      <Tabs.Screen name="menu" options={{ title: "Menu", tabBarIcon: ({ color }) => <Icon name="grid" size={22} color={color} /> }} />
    </Tabs>
  );
}
