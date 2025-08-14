import React from "react";

interface PlatformProps {
  content: {
    text: string;
    image?: string;
    hashtags?: string[];
  };
}

const PinterestPreview: React.FC<PlatformProps> = ({ content }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm">
      {/* Image Container - Pinterest's signature tall image style */}
      <div className="relative group cursor-pointer">
        {content.image ? (
          <img
            src={content.image}
            alt="Pinterest pin"
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">No image</p>
            </div>
          </div>
        )}
        
        {/* Pinterest's signature save button overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full text-sm shadow-lg transition-colors">
            Save
          </button>
        </div>
        
        {/* Pinterest's signature three dots menu overlay */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title/Description */}
        <div className="mb-3">
          <p className="text-sm text-gray-900 leading-relaxed break-words whitespace-pre-wrap">
            {content.text}
          </p>
        </div>

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {content.hashtags.map((tag) => (
                <span key={tag} className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* User Info Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.025 2.747-1.025.546 1.38.203 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">pinterest_user</div>
              <div className="text-xs text-gray-500">1.2k followers</div>
            </div>
          </div>
          
          {/* Follow Button */}
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-full text-sm transition-colors">
            Follow
          </button>
        </div>

        {/* Pinterest's signature action buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Save</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <span className="text-sm">Send</span>
            </button>
          </div>
          
          {/* Pinterest's signature red save button */}
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full text-sm transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinterestPreview;
