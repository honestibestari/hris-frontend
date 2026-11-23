import { View, Text, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors, fonts } from "../constants/theme";

export default function Info({ children }: { children: string }) {
  return (
    <View style={s.row}>
      <Icon name="info" size={18} color={colors.primary} />
      <Text style={s.text}>{children}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, alignItems: "flex-start", marginBottom: 18 },
  text: { flex: 1, fontSize: 12.5, lineHeight: 19, color: colors.muted, fontFamily: fonts.medium },
});
