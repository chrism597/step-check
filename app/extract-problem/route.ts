import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { imageBase64, mediaType } = await req.json();

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType,
              data: imageBase64,
            },
          },
          {
            type: "text",
            text: `Look at this homework problem image. Pick ONE problem from it (the first clear one) and solve it fully yourself, breaking your solution into discrete steps.

Respond with ONLY valid JSON, no other text, in exactly this shape:
{
  "statement": "the problem as written",
  "steps": [
    {
      "id": "step1",
      "correctAnswer": "a short description of what to do in this step",
      "options": ["the correct step text", "a plausible wrong step", "another plausible wrong step", "another plausible wrong step"]
    }
  ]
}

Make the wrong options realistic common mistakes, not random nonsense. Do not reveal the final numeric/final answer anywhere in the JSON — only describe the process for each step.`,
          },
        ],
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  const rawText = textBlock && "text" in textBlock ? textBlock.text : "";

  // Strip markdown code fences if Claude adds them despite instructions
  const cleaned = rawText.replace(/```json|```/g, "").trim();

  try {
    const problem = JSON.parse(cleaned);
    return NextResponse.json(problem);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to parse AI response", raw: rawText },
      { status: 500 }
    );
  }
}