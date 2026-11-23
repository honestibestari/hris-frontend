import { Text, View } from "react-native";
import Screen from "../components/Screen";
import Header from "../components/Header";
import ListRow, { IconTile } from "../components/ListRow";
import { notifikasiSaya } from "../data/dummy";
import { colors, fonts } from "../constants/theme";

export default function Notifikasi() {
  return (
    <Screen>
      <Header title="Notifikasi" />
      {notifikasiSaya.map((n, i) => (
        <ListRow
          key={n.id}
          lead={
            <View>
              <IconTile name={n.ikon} />
              {n.baru ? <View style={{ position: "absolute", top: -2, right: -2, width: 11, height: 11, borderRadius: 6, backgroundColor: colors.peach, borderWidth: 2, borderColor: "#fff" }} /> : null}
            </View>
          }
          title={n.judul}
          subtitle={n.isi}
          right={<Text style={{ fontSize: 11.5, color: colors.muted, fontFamily: fonts.medium }}>{n.waktu}</Text>}
          last={i === notifikasiSaya.length - 1}
        />
      ))}
    </Screen>
  );
}
