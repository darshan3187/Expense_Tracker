import { auth, isConfigured } from "./config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { fallbackAuth } from "./fallbackService";

export class AuthService {
    async createAccount({ email, password, name }) {
        if (!isConfigured) return fallbackAuth.createAccount({ email, password, name });
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            return this.getCurrentUser();
        } catch (error) {
            console.error("Firebase :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        if (!isConfigured) return fallbackAuth.login({ email, password });
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Firebase :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        if (!isConfigured) return fallbackAuth.getCurrentUser();
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                if (user) {
                    resolve({
                        $id: user.uid,
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email
                    });
                } else {
                    resolve(null);
                }
            }, (error) => {
                console.error("Firebase :: getCurrentUser :: error", error);
                resolve(null);
            });
        });
    }

    async logout() {
        if (!isConfigured) return fallbackAuth.logout();
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Firebase :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
