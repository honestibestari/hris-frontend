import { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors, fonts } from "../constants/theme";

type Props = { label: string; value: string; options: string[]; onChange: (v: string) => void; placeholder?: string };

export default function Select({ label, value, options, onChange, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ marginBottom: 27 }}>
      <Text style={s.label}>{label}</Text>
      <Pressable style={s.row} onPress={() => setOpen(true)}>
        <Text style={[s.value, !value && { color: colors.placeholder, fontFamily: fonts.regular }]}>{value || placeholder}</Text>
        <Icon name="chevron-down" size={20} color={colors.muted} />
      </Pressable>
      <Modal transparent animationType="fade" visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable style={s.backdrop} onPress={() => setOpen(false)}>
          <View style={s.sheet}>
            {options.map((o) => (
              <Pressable key={o} style={s.opt} onPress={() => { onChange(o); setOpen(false); }}>
                <Text style={[s.optText, o === value && { color: colors.primary }]}>{o}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  label: { fontSize: 13, color: colors.muted, fontFamily: fonts.semi, marginBottom: 4 },
  row: { flexDirection: "row", alignItems: "center", height: 46, borderBottomWidth: 1, borderBottomColor: colors.border },
  value: { flex: 1, fontSize: 16, color: colors.text, fontFamily: fonts.medium },
  backdrop: { flex: 1, backgroundColor: "rgba(43,42,85,0.35)", justifyContent: "center", padding: 24 },
  sheet: { backgroundColor: colors.white, borderRadius: 20, paddingVertical: 8 },
  opt: { paddingHorizontal: 20, paddingVertical: 14 },
  optText: { fontSize: 16, color: colors.text, fontFamily: fonts.medium },
});