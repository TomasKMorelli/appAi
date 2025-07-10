import { NextRequest, NextResponse } from "next/server";
import { translateText } from "@/helper/Openai";
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { text, language } = await req.json();
  if (!text || !language) {
    return NextResponse.json({ error: "Missing text or language" }, { status: 400 });
  }
  try {
    const translation = await translateText(text, language);
    return NextResponse.json({ translation });
  } catch (error) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}