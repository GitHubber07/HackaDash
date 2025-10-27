import React, { useState } from 'react'; // Import useState again
import LoadingSpinner from '../components/LoadingSpinner';
import DomainBadge from '../components/DomainBadge';

// Displays the live leaderboard, ranking teams by score, with domain filtering.
const LeaderboardPage = ({ teams, isLoading }) => {
     // State to keep track of the currently selected domain filter
    const [filterDomain, setFilterDomain] = useState(null); // null means show all

    // Define the available domain filters
    const domains = ['Web', 'ML', 'Design'];

    // Display loading spinner if data is loading
    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    // Filter teams based on the selected domain (if any)
    const filteredTeams = filterDomain
        ? teams.filter((team) => team.domain === filterDomain)
        : teams; // If no filter is set (initial state), show all teams

    // Sort the filtered teams by score in descending order
    const sortedTeams = [...filteredTeams].sort((a, b) => b.score - a.score);

    // Display message if no teams exist yet (even before filtering)
     if (teams.length === 0) {
        return (
            <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Live Leaderboard</h1>
                <h2 className="text-xl font-bold mb-4">No Teams Yet</h2>
                <p>The leaderboard will update here once teams register and scores are added.</p>
            </div>
        );
    }

    // Render the leaderboard table
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Live Leaderboard</h1>

            {/* Filter Buttons Section (Removed "Show All" button) */}
             <div className="flex justify-center space-x-2 mb-6">
                 {/* REMOVED: Button to clear the filter (show all) */}
                
                {/* Domain Filter Buttons */}
                {domains.map((domain) => (
                    <button
                        key={domain}
                        onClick={() => setFilterDomain(domain)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filterDomain === domain 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        {domain}
                    </button>
                ))}
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">Rank</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-4/12">Team Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-2/12">Domain</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-4/12">Members</th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                         {/* Display message if filter returns no results */}
                         {sortedTeams.length === 0 && filterDomain && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                    No teams match the "{filterDomain}" filter.
                                </td>
                            </tr>
                        )}
                        {/* Map through the SORTED and FILTERED teams */}
                        {sortedTeams.map((team, index) => (
                            <tr key={team.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-center">{index + 1}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{team.name}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <DomainBadge domain={team.domain} />
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 truncate" title={team.members}>{team.members}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white text-right">{team.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaderboardPage;

