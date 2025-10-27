# Hackathon Real-Time Dashboard

🔗 **Live Demo:** [View Deployed App](https://hacka-dash.vercel.app/)

A dynamic web application built with React and Firebase to display team registrations, live rankings, and announcements for a hackathon event in real-time. Includes role-based access for organizers and participants.

---

## Features

- **Real-Time Leaderboard:** View team rankings based on scores, updated live without page reloads. Filter leaderboard by domain (Web, ML, Design).
- **Team Listings:** Browse all registered teams and their details. Filter teams by domain.
- **Team Registration:** Logged-in participants can register their own teams.
- **Announcements:** View event announcements, posted by organizers. Includes live notification toasts for new posts.
- **User Authentication:** Secure sign-up and sign-in using Email/Password via Firebase Authentication.
- **Role-Based Access:**
  - Participants: Can view dashboard, teams, announcements, rules, and register their team.
  - Organizers (Admin): Have participant access plus a dedicated Admin Panel to post/delete announcements and update team scores.
- **Theme Customization:** Toggle between Light and Dark modes.
- **Responsive Design:** Adapts to various screen sizes, including mobile devices.

---

## Technology Stack

- **Frontend:** React (using Create React App)
- **Backend & Database:** Firebase (Authentication, Firestore for real-time data)
- **Styling:** Tailwind CSS
- **Icons:** Heroicons (via inline SVGs)

---

## Setup Instructions

Follow these steps to get the project running locally:

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd hackathon-dashboard
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase Project

* Go to the Firebase Console.
* Create a new project (or use an existing one).
* Add a Web app to your project.
* Copy the firebaseConfig object provided during setup.
* Go to Authentication > Sign-in method and enable the Email/Password provider.
* Go to Firestore Database > Create database. Start in test mode initially (we'll add rules later). Choose a location.

---

### 4. Create Environment File

In the root directory of the project (`hackathon-dashboard/`), create a file named `.env.local`.

Paste your Firebase configuration keys into this file, formatted like below:

```bash
REACT_APP_FIREBASE_API_KEY="YOUR_API_KEY"
REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
REACT_APP_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
REACT_APP_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
REACT_APP_FIREBASE_APP_ID="YOUR_APP_ID"

# This ID is used to namespace data in Firestore. Keep it consistent.
REACT_APP_HACKATHON_APP_ID="hackathon-demo-2025"
```

Replace `"YOUR_..."` with your actual Firebase project keys. You can keep `REACT_APP_HACKATHON_APP_ID` as is or change it if desired (ensure it matches the document name used in Firestore).

---

### 5. Set Up Firestore Rules

In the Firebase Console, go to Firestore Database > Rules.

Replace the default rules with the following to allow public reads and writes only to the specific data path used by the app:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read/write access ONLY to our hackathon's data path
    match /artifacts/{appId}/public/data/{document=**} {
      allow read, write: if true; // For demo purposes. Secure appropriately for production.
    }
    // Add other rules if needed for different paths
  }
}
```

Click Publish.
(Note: For a production app, you would implement more secure rules, e.g., `allow read: if request.auth != null;` and more granular write rules based on roles).

---

### 6. Run the Application

```bash
npm start
```

The app should open automatically in your browser at [http://localhost:3000](http://localhost:3000).

---

## How to Grant Admin (Organizer) Role

Admin access is granted by adding a user's Firebase Authentication User UID as a document ID within a specific Firestore collection.

### Step 1: Sign Up

Create an account in the app using the Email/Password sign-up form.

### Step 2: Get User UID

Go to your Firebase Console > Authentication > Users tab. Find the user you just created and copy their User UID.

### Step 3: Add to Firestore

Go to Firebase Console > Firestore Database.

Navigate or create the following nested collection path:

```
artifacts / {Your REACT_APP_HACKATHON_APP_ID value} / public / data / organizers
```

Inside the organizers collection, click **"Add document"**.

Set the **Document ID** to be the User UID you copied.

Add a field (e.g., Field: role, Type: string, Value: organizer).
The existence of the document with the User UID as its ID grants the role.

Click **Save**.

### Step 4: Verify

Refresh the app (or wait a few seconds).
If you are logged in with that user account, the "Admin" link should now appear in the header.