import React, { useState } from 'react'; // Added useState for mobile menu
import Icon from './Icon';

// Renders the header navigation, theme toggle, and auth buttons.
// Includes mobile responsiveness with a hamburger menu.
const Header = ({
    currentPage,
    setCurrentPage,
    theme, // Changed from isDark
    toggleTheme,
    isOrganizer,
    user,
    onSignInClick,
    onSignUpClick,
    onSignOut
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

    // Links visible whether logged in or out
    const baseNavLinks = [
        { name: 'Dashboard', page: 'dashboard', icon: 'LayoutDashboard' },
        { name: 'Teams', page: 'teams', icon: 'Users' },
        { name: 'Announcements', page: 'announcements', icon: 'Megaphone' },
        { name: 'Rules', page: 'rules', icon: 'Scroll' },
    ];

    // Links only visible when logged in
    const loggedInLinks = user ? [{ name: 'Register Team', page: 'register', icon: 'PlusCircle' }] : [];

    // Admin link only visible for organizers
    const adminLink = isOrganizer ? [{ name: 'Admin', page: 'admin', icon: 'Shield' }] : [];

    const navLinks = [...baseNavLinks, ...loggedInLinks, ...adminLink];

    // Function to handle link clicks and close mobile menu
    const handleLinkClick = (page) => {
        setCurrentPage(page);
        setIsMobileMenuOpen(false); // Close menu on navigation
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            {/* Main Header Row */}
            <nav className="container mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Icon name="Trophy" size={24} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        HackaDash
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map(link => (
                        <button
                            key={link.page}
                            onClick={() => handleLinkClick(link.page)}
                             // Adjusted padding and text size
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg font-medium transition-colors duration-150 ${
                                currentPage === link.page
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            <Icon name={link.icon} size={16} />
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Right Side: Auth Buttons, Theme Toggle, Mobile Menu Button */}
                <div className="flex items-center gap-2 sm:gap-3">
                     {user ? (
                         // If logged in: Show user name and Sign Out
                         <div className="flex items-center gap-2">
                             <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline" title={user.email || ''}>
                                 Hi, {user.displayName || user.email?.split('@')[0] || 'User'}
                             </span>
                             <button
                                 onClick={onSignOut}
                                 className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1"
                             >
                                 <Icon name="LogOut" size={14} />
                                 <span className="hidden sm:inline">Sign Out</span> {/* Hide text on smallest screens */}
                             </button>
                         </div>
                     ) : (
                         // If logged out: Show Sign In and Sign Up buttons
                         <div className="hidden sm:flex items-center gap-2"> {/* Hide these on extra small */}
                             <button
                                 onClick={onSignInClick}
                                 className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                             >
                                <Icon name="LogIn" size={14} />
                                 Sign In
                             </button>
                              <button
                                 onClick={onSignUpClick}
                                 className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
                             >
                                <Icon name="UserPlus" size={14} />
                                 Sign Up
                             </button>
                         </div>
                     )}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-1.5 sm:p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Toggle theme"
                    >
                        <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={18} />
                    </button>

                    {/* Mobile Menu Button (visible only on small screens) */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Toggle menu"
                    >
                        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
                    </button>
                </div>
            </nav>

             {/* Mobile Menu (collapsible) */}
             <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} border-t border-gray-200 dark:border-gray-700 px-2 pt-2 pb-3 space-y-1`}>
                {navLinks.map(link => (
                    <button
                        key={link.page}
                        onClick={() => handleLinkClick(link.page)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-150 ${
                            currentPage === link.page
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        <Icon name={link.icon} size={18} />
                        {link.name}
                    </button>
                ))}
                 {/* Auth buttons for mobile when logged out */}
                {!user && (
                    <div className="flex flex-col space-y-2 pt-2">
                         <button
                            onClick={() => { onSignInClick(); setIsMobileMenuOpen(false);}}
                            className="w-full px-3 py-2 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1"
                        >
                            <Icon name="LogIn" size={16} />
                            Sign In
                        </button>
                        <button
                            onClick={() => { onSignUpClick(); setIsMobileMenuOpen(false);}}
                             className="w-full px-3 py-2 text-base bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-1"
                         >
                            <Icon name="UserPlus" size={16} />
                            Sign Up
                         </button>
                    </div>
                 )}
             </div>
        </header>
    );
};

export default Header;

