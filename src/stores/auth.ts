import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
  id: number;
  email: string;
  username: string;
  is_staff: boolean;
}

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
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
          "http://127.0.0.1:8000/api/token/verify/",
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

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };
});
