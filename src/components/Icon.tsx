import type { ComponentProps } from "react";
import type { ColorValue } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/theme";

export type IconName = ComponentProps<typeof Feather>["name"];

// `color` menerima ColorValue karena tabBarIcon dari expo-router memberi tipe itu.
export default function Icon({ name, size = 22, color = colors.text }: { name: IconName; size?: number; color?: ColorValue }) {
  return <Feather name={name} size={size} color={color as string} />;
}
