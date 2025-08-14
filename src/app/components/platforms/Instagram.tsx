import React from "react";

interface PlatformProps {
  content: {
    text: string;
    image?: string;
    hashtags?: string[];
  };
}

const InstagramPreview: React.FC<PlatformProps> = ({ content }) => {
  return (
    <div className="border border-gray-300 rounded-lg bg-white w-full max-w-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-200">
        <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          I
        </div>
        <div className="ml-3 flex-1">
          <div className="font-semibold text-sm text-gray-900">instagram_user</div>
          <div className="text-xs text-gray-500">Sponsored</div>
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="relative">
        {content.image ? (
          <img
            src={content.image}
            alt="Instagram post"
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">No image</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-3">
        <div className="flex items-center space-x-4 mb-3">
          <button className="text-gray-900 hover:text-red-500 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="text-gray-900 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="text-gray-900 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </button>
          <button className="text-gray-900 hover:text-gray-600 transition-colors ml-auto">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </button>
        </div>

        {/* Likes */}
        <div className="text-sm font-semibold text-gray-900 mb-2">1,234 likes</div>

        {/* Caption */}
        <div className="text-sm text-gray-900 mb-2 break-words whitespace-pre-wrap">
          <span className="font-semibold mr-2">instagram_user</span>
          {content.text}
        </div>

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="text-sm text-blue-900 mb-2 flex flex-wrap gap-2 break-words">
            {content.hashtags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Comments */}
        <div className="text-sm text-gray-500 mb-2">View all 56 comments</div>

        {/* Time */}
        <div className="text-xs text-gray-400">2 HOURS AGO</div>
      </div>

      {/* Comment Input */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          <button className="text-blue-500 font-semibold text-sm hover:text-blue-600 disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstagramPreview;
