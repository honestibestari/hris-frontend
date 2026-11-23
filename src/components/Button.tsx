import { Pressable, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, fonts } from "../constants/theme";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({ title, onPress, variant = "primary", icon, disabled, loading }: Props) {
  const outline = variant === "outline";
  const fg = outline ? colors.primary : colors.white;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[s.btn, outline ? s.outline : s.primary, (disabled || loading) && { opacity: 0.45 }]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={s.row}>
          {icon ? <Icon name={icon} size={20} color={fg} /> : null}
          <Text style={[s.text, { color: fg }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: { height: 54, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  primary: { backgroundColor: colors.primary },
  outline: { backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.primary },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  text: { fontSize: 15, fontFamily: fonts.semi },
});