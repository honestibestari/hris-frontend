import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Platform, KeyboardTypeOptions } from "react-native";
import { colors, fonts } from "../constants/theme";

type Props = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secure?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words";
  editable?: boolean;
};

export default function Field({ label, value, onChangeText, placeholder, secure, multiline, keyboardType, autoCapitalize = "none", editable = true }: Props) {
  const [hide, setHide] = useState(!!secure);
  return (
    <View style={{ flex: 1, marginBottom: multiline ? 18 : 27 }}>
      <Text style={s.label}>{label}</Text>
      {multiline ? (
        <TextInput
          style={s.area}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          multiline
          textAlignVertical="top"
          autoCapitalize={autoCapitalize}
          editable={editable}
        />
      ) : (
        <View style={s.row}>
          <TextInput
            style={[s.input, { fontFamily: value ? fonts.medium : fonts.regular }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.placeholder}
            secureTextEntry={hide}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            editable={editable}
          />
          {secure ? (
            <Pressable onPress={() => setHide(!hide)}>
              <Text style={s.toggle}>{hide ? "Tampilkan" : "Sembunyikan"}</Text>
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  label: { fontSize: 13, color: colors.muted, fontFamily: fonts.semi, marginBottom: 4 },
  row: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.border },
  input: {
    flex: 1,
    height: 46,
    fontSize: 16,
    color: colors.text,
    paddingHorizontal: 0,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none", outlineWidth: 0 } as object) : {}),
  },
  toggle: { fontSize: 14, color: colors.text, fontFamily: fonts.semi },
  area: { minHeight: 90, borderWidth: 1.5, borderColor: colors.border, borderRadius: 14, padding: 14, fontSize: 15, color: colors.text, fontFamily: fonts.medium, marginTop: 6 },
});