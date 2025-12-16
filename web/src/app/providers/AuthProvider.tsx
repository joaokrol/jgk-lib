import { watchAuthState, logout } from "@services/auth";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = watchAuthState((u: User | null) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  //   const msg = "useAuth must be used within a AuthProvider.";
  const msg = "useAuth deve estar dentro de um AuthProvider.";
  if (!ctx) throw new Error(msg);
  return ctx;
}
