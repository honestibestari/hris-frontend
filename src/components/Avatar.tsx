import { View, Text } from "react-native";
import { colors, fonts } from "../constants/theme";

export default function Avatar({ label, size = 44, filled = false }: { label: string; size?: number; filled?: boolean }) {
  return (
    <View
      style={{
        width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center",
        backgroundColor: filled ? colors.primary : colors.surface,
        borderWidth: filled ? 0 : 1, borderColor: colors.border,
      }}
    >
      <Text style={{ fontSize: size / 3 + 2, fontFamily: filled ? fonts.serif : fonts.bold, color: filled ? colors.white : colors.text }}>
        {label.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}
