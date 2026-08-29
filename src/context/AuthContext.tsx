import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "@/lib/api";

export type User = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  safetyScore: number;
  totalPoints: number;
  totalTrips: number;
  safeTrips: number;
  totalDistance: number;
  vehicleId?: { _id: string; vehicleNumber: string; vehicleType: string };
  licenseNumber?: string;
  achievements?: { name: string; description: string; earnedAt: string }[];
  isActive: boolean;
  createdAt: string;
};

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    name: string;
    email: string;
    mobile: string;
    password: string;
    licenseNumber?: string;
    vehicleNumber: string;
    vehicleType: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("sdx_token");
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await api.getMe();
      setUser(res.data as User);
    } catch {
      localStorage.removeItem("sdx_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await api.login(email, password);
        api.setToken(res.data.token);
        setUser(res.data.user as User);
        return { success: true };
      } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : "Login failed" };
      }
    },
    [],
  );

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      mobile: string;
      password: string;
      licenseNumber?: string;
      vehicleNumber: string;
      vehicleType: string;
    }) => {
      try {
        const res = await api.register(data);
        api.setToken(res.data.token);
        setUser(res.data.user as User);
        return { success: true };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : "Registration failed",
        };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch {
      // ignore
    }
    api.clearToken();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.getMe();
      setUser(res.data as User);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refreshUser }),
    [user, loading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
