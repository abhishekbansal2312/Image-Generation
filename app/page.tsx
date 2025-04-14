// pages/agent-ai-demo.js
"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

export default function AgentAIDemo() {
  const [loading, setLoading] = useState(false);
  type ResultType =
    | { image_url: string } // For "generate_image"
    | Record<string, string | number | boolean | null | object>;

  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const [action, setAction] = useState("generate_image");

  // Image generation inputs
  const [imagePrompt, setImagePrompt] = useState("");
  const [model, setModel] = useState("DALL-E 3");
  const [modelStyle, setModelStyle] = useState("default");
  const [aspectRatio, setAspectRatio] = useState("9:16");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestBody = {
        prompt: imagePrompt,
        model,
        model_style: modelStyle,
        model_aspect_ratio: aspectRatio,
      };

      const response = await fetch(`/api/agent-ai/generate_image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Image Generation Demo</title>
        <meta name="description" content="Generate images with Agent.AI API" />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Image Generation API</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image Prompt</label>
          <textarea
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            placeholder="A serene mountain lake at sunset"
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="DALL-E 3">DALL-E 3</option>
            <option value="Stable Diffusion">Stable Diffusion</option>
            <option value="Midjourney">Midjourney</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Style</label>
          <select
            value={modelStyle}
            onChange={(e) => setModelStyle(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="default">Default</option>
            <option value="vivid">Vivid</option>
            <option value="natural">Natural</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Aspect Ratio</label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="9:16">9:16 (Portrait)</option>
            <option value="1:1">1:1 (Square)</option>
            <option value="16:9">16:9 (Landscape)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Generating Image..." : "Generate Image"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Generated Image</h2>

          {result.image_url && (
            <Image
              src={typeof result.image_url === "string" ? result.image_url : ""}
              alt="Generated image"
              className="max-w-full h-auto rounded"
              width={500}
              height={500}
            />
          )}

          <pre className="bg-gray-100 p-4 rounded overflow-auto mt-4">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
