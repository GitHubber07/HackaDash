import React from 'react';

// Renders the footer.
// Removed props related to user ID, role, and toggle function.
const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-10">
            <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} HackaDash. All rights reserved.</p>
                {/* Removed the user ID, role display, and toggle button.
                    Authentication status is now handled in the Header.
                */}
            </div>
        </footer>
    );
};

export default Footer;

