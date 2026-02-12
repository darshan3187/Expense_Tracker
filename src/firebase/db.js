import { db, storage, isConfigured } from "./config";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc,
    orderBy,
    serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fallbackDb } from "./fallbackService";

export class DatabaseService {
    // --- Expenses ---
    async addExpense({ Category, Description, amount, transferDate, userid }) {
        if (!isConfigured) return fallbackDb.addExpense({ Category, Description, amount, transferDate, userid });
        try {
            const docRef = await addDoc(collection(db, "expenses"), {
                Category,
                Description,
                amount: Number(amount),
                transferDate,
                userid,
                createdAt: serverTimestamp()
            });
            return { $id: docRef.id, id: docRef.id, Category, Description, amount, transferDate, userid };
        } catch (error) {
            console.error("Firebase :: addExpense :: error", error);
            throw error;
        }
    }

    async getExpenses(userId) {
        if (!isConfigured) return fallbackDb.getExpenses(userId);
        try {
            const q = query(
                collection(db, "expenses"),
                where("userid", "==", userId),
                orderBy("transferDate", "desc")
            );
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map(doc => ({
                $id: doc.id,
                ...doc.data()
            }));
            return { documents };
        } catch (error) {
            console.error("Firebase :: getExpenses :: error", error);
            throw error;
        }
    }

    async updateExpense(id, { Category, amount, transferDate, Description }) {
        if (!isConfigured) return fallbackDb.updateExpense(id, { Category, amount, transferDate, Description });
        try {
            const docRef = doc(db, "expenses", id);
            await updateDoc(docRef, {
                Category,
                amount: Number(amount),
                transferDate,
                Description
            });
            return { $id: id, id, Category, amount, transferDate, Description };
        } catch (error) {
            console.error("Firebase :: updateExpense :: error", error);
            throw error;
        }
    }

    async deleteExpense(id) {
        if (!isConfigured) return fallbackDb.deleteExpense(id);
        try {
            await deleteDoc(doc(db, "expenses", id));
            return true;
        } catch (error) {
            console.error("Firebase :: deleteExpense :: error", error);
            throw error;
        }
    }

    // --- Incomes ---
    async addIncome({ Category, Description, amount, transferDate, userid }) {
        if (!isConfigured) return fallbackDb.addIncome({ Category, Description, amount, transferDate, userid });
        try {
            const docRef = await addDoc(collection(db, "incomes"), {
                Category,
                Description,
                amount: Number(amount),
                transferDate,
                userid,
                createdAt: serverTimestamp()
            });
            return { $id: docRef.id, id: docRef.id, Category, Description, amount, transferDate, userid };
        } catch (error) {
            console.error("Firebase :: addIncome :: error", error);
            throw error;
        }
    }

    async getIncomes(userId) {
        if (!isConfigured) return fallbackDb.getIncomes(userId);
        try {
            const q = query(
                collection(db, "incomes"),
                where("userid", "==", userId),
                orderBy("transferDate", "desc")
            );
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map(doc => ({
                $id: doc.id,
                ...doc.data()
            }));
            return { documents };
        } catch (error) {
            console.error("Firebase :: getIncomes :: error", error);
            throw error;
        }
    }

    async deleteIncome(id) {
        if (!isConfigured) return fallbackDb.deleteIncome(id);
        try {
            await deleteDoc(doc(db, "incomes", id));
            return true;
        } catch (error) {
            console.error("Firebase :: deleteIncome :: error", error);
            throw error;
        }
    }

    // --- Storage ---
    async uploadFile(file) {
        if (!isConfigured) return fallbackDb.uploadFile(file);
        try {
            const storageRef = ref(storage, "receipts/" + Date.now() + "_" + file.name);
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            return { $id: snapshot.ref.fullPath, url };
        } catch (error) {
            console.error("Firebase :: uploadFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        if (!isConfigured) return fallbackDb.getFilePreview(fileId);
        return fileId;
    }
}

const dbService = new DatabaseService();
export default dbService;
