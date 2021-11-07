import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    // Register User

    const register = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
            router.push("/");
        } else {
            setError(data.message);
            setError(null);
        }
    };

    // Login User

    const login = async ({ loginEmail, loginPassword }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
            router.push("/");
        } else {
            setError(data.message);
            setError(null);
        }
    };

    // Logout User

    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: "POST",
        });

        if (res.ok) {
            setUser(null);
            router.push("/");
        }
    };

    // Check if User is log in

    const checkUserLoggedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`);

        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
        } else {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                register,
                error,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;