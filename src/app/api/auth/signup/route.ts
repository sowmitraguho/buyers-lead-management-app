import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, phone, password } = body;

  if (!email || !password || !fullName) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Create user in Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } else {
    if (data.user) {
      await supabase.from("users").insert([
        {
          id: data.user.id,
          full_name: data.user.full_name,
          email: data.user.email,
          phone: data.user.phone,
          role: "seller",
        },
      ]);
    }
  }

  return NextResponse.json({ user: data.user });
}
export const runtime = "nodejs";
