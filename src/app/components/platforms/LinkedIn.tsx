import React from "react";
import ShareToLinkedInButton from "../ShareToLinkedInButton";

interface PlatformProps {
  content: {
    text: string;
    image?: string;
    hashtags?: string[];
  };
}

const LinkedInPreview: React.FC<PlatformProps> = ({ content }) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white w-full max-w-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-start p-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
          L
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="font-semibold text-base text-gray-900">
            LinkedIn User
          </div>
          <div className="text-sm text-gray-600">
            Software Engineer at Tech Company
          </div>
          <div className="text-sm text-gray-500">
            2 hours ago · <span className="text-blue-600">🌍</span>
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 ml-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 py-3">
        <div className="text-base text-gray-900 leading-relaxed mb-3">
          {content.text}
        </div>

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="text-sm text-blue-600 mb-3">
            {content.hashtags.map((tag, index) => (
              <span key={index} className="mr-2">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      {content.image && (
        <div className="relative">
          <img
            src={content.image}
            alt="LinkedIn post"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
              👍
            </div>
            <span>1.2K</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>234 comments</span>
            <span>45 reposts</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 font-medium">Like</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 font-medium">Comment</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            <span className="text-gray-700 font-medium">Repost</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex-1 justify-center">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 2.007L2 2.003v12.987l.003.003h15.994L18 17.993V5.007L18 5H2.003zM18 2v1.993L2.003 4H2V2h16z" />
            </svg>
            <span className="text-gray-700 font-medium">Send</span>
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <div className="font-semibold text-sm text-gray-900">
                John Doe
              </div>
              <div className="text-sm text-gray-700">
                Great insights! This really resonates with my experience in the
                industry.
              </div>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <button className="hover:text-gray-700">Like</button>
                <button className="hover:text-gray-700">Reply</button>
                <span>1h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute right-3 top-2 flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real Share to LinkedIn Button */}
      <div className="mt-4 flex justify-end">
        <ShareToLinkedInButton content={content} />
      </div>
    </div>
  );
};

export default LinkedInPreview;
