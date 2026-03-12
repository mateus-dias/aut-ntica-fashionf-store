import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  adminUser: User | null;
  loginCustomer: (email: string, password: string) => void;
  loginAdmin: (email: string, password: string) => boolean;
  logoutCustomer: () => void;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<User | null>(null);

  const loginCustomer = (email: string, _password: string) => {
    setUser({ name: email.split("@")[0], email });
  };

  const loginAdmin = (email: string, password: string): boolean => {
    if (email === "admin@admin" && password === "123456") {
      setAdminUser({ name: "Administrador", email });
      return true;
    }
    return false;
  };

  const logoutCustomer = () => setUser(null);
  const logoutAdmin = () => setAdminUser(null);

  return (
    <AuthContext.Provider value={{ user, adminUser, loginCustomer, loginAdmin, logoutCustomer, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
