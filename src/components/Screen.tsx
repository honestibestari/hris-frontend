import { ReactNode } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/theme";

type Props = { children: ReactNode; footer?: ReactNode; scroll?: boolean; tab?: boolean; padX?: number };

// Kerangka layar: jarak aman atas, isi (bisa digulir), dan footer tetap di bawah.
export default function Screen({ children, footer, scroll = true, tab = false, padX = 24 }: Props) {
  const insets = useSafeAreaInsets();
  const top = insets.top + 16;
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.white }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {scroll ? (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingTop: top, paddingHorizontal: 24, paddingBottom: 24 }}>
          {children}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, paddingTop: top, paddingHorizontal: 24 }}>{children}</View>
      )}
      {footer ? <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: (tab ? 0 : Math.max(insets.bottom - 14, 20)) + 16 }}>{footer}</View> : null}
    </KeyboardAvoidingView>
  );
}
