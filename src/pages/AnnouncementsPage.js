import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

// Displays a list of announcements, newest first.
const AnnouncementsPage = ({ announcements, isLoading }) => {

    // Show loading spinner if data is loading
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Announcements</h1>

            {announcements.length > 0 ? (
                <div className="space-y-4 max-w-2xl mx-auto">
                    {announcements.map((ann) => (
                        <div
                            key={ann.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
                        >
                            <h2 className="text-lg font-semibold mb-1">{ann.title}</h2>
                            {/* Safely check if timestamp exists and has toDate before calling */}
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                Posted on: {ann.timestamp && typeof ann.timestamp.toDate === 'function'
                                    ? ann.timestamp.toDate().toLocaleString()
                                    : 'Date unavailable'}
                            </p>
                            {/* Render content, handling potential newlines */}
                             <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {ann.content}
                             </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No announcements posted yet.</p>
            )}
        </div>
    );
};

export default AnnouncementsPage;

