'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase-server";
import { NextResponse } from 'next/server';
//import { createClient } from '@/utils/supabase/server'

export async function login({ email, password }: { email: string, password: string }) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const formData = {
        email: email as string,
        password: password as string,
    }
    try {
        const { data, error } = await supabase.auth.signInWithPassword(formData)

        if (!error) {
            //alert("Login successful!");
            console.log("Login Response:", data);
            const response = NextResponse.json({
            user: data.user,
            session: data.session,
        });
    
        response.cookies.set({
            name: "sb-access-token",
            value: data.session?.access_token || "",
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: data.session?.expires_in,
        });
        response.cookies.set({
            name: "sb-refresh-token",
            value: data.session?.refresh_token || "",
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: data.session?.expires_in,
        });
            // Optional: redirect to buyers page
            //window.location.href = "/buyers";
            return { success: true }
        } else {
            //alert(error.message || "Login failed!");
            
            return { error: error.message || "Login failed!" }
        }
    } catch (err) {
        console.error(err)
    }
    
}
