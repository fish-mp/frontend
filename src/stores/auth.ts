import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface User {
  email: string;
  first_name: string;
  city: string;
  age: number;
}

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const saveUserData = (userData: User) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    user.value = userData;
  };

  const loadUserData = () => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      user.value = JSON.parse(storedUserData);
    }
  };

  const hasTokens = computed(() => {
    return !!accessToken.value && !!refreshToken.value;
  });

  const initAuth = () => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken && storedRefreshToken) {
      accessToken.value = storedAccessToken;
      refreshToken.value = storedRefreshToken;
      isAuthenticated.value = true;
      loadUserData();
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();

      isAuthenticated.value = true;
      accessToken.value = data.access;
      refreshToken.value = data.refresh;

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      user.value = {
        email: credentials.email,
        first_name: "",
        city: "",
        age: 0,
      };

      saveUserData({
        email: credentials.email,
        first_name: "",
        city: "",
        age: 0,
      });

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    isAuthenticated.value = false;
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const verifyResponse = await fetch(`${BACKEND_URL}/api/token/verify/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (verifyResponse.ok) {
          isAuthenticated.value = true;
          accessToken.value = token;
          return true;
        }
      } catch (error) {
        console.error("Token verification failed:", error);
      }
    }
    return false;
  };

  const register = async (payload: {
    email: string;
    password: string;
    first_name: string;
    city: string;
    age: number;
  }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }
      return await response.json();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const refresh = async () => {
    try {
      if (!refreshToken.value) throw new Error("No refresh token");
      const response = await fetch(`${BACKEND_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken.value }),
      });
      if (!response.ok) throw new Error("Token refresh failed");
      const data = await response.json();
      accessToken.value = data.access;
      localStorage.setItem("accessToken", data.access);
    } catch (error) {
      console.error("Token refresh error:", error);
      logout();
    }
  };

  return {
    isAuthenticated,
    user,
    hasTokens,
    initAuth,
    login,
    logout,
    checkAuth,
    register,
    refresh,
    accessToken,
    refreshToken,
  };
});
