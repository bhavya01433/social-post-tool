import React from "react";
import { PLATFORMS } from "./PlatformSelector";

interface ShareButtonProps {
  platform: string;
  content: {
    text: string;
    image?: string;
    hashtags?: string[];
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
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encode(
          image || window.location.href
        )}&summary=${encode(text)}`;
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

  const handleShare = () => {
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
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${platformObj.color.replace(
        "text-",
        "bg-"
      )} hover:opacity-80 text-white`}
    >
      <Icon className="w-4 h-4" />
      <span>Share to {platformObj.label}</span>
    </button>
  );
};

export default ShareButton;
