import React from 'react';

// A simple, reusable loading spinner component.
// Uses Tailwind's 'animate-spin' utility.
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
);

export default LoadingSpinner;

