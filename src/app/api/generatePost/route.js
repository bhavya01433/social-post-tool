import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define platform-specific style guidelines for the AI
const PLATFORM_STYLES = {
  instagram: `Instagram captions are visually engaging, concise, and creative. Use relevant emojis and trending hashtags. Write in a fun, casual tone and encourage interaction. Mention if a photo or carousel is implied. Limit to 2-3 punchy sentences.`,
  facebook: `Facebook posts are conversational, community-oriented, and can be a bit longer than other platforms. Personalize the message, ask a question or encourage discussion, and use 1-2 relevant hashtags. Use a friendly and approachable tone.`,
  linkedin: `LinkedIn posts should be professional, insightful, and highlight industry relevance. Focus on business value, trends, or career impact. Avoid slang and emojis, but do include 2-3 industry hashtags. Use a tone that appeals to professionals and leaders.`,
  pinterest: `Pinterest descriptions are inspiring, actionable, and often provide tips or ideas. Use a positive, creative tone and include keywords users might search for. Tailor the text to encourage saving or trying the idea. Include up to 3 relevant hashtags.`,
  twitter: `Twitter (now X) posts must be concise (max 280 characters), punchy, and may use emojis or trending hashtags. Write with an attention-grabbing hook, use abbreviations if needed, and encourage retweets or replies. Use a witty or impactful style.`,
};

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not set." },
        { status: 500 }
      );
    }

    let { prompt, platforms } = await req.json();

    if (typeof prompt !== "string") prompt = "";

    if (typeof platforms === "string") {
      platforms = platforms
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }

    if (
      !prompt ||
      prompt.trim().length === 0 ||
      !platforms ||
      !Array.isArray(platforms) ||
      platforms.length === 0
    ) {
      return NextResponse.json(
        { error: "Prompt and platforms are required." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // For each platform, generate a tailored post using an enhanced prompt.
    const results = await Promise.all(
      platforms.map(async (platform) => {
        const style = PLATFORM_STYLES[platform] || "";
        const platformName =
          platform.charAt(0).toUpperCase() + platform.slice(1);

        const platformPrompt = `You are an expert social media content creator.
Your task: Write a highly engaging, original post for ${platformName}, based on the following idea: "${prompt}"

Guidelines:
- Follow these platform style instructions: ${style}
- The post must be specifically tailored for ${platformName} and its audience.
- DO NOT use asterisks (**) or markdown formatting in the content.
- Use only plain text, as it would actually appear when posted on ${platformName}.
- If emojis and hashtags are appropriate for the platform, include them naturally.
- Do not add any explanation, title, or commentary—output only the post content, ready to copy-paste.
`;

        try {
          const result = await model.generateContent(platformPrompt);
          const response = await result.response;
          return { platform, content: response.text() };
        } catch (e) {
          return {
            platform,
            content: "Error generating content for this platform.",
          };
        }
      })
    );

    // Format: { instagram: "...", facebook: "...", ... }
    const content = {};
    results.forEach(({ platform, content: post }) => {
      content[platform] = post;
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate post." },
      { status: 500 }
    );
  }
}