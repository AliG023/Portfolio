import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const UserProvider = ({ children }) => {
    const getUserFromStorage = () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        return token && username ? { username } : null;
    };

    // State to hold user information
    const [user, setUser] = useState(getUserFromStorage());

    // Update user state when localStorage changes
    useEffect (() => {
        setUser(getUserFromStorage());
    },[])

    const signUp = async (username, email, password) => {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Sign Up Failed');
        }

        // Set Token and Username in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        setUser({ username: data.user.username });
    }

    const signIn = async (username, password) => {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password})
        });

        if (!response.ok) {
            throw new Error('Sign In Failed');
        }

        const data = await response.json();
        
        // Set Token and Username in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        setUser({ username: data.user.username });
    }

    const signOut = () => {
        fetch(`${API_URL}/auth/signout`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setUser(null);
        });
    }

    return (
        <UserContext.Provider value={{ user, signUp, signIn, signOut }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);