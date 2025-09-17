import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { buyerCreateSchema } from "@/lib/schemas/buyerSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { id } = await params;

  const { data, error } = await supabase
    .from("buyers")
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
    let body = await request.json();
    console.log("PUT request body:", body);

    // Ensure budget fields are numbers
    body.budgetMin = body.budgetMin ? Number(body.budgetMin) : body.budgetMin;
    body.budgetMax = body.budgetMax ? Number(body.budgetMax) : body.budgetMax;
    body.phone = body.phone ? String(body.phone) : body.phone;

    // Remove id from body to prevent PK update issues
    if ("id" in body) delete body.id;
    if ("tags" in body) delete body.tags;
    if ("updatedAt" in body) delete body.updatedAt;
    console.log("PUT request body after cleanup:", id, body);
    // Validate using the same schema as "New Buyer"
    const parseResult = buyerCreateSchema.safeParse(body);

    if (!parseResult.success) {
      // Return Zod validation errors
      const formattedErrors: Record<string, string> = {};
      console.log("Validation errors:", parseResult.error);
      parseResult?.error?.errors?.forEach((err) => {
        const path = err.path[0] ?? "_";
        formattedErrors[path as string] = err.message;
      });
      return NextResponse.json({ error: formattedErrors }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("buyers")
      .update({ ...parseResult.data, updatedAt: new Date().toISOString() })
      .eq("id", String(id))
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    console.log("Updated buyer data:", data, error);

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
  const { error } = await supabase.from("buyers").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Buyer deleted successfully" });
}
export const runtime = "nodejs";
