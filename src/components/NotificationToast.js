import React from 'react';
import Icon from './Icon';

// Renders a notification toast pop-up.
const NotificationToast = ({ notification, onDismiss }) => {
    // Render nothing if there is no notification
    if (!notification) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 max-w-sm border border-blue-500">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Icon name="Megaphone" className="text-blue-600 dark:text-blue-300" size={20} />
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-white">New Announcement</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{notification.title}</p>
                </div>
                <button 
                    onClick={onDismiss} // Calls the dismiss function from App.js
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    <Icon name="X" size={18} className="text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default NotificationToast;

