import { theme } from "antd";
import { baseComponentsToken, baseToken } from "./tokens";

const BG_COLOR = "#f1f1f1";

export const LightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    ...baseToken,
    colorPrimary: "#1890ff",
  },
  components: {
    ...baseComponentsToken,
    Menu: { itemBg: BG_COLOR, activeBarHeight: 3 },
    Layout: {
      bodyBg: BG_COLOR,
      headerBg: BG_COLOR,
      headerHeight: 40,
      headerPadding: "0 20px 0 20px",
    },
    Table: {
      headerBg: "#F8F8F8",
      headerBorderRadius: 2,
      footerBorderRadius: 2,
    },
  },
};
