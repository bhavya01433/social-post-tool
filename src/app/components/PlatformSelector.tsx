import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";

export const PLATFORMS = [
  {
    label: "Instagram",
    value: "instagram",
    icon: FaInstagram,
    color: "text-[#E1306C]",
    ring: "ring-[#E1306C]",
    bg: "bg-white/20",
  },
  {
    label: "Facebook",
    value: "facebook",
    icon: FaFacebookF,
    color: "text-[#1877F3]",
    ring: "ring-[#1877F3]",
    bg: "bg-white/20",
  },
  {
    label: "LinkedIn",
    value: "linkedin",
    icon: FaLinkedinIn,
    color: "text-[#0A66C2]",
    ring: "ring-[#0A66C2]",
    bg: "bg-white/20",
  },
  {
    label: "Pinterest",
    value: "pinterest",
    icon: FaPinterestP,
    color: "text-[#E60023]",
    ring: "ring-[#E60023]",
    bg: "bg-white/20",
  },
  {
    label: "Twitter",
    value: "twitter",
    icon: FaTwitter,
    color: "text-[#1DA1F2]",
    ring: "ring-[#1DA1F2]",
    bg: "bg-white/20",
  },
];

type PlatformSelectorProps = {
  selected: string[];
  onToggle: (val: string) => void;
};

export default function PlatformSelector({ selected, onToggle }: PlatformSelectorProps) {
  return (
    <div className="flex flex-wrap gap-5">
      {PLATFORMS.map((p) => {
        const Icon = p.icon;
        const isSelected = selected.includes(p.value);
        return (
          <button
            key={p.value}
            type="button"
            aria-label={p.label}
            onClick={() => onToggle(p.value)}
            className={`
              w-14 h-14 flex items-center justify-center rounded-full
              ${p.bg}
              transition
              shadow
              ${isSelected ? `${p.ring} ring-4` : "ring-0"}
              hover:scale-110 focus:scale-110
              hover:bg-white/30 focus:bg-white/30
              outline-none
            `}
            style={{
              transition:
                "box-shadow 0.15s, transform 0.15s, background 0.15s",
            }}
          >
            <Icon className={`w-7 h-7 ${p.color}`} />
          </button>
        );
      })}
    </div>
  );
}