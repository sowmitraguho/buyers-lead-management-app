export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const supabase = await createClient();
    const { id } = await params;

    const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const supabase = await createClient();
    const { id } = await params;

    try {
        const body = await request.json();
        console.log("PUT request body:", body);
        // Remove id from body to prevent PK update issues
        if ("id" in body) delete body.id;
        //console.log("PUT request body after cleanup:", id, body);

        const { data, error } = await supabase
            .from("properties")
            .update({ ...body, updatedAt: new Date().toISOString() })
            .eq("id", String(id))
            .select();

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        console.log("Updated property data:", data, error);

        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const supabase = await createClient();
    const { id } = await params;
    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Property deleted successfully" });
}

