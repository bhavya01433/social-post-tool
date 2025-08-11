import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";

export async function POST(req) {
  try {
    const { prompt, platforms } = await req.json();

    // platforms is an array, prompt is a string
    if (!prompt || !prompt.trim() || !platforms || !Array.isArray(platforms)) {
      return NextResponse.json({ error: "Prompt and platforms required." }, { status: 400 });
    }

    const ai = new GoogleGenAI({});

    // For each platform, generate an image (or you can just do one for now)
    // Here we generate the same image for all selected platforms
    const images = {};
    for (const platform of platforms) {
      // You can customize prompt per platform if you want
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: prompt,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      const imagePart = parts.find(
        (part) => part.inlineData && part.inlineData.data
      );

      if (imagePart && imagePart.inlineData.data) {
        images[platform] = { image: imagePart.inlineData.data };
      } else {
        images[platform] = { error: "No image generated." };
      }
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Image generation error:", error);
    // Return error for all platforms
    const { platforms } = await req.json().catch(() => ({ platforms: [] }));
    const images = {};
    (platforms || []).forEach(platform => {
      images[platform] = { error: "Image generation failed." };
    });
    return NextResponse.json({ images }, { status: 500 });
  }
}