import { createContext } from "react";

export type Mode = "light" | "dark" | undefined;
export type ThemeCtx = { mode: Mode; setMode: (mode: Mode) => void };

export const ThemeContext = createContext<ThemeCtx | null>(null);
