import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/buyers/import?page=1&limit=10&search=john&city=Chandigarh&status=New
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const city = searchParams.get("city");
    const status = searchParams.get("status");
    const propertyType = searchParams.get("propertyType");

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("properties").select("*", { count: "exact" });

    // Search by name/email/phone
    if (search) {
        query = query.or(
            `fullName.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
        );
    }
    //  Filters
    if (city) query = query.eq("city", city);
    if (status) query = query.eq("status", status);
    if (propertyType) query = query.eq("propertyType", propertyType);

    //pagination
    query = query.range(from, to).order("updatedAt", { ascending: false });

    const { data, count, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
        data,
        pagination: {
            page,
            limit,
            total: count,
            totalPages: Math.ceil((count || 0) / limit),
        },
    });
}
export const runtime = "nodejs";
