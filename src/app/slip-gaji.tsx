import { Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Header from "../components/Header";
import Icon from "../components/Icon";
import ListRow, { IconTile } from "../components/ListRow";
import { slipSaya } from "../data/dummy";
import { notify } from "../utils/notify";
import { colors, fonts } from "../constants/theme";

export default function SlipGaji() {
  return (
    <Screen>
      <Header title="Slip gaji" />
      <Text style={s.tahun}>2026</Text>
      {slipSaya.map((x, i) => (
        <ListRow
          key={x.id}
          lead={<IconTile name="credit-card" />}
          title={x.periode}
          subtitle={`Diunggah ${x.diunggah}`}
          right={<Icon name="download" size={20} color={colors.primary} />}
          last={i === slipSaya.length - 1}
          onPress={() => notify("Unduh slip gaji", `Slip ${x.periode} akan diunduh dari server pada tahap integrasi API.`)}
        />
      ))}
    </Screen>
  );
}

const s = StyleSheet.create({ tahun: { fontSize: 13, color: colors.muted, fontFamily: fonts.bold, marginBottom: 2 } });
