export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { buyerCreateSchema } from "@/lib/schemas/buyerSchema";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // validate input server-side
        const parsed = await buyerCreateSchema.parseAsync(body);

        // --- get cookie from request headers ---
        const cookieHeader = req.headers.get("cookie") || "";
        const cookies = Object.fromEntries(
            cookieHeader.split(";").map((c) => {
                const [k, ...v] = c.trim().split("=");
                return [k, decodeURIComponent(v.join("="))];
            })
        );

        const token = cookies["sb-access-token"];
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // auth: get user from cookie-based supabase client
        const supabaseServer = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                    headers: { Authorization: `Bearer ${token}` },
                },
            }
        );
        const { data: { user }, error: userErr } = await supabaseServer.auth.getUser();
        console.log(user, userErr);

        if (userErr || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // prepare row to insert
        const insertRow = {
            ...parsed,
            ownerId: user.id,
            updatedAt: new Date().toISOString(),
        };

        // Insert into buyers table
        const { data, error } = await supabaseServer
            .from("buyers")
            .insert([insertRow])
            .select()
            .maybeSingle();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data }, { status: 201 });
    } catch (err: any) {
        // Zod errors will be thrown here
        if (err?.name === "ZodError") {
            return NextResponse.json({ error: err.errors }, { status: 422 });
        }
        return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
    }
}

