import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.js";
import axiosInstance from "../utils/axiosInstance";

export const AuthProvider = ({children})=>{
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axiosInstance.get('user/check-auth');
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setAuthLoading(false);
            }
        };
        checkAuth();
    }, []);

    return(
        <AuthContext.Provider value ={{isLoggedIn , setIsLoggedIn, authLoading}}>
            {children}
        </AuthContext.Provider>
    )
}