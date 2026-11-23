import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "../../components/Icon";
import { colors, fonts } from "../../constants/theme";

export default function HRLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: "#EDECF6",
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
        tabBarIconStyle: { marginTop: 0 },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="persetujuan"
        options={{
          title: "Persetujuan",
          tabBarIcon: ({ color }) => <Icon name="file-text" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="data-karyawan"
        options={{
          title: "Karyawan",
          tabBarIcon: ({ color }) => <Icon name="users" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => <Icon name="grid" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}