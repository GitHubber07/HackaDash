import React, { useState, useEffect } from 'react';
import Icon from './Icon'; // Import Icon component

// Modal for Sign In and Sign Up forms
const AuthModal = ({ mode, onClose, onSignIn, onSignUp, error, theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState(''); // Only for sign up
    const isSignUp = mode === 'signUp'; // Determine if it's Sign Up mode

    // Clear form when mode changes
    useEffect(() => {
        setEmail('');
        setPassword('');
        setDisplayName('');
    }, [mode]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
             // Basic validation for sign up
            if (!displayName.trim()) {
                alert("Please enter a display name."); // Use a more user-friendly error display if desired
                return;
            }
            onSignUp(displayName.trim(), email, password);
        } else {
            onSignIn(email, password);
        }
    };

    return (
        // Overlay covering the entire screen
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 ${theme}`}>
            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm sm:max-w-md mx-auto p-6 border border-gray-200 dark:border-gray-700">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="Close modal"
                >
                    {/* Ensure name="x" is passed */}
                    <Icon name="x" size="6" />
                </button>

                <h2 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                     {/* Display Name Input (only for Sign Up) */}
                    {isSignUp && (
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Display Name
                            </label>
                            <input
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                            />
                        </div>
                    )}

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6" // Firebase requires minimum 6 characters
                            autoComplete={isSignUp ? "new-password" : "current-password"}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                        />
                    </div>

                    {/* Display Error Message */}
                    {error && (
                        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300 border border-red-300 dark:border-red-600" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;

