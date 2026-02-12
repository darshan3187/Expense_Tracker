// import { ID } from "appwrite";

// Simulating database latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEY = "expense_tracker_data";
const USER_KEY = "expense_tracker_user";

class MockService {

    // Helper to generate IDs
    _uniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    // Helper to get data
    _getData() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    // Helper to save data
    _saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // --- Auth Services (Mock) ---

    async createAccount({ email, password, name }) {
        await delay(500);
        const user = { $id: "user_" + Date.now(), name, email, prefs: {} };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
    }

    async login(credentials = {}) {
        await delay(500);
        // Auto-login for demo, accept any credentials
        const user = {
            $id: "demo-user-123",
            name: "Demo User",
            email: credentials.email || "demo@example.com",
            prefs: {}
        };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
    }

    async getCurrentUser() {
        await delay(300);
        const user = localStorage.getItem(USER_KEY);
        // If no user, AUTO LOGIN for demo purposes to avoid empty screen
        if (!user) {
            return this.login();
        }
        return JSON.parse(user);
    }

    async logout() {
        await delay(300);
        localStorage.removeItem(USER_KEY);
    }

    // --- Database Services (Expenses) ---

    async getExpenses() {
        await delay(600); // Simulate network
        const documents = this._getData();
        // Return in Appwrite format: { documents: [...] }
        return { documents: documents.sort((a, b) => new Date(b.transferDate) - new Date(a.transferDate)) };
    }

    async addExpense({ Category, slug, Description, amount, recipt, transferDate, userid }) {
        await delay(500);
        const currentData = this._getData();
        const newDoc = {
            $id: slug || `doc_${Date.now()}`,
            $createdAt: new Date().toISOString(),
            Category,
            Description,
            amount,
            transferDate,
            recipt,
            userid,
        };

        this._saveData([newDoc, ...currentData]);
        return newDoc;
    }

    async updateExpense(slug, { Category, amount, transferDate, Description }) {
        await delay(500);
        const currentData = this._getData();
        // Find either by $id or the 'slug' passed in (which might be the ID)
        const index = currentData.findIndex((doc) => doc.$id === slug || doc.slug === slug);

        if (index === -1) throw new Error("Document not found");

        const updatedDoc = {
            ...currentData[index],
            Category,
            amount,
            transferDate,
            Description,
            $updatedAt: new Date().toISOString(),
        };

        currentData[index] = updatedDoc;
        this._saveData(currentData);
        return updatedDoc;
    }

    async deleteExpense(slug) {
        await delay(400);
        const currentData = this._getData();
        const newData = currentData.filter((doc) => doc.$id !== slug && doc.slug !== slug);
        this._saveData(newData);
        return true;
    }

    // --- Storage Services (Mock) ---

    async uploadFile(file) {
        await delay(1000);
        return { $id: `file_${Date.now()}` };
    }

    async deleteFile(fileId) {
        return true;
    }

    getFilePreview(fileId) {
        return "https://placehold.co/400"; // Dummy image
    }
}

const mockService = new MockService();
export default mockService;
