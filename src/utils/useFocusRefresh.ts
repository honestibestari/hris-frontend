import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

// Render ulang layar setiap kali kembali difokuskan (data contoh berubah di memori).
export function useFocusRefresh() {
  const [, setN] = useState(0);
  useFocusEffect(
    useCallback(() => {
      setN((n) => n + 1);
    }, [])
  );
}
