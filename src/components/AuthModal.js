import React, { useState } from 'react';
import Icon from './Icon';

// Renders a modal for Sign In or Sign Up using Email/Password.
const AuthModal = ({ mode, setMode, onClose, onSignIn, onSignUp, error }) => {
    // Local state for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState(''); // Only used for sign up

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'signup') {
            onSignUp(email, password, displayName);
        } else {
            onSignIn(email, password);
        }
    };

    // Toggle between Sign In and Sign Up modes
    const switchMode = () => {
        setMode(mode === 'signin' ? 'signup' : 'signin');
        // Clear inputs when switching
        setEmail('');
        setPassword('');
        setDisplayName('');
    };

    return (
        // Modal Backdrop
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300" 
            onClick={onClose} // Close modal if backdrop is clicked
        >
            {/* Modal Content */}
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm transform transition-all duration-300 scale-100" 
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Close modal"
                 >
                    <Icon name="X" size={18} />
                 </button>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {mode === 'signup' ? 'Create Account' : 'Sign In'}
                </h2>

                 {/* Display Authentication Errors */}
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 text-sm">
                        {/* Try to make common Firebase errors more user-friendly */}
                        {error.includes('auth/invalid-email') ? 'Invalid email format.' : 
                         error.includes('auth/user-not-found') || error.includes('auth/wrong-password') ? 'Incorrect email or password.' :
                         error.includes('auth/weak-password') ? 'Password should be at least 6 characters.' :
                         error.includes('auth/email-already-in-use') ? 'An account with this email already exists.' :
                         error}
                    </div>
                )}


                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Display Name (only for Sign Up) */}
                    {mode === 'signup' && (
                         <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="display-name">Display Name</label>
                            <input 
                                id="display-name" 
                                type="text" 
                                value={displayName} 
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" 
                                required 
                            />
                        </div>
                    )}
                    
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" 
                            required 
                        />
                    </div>

                    {/* Password */}
                     <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" 
                            required 
                            minLength={mode === 'signup' ? 6 : undefined} // Enforce minimum length only on signup
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                    >
                        {mode === 'signup' ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                 {/* Switch Mode Link */}
                 <div className="mt-4 text-center text-sm">
                     <button onClick={switchMode} className="text-blue-600 dark:text-blue-400 hover:underline">
                        {mode === 'signin' 
                            ? "Don't have an account? Sign Up" 
                            : "Already have an account? Sign In"}
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default AuthModal;
