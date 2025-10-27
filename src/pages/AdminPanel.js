import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Icon from '../components/Icon'; // Import Icon component

// Admin panel for organizers to manage announcements and scores.
const AdminPanel = ({
    teams,
    announcements,
    onPostAnnouncement,
    onUpdateScore,
    onDeleteAnnouncement,
    onDeleteTeam, 
    isLoading
}) => {
    // State for announcement form
    const [annTitle, setAnnTitle] = useState('');
    const [annContent, setAnnContent] = useState('');

    // State for score update form
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const [newScore, setNewScore] = useState('');

    // Handle posting a new announcement
    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!annTitle.trim() || !annContent.trim()) {
            alert('Please enter both title and content for the announcement.'); // Simple validation
            return;
        }
        onPostAnnouncement(annTitle, annContent);
        setAnnTitle(''); 
        setAnnContent(''); 
    };

    // Handle updating a team's score
    const handleScoreSubmit = (e) => {
        e.preventDefault();
        if (!selectedTeamId || newScore.trim() === '') {
            alert('Please select a team and enter a new score.'); // Simple validation
            return;
        }
        onUpdateScore(selectedTeamId, newScore);
    };

     // Handle deleting an announcement
    const handleDeleteAnnClick = (id) => {
        // Simple confirmation before deleting
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            onDeleteAnnouncement(id);
        }
    };

    // Handle deleting a team 
    const handleDeleteTeamClick = (id) => {
         if (window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
            onDeleteTeam(id);
        }
    };

    // Effect to set default selected team when teams load
    // Ensures the dropdown isn't blank initially if teams exist
    React.useEffect(() => {
        if (!selectedTeamId && teams && teams.length > 0) {
            setSelectedTeamId(teams[0].id);
        }
    }, [teams, selectedTeamId]);


    return (
        <div className="space-y-8 p-4 sm:p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Announcements Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Manage Announcements</h2>

                        {/* Post Announcement Form */}
                        <form onSubmit={handlePostSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="annTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                <input
                                    type="text"
                                    id="annTitle"
                                    value={annTitle}
                                    onChange={(e) => setAnnTitle(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label htmlFor="annContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                                <textarea
                                    id="annContent"
                                    rows="4"
                                    value={annContent}
                                    onChange={(e) => setAnnContent(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                Post Announcement
                            </button>
                        </form>

                        {/* Existing Announcements List (for deletion) */}
                        <div>
                             <h3 className="text-lg font-medium mb-3 mt-6">Existing Announcements</h3>
                            <ul className="space-y-2 max-h-60 overflow-y-auto border dark:border-gray-600 rounded p-3">
                                {announcements.length > 0 ? announcements.map(ann => (
                                    <li key={ann.id} className="flex justify-between items-center text-sm p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <span>{ann.title}</span>
                                        <button
                                            onClick={() => handleDeleteAnnClick(ann.id)}
                                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                                            title="Delete Announcement"
                                        >
                                            <Icon name="trash" />
                                        </button>
                                    </li>
                                )) : <li className="text-gray-500 dark:text-gray-400">No announcements yet.</li>}
                            </ul>
                        </div>
                    </div>

                     {/* Teams Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Manage Teams</h2>

                         {/* Update Score Form */}
                        <form onSubmit={handleScoreSubmit} className="space-y-4 border-b dark:border-gray-600 pb-6">
                             <h3 className="text-lg font-medium">Update Score</h3>
                            <div>
                                <label htmlFor="teamSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Team</label>
                                <select
                                    id="teamSelect"
                                    value={selectedTeamId}
                                    onChange={(e) => setSelectedTeamId(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                                >
                                    {/* Default option if no teams */}
                                    {teams.length === 0 && <option value="" disabled>No teams available</option>}
                                    {/* Map through teams to create options */}
                                    {teams.map(team => (
                                        <option key={team.id} value={team.id}>
                                            {team.name} (Current: {team.score})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="newScore" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Score</label>
                                <input
                                    type="number"
                                    id="newScore"
                                    value={newScore}
                                    onChange={(e) => setNewScore(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700"
                                    placeholder="Enter new score"
                                />
                            </div>
                            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                                Update Score
                            </button>
                        </form>

                        {/*  Existing Teams List (for deletion)*/}
                        <div>
                             <h3 className="text-lg font-medium mb-3 mt-6">Delete Teams</h3>
                            <ul className="space-y-2 max-h-60 overflow-y-auto border dark:border-gray-600 rounded p-3">
                                {teams.length > 0 ? teams.map(team => (
                                    <li key={team.id} className="flex justify-between items-center text-sm p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <span>{team.name} ({team.domain})</span>
                                        <button
                                            onClick={() => handleDeleteTeamClick(team.id)}
                                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                                            title="Delete Team"
                                        >
                                            <Icon name="trash" />
                                        </button>
                                    </li>
                                )) : <li className="text-gray-500 dark:text-gray-400">No teams registered yet.</li>}
                            </ul>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;

