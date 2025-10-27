import React from 'react';

// A simple, reusable component to display a styled domain badge.
const DomainBadge = ({ domain }) => {
    // Maps domain names to specific Tailwind CSS classes
    const domainColors = {
        Web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        ML: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        Design: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };
    
    return (
        <span 
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            // Use the correct color style, or a default gray if not found
            domainColors[domain] || 'bg-gray-100 text-gray-800'
          }`}
        >
            {domain}
        </span>
    );
};

export default DomainBadge;

