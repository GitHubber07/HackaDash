import React from 'react';
import Icon from './Icon';

// Renders the header navigation, theme toggle, and auth buttons.
const Header = ({ 
    currentPage, 
    setCurrentPage, 
    isDark, 
    toggleTheme, 
    isOrganizer,
    user, 
    // --- NEW: Functions to open Sign In/Sign Up modal ---
    onSignInClick, 
    onSignUpClick, 
    onSignOut 
}) => {
    
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

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Icon name="Trophy" size={24} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        HackaDash
                    </span>
                </div>

                {/* Navigation */}
                <div className="hidden md:flex items-center space-x-2">
                    {navLinks.map(link => (
                        <button
                            key={link.page}
                            onClick={() => setCurrentPage(link.page)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-colors duration-150 ${
                                currentPage === link.page
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            } ${link.page === 'admin' ? 'ml-4 !bg-blue-600 !text-white dark:!bg-blue-600 dark:!text-white' : ''}`} 
                        >
                            <Icon name={link.icon} size={16} />
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Auth Buttons & Theme Toggle */}
                <div className="flex items-center gap-3">
                     {user ? (
                         // If logged in: Show user name and Sign Out
                         <div className="flex items-center gap-2">
                             <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline" title={user.email || ''}>
                                 Hi, {user.displayName || user.email?.split('@')[0] || 'User'} 
                             </span>
                             <button
                                 onClick={onSignOut}
                                 className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1"
                             >
                                 <Icon name="LogOut" size={14} />
                                 Sign Out
                             </button>
                         </div>
                     ) : (
                         // If logged out: Show Sign In and Sign Up buttons
                         <div className="flex items-center gap-2">
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
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Toggle dark mode"
                    >
                        <Icon name={isDark ? 'Sun' : 'Moon'} size={20} />
                    </button>
                    
                    {/* TODO: Mobile menu */}
                </div>
            </nav>
        </header>
    );
};

export default Header;

