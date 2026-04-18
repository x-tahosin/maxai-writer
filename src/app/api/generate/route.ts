import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ apiKey: "" }, { status: 200 });
    }
    return NextResponse.json({ apiKey });
  } catch {
    return NextResponse.json({ apiKey: "" }, { status: 200 });
  }
}
