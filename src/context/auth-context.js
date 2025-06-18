"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await fetch("/api/auth/user");
      const data = await response.json();

      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const data = await response;

      console.log("data is:", data);

      if (response.status != 200) {
        throw new Error(data.error || "Login failed");
      }

      setUser(data.user);
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post("/api/auth/register", data, {
        withCredentials: true,
      });

      if (response.status != 201) {
        throw new Error(data.error || "Registration failed");
      }

      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Create a protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      router.push("/auth/login");
      return null;
    }

    return children;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        ProtectedRoute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
