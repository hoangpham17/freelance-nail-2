import type { ThemeConfig } from "antd";
import { theme } from "antd";

/** Ant Design theme — Madison gold primary (no default blue link/button hover) */
export const antdTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#f9d978",
    colorPrimaryHover: "#f1a953",
    colorPrimaryActive: "#ebb13f",
    colorLink: "#f9d978",
    colorLinkHover: "#f9d978",
    colorLinkActive: "#f1a953",
    // Softer, warm error tone — fits the gold/black theme (no harsh neon red)
    colorError: "#e0857b",
    colorErrorBorder: "#e0857b",
    colorErrorHover: "#e89a91",
  },
  components: {
    Button: {
      colorPrimary: "#f9d978",
      colorPrimaryHover: "#f1a953",
      colorPrimaryActive: "#ebb13f",
      primaryColor: "#984121",
      defaultHoverColor: "#f9d978",
      defaultHoverBorderColor: "#f9d978",
      defaultActiveColor: "#f1a953",
      defaultActiveBorderColor: "#f1a953",
      textHoverBg: "rgb(249 217 120 / 0.1)",
      linkHoverBg: "transparent",
    },
  },
};
