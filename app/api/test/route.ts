import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function GET() {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 100,
    messages: [
      { role: "user", content: "Say hello and tell me you're working correctly." }
    ],
  });

  return NextResponse.json(message);
}