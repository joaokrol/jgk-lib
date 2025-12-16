import { useContext } from "react";
import { ThemeContext } from "./antd.context";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  //   const msg = "useTheme must be used within a ThemeProvider";
  const msg = "useTheme deve estar dentro de um ThemeProvider";
  if (!ctx) throw new Error(msg);
  return ctx;
};
