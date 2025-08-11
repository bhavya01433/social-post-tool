"use client";

import { useState } from "react";
import PlatformSelector, { PLATFORMS } from "./components/PlatformSelector";
import PostPreview from "./components/PostPreview";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPromptError, setShowPromptError] = useState(false);
  const [generated, setGenerated] = useState<{ [p: string]: string } | null>(
    null
  );
  const [images, setImages] = useState<{
    [p: string]: { image?: string; error?: string };
  } | null>(null);

  const handlePlatformToggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setShowPromptError(true);
      return;
    }
    setShowPromptError(false);
    setLoading(true);
    setGenerated(null);
    setImages(null);

    try {
      // Generate posts
      const res = await fetch("/api/generatePost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, platforms: selected }),
      });
      const data = await res.json();
      if (res.ok && data.content) {
        setGenerated(data.content);

    
        const initialImages: {
          [p: string]: { image?: string; error?: string };
        } = {};
        selected.forEach((platform) => (initialImages[platform] = {}));
        setImages(initialImages);

        // Generate images
        const imgRes = await fetch("/api/generateImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, platforms: selected }),
        });
        const imgData = await imgRes.json();
        if (imgRes.ok && imgData.images) {
          setImages(imgData.images);
        } else {
          // Set error for all platforms
          const errorImages: { [p: string]: { error: string } } = {};
          selected.forEach(
            (platform) =>
              (errorImages[platform] = {
                error: imgData.error || "Failed to generate images.",
              })
          );
          setImages(errorImages);
        }
      } else {
        setGenerated({ error: data.error || "Failed to generate post." });
      }
    } catch (err) {
      setGenerated({ error: "Server error. Please try again." });
      const errorImages: { [p: string]: { error: string } } = {};
      selected.forEach(
        (platform) =>
          (errorImages[platform] = { error: "Server error. Please try again." })
      );
      setImages(errorImages);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleGenerate}
      className="space-y-8 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl px-8 py-10 max-w-2xl mx-auto animate-fade-in"
    >
      <div className="space-y-2">
        <label
          htmlFor="prompt"
          className="block text-xl font-semibold text-white mb-1 tracking-wide"
        >
          Post Idea / Prompt
        </label>
        <div className="relative">
          <input
            id="prompt"
            type="text"
            className="w-full px-5 py-3 rounded-xl bg-white/70 text-gray-900 font-semibold border-none focus:ring-2 focus:ring-cyan-400 transition placeholder:text-gray-400 shadow-inner outline-none focus:outline-none ring-1 ring-inset ring-white/30"
            placeholder="Describe your post idea, campaign, or vibe..."
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (showPromptError) setShowPromptError(false);
            }}
            maxLength={300}
            autoFocus
          />
          {showPromptError && (
            <span className="absolute left-2 top-full mt-3 text-xs font-semibold bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white px-3 py-1 rounded-md shadow-lg border border-white/10 whitespace-nowrap z-10">
              Prompt cannot be empty.
            </span>
          )}
        </div>
      </div>

      <div className="mt-16">
        <span className="block text-xl font-semibold text-white mb-3 tracking-wide">
          Platforms
        </span>
        <PlatformSelector selected={selected} onToggle={handlePlatformToggle} />
      </div>

      <button
        type="submit"
        disabled={loading || !prompt.trim() || selected.length === 0}
        className={`w-full py-3 rounded-xl text-lg font-extrabold shadow-xl transition duration-200 ${
          loading || !prompt.trim() || selected.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white hover:scale-105 hover:shadow-cyan-400/30"
        }`}
      >
        {loading ? (
          <span className="animate-pulse">Generating...</span>
        ) : (
          "Generate Post"
        )}
      </button>

      <PostPreview
        loading={loading}
        generated={generated}
        images={images}
        selected={selected}
      />
    </form>
  );
}
