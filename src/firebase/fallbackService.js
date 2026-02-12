const STORAGE_PREFIX = "et_fallback_";
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const getData = (key) => {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : [];
};

const setData = (key, data) => {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
};

export const fallbackAuth = {
    async createAccount({ email, password, name }) {
        await delay();
        const user = { $id: "user_" + Date.now(), uid: "user_" + Date.now(), name, email };
        localStorage.setItem(STORAGE_PREFIX + "user", JSON.stringify(user));
        return user;
    },
    async login({ email, password }) {
        await delay();
        let user = JSON.parse(localStorage.getItem(STORAGE_PREFIX + "user"));
        if (!user || user.email !== email) {
            user = { $id: "demo-user", uid: "demo-user", name: "Demo User", email: email || "demo@example.com" };
            localStorage.setItem(STORAGE_PREFIX + "user", JSON.stringify(user));
        }
        return { user };
    },
    async getCurrentUser() {
        await delay(300);
        return JSON.parse(localStorage.getItem(STORAGE_PREFIX + "user"));
    },
    async logout() {
        await delay(200);
        localStorage.removeItem(STORAGE_PREFIX + "user");
    }
};

export const fallbackDb = {
    async addExpense(data) {
        await delay();
        const expenses = getData("expenses");
        const newExp = { $id: "exp_" + Date.now(), ...data, createdAt: new Date().toISOString() };
        setData("expenses", [newExp, ...expenses]);
        return newExp;
    },
    async getExpenses(userId) {
        await delay();
        const expenses = getData("expenses");
        return { documents: expenses.filter(e => e.userid === userId) };
    },
    async updateExpense(id, data) {
        await delay();
        const expenses = getData("expenses");
        const index = expenses.findIndex(e => e.$id === id);
        if (index !== -1) {
            expenses[index] = { ...expenses[index], ...data };
            setData("expenses", expenses);
            return expenses[index];
        }
        throw new Error("Expense not found");
    },
    async deleteExpense(id) {
        await delay();
        const expenses = getData("expenses");
        setData("expenses", expenses.filter(e => e.$id !== id));
        return true;
    },
    async addIncome(data) {
        await delay();
        const incomes = getData("incomes");
        const newInc = { $id: "inc_" + Date.now(), ...data, createdAt: new Date().toISOString() };
        setData("incomes", [newInc, ...incomes]);
        return newInc;
    },
    async getIncomes(userId) {
        await delay();
        const incomes = getData("incomes");
        return { documents: incomes.filter(i => i.userid === userId) };
    },
    async deleteIncome(id) {
        await delay();
        const incomes = getData("incomes");
        setData("incomes", incomes.filter(i => i.$id !== id));
        return true;
    },
    async uploadFile(file) {
        return { $id: "mock_file", url: "https://placehold.co/400" };
    },
    getFilePreview(id) {
        return id;
    }
};
