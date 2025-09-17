import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    console.log('Login request body:', body);

    if (!email || !password) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    console.log('Login attempt:', data, error);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    // else {
    //     localStorage.setItem("user", JSON.stringify(data.user));
    //     localStorage.setItem("session", JSON.stringify(data.session));
    // }
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


    return response;
}
export const runtime = "nodejs";
