import React from "react";
import { PLATFORMS } from "./PlatformSelector";

type ImagesState = { [p: string]: { image?: string; error?: string } } | null;

type PostPreviewProps = {
  loading: boolean;
  generated: { [p: string]: string } | null;
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
              {generated.error}
            </div>
          ) : (
            selected.map((platform) => {
              const platformObj = PLATFORMS.find((p) => p.value === platform);
              if (!platformObj) return null;
              const Icon = platformObj.icon;
              const imgState = images?.[platform];

              return (
                <div
                  key={platform}
                  className="bg-white/80 rounded-xl p-6 text-gray-900 font-semibold text-lg shadow-lg mb-6"
                >
                  <div className="flex items-center mb-3">
                    <Icon className={`w-6 h-6 mr-2 ${platformObj.color}`} />
                    <span className="font-bold">{platformObj.label}</span>
                  </div>
                  <div className="mb-4">{generated[platform]}</div>
                  {/* Image section: show loading, error, or image */}
                  {imgState?.image ? (
                    <img
                      src={`data:image/png;base64,${imgState.image}`}
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
