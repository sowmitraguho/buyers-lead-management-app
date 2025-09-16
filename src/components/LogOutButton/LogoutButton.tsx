"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface LogoutButtonProps {
    redirectTo?: string;
    className?: string;
}

export function LogoutButton({ redirectTo = "/auth/login", className }: LogoutButtonProps) {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert("Logout failed: " + error.message);
            setLoading(false);
            return;
        } else {
            alert("Logged out successfully");

        }

        // redirect after logout
        router.push(redirectTo);
    };

    return (
        <Button
            variant="outline"
            className={className}
            onClick={handleLogout}
            disabled={loading}
        >
            {loading ? "Logging out..." : "Logout"}
        </Button>
    );
}
