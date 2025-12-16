import { theme } from "antd";
import { baseComponentsToken, baseToken } from "./tokens";

const BG_COLOR = "#111926";

export const DarkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    ...baseToken,
    colorPrimary: "#001529",
  },
  components: {
    ...baseComponentsToken,
    Menu: {
      itemBg: BG_COLOR,
      activeBarHeight: 3,
    },
    Layout: { bodyBg: BG_COLOR, headerBg: BG_COLOR, headerHeight: 40 },
  },
};
