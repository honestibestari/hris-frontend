import { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Icon, { IconName } from "./Icon";
import { colors, fonts } from "../constants/theme";

export function CircleButton({ name, onPress, size = 44 }: { name: IconName; onPress?: () => void; size?: number }) {
  return (
    <Pressable onPress={onPress} style={[s.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Icon name={name} size={size / 2 - 2} />
    </Pressable>
  );
}

export default function Header({ title, right, noBack }: { title: string; right?: ReactNode; noBack?: boolean }) {
  const router = useRouter();
  return (
    <View style={s.row}>
      {noBack ? null : <CircleButton name="arrow-left" onPress={() => router.back()} />}
      <Text style={s.title}>{title}</Text>
      {right}
    </View>
  );
}

export function Judul({ children }: { children: string }) {
  return <Text style={s.judul}>{children}</Text>;
}

const s = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 22 },
  title: { flex: 1, fontSize: 18, color: colors.text, fontFamily: fonts.bold },
  circle: { borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  judul: { fontSize: 34, lineHeight: 36, color: colors.text, fontFamily: fonts.serif, letterSpacing: -0.6, marginBottom: 18 },
});
