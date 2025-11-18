import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const UserProvider = ({ children }) => {
  const getUserFromStorage = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    return token && username ? { username, role } : null;
  };

  // State to hold user information
  const [user, setUser] = useState(getUserFromStorage());

  // Update user state when localStorage changes
  useEffect(() => {
    setUser(getUserFromStorage());
  }, []);

  const signUp = async (username, email, password, isAdmin = false) => {
    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role: isAdmin ? "admin" : "user",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Sign Up Failed");
    }

    // Set Token and Username in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("role", data.user.role);
    setUser({ username: data.user.username, role: data.user.role });
  };

  const signIn = async (username, password) => {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Sign In Failed");
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("role", data.user.role);
    setUser({ username: data.user.username, role: data.user.role });
  };

  const signOut = () => {
    fetch(`${API_URL}/auth/signout`, {
      method: "GET",
      credentials: "include",
    }).then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role"); // Add this line
      setUser(null);
    });
  };

  return (
    <UserContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
