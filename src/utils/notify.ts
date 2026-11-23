import { Alert, Platform } from "react-native";

// Alert.alert tidak tampil di web, jadi dibuat pembungkus yang jalan di semua platform.
export function notify(title: string, message?: string, onOk?: () => void) {
  if (Platform.OS === "web") {
    window.alert(message ? `${title}\n\n${message}` : title);
    onOk?.();
    return;
  }
  Alert.alert(title, message, [{ text: "OK", onPress: onOk }]);
}
