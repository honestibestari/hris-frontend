import { Pressable, Text, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Icon from "./Icon";
import { colors, fonts } from "../constants/theme";

export default function Lampiran({ nama, onChange }: { nama: string | null; onChange: (n: string | null) => void }) {
  const pilih = async () => {
    const r = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
    if (!r.canceled) onChange(r.assets[0].name);
  };
  return (
    <Pressable style={s.box} onPress={pilih}>
      <Icon name="paperclip" size={19} color={colors.primary} />
      <Text style={s.text} numberOfLines={1}>{nama ?? "Tambah lampiran"}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  box: { flexDirection: "row", alignItems: "center", gap: 12, height: 56, paddingHorizontal: 16, borderWidth: 1.5, borderStyle: "dashed", borderColor: "#CFCDE6", borderRadius: 14, marginBottom: 18 },
  text: { flex: 1, fontSize: 14, color: colors.text, fontFamily: fonts.semi },
});
