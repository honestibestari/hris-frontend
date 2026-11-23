import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../components/Screen";
import Header from "../components/Header";
import ListRow, { IconTile } from "../components/ListRow";
import { useAuth } from "../context/AuthContext";
import { notifikasiSaya, notifikasiHR } from "../data/dummy";
import { colors, fonts } from "../constants/theme";

export default function Notifikasi() {
  const router = useRouter();
  const { user } = useAuth();
  const adalahHR = user?.role === "HR";

  // HR melihat pengajuan yang menunggu, karyawan melihat notifikasinya sendiri.
  const daftar = adalahHR ? notifikasiHR() : notifikasiSaya;

  return (
    <Screen>
      <Header title="Notifikasi" />

      {daftar.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            color: colors.muted,
            fontFamily: fonts.medium,
            marginTop: 40,
          }}
        >
          Tidak ada notifikasi baru.
        </Text>
      ) : (
        daftar.map((n, i) => (
          <ListRow
            key={n.id}
            lead={
              <View>
                <IconTile name={n.ikon} />
                {n.baru ? (
                  <View
                    style={{
                      position: "absolute",
                      top: -2,
                      right: -2,
                      width: 11,
                      height: 11,
                      borderRadius: 6,
                      backgroundColor: colors.peach,
                      borderWidth: 2,
                      borderColor: "#fff",
                    }}
                  />
                ) : null}
              </View>
            }
            title={n.judul}
            subtitle={n.isi}
            right={
              <Text style={{ fontSize: 11.5, color: colors.muted, fontFamily: fonts.medium }}>
                {n.waktu}
              </Text>
            }
            last={i === daftar.length - 1}
            onPress={
              adalahHR
                ? () => router.push({ pathname: "/approval", params: { id: String(n.id) } })
                : undefined
            }
          />
        ))
      )}
    </Screen>
  );
}