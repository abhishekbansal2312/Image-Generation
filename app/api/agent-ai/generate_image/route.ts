// app/api/agent-ai/generate_image/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt, model, model_style, model_aspect_ratio } = body;

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      "https://api-lr.agent.ai/v1/action/generate_image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AGENT_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model: model || "DALL-E 3",
          model_style: model_style || "default",
          model_aspect_ratio: model_aspect_ratio || "9:16",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
