import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    auth,
    db,
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
    addDoc,
    serverTimestamp,
    doc,
    setDoc, // For setting organizer role
    getDoc,  // For checking organizer role
    deleteDoc, // For deleting teams and announcements
    updateDoc, // For updating scores
    createUserWithEmailAndPassword, // Email/Pass Auth
    signInWithEmailAndPassword,     // Email/Pass Auth
    signOut,                        // Email/Pass Auth
    onAuthStateChanged,             // Auth state listener
    updateProfile                   // To set display name
} from './firebase'; // Make sure all are exported from firebase.js
import Header from './components/Header';
import Footer from './components/Footer';
import LeaderboardPage from './pages/LeaderboardPage';
import TeamsPage from './pages/TeamsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import RulesPage from './pages/RulesPage';
import RegisterTeamPage from './pages/RegisterTeamPage';
import AdminPanel from './pages/AdminPanel';
import NotificationToast from './components/NotificationToast';
import AuthModal from './components/AuthModal'; // Import the new modal

// Main application component.
function App() {
    // --- State Variables ---
    const [currentPage, setCurrentPage] = useState('dashboard'); // Current page being viewed
    const [teams, setTeams] = useState([]);                     // Array of team objects
    const [announcements, setAnnouncements] = useState([]);     // Array of announcement objects
    const [user, setUser] = useState(null);                     // Firebase auth user object (or null)
    const [isOrganizer, setIsOrganizer] = useState(false);      // Is the current user an organizer?
    const [isLoadingTeams, setIsLoadingTeams] = useState(true);     // Loading state for teams
    const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true); // Loading state for announcements
    // <<<=== Set initial theme state to 'dark' ===>>>
    const [theme, setTheme] = useState('dark');                // Current theme ('light' or 'dark')
    const [notification, setNotification] = useState(null);     // Notification message object
    const [showAuthModal, setShowAuthModal] = useState(false); // Controls visibility of the AuthModal
    const [authMode, setAuthMode] = useState('signIn');        // 'signIn' or 'signUp' for the modal
    const [authError, setAuthError] = useState(null);           // Error message for auth modal

    // Ref to track if it's the initial data load for notifications
    const isInitialAnnouncementsLoad = useRef(true);
    // Ref to store the ID of the latest announcement shown in a notification
    const latestNotifiedAnnouncementId = useRef(null);

    // --- Firestore Collection Paths ---
    // Construct the base path using the environment variable
    const hackathonAppId = process.env.REACT_APP_HACKATHON_APP_ID || 'default-hackathon-app';
    const basePath = `artifacts/${hackathonAppId}/public/data`;
    const teamsColPath = `${basePath}/teams`;
    const announcementsColPath = `${basePath}/announcements`;
    const organizersColPath = `${basePath}/organizers`; // Path to check organizer status

    // --- Authentication ---

    // Effect to listen for changes in Firebase auth state
    useEffect(() => {
        // onAuthStateChanged returns an unsubscribe function
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth State Changed. Current User:", currentUser);
            setUser(currentUser); // Update user state (will be null if logged out)
            // Reset organizer status on auth change, it will be re-checked
            setIsOrganizer(false);
        });
        // Cleanup function: Unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Handle user sign-up
    const handleSignUp = async (displayName, email, password) => {
        setAuthError(null); // Clear previous errors
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Set the display name right after signup
            await updateProfile(userCredential.user, { displayName: displayName });
            console.log('Signed up and display name set:', userCredential.user);
             // Manually update the user state because onAuthStateChanged might be slightly delayed
            setUser({ ...userCredential.user, displayName: displayName });
            setShowAuthModal(false); // Close modal on success
        } catch (error) {
            console.error("Error signing up:", error);
            setAuthError(error.message); // Show error in modal
        }
    };

     // Handle user sign-in
    const handleSignInWithEmail = async (email, password) => {
        setAuthError(null); // Clear previous errors
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Signed in');
            setShowAuthModal(false); // Close modal on success
        } catch (error) {
            console.error("Error signing in:", error);
            setAuthError(error.message); // Show error in modal
        }
    };

    // Handle user sign-out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('Signed out');
            // user state will be set to null by onAuthStateChanged listener
            setCurrentPage('dashboard'); // Go to dashboard after sign out
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };


    // --- Organizer Status Check ---

    // Effect to check if the logged-in user is an organizer
    useEffect(() => {
        // Only run if a user is logged in
        if (user && user.uid) {
            // Path to the specific document named after the user's UID in the organizers collection
            const organizerDocRef = doc(db, organizersColPath, user.uid);

            // Set up a real-time listener for this specific document
            const unsubscribe = onSnapshot(organizerDocRef, (docSnap) => {
                 // Check if the document exists
                if (docSnap.exists()) {
                    console.log(`User ${user.uid} IS an organizer.`);
                    setIsOrganizer(true); // User is an organizer
                } else {
                    console.log(`User ${user.uid} is NOT an organizer.`);
                    setIsOrganizer(false); // User is not an organizer
                }
            }, (error) => {
                 // Handle errors (e.g., insufficient permissions if rules are wrong)
                console.error("Error checking organizer status:", error);
                setIsOrganizer(false);
            });

             // Cleanup: Unsubscribe when user logs out or component unmounts
            return () => unsubscribe();
        } else {
             // If no user is logged in, ensure organizer status is false
            setIsOrganizer(false);
        }
         // Re-run this effect if the user object changes (login/logout) or the path definition changes
    }, [user, organizersColPath]);


    // --- Firestore Data Fetching ---

    // Effect to fetch teams data in real-time
    useEffect(() => {
        setIsLoadingTeams(true); // Start loading
        const teamsQuery = query(collection(db, teamsColPath)); // Basic query for all teams

        // onSnapshot listens for real-time updates
        const unsubscribe = onSnapshot(teamsQuery, (querySnapshot) => {
            const teamsData = querySnapshot.docs.map(doc => ({
                id: doc.id, // Include document ID
                ...doc.data(), // Spread document data
            }));
            setTeams(teamsData); // Update state with fetched teams
            setIsLoadingTeams(false); // Stop loading
            console.log("Teams data updated:", teamsData);
        }, (error) => {
             // Basic error handling
             console.error("Error fetching teams:", error);
             setIsLoadingTeams(false);
        });

        // Cleanup function: Unsubscribe when component unmounts
        return () => unsubscribe();
    }, [teamsColPath]); // Re-run effect if collection path changes


    // Effect to fetch announcements data in real-time
    useEffect(() => {
        setIsLoadingAnnouncements(true); // Start loading
        // Query to get announcements, ordered by timestamp descending, limit to latest 50
        const annQuery = query(collection(db, announcementsColPath), orderBy('timestamp', 'desc'), limit(50));

        // onSnapshot listens for real-time updates
        const unsubscribe = onSnapshot(annQuery, (querySnapshot) => {
            const annData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Keep the raw Firestore Timestamp object here
            }));

            // --- Notification Logic ---
             // Check if it's not the initial load and there are new announcements
            if (!isInitialAnnouncementsLoad.current && annData.length > 0) {
                 // Get the ID of the very latest announcement from the incoming data
                const latestIncomingAnnouncementId = annData[0].id;

                 // Show notification only if this latest announcement is different from the last notified one
                if (latestIncomingAnnouncementId !== latestNotifiedAnnouncementId.current) {
                    setNotification({
                        id: annData[0].id, // Use ID for key
                        title: annData[0].title,
                        message: annData[0].content,
                    });
                    // Update the ref to store the ID of the announcement we just notified about
                    latestNotifiedAnnouncementId.current = latestIncomingAnnouncementId;
                }
            } else {
                // If it's the initial load, set the ref to the latest ID (if any) without notifying
                if (annData.length > 0) {
                     latestNotifiedAnnouncementId.current = annData[0].id;
                }
                 // Mark initial load as complete
                isInitialAnnouncementsLoad.current = false;
            }


            setAnnouncements(annData); // Update state
            setIsLoadingAnnouncements(false); // Stop loading
            console.log("Announcements data updated:", annData);
        }, (error) => {
             // Basic error handling
             console.error("Error fetching announcements:", error);
             setIsLoadingAnnouncements(false);
        });

        // Cleanup: Unsubscribe when component unmounts
        return () => unsubscribe();
     // Only re-run if the path changes
    }, [announcementsColPath]);


    // --- Firestore Data Writing Functions ---

    // Add a new team (for RegisterTeamPage)
    const handleAddTeam = async (teamData) => {
        if (!user) {
            console.error("User must be logged in to register a team.");
            // Optionally: show an error message to the user
            return; // Exit if no user
        }
        try {
            await addDoc(collection(db, teamsColPath), {
                ...teamData, // name, domain, members
                score: 0, // Initialize score to 0
                registeredAt: serverTimestamp(), // Add server timestamp
                registeredBy: user.uid, // Track who registered (optional)
            });
            console.log('Team added successfully:', teamData.name);
             setCurrentPage('teams'); // Navigate to teams page after registration
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };


    // Add a new announcement (for AdminPanel)
    const handleAddAnnouncement = async (title, content) => {
        if (!isOrganizer) return; // Only organizers can add
        try {
            await addDoc(collection(db, announcementsColPath), {
                title: title,
                content: content,
                timestamp: serverTimestamp(), // Use server timestamp for ordering
            });
            console.log('Announcement posted:', title);
        } catch (error) {
            console.error('Error posting announcement:', error);
        }
    };

    // Update a team's score (for AdminPanel)
    const handleUpdateScore = async (teamId, newScore) => {
        if (!isOrganizer) return; // Only organizers can update
        const scoreNumber = parseInt(newScore, 10); // Ensure score is a number
        if (isNaN(scoreNumber)) {
            console.error("Invalid score provided.");
            return;
        }
        try {
            const teamDocRef = doc(db, teamsColPath, teamId); // Get reference to specific team document
            await updateDoc(teamDocRef, {
                score: scoreNumber, // Update the score field
            });
            console.log('Score updated for team:', teamId);
        } catch (error) {
            console.error('Error updating score:', error);
        }
    };

     // Delete an announcement (for AdminPanel)
    const handleDeleteAnnouncement = async (announcementId) => {
        if (!isOrganizer) return; // Only organizers can delete
        try {
            const annDocRef = doc(db, announcementsColPath, announcementId);
            await deleteDoc(annDocRef);
            console.log('Announcement deleted:', announcementId);
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    // Delete a team (for AdminPanel)
    const handleDeleteTeam = async (teamId) => {
        if (!isOrganizer) return; // Only organizers can delete
        try {
            const teamDocRef = doc(db, teamsColPath, teamId);
            await deleteDoc(teamDocRef);
            console.log('Team deleted:', teamId);
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };


    // --- Theme Handling ---
    // <<<=== Ensure toggleTheme function is present ===>>>
    // Toggle between light and dark themes
    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    // <<<=== Ensure useEffect for applying theme is present ===>>>
    // Effect to apply the theme class to the body
    useEffect(() => {
        const body = document.body;
        // Clean up previous theme class
        body.classList.remove('light', 'dark');
        // Add the current theme class
        body.classList.add(theme);
        // Also set on the root html element for Tailwind's dark mode strategy
        document.documentElement.className = theme;
    }, [theme]); // Re-run when theme changes

    // --- Page Rendering Logic ---

    // Function to render the currently selected page component
    const renderPage = () => {
        // Combined loading state for convenience
        const isLoading = isLoadingTeams || isLoadingAnnouncements;

        switch (currentPage) {
            case 'dashboard':
                return <LeaderboardPage teams={teams} isLoading={isLoading} />;
            case 'teams':
                return <TeamsPage teams={teams} isLoading={isLoading} />;
             case 'register':
                // Allow registration only if logged in
                return user ? <RegisterTeamPage onRegister={handleAddTeam} teams={teams} /> : <div className="text-center p-6"><p>Please sign in to register a team.</p></div>;
            case 'announcements':
                return <AnnouncementsPage announcements={announcements} isLoading={isLoadingAnnouncements} />; // Pass specific loading state
            case 'rules':
                return <RulesPage />;
            case 'admin':
                // Only render AdminPanel if user is an organizer
                return isOrganizer ? (
                    <AdminPanel
                        teams={teams} // Pass teams for score update dropdown AND delete list
                        announcements={announcements} // Pass announcements for deletion list
                        onPostAnnouncement={handleAddAnnouncement}
                        onUpdateScore={handleUpdateScore}
                        onDeleteAnnouncement={handleDeleteAnnouncement}
                        onDeleteTeam={handleDeleteTeam} // Pass delete handler
                        isLoading={isLoading} // Pass combined loading state
                    />
                ) : (
                    // Show message if not authorized
                    <div className="text-center p-10 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
                        <h2 className="text-xl font-bold">Access Denied</h2>
                        <p>You do not have permission to view this page.</p>
                    </div>
                );
            default:
                return <LeaderboardPage teams={teams} isLoading={isLoading} />;
        }
    };

    // --- Auth Modal Control ---
    const openAuthModal = (mode) => {
        setAuthMode(mode); // 'signIn' or 'signUp'
        setAuthError(null); // Clear errors when opening
        setShowAuthModal(true);
    };

    // --- Main JSX ---
    // <<<=== Ensure theme class is applied correctly ===>>>
    return (
        <div className={`min-h-screen ${theme}`}> {/* Apply theme class */}
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                {/* Header Component - Pass theme props */}
                <Header
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    user={user} // Pass user object
                    isOrganizer={isOrganizer} // Pass organizer status
                    onSignOut={handleSignOut} // Pass sign out handler
                    onSignInClick={() => openAuthModal('signIn')} // Handler to open sign in modal
                    onSignUpClick={() => openAuthModal('signUp')} // Handler to open sign up modal
                />

                 {/* Main Content Area - Added responsive padding */}
                <main className="flex-grow container mx-auto px-2 sm:px-4 md:px-6 py-8">
                    {renderPage()}
                </main>

                 {/* Footer Component */}
                <Footer />

                 {/* Notification Toast Area */}
                 <div className="fixed bottom-5 right-5 z-50">
                    {notification && (
                         <NotificationToast
                            key={notification.id} // Use unique key for animation
                            title={notification.title}
                            message={notification.message}
                            onClose={() => setNotification(null)} // Allow closing
                        />
                    )}
                </div>

                 {/* Authentication Modal - Pass theme prop */}
                {showAuthModal && (
                    <AuthModal
                        mode={authMode} // 'signIn' or 'signUp'
                        onClose={() => setShowAuthModal(false)} // Function to close
                        onSignIn={handleSignInWithEmail}
                        onSignUp={handleSignUp}
                        error={authError} // Pass error message
                        theme={theme} // Pass theme for dark mode consistency
                    />
                )}
            </div>
        </div>
    );
}

export default App;

