import React from "react";

interface PlatformProps {
  content: {
    text: string;
    image?: string;
    hashtags?: string[];
  };
}

const TwitterPreview: React.FC<PlatformProps> = ({ content }) => {
  return (
    <div className="border border-gray-200 rounded-xl bg-white w-full max-w-2xl shadow-sm">
      {/* Header */}
      <div className="flex items-start p-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
          T
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-base text-gray-900">Twitter User</span>
            <span className="text-gray-500">@twitteruser</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">2h</span>
          </div>
          <div className="text-sm text-gray-600">Software Engineer & Tech Enthusiast</div>
        </div>
        <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 ml-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Tweet Content */}
      <div className="px-4 py-3">
        <div className="text-base text-gray-900 leading-relaxed mb-3">
          {content.text}
        </div>

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="text-sm text-blue-500 mb-3">
            {content.hashtags.map((tag, index) => (
              <span key={index} className="mr-2">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      {content.image && (
        <div className="relative">
          <img
            src={content.image}
            alt="Twitter post"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>234 comments</span>
            <span>1.2K retweets</span>
            <span>5.6K likes</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors group">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 group-hover:text-blue-500 font-medium">Comment</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-green-50 transition-colors group">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            <span className="text-gray-700 group-hover:text-green-500 font-medium">Retweet</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-pink-50 transition-colors group">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-pink-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 group-hover:text-pink-500 font-medium">Like</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors group">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 2.007L2 2.003v12.987l.003.003h15.994L18 17.993V5.007L18 5H2.003zM18 2v1.993L2.003 4H2V2h16z" />
            </svg>
            <span className="text-gray-700 group-hover:text-blue-500 font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Reply Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-sm text-gray-900">John Doe</span>
                <span className="text-gray-500 text-sm">@johndoe</span>
                <span className="text-gray-500 text-sm">· 1h</span>
              </div>
              <div className="text-sm text-gray-700">Great insights! This really resonates with my experience.</div>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <button className="hover:text-gray-700">Reply</button>
              <button className="hover:text-gray-700">Retweet</button>
              <button className="hover:text-gray-700">Like</button>
            </div>
          </div>
        </div>
        
        {/* Reply Input */}
        <div className="flex items-center space-x-3 mt-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tweet your reply"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute right-3 top-3 flex items-center space-x-2">
              <button className="text-blue-500 hover:text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterPreview;
