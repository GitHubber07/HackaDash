// --- React Imports ---
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Firebase Imports ---
import {
    db, auth, hackathonAppId,
    collection, query, onSnapshot, orderBy, serverTimestamp,
    doc, addDoc, updateDoc, deleteDoc, setDoc,
    onAuthStateChanged, // Still needed
    // --- NEW: Email/Password Auth functions ---
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile // <-- To set display name after sign up
} from './firebase';
// REMOVED: GoogleAuthProvider, signInWithPopup

// --- Component Imports ---
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
// --- NEW: Auth Modal Component ---
import AuthModal from './components/AuthModal'; 

// --- Page Imports ---
import LeaderboardPage from './pages/LeaderboardPage';
import TeamsPage from './pages/TeamsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import RulesPage from './pages/RulesPage';
import AdminPanel from './pages/AdminPanel';
import RegisterTeamPage from './pages/RegisterTeamPage';

// Main "App" component
function App() {

    // --- State Management ---
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [user, setUser] = useState(null); 
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [teams, setTeams] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [isLoadingTeams, setIsLoadingTeams] = useState(true);
    const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
    const [isDark, setIsDark] = useState(false);
    const [newAnn, setNewAnn] = useState(null);
    // --- NEW: Auth Modal State ---
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
    const [authError, setAuthError] = useState(null); // For displaying auth errors

    // --- Refs ---
    const isInitialAnnouncementsLoad = useRef(true);

    // --- Database Paths ---
    const teamsColPath = `artifacts/${hackathonAppId}/public/data/teams`;
    const announcementsColPath = `artifacts/${hackathonAppId}/public/data/announcements`;
    const organizersColPath = `artifacts/${hackathonAppId}/public/data/organizers`;

    // --- Data Fetching & Real-time Listeners (useEffect) ---

    // Effect for handling user authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
            // Close modal on successful auth state change
            if (currentUser) {
                setShowAuthModal(false); 
                setAuthError(null);
            }
        });
        return () => unsubscribe(); 
    }, []); 

    // Effect for listening to role changes 
    useEffect(() => {
        if (!user || !user.uid) {
            setIsOrganizer(false);
            return;
        }
        const userId = user.uid; 
        const userRoleRef = doc(db, organizersColPath, userId);
        const unsubscribe = onSnapshot(userRoleRef, (docSnap) => {
            setIsOrganizer(docSnap.exists()); 
        });
        return () => unsubscribe(); 
    }, [user, organizersColPath]); 

    // Effect for fetching 'teams' 
    useEffect(() => {
        setIsLoadingTeams(true); 
        const teamsQuery = query(collection(db, teamsColPath));
        const unsubscribe = onSnapshot(teamsQuery, (querySnapshot) => {
            const teamsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTeams(teamsData); 
            setIsLoadingTeams(false); 
        }, (error) => { 
            console.error("Error fetching teams:", error);
            setIsLoadingTeams(false);
        });
        return () => unsubscribe(); 
    }, [teamsColPath]); 

    // Effect for fetching 'announcements' 
    useEffect(() => {
        setIsLoadingAnnouncements(true); 
        const annQuery = query(collection(db, announcementsColPath), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(annQuery, (querySnapshot) => {
            const annData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            if (!isInitialAnnouncementsLoad.current && annData.length > 0) {
                 setAnnouncements(prevAnnouncements => {
                    if (prevAnnouncements.length === 0 || annData[0].id !== prevAnnouncements[0]?.id) {
                         setNewAnn(annData[0].title); 
                    }
                    return annData; 
                 });
            } else {
                 setAnnouncements(annData); 
                 isInitialAnnouncementsLoad.current = false; 
            }
            setIsLoadingAnnouncements(false); 
        }, (error) => { 
            console.error("Error fetching announcements:", error);
            setIsLoadingAnnouncements(false);
        });
        return () => unsubscribe(); 
    }, [announcementsColPath]); 

    // --- Theme Management ---
    useEffect(() => {
        const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(isDarkPreferred); 
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    // --- Authentication Functions ---
    
    // Handles Email/Password Sign Up
    const handleSignUp = useCallback(async (email, password, displayName) => {
        setAuthError(null); // Clear previous errors
        if (!displayName) {
             setAuthError("Display name is required for sign up.");
             return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Set the display name for the new user
            await updateProfile(userCredential.user, { displayName: displayName });
            // Manually update the user state because onAuthStateChanged might be slightly delayed
            setUser({ ...userCredential.user, displayName: displayName }); 
            setShowAuthModal(false); // Close modal on success
        } catch (error) {
            console.error("Error during sign up:", error);
            setAuthError(error.message); // Show Firebase error message
        }
    }, []);

    // Handles Email/Password Sign In
    const handleSignInWithEmail = useCallback(async (email, password) => {
        setAuthError(null); // Clear previous errors
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged will handle setting user state and closing modal
        } catch (error) {
            console.error("Error during sign in:", error);
            setAuthError(error.message); // Show Firebase error message
        }
    }, []);

    // Handles Sign Out
    const handleSignOut = useCallback(async () => {
        try {
            await signOut(auth);
            setCurrentPage('dashboard'); // Go to dashboard after sign out
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    }, []);

    // --- Auth Modal Control ---
    const openAuthModal = (mode) => { // mode is 'signin' or 'signup'
        setAuthMode(mode);
        setAuthError(null); // Clear errors when opening
        setShowAuthModal(true);
    };

    // --- Firestore Write Functions ---
    // (These remain largely the same, just depend on 'user' state now)
    const handleCreateTeam = useCallback(async (name, domain, members) => {
        if (!user || !user.uid) return; 
        const userId = user.uid; 
        try {
            await addDoc(collection(db, teamsColPath), {
                name: name, domain: domain, members: members, score: 0,
                ownerId: userId, createdAt: serverTimestamp()
            });
        } catch (e) { console.error("Error creating team: ", e); }
    }, [user, teamsColPath]); 

    const handleUpdateScore = useCallback(async (teamId, score) => {
        if (!isOrganizer) return; 
        const teamRef = doc(db, teamsColPath, teamId);
        try { await updateDoc(teamRef, { score: score }); } 
        catch (error) { console.error("Error updating score:", error); }
    }, [isOrganizer, teamsColPath]);

    const handleAddAnnouncement = useCallback(async (title, content) => {
        if (!isOrganizer) return; 
        try {
            await addDoc(collection(db, announcementsColPath), {
                title: title, content: content, timestamp: serverTimestamp()
            });
        } catch (error) { console.error("Error adding announcement:", error); }
    }, [isOrganizer, announcementsColPath]);

    const handleDeleteAnnouncement = useCallback(async (annId) => {
        if (!isOrganizer) return; 
        try { await deleteDoc(doc(db, announcementsColPath, annId)); } 
        catch (error) { console.error("Error deleting announcement:", error); }
    }, [isOrganizer, announcementsColPath]);

    // --- Combined Loading State ---
    const isLoading = isLoadingTeams || isLoadingAnnouncements;

    // --- Page Rendering Logic ---
    const renderPage = () => {
        // ... (switch case remains the same as previous version) ...
         switch (currentPage) {
            case 'dashboard':
                return <LeaderboardPage teams={teams} isLoading={isLoading} />;
            case 'teams':
                return <TeamsPage teams={teams} isLoading={isLoading} />;
            case 'register': 
                if (!user) {
                     return (
                         <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                             <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                             <p className="mb-4">You need to sign in to register a team.</p>
                             <button 
                                onClick={() => openAuthModal('signin')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                            >
                                Sign In / Sign Up
                            </button>
                         </div>
                     );
                 }
                return <RegisterTeamPage 
                            userId={user.uid} 
                            teams={teams} 
                            onCreateTeam={handleCreateTeam} 
                            setCurrentPage={setCurrentPage} 
                        />;
            case 'announcements':
                return <AnnouncementsPage announcements={announcements} isLoading={isLoading} />;
            case 'rules':
                return <RulesPage />;
            case 'admin':
                return isOrganizer ? (
                    <AdminPanel 
                        teams={teams}
                        announcements={announcements}
                        onAddAnnouncement={handleAddAnnouncement}
                        onUpdateScore={handleUpdateScore}
                        onDeleteAnnouncement={handleDeleteAnnouncement}
                    />
                ) : (
                     <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                         <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                         <p>You do not have permission to view the Admin Panel.</p>
                     </div>
                );
            default:
                return <LeaderboardPage teams={teams} isLoading={isLoading} />;
        }
    };

    // --- Main JSX Return ---
    return (
        <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}>
            {/* --- Pass user and NEW auth handlers to Header --- */}
            <Header 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isDark={isDark}
                toggleTheme={toggleTheme}
                isOrganizer={isOrganizer}
                user={user} 
                // --- Pass functions to OPEN the modal ---
                onSignInClick={() => openAuthModal('signin')} 
                onSignUpClick={() => openAuthModal('signup')} 
                onSignOut={handleSignOut}
            />
            
            <main className="container mx-auto p-4 md:p-6">
                {renderPage()}
            </main>
            
            <Footer /> 
            
            <NotificationToast 
                newAnn={newAnn}
                setNewAnn={setNewAnn}
            />

            {/* --- Render Auth Modal Conditionally --- */}
            {showAuthModal && (
                <AuthModal 
                    mode={authMode}
                    setMode={setAuthMode}
                    onClose={() => setShowAuthModal(false)}
                    onSignIn={handleSignInWithEmail}
                    onSignUp={handleSignUp}
                    error={authError}
                />
            )}
        </div>
    );
}

export default App;

