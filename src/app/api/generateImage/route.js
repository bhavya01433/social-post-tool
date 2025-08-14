import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";

export async function POST(req) {
  try {
    const { prompt, platforms } = await req.json();

    // platforms is an array, prompt is a string
    if (!prompt || !prompt.trim() || !platforms || !Array.isArray(platforms)) {
      return NextResponse.json({ error: "Prompt and platforms required." }, { status: 400 });
    }

    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not set." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // For each platform, generate an image (or you can just do one for now)
    // Here we generate the same image for all selected platforms
    const images = {};
    for (const platform of platforms) {
      try {
        // You can customize prompt per platform if you want
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash-preview-image-generation",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
          },
        });

        const parts = response.candidates?.[0]?.content?.parts || [];
        console.log(`Response parts for ${platform}:`, JSON.stringify(parts, null, 2));
        
        const imagePart = parts.find(
          (part) => part?.inlineData && (part.inlineData.data || part.inlineData.base64Data)
        );

        if (imagePart?.inlineData) {
          const data = imagePart.inlineData.data || imagePart.inlineData.base64Data;
          const mime = imagePart.inlineData.mimeType || "image/png";
          if (data) {
            console.log(`Generated image for ${platform}:`, { hasData: !!data, mime, dataLength: data.length });
            images[platform] = { image: data, mime };
          } else {
            images[platform] = { error: "No image data found." };
          }
        } else {
          console.log(`No image part found for ${platform}`);
          // For debugging: return a test image to verify UI flow
          images[platform] = { 
            image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", 
            mime: "image/png" 
          };
        }
      } catch (e) {
        console.error(`Error generating image for ${platform}:`, e);
        // For debugging: return a test image to verify UI flow
        images[platform] = { 
          image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", 
          mime: "image/png" 
        };
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