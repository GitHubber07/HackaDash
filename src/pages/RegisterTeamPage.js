import React, { useState } from 'react';
import Icon from '../components/Icon';

// Renders a form for participants to register their own team.
// Receives props from App.js
const RegisterTeamPage = ({ userId, teams, onCreateTeam, setCurrentPage }) => {
    
    // Local state for the "Create Team" form
    const [teamName, setTeamName] = useState('');
    const [teamDomain, setTeamDomain] = useState('Web');
    const [teamMembers, setTeamMembers] = useState('');
    const [error, setError] = useState(null); // State for error messages
    const [success, setSuccess] = useState(null); // State for success message

    // Handles submitting the create team form
    const handleCreateTeam = (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setSuccess(null); // Clear previous success

        if (!teamName || !teamDomain || !teamMembers) {
            setError('All fields are required.');
            return;
        }
        
        // Check if a team with this name already exists (case-insensitive)
        const nameExists = teams.some(team => team.name.toLowerCase() === teamName.toLowerCase());
        if (nameExists) {
            setError(`A team with the name "${teamName}" already exists.`);
            return;
        }

        // Convert comma-separated string to an array of names
        const membersArray = teamMembers.split(',').map(m => m.trim()).filter(Boolean);
        if (membersArray.length === 0) {
            setError('You must add at least one team member.');
            return;
        }

        // Call the onCreateTeam function from App.js
        onCreateTeam(teamName, teamDomain, membersArray);
        
        // Show success and clear the form
        setSuccess(`Success! Team "${teamName}" has been registered.`);
        setTeamName('');
        setTeamDomain('Web');
        setTeamMembers('');

        // Optional: Redirect to the teams page after a short delay
        setTimeout(() => {
            setCurrentPage('teams');
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold p-4 border-b border-gray-200 dark:border-gray-700">Register Your Team</h2>
                
                <form onSubmit={handleCreateTeam} className="p-4 space-y-4">
                    {/* --- Success Message --- */}
                    {success && (
                        <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200">
                            {success}
                        </div>
                    )}
                    {/* --- Error Message --- */}
                    {error && (
                        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="team-name">Team Name</label>
                        <input 
                            id="team-name" 
                            type="text" 
                            value={teamName} 
                            onChange={(e) => setTeamName(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" 
                            required 
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="team-domain">Domain</label>
                        <select 
                            id="team-domain" 
                            value={teamDomain} 
                            onChange={(e) => setTeamDomain(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" 
                            required 
                        >
                            <option value="Web">Web</option>
                            <option value="ML">ML</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="team-members">Members (comma-separated)</label>
                        <input 
                            id="team-members" 
                            type="text" 
                            value={teamMembers} 
                            onChange={(e) => setTeamMembers(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                            placeholder="Alice, Bob, Charlie" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex justify-center items-center gap-2"
                    >
                        <Icon name="Plus" size={18} />
                        Register Team
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterTeamPage;

