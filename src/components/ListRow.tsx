import { ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, fonts } from "../constants/theme";

export function IconTile({ name, size = 44 }: { name: IconName; size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: 14, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" }}>
      <Icon name={name} size={20} color={colors.primary} />
    </View>
  );
}

export const Chevron = () => <Icon name="chevron-right" size={18} color={colors.inactive} />;

type Props = { lead?: ReactNode; title: string; subtitle?: string; right?: ReactNode; onPress?: () => void; last?: boolean };

export default function ListRow({ lead, title, subtitle, right, onPress, last }: Props) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={[s.row, !last && s.line]}>
      {lead}
      <View style={{ flex: 1 }}>
        <Text style={s.title}>{title}</Text>
        {subtitle ? <Text style={s.sub}>{subtitle}</Text> : null}
      </View>
      {right}
    </Pressable>
  );
}

export function KeyValue({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <View style={[s.kv, !last && s.line]}>
      <Text style={s.k}>{k}</Text>
      <Text style={s.v}>{v}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 14 },
  line: { borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 16, color: colors.text, fontFamily: fonts.semi },
  sub: { fontSize: 13, color: colors.muted, fontFamily: fonts.regular, marginTop: 2 },
  kv: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 13 },
  k: { fontSize: 14, color: colors.muted, fontFamily: fonts.medium },
  v: { fontSize: 14, color: colors.text, fontFamily: fonts.semi, flexShrink: 1, textAlign: "right" },
});
