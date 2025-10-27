import React, { useState } from 'react';

// Form for participants to register their own team.
const RegisterTeamPage = ({ onRegister, teams }) => { // Changed onCreateTeam to onRegister prop
    const [teamName, setTeamName] = useState('');
    const [domain, setDomain] = useState('Web'); // Default domain
    const [members, setMembers] = useState('');
    const [error, setError] = useState('');     // State for displaying errors
    const [success, setSuccess] = useState('');   // State for success message

    // Handles the form submission
    const handleCreateTeam = (e) => {
        e.preventDefault(); // Prevent default form submission reload
        setError(''); // Clear previous errors
        setSuccess(''); // Clear previous success messages

        // Basic validation
        if (!teamName.trim() || !domain || !members.trim()) {
            setError('All fields are required.');
            return;
        }

         // Check if team name already exists (case-insensitive)
        if (teams && teams.some(team => team.name.toLowerCase() === teamName.trim().toLowerCase())) {
            setError(`Team name "${teamName.trim()}" already exists. Please choose another name.`);
            return;
        }

        // Call the function passed from App.js to add the team to Firestore
        onRegister({ // <<<=== CHANGED from onCreateTeam to onRegister
            name: teamName.trim(),
            domain: domain,
            members: members.trim(),
        });

        // Set success message and clear the form
        setSuccess(`Team "${teamName.trim()}" registered successfully!`);
        setTeamName('');
        setDomain('Web'); // Reset domain to default
        setMembers('');
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold mb-6 text-center">Register Your Team</h1>

            <form onSubmit={handleCreateTeam} className="space-y-4">
                {/* Display Error Message */}
                {error && (
                    <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300 border border-red-300 dark:border-red-600" role="alert">
                        {error}
                    </div>
                )}
                 {/* Display Success Message */}
                {success && (
                    <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-300 border border-green-300 dark:border-green-600" role="alert">
                        {success}
                    </div>
                )}

                {/* Team Name Input */}
                <div>
                    <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Team Name
                    </label>
                    <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* Domain Selection */}
                <div>
                    <label htmlFor="domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Domain
                    </label>
                    <select
                        id="domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                        <option value="Web">Web Development</option>
                        <option value="ML">Machine Learning</option>
                        <option value="Design">UI/UX Design</option>
                        {/* Add other domains if needed */}
                    </select>
                </div>

                {/* Members Input */}
                <div>
                    <label htmlFor="members" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Members (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="members"
                        value={members}
                        onChange={(e) => setMembers(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="e.g., Alice, Bob, Charlie"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Register Team
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterTeamPage;

