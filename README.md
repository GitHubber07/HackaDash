Hackathon Real-Time Dashboard

This is a simple, clean, and real-time dashboard for a hackathon.

It uses React for the frontend and Firebase (Firestore) for the real-time database and authentication.

Core Features

Real-Time Leaderboard: Scores update live for everyone.

Simple Admin Panel: Organizers can update scores and post announcements.

Role-Based Access: A simple demo toggle lets you "Become an Organizer" to see the Admin panel.

Clean UI: Styled with Tailwind CSS, including a Dark/Light mode toggle.

How to Run This Project

Set up Firebase:

Go to the Firebase Console and create a new project.

Add a Web App to your project.

Copy the firebaseConfig object (it has your API keys).

Create .env.local file:

In the project's root folder, create a file named .env.local

Paste your Firebase keys into it like this:

REACT_APP_FIREBASE_API_KEY="your-api-key"
REACT_APP_FIREBASE_AUTH_DOMAIN="your-auth-domain"
REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
REACT_APP_FIREBASE_APP_ID="your-app-id"

# This is a unique name for your app's data in the database
REACT_APP_HACKATHON_APP_ID="hackathon-demo-2025"


Set Up Firestore Rules:

In the Firebase Console, go to Firestore Database > Rules.

Paste in these rules to allow public access only to your app's data. This is great for a demo.

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read/write access ONLY to our hackathon's data path
    match /artifacts/{appId}/public/data/{document=**} {
      allow read, write: if true;
    }
  }
}


Install & Run:

Open your terminal and run: npm install

Then, run: npm start

Your project will open at http://localhost:3000.