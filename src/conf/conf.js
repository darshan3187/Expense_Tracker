const conf = {
    // Appwrite (Legacy)
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteIncomeCollectionId: String(import.meta.env.VITE_APPWRITE_INCOME_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

    // Firebase (Current)
    firebaseApiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
    firebaseAuthDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    firebaseProjectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    firebaseStorageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    firebaseMessagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    firebaseAppId: String(import.meta.env.VITE_FIREBASE_APP_ID),
}

export default conf