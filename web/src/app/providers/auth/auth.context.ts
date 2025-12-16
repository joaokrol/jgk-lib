import { createContext } from "react";
import { User } from "firebase/auth";

export type AuthContextProps = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps | null>(null);
