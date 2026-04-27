import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import {
  clearAuthStorage,
  getToken,
  getUser,
  setToken,
  setUser,
} from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken());
  const [user, setUserState] = useState(getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTokenState(getToken());
    setUserState(getUser());
    setLoading(false);
  }, []);

  async function login(payload) {
    const data = await loginUser(payload);

    setToken(data.token);
    setUser(data.user);

    setTokenState(data.token);
    setUserState(data.user);

    return data;
  }

  async function register(payload) {
    const data = await registerUser(payload);

    setToken(data.token);
    setUser(data.user);

    setTokenState(data.token);
    setUserState(data.user);

    return data;
  }

  function updateCurrentUser(nextUser) {
    setUser(nextUser);
    setUserState(nextUser);
  }

  function logout() {
    clearAuthStorage();
    setTokenState(null);
    setUserState(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      loading,
      login,
      register,
      logout,
      updateCurrentUser,
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}