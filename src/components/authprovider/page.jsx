"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("Bearer");
        if (!token) {
            if (router.pathname !== "/login" && router.pathname !== "/register") {
                router.push("/login");
            }
        }
    }, [router]);

    return children;
};

export default ProtectedRoute;
