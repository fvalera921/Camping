import { createContext, startTransition, useContext, useEffect, useState } from "react";
import { authApi, userApi } from "../lib/api.js";

const AuthContext = createContext(null);
const TOKEN_KEY = "camping_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setIsBootstrapping(false);
      localStorage.removeItem(TOKEN_KEY);
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);
    setIsBootstrapping(true);

    userApi
      .getMe(token)
      .then((currentUser) => {
        startTransition(() => {
          setUser(currentUser);
        });
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setIsBootstrapping(false);
      });
  }, [token]);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const register = async (payload) => {
    const response = await authApi.register(payload);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token && user),
    isBootstrapping,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
};
