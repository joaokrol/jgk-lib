import { useEffect, useMemo, useState } from "react";
import { Mode, ThemeContext } from "./antd.context";
import { DarkTheme } from "@theme/darkTheme";
import { LightTheme } from "@theme/lightTheme";
import { ConfigProvider } from "antd";

type AntdProviderProps = {
  children: React.ReactNode;
};

export function AntdProvider({ children }: AntdProviderProps) {
  const [mode, setMode] = useState<Mode | undefined>(
    (localStorage.getItem("theme") as Mode) || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", mode || "light");
  }, [mode]);

  const cfg = useMemo(() => (mode === "dark" ? DarkTheme : LightTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ConfigProvider theme={cfg}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
}
