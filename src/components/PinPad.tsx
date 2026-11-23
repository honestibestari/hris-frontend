import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors, fonts } from "../constants/theme";

export function PinDots({ count, total = 4 }: { count: number; total?: number }) {
  return (
    <View style={s.dots}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[s.dot, i < count && s.dotOn]} />
      ))}
    </View>
  );
}

export default function PinPad({ value, onChange, length = 4 }: { value: string; onChange: (v: string) => void; length?: number }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];
  const tekan = (k: string) => {
    if (k === "del") onChange(value.slice(0, -1));
    else if (k && value.length < length) onChange(value + k);
  };
  return (
    <View style={s.grid}>
      {keys.map((k, i) => (
        <Pressable key={i} style={s.key} onPress={() => tekan(k)} disabled={!k}>
          {k === "del" ? <Icon name="delete" size={26} /> : <Text style={s.keyText}>{k}</Text>}
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  dots: { flexDirection: "row", justifyContent: "center", gap: 18 },
  dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: "#C9C7E3", backgroundColor: colors.white },
  dotOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 36 },
  key: { width: "33.33%", height: 72, alignItems: "center", justifyContent: "center" },
  keyText: { fontSize: 32, color: colors.text, fontFamily: fonts.serif },
});
