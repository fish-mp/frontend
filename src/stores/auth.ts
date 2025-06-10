import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
  email: string;
  first_name: string;
  city: string;
  age: number;
}

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(localStorage.getItem("accessToken"));
  const refreshToken = ref<string | null>(localStorage.getItem("refreshToken"));

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch("http://fish-mp.miv-dev.ru:8000/api/token/", {
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
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const verifyResponse = await fetch(
          "http://fish-mp.miv-dev.ru:8000/api/token/verify/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

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
      const response = await fetch(
        "http://fish-mp.miv-dev.ru:8000/api/users/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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
      const response = await fetch("http://fish-mp.miv-dev.ru:8000/api/token/refresh/", {
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
    login,
    logout,
    checkAuth,
    register,
    refresh,
  };
});
