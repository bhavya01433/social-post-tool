import React from "react";
import { PLATFORMS } from "./PlatformSelector";

interface ShareButtonProps {
  platform: string;
  content: {
    text: string;
    image?: string;
    hashtags?: string[];
    // For LinkedIn API posting
    accessToken?: string;
    memberUrn?: string;
  };
}

const ShareButton: React.FC<ShareButtonProps> = ({ platform, content }) => {
  const platformObj = PLATFORMS.find((p) => p.value === platform);
  if (!platformObj) return null;

  const Icon = platformObj.icon;

  // Helper to encode URI components
  const encode = encodeURIComponent;

  const getPlatformShareUrl = () => {
    const text = content.text || "";
    const hashtags = content.hashtags?.join(",") || "";
    const image = content.image || "";
    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encode(
          image || window.location.href
        )}&quote=${encode(text)}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${encode(text)}${
          image ? `&url=${encode(image)}` : ""
        }${hashtags ? `&hashtags=${encode(hashtags)}` : ""}`;
      case "linkedin":
        // For API posting, we will handle this separately
        return ""; // Not used, as we call backend for LinkedIn API
      case "pinterest":
        return `https://pinterest.com/pin/create/button/?url=${encode(
          window.location.href
        )}${image ? `&media=${encode(image)}` : ""}&description=${encode(
          text
        )}`;
      case "instagram":
        return "https://www.instagram.com/";
      default:
        return "#";
    }
  };

  const handleShare = async () => {
    if (platform === "linkedin") {
      // Check if accessToken and memberUrn are provided
      if (!content.accessToken || !content.memberUrn) {
        alert(
          "LinkedIn authentication required. Please connect your LinkedIn account first."
        );
        return;
      }
      try {
        const response = await fetch("/api/linkedin/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: content.text,
            image: content.image,
            hashtags: content.hashtags,
            accessToken: content.accessToken,
            memberUrn: content.memberUrn,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to post to LinkedIn");
        }
        alert("Posted to LinkedIn!");
      } catch (err: any) {
        alert("LinkedIn post failed: " + err.message);
      }
      return;
    }

    // For other platforms, open the share dialog
    const url = getPlatformShareUrl();
    window.open(url, "_blank");
    alert(
      `Redirecting to ${platformObj.label}... Your AI-generated content will be automatically populated there if supported!`
    );
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`
    flex items-center space-x-3 
    px-5 py-2.5 
    rounded-full 
    font-bold 
    shadow-md
    bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
    hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
    text-white
    border border-blue-600
    relative
    group
  `}
    >
      <span className="bg-white bg-opacity-20 rounded-full p-1 flex items-center justify-center">
        <Icon className="w-5 h-5 drop-shadow-sm" />
      </span>
      <span className="tracking-wide drop-shadow-sm">
        Share to {platformObj.label}
      </span>
      <span className="absolute -right-2 -top-2 bg-yellow-400 text-xs rounded-full px-2 py-0.5 text-gray-800 group-hover:bg-yellow-300 transition-all shadow-md font-semibold">
        NEW
      </span>
    </button>
  );
};

export default ShareButton;
