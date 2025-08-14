import React from "react";
import { PLATFORMS } from "./PlatformSelector";
import InstagramPreview from "./platforms/Instagram";
import FacebookPreview from "./platforms/Facebook";
import LinkedInPreview from "./platforms/LinkedIn";
import TwitterPreview from "./platforms/Twitter";
import PinterestPreview from "./platforms/Pinterest";
import ShareButton from "./ShareButton";

type ImagesState = {
  [p: string]: { image?: string; mime?: string; error?: string };
} | null;

type PostPreviewProps = {
  loading: boolean;
  generated: { [p: string]: string | { content: string } } | { error: string } | null;
  images: ImagesState;
  selected: string[];
};

export default function PostPreview({
  loading,
  generated,
  images,
  selected,
}: PostPreviewProps) {
  return (
    <div className="mt-12 min-h-[180px]">
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gradient-to-r from-blue-200/20 to-cyan-200/10 rounded-xl mb-2" />
          <div className="h-48 bg-gradient-to-r from-blue-200/20 to-cyan-200/10 rounded-2xl" />
        </div>
      ) : generated && typeof generated === "object" ? (
        <div>
          {Object.keys(generated).some((key) => key === "error") ? (
            <div className="bg-white/80 rounded-xl p-6 text-red-700 font-semibold text-lg shadow-lg">
              {typeof generated === 'object' && 'error' in generated && typeof generated.error === 'string' ? generated.error : 'An error occurred'}
            </div>
          ) : (
            selected.map((platform) => {
              const platformObj = PLATFORMS.find((p) => p.value === platform);
              if (!platformObj) return null;
              const Icon = platformObj.icon;
              const imgState = images?.[platform];
              const base64 = imgState?.image;
              // Use mime from API response, fallback to image/png
              const mime = imgState?.mime || "image/png";
              const dataUrl = base64
                ? `data:${mime};base64,${base64}`
                : undefined;
              // Updated to work with current generatePost route structure
              const postText = getPostText(generated && typeof generated === 'object' && !('error' in generated) ? generated[platform] : null);
              const hashtags = extractHashtags(postText);
              const cleanText = removeHashtags(postText);

              // Special handling for Instagram - show Instagram component
              if (platform === "instagram") {
                return (
                  <div
                    key={platform}
                    className="bg-white/80 rounded-xl p-6 shadow-lg mb-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Icon className={`w-6 h-6 mr-2 ${platformObj.color}`} />
                        <span className="font-bold">{platformObj.label}</span>
                      </div>
                      <ShareButton
                        platform={platform}
                        content={{
                          text: cleanText,
                          image: dataUrl,
                          hashtags,
                        }}
                      />
                    </div>
                    <InstagramPreview
                      content={{
                        text: cleanText,
                        image: dataUrl,
                        hashtags,
                      }}
                    />
                  </div>
                );
              }

              // Special handling for Facebook - show Facebook component
              if (platform === "facebook") {
                return (
                  <div
                    key={platform}
                    className="bg-white/80 rounded-xl p-6 shadow-lg mb-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Icon className={`w-6 h-6 mr-2 ${platformObj.color}`} />
                        <span className="font-bold">{platformObj.label}</span>
                      </div>
                      <ShareButton
                        platform={platform}
                        content={{
                          text: cleanText,
                          image: dataUrl,
                          hashtags,
                        }}
                      />
                    </div>
                    <FacebookPreview
                      content={{
                        text: cleanText,
                        image: dataUrl,
                        hashtags,
                      }}
                    />
                  </div>
                );
              }

              // Special handling for LinkedIn - show LinkedIn component
              if (platform === "linkedin") {
                return (
                  <div
                    key={platform}
                    className="bg-white/80 rounded-xl p-6 shadow-lg mb-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Icon className={`w-6 h-6 mr-2 ${platformObj.color}`} />
                        <span className="font-bold">{platformObj.label}</span>
                      </div>
                      <ShareButton
                        platform={platform}
                        content={{
                          text: cleanText,
                          image: dataUrl,
                          hashtags,
                        }}
                      />
                    </div>
                    <LinkedInPreview
                      content={{
                        text: cleanText,
                        image: dataUrl,
                        hashtags,
                      }}
                    />
                  </div>
                );
              }

              // Special handling for Twitter - show Twitter component
              if (platform === "twitter") {
                return (
                  <div
                    key={platform}
                    className="bg-white/80 rounded-xl p-6 shadow-lg mb-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Icon className={`w-6 h-6 mr-2 ${platformObj.color}`} />
                        <span className="font-bold">{platformObj.label}</span>
                      </div>
                      <ShareButton
                        platform={platform}
                        content={{
                          text: cleanText,
                          image: dataUrl,
                          hashtags,
                        }}
                      />
                    </div>
                    <TwitterPreview
                      content={{
                        text: cleanText,
                        image: dataUrl,
                        hashtags,
                      }}
                    />
                  </div>
                );
              }

              // Special handling for Pinterest - show Pinterest component
              if (platform === "pinterest") {
                return (
                  <div
                    key={platform}
                    className="bg-white/80 rounded-xl p-6 shadow-lg mb-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Icon className={`w-6 h-6 mr-2 ${platformObj.color}`} />
                        <span className="font-bold">{platformObj.label}</span>
                      </div>
                      <ShareButton
                        platform={platform}
                        content={{
                          text: cleanText,
                          image: dataUrl,
                          hashtags,
                        }}
                      />
                    </div>
                    <PinterestPreview
                      content={{
                        text: cleanText,
                        image: dataUrl,
                        hashtags,
                      }}
                    />
                  </div>
                );
              }

              // Default handling for other platforms
              return (
                <div
                  key={platform}
                  className="bg-white/80 rounded-xl p-6 text-gray-900 font-semibold text-lg shadow-lg mb-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Icon className={`w-6 h-6 mr-2 ${platformObj.color}`} />
                      <span className="font-bold">{platformObj.label}</span>
                    </div>
                    <ShareButton
                      platform={platform}
                      content={{
                        text: cleanText,
                        image: dataUrl,
                        hashtags,
                      }}
                    />
                  </div>
                  <div className="mb-4 break-words whitespace-pre-wrap">
                    {cleanText}
                  </div>
                  {hashtags.length > 0 && (
                    <div className="text-sm text-blue-900 flex flex-wrap gap-2 mb-2 break-words">
                      {hashtags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  )}
                  {/* Image section: show loading, error, or image */}
                  {base64 ? (
                    <img
                      src={dataUrl}
                      alt={`${platformObj.label} AI generated`}
                      className="rounded-xl w-full max-h-64 object-contain border shadow-md mt-2"
                    />
                  ) : imgState?.error ? (
                    <div className="text-sm text-red-500 font-semibold mt-2">
                      {imgState.error}
                    </div>
                  ) : images &&
                    Object.prototype.hasOwnProperty.call(images, platform) ? (
                    <div className="flex items-center space-x-2 text-blue-500 text-base mt-2">
                      <svg
                        className="animate-spin h-5 w-5 text-blue-500"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      <span>Generating image...</span>
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="text-gray-300 text-opacity-70 text-center pt-16 italic tracking-wide">
          Post preview will appear here...
        </div>
      )}
    </div>
  );
}

// Helper function to extract hashtags from text, safe against non-string input
function extractHashtags(text: string): string[] {
  if (typeof text !== "string") return [];
  const hashtagRegex = /#([\p{L}\p{N}_]+)/gu;
  const matches = text.match(hashtagRegex) || [];
  const tags = matches.map((tag) => tag.slice(1));
  // Deduplicate while preserving order
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const t of tags) {
    if (!seen.has(t)) {
      seen.add(t);
      unique.push(t);
    }
  }
  return unique;
}

function getPostText(value: unknown): string {
  if (typeof value === "string") return value;
  // Current generatePost route returns content directly as string, not nested under 'post'
  if (value && typeof value === "object" && (value as { content: string }).content) {
    const content = (value as { content: string }).content;
    return typeof content === "string" ? content : "";
  }
  return "";
}

function removeHashtags(text: string): string {
  if (typeof text !== "string") return "";
  return text
    .replace(/#([\p{L}\p{N}_]+)/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}
