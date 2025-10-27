import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import DomainBadge from '../components/DomainBadge';

// Displays the live leaderboard with filtering options.
const LeaderboardPage = ({ teams, isLoading }) => {
    // State for the domain filter
    const [filterDomain, setFilterDomain] = useState(null); // null means show all

    // Define the available domain filters
    const domains = ['Web', 'ML', 'Design'];

    // Sort teams by score (descending) before filtering
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

    // Filter teams based on the selected domain
    const filteredAndSortedTeams = filterDomain
        ? sortedTeams.filter((team) => team.domain === filterDomain)
        : sortedTeams; // If no filter, show all sorted teams

    // Show loading spinner if data is loading
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Live Leaderboard</h1>

            {/* Filter Buttons Section */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                 {/* Button to clear the filter (show all) */}
                 <button
                    onClick={() => setFilterDomain(null)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filterDomain === null
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                    Show All {/* Changed back from removing it as per user feedback */}
                </button>
                {/* Domain Filter Buttons */}
                {domains.map((domain) => (
                    <button
                        key={domain}
                        onClick={() => setFilterDomain(domain)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            filterDomain === domain
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        {domain}
                    </button>
                ))}
            </div>

            {/* Leaderboard Table - wrapped in div for horizontal scrolling on small screens */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">
                                Rank
                            </th>
                            <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Team Name
                            </th>
                            <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Domain
                            </th>
                             {/* Hide Members column on extra small screens */}
                            <th scope="col" className="hidden sm:table-cell px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Members
                            </th>
                            <th scope="col" className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-20">
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4"><LoadingSpinner /></td>
                            </tr>
                        ) : filteredAndSortedTeams.length > 0 ? (
                            filteredAndSortedTeams.map((team, index) => (
                                <tr key={team.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-center">
                                        {index + 1} {/* Rank based on sorted index */}
                                    </td>
                                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {team.name}
                                    </td>
                                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <DomainBadge domain={team.domain} />
                                    </td>
                                    {/* Hide Members column on extra small screens */}
                                    <td className="hidden sm:table-cell px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {team.members}
                                    </td>
                                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right font-semibold">
                                        {team.score}
                                    </td>
                                </tr>
                            ))
                        ) : (
                             <tr>
                                 <td colSpan="5" className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                                     {filterDomain ? `No teams found for the "${filterDomain}" domain.` : 'No teams have registered yet.'}
                                 </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaderboardPage;

