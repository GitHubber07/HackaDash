import React, { useState } from 'react';
import Icon from '../components/Icon';

// Renders the admin panel with forms for managing the hackathon.
// Receives data (teams) and handler functions (onAddAnnouncement, etc.) as props from App.js.
const AdminPanel = ({ 
    teams, 
    announcements, 
    onAddAnnouncement, 
    onUpdateScore, 
    onDeleteAnnouncement 
}) => {
    
    // Local state for the "Post Announcement" form
    const [annTitle, setAnnTitle] = useState('');
    const [annContent, setAnnContent] = useState('');
    
    // Local state for the "Update Score" form
    const [selectedTeam, setSelectedTeam] = useState('');
    const [newScore, setNewScore] = useState(0);

    // --- Form Submit Handlers ---

    // Handles submitting the new announcement form
    const handleAddAnnouncement = (e) => {
        e.preventDefault(); // Prevent page reload
        if (!annTitle || !annContent) return; // Basic validation
        onAddAnnouncement(annTitle, annContent); // Call App.js function
        // Reset form fields
        setAnnTitle('');
        setAnnContent('');
    };

    // Handles submitting the update score form
    const handleUpdateScore = (e) => {
        e.preventDefault();
        if (!selectedTeam || newScore < 0) return;
        onUpdateScore(selectedTeam, parseInt(newScore, 10));
        setSelectedTeam('');
        setNewScore(0);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* --- Post Announcement Form --- */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold p-4 border-b border-gray-200 dark:border-gray-700">Post Announcement</h2>
                <form onSubmit={handleAddAnnouncement} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="ann-title">Title</label>
                        <input
                            id="ann-title"
                            type="text"
                            value={annTitle}
                            onChange={(e) => setAnnTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="ann-content">Content</label>
                        <textarea
                            id="ann-content"
                            value={annContent}
                            onChange={(e) => setAnnContent(e.target.value)}
                            rows="4"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex justify-center items-center gap-2">
                        <Icon name="Send" size={18} />
                        Post
                    </button>
                </form>

                {/* --- Manage Announcements --- */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-2">Existing Announcements</h3>
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                        {/* Show message if no announcements */}
                        {announcements.length === 0 && (
                            <li className="text-gray-500 dark:text-gray-400 text-sm p-2">
                                No announcements to manage.
                            </li>
                        )}
                        {/* List all announcements */}
                        {announcements.map(ann => (
                            <li key={ann.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex-1 overflow-hidden">
                                    <span className="font-medium block truncate">{ann.title}</span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{ann.content}</p>
                                </div>
                                <button 
                                    onClick={() => onDeleteAnnouncement(ann.id)} // Call delete function from App.js
                                    className="p-2 ml-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full flex-shrink-0"
                                >
                                    <Icon name="Trash2" size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* --- Update Scores Form --- */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold p-4 border-b border-gray-200 dark:border-gray-700">Update Team Score</h2>
                <form onSubmit={handleUpdateScore} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="team-select">Team</label>
                        <select
                            id="team-select"
                            value={selectedTeam}
                            onChange={(e) => setSelectedTeam(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                            required
                        >
                            <option value="">Select a team</option>
                            {/* Populate dropdown with teams from props */}
                            {teams.map(team => (
                                <option key={team.id} value={team.id}>{team.name} (Current: {team.score})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="new-score">New Score</label>
                        <input
                            id="new-score"
                            type="number"
                            value={newScore}
                            onChange={(e) => setNewScore(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                        Update Score
                    </button>
                </form>
            </div>
            
            {/* REMOVED: The "Manage Teams" (Create/Delete) form.
                This is now handled by participants on the new "Register Team" page.
                Admins can only update scores.
            */}

        </div>
    );
};

export default AdminPanel;

