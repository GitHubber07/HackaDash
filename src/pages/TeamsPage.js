import React, { useState } from 'react'; // Import useState again
import LoadingSpinner from '../components/LoadingSpinner';
import DomainBadge from '../components/DomainBadge';

// Displays the list of registered teams with domain filtering.
const TeamsPage = ({ teams, isLoading }) => {
    // State to keep track of the currently selected domain filter
    const [filterDomain, setFilterDomain] = useState(null); // null means show all

    // Define the available domain filters (excluding "All")
    const domains = ['Web', 'ML', 'Design'];

    // Display loading spinner if data is still loading
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Filter teams based on the selected domain (if any)
    const filteredTeams = filterDomain
        ? teams.filter((team) => team.domain === filterDomain)
        : teams; // If no filter is set, show all teams

    // Display message if no teams are registered yet
    if (teams.length === 0) {
        return (
            <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">No Teams Registered Yet</h2>
                <p>Teams will appear here once they register.</p>
            </div>
        );
    }

    // Render the list of teams
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Registered Teams</h1>
            
            {/* Filter Buttons Section (Restored, without "All") */}
            <div className="flex justify-center space-x-2 mb-6">
                {/* Button to clear the filter (show all) */}
                 <button
                    onClick={() => setFilterDomain(null)} // Set filter to null to show all
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

            {/* Grid layout for team cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Display message if filter returns no results */}
                 {filteredTeams.length === 0 && filterDomain && (
                    <p className="md:col-span-2 lg:col-span-3 text-center text-gray-500 dark:text-gray-400">
                        No teams match the "{filterDomain}" filter.
                    </p>
                )}

                {/* Map through the FILTERED teams array */}
                {filteredTeams.map((team) => (
                    <div 
                        key={team.id} 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
                    >
                        {/* Team Name and Domain Badge */}
                        <div className="flex justify-between items-start mb-3">
                            <h2 className="text-xl font-semibold mr-2">{team.name}</h2>
                            <DomainBadge domain={team.domain} />
                        </div>
                        
                        {/* Team Members */}
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong className="text-gray-700 dark:text-gray-300">Members:</strong> {team.members}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamsPage;

