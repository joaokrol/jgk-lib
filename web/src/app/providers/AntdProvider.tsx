import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ConfigProvider } from "antd";
import { DarkTheme } from "@theme/darkTheme";
import { LightTheme } from "@theme/lightTheme";

type Mode = "light" | "dark" | undefined;
type ThemeCtx = { mode: Mode; setMode: (mode: Mode) => void };

const ThemeContext = createContext<ThemeCtx | null>(null);

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

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  //   const msg = "useTheme must be used within a ThemeProvider";
  const msg = "useTheme deve estar dentro de um ThemeProvider";
  if (!ctx) throw new Error(msg);
  return ctx;
};
