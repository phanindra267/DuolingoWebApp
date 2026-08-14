"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "google" | "facebook" | "email";
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

const STORAGE_KEY = "duo_auth_user";

function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Check for OAuth callback result first (set by /api/auth/callback/*)
      const pending = getCookie("duo_auth_pending");
      if (pending) {
        const parsed = JSON.parse(pending) as AuthUser;
        setUser(parsed);
        localStorage.setItem(STORAGE_KEY, pending);
        setCookie(STORAGE_KEY, pending);
        deleteCookie("duo_auth_pending");
      } else {
        // Fall back to persisted session
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as AuthUser;
          setUser(parsed);
          setCookie(STORAGE_KEY, stored);
        }
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (u: AuthUser) => {
    const json = JSON.stringify(u);
    setUser(u);
    localStorage.setItem(STORAGE_KEY, json);
    setCookie(STORAGE_KEY, json);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    deleteCookie(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
