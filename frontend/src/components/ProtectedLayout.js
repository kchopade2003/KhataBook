"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function ProtectedLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState("true");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token){
            router.push("/login");
        }else{
            setLoading(false);
        }
    }, []);

    if(loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg font-semibold">Checking auth...</p>
            </div>
        );
    }

    return children;
}