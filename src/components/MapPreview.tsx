import { View } from "react-native";
import { colors } from "../constants/theme";

// Gambaran peta sederhana: jalan, blok gedung, lingkaran radius kantor, dan posisi pengguna.
export default function MapPreview({ height = 220, user }: { height?: number; user?: { x: number; y: number } }) {
  const jalan = (style: object) => <View style={[{ position: "absolute", backgroundColor: "#fff" }, style]} />;
  const blok = (style: object) => <View style={[{ position: "absolute", backgroundColor: "#E3E1F3", borderRadius: 6 }, style]} />;
  return (
    <View style={{ height, borderRadius: 22, backgroundColor: "#EFEEF9", borderWidth: 1, borderColor: colors.border, overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
      {jalan({ left: -30, right: -30, top: "26%", height: 9, transform: [{ rotate: "-4deg" }] })}
      {jalan({ left: -30, right: -30, top: "72%", height: 9, transform: [{ rotate: "-4deg" }] })}
      {jalan({ top: -30, bottom: -30, left: "27%", width: 9, transform: [{ rotate: "5deg" }] })}
      {jalan({ top: -30, bottom: -30, left: "70%", width: 9, transform: [{ rotate: "-4deg" }] })}
      {jalan({ left: -30, right: -30, top: "50%", height: 4 })}
      {blok({ left: 22, top: "34%", width: 56, height: 40 })}
      {blok({ right: 26, bottom: 24, width: 60, height: 46 })}
      {blok({ right: 80, top: 24, width: 40, height: 36 })}
      <View style={{ width: 140, height: 140, borderRadius: 70, borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.primary, backgroundColor: "rgba(107,102,184,0.1)", position: "absolute" }} />
      <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, borderWidth: 4, borderColor: "#fff", position: "absolute" }} />
      {user ? (
        <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: colors.peach, borderWidth: 3.5, borderColor: "#fff", position: "absolute", transform: [{ translateX: user.x }, { translateY: user.y }] }} />
      ) : null}
    </View>
  );
}
