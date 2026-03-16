import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // Importamos la definición
import { loginRequest, getProfileRequest } from "../api/auth.api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = async (userCredentials) => {
        try {
            const res = await loginRequest(userCredentials);
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            return res.data;
        } catch (error) {
            console.error("Error en el login de Filber:", error.response?.data || error.message);
            throw error;
        }
    };

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem("token");
            if (!token) return setLoading(false);
            
            try {
                const res = await getProfileRequest();
                setUser(res.data);
                setIsAuthenticated(true);
            } catch (error) {
                error("")
                console.error("Token no válido o expirado");
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};