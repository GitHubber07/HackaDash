import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import DomainBadge from '../components/DomainBadge';

// Displays a filterable list of registered teams.
const TeamsPage = ({ teams, isLoading }) => {
    // State to keep track of the currently selected domain filter
    const [filterDomain, setFilterDomain] = useState(null); // null means show all

    // Define the available domain filters
    const domains = ['Web', 'ML', 'Design'];

    // Show loading spinner if data hasn't loaded yet
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Filter teams based on the selected domain (if any)
    const filteredTeams = filterDomain
        ? teams.filter((team) => team.domain === filterDomain)
        : teams; // If no filter is set (initial state), show all teams

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Registered Teams</h1>

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
                    Show All
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

            {/* Teams Grid - Adjusted for responsiveness */}
            {isLoading ? (
                <LoadingSpinner />
            ) : filteredTeams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTeams.map((team) => (
                        <div key={team.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold">{team.name}</h3>
                                    <DomainBadge domain={team.domain} />
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Members:</span> {team.members}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    {filterDomain ? `No teams found for the "${filterDomain}" domain.` : 'No teams have registered yet.'}
                </p>
            )}
        </div>
    );
};

export default TeamsPage;

