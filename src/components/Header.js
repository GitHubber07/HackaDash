import React from 'react';
import Icon from './Icon'; // Import the Icon component

// Reusable navigation link component
// Only shows an icon if the 'icon' prop is provided
const NavLink = ({ name, page, currentPage, setCurrentPage, icon = null }) => ( // Default icon to null
    <button
        onClick={() => setCurrentPage(page)}
        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-150 ease-in-out ${
            currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
    >
        {icon && <Icon name={icon} />} {/* Conditionally render Icon */}
        {name}
    </button>
);

// Header component with navigation, theme toggle, and auth buttons/info
const Header = ({
    currentPage,
    setCurrentPage,
    theme,
    toggleTheme,
    user,
    isOrganizer,
    onSignOut,
    onSignInClick,
    onSignUpClick
}) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-40 transition-colors duration-200">
            <div className="container mx-auto px-2 sm:px-4 py-2 flex flex-wrap items-center justify-between">
                {/* Logo/Title */}
                <div className="flex items-center text-xl font-bold text-blue-600 dark:text-blue-400 mb-2 sm:mb-0">
                    Hackathon Dashboard
                </div>

                {/* Navigation Links - adjusted spacing and mobile layout */}
                <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto order-3 sm:order-2 mt-2 sm:mt-0">
                    <NavLink name="Dashboard" page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    <NavLink name="Teams" page="teams" currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    {user && <NavLink name="Register Team" page="register" currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                    <NavLink name="Announcements" page="announcements" currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    <NavLink name="Rules" page="rules" currentPage={currentPage} setCurrentPage={setCurrentPage} />
                     {/* Only pass icon prop for Admin */}
                    {isOrganizer && <NavLink name="Admin" page="admin" currentPage={currentPage} setCurrentPage={setCurrentPage} icon="shield" />}
                </nav>

                {/* Theme Toggle & Auth Buttons/Info - adjusted spacing */}
                <div className="flex items-center space-x-2 order-2 sm:order-3">
                     {/* Theme Toggle Button - ADDED STYLING */}
                     <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <Icon name="moon" /> : <Icon name="sun" />}
                    </button>

                    {/* Conditional Auth Display */}
                    {user ? (
                        <>
                            <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">
                                Welcome, {user.displayName || user.email}!
                            </span>
                            <button
                                onClick={onSignOut}
                                className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={onSignInClick}
                                className="px-3 py-1.5 rounded-md text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                Sign In
                            </button>
                             <button
                                onClick={onSignUpClick}
                                className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

