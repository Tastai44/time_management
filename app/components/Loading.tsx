import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
        {/* Inner Spinning Ring */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
