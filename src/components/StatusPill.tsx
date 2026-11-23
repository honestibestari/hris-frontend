import { View, Text } from "react-native";
import { colors, fonts } from "../constants/theme";

const gaya: Record<string, { bg: string; fg: string; border: string }> = {
  Menunggu: { bg: colors.surface, fg: colors.text, border: colors.surface },
  "Belum absen": { bg: colors.surface, fg: colors.text, border: colors.surface },
  Disetujui: { bg: colors.primary, fg: colors.white, border: colors.primary },
  Hadir: { bg: colors.primary, fg: colors.white, border: colors.primary },
  Aktif: { bg: colors.primary, fg: colors.white, border: colors.primary },
  Ditolak: { bg: colors.white, fg: colors.danger, border: colors.dangerBorder },
  Terlambat: { bg: colors.white, fg: colors.danger, border: colors.dangerBorder },
  "Hampir habis": { bg: "#FBEFE3", fg: "#9A5B1F", border: "#FBEFE3" },
};

export default function StatusPill({ status }: { status: string }) {
  const g = gaya[status] ?? gaya.Menunggu;
  return (
    <View style={{ paddingHorizontal: 14, paddingVertical: 5, borderRadius: 14, backgroundColor: g.bg, borderWidth: 1, borderColor: g.border }}>
      <Text style={{ fontSize: 12, color: g.fg, fontFamily: fonts.semi }}>{status}</Text>
    </View>
  );
}
