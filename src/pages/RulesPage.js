import React from 'react';

// A static component that renders the hackathon rules.
// It doesn't require any props or state.
// The 'prose' class comes from the @tailwindcss/typography plugin.
const RulesPage = () => (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-200 dark:border-gray-700">Hackathon Rules</h2>
        <div className="p-4 space-y-4 prose dark:prose-invert max-w-none">
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>Team Size:</strong> Teams must consist of 2-4 members.</li>
                <li><strong>Project Submission:</strong> All projects must be submitted to the designated platform by 10:00 AM on Sunday.</li>
                <li><strong>Code of Conduct:</strong> All participants must adhere to the MLH Code of Conduct. Respect all fellow hackers, mentors, and organizers.</li>
                <li><strong>Originality:</strong> All code must be written during the hackathon. Use of pre-existing open-source libraries is permitted, but the core project idea and implementation must be new.</li>
                <li><strong>Judging Criteria:</strong> Projects will be judged on Technical Complexity, Design, Originality, and Presentation.</li>
                <li><strong>Domains:</strong> Teams must register under one domain (Web, ML, or Design). Your project will be judged within that category.</li>
            </ol>
        </div>
    </div>
);

export default RulesPage;

