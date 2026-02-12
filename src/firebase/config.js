import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import conf from "../conf/conf";

const firebaseConfig = {
    apiKey: conf.firebaseApiKey,
    authDomain: conf.firebaseAuthDomain,
    projectId: conf.firebaseProjectId,
    storageBucket: conf.firebaseStorageBucket,
    messagingSenderId: conf.firebaseMessagingSenderId,
    appId: conf.firebaseAppId
};

let app, auth, db, storage, isConfigured = false;

// Check if all necessary config values are present
const requiredKeys = ['apiKey', 'authDomain', 'projectId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key] || firebaseConfig[key] === "undefined");

if (missingKeys.length === 0) {
    try {
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
        isConfigured = true;
        console.log("Firebase initialized successfully");
    } catch (error) {
        console.error("Failed to initialize Firebase:", error);
    }
} else {
    console.warn("Firebase configuration is missing. Falling back to LocalStorage. Missing keys:", missingKeys);
}

export { auth, db, storage, isConfigured };
export default app;
