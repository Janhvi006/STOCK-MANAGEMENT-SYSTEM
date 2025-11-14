import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();


  if (email === "admin@gmail.com" && password === "admin123") {
    return NextResponse.json(
      { success: true, message: "Login successful!" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, message: "Invalid email or password." },
    { status: 401 }
  );
}
