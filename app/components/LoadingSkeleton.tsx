import React from 'react';

const LoadingSkeleton = ({ width = 'w-1/2', height = 'h-4', rounded = 'rounded-md' }) => {
    return (
        <div
            className={`bg-gray-300 ${width} ${height} ${rounded} animate-pulse`}
        ></div>
    );
};

export default LoadingSkeleton;
