// --- Firebase App Initialization ---
import { initializeApp } from 'firebase/app';
// --- Firestore Database ---
import { getFirestore, collection, query, onSnapshot, orderBy, serverTimestamp, doc, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'; 
// --- Authentication ---
import { 
    getAuth, 
    onAuthStateChanged, 
    // --- NEW: Email/Password Auth functions ---
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile // To set display name after signup
} from 'firebase/auth';
// REMOVED: GoogleAuthProvider, signInWithPopup, signInAnonymously

// --- Environment Variables ---
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const hackathonAppId = process.env.REACT_APP_HACKATHON_APP_ID || 'default-hackathon-app';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
// Initialize Firestore Database service
const db = getFirestore(app);
// Initialize Firebase Authentication service
const auth = getAuth(app);

// --- Exports ---
export { 
    db, 
    auth, 
    hackathonAppId, 
    // Firestore functions
    collection, query, onSnapshot, orderBy, serverTimestamp, 
    doc, addDoc, updateDoc, deleteDoc, setDoc,
    // Auth functions
    onAuthStateChanged, 
    // --- NEW Exports ---
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
};

