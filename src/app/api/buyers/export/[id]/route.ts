import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { buyerCreateSchema } from "@/lib/schemas/buyerSchema";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const body = await req.json();
    const parsed = await buyerCreateSchema.parseAsync(body);

    const supabaseServer = createRouteHandlerClient({ cookies });
    const { data: { user }, error: userErr } = await supabaseServer.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // fetch existing row to check ownership
    const { data: existing, error: selErr } = await supabaseServer
      .from("buyers")
      .select("ownerId")
      .eq("id", id)
      .maybeSingle();

    if (selErr) {
      return NextResponse.json({ error: selErr.message }, { status: 400 });
    }

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // authorization: only owner can update (adjust logic if you have admin roles)
    if (existing.ownerId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // update
    const updateRow = {
      ...parsed,
      updatedAt: new Date().toISOString(),
    };

    const { data, error } = await supabaseServer
      .from("buyers")
      .update(updateRow)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return NextResponse.json({ error: err.errors }, { status: 422 });
    }
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
