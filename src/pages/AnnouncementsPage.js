import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

// Renders the list of announcements.
// Receives 'announcements' and 'isLoading' props from App.js.
const AnnouncementsPage = ({ announcements, isLoading }) => {

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold p-4 border-b border-gray-200 dark:border-gray-700">Announcements</h2>
            <div className="p-4 space-y-4">
                
                {/* Show a message if the list is empty */}
                {announcements.length === 0 && (
                     <p className="p-4 text-center text-gray-500">No announcements have been posted yet.</p>
                )}
                
                {/* Map over the announcements array and render a card for each */}
                {announcements.map(ann => (
                    <div 
                        key={ann.id} 
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{ann.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {/* Check if timestamp exists before converting */}
                            {ann.timestamp ? new Date(ann.timestamp.toDate()).toLocaleString() : 'Just now'}
                        </p> 
                        {/* whitespace-pre-wrap respects newlines in the content */}
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{ann.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementsPage;

