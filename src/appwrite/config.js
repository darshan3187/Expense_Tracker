import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // --- Expense Methods ---

    async addExpense({ Category, slug, Description, amount, recipt, transferDate, userid }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug || ID.unique(),
                {
                    Category,
                    Description,
                    amount: parseFloat(amount),
                    transferDate,
                    recipt,
                    userid
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: addExpense :: error", error);
            throw error;
        }
    }

    async updateExpense(slug, { Category, amount, transferDate, Description }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    Category,
                    Description,
                    amount: parseFloat(amount),
                    transferDate,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateExpense :: error", error);
            throw error;
        }
    }

    async deleteExpense(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteExpense :: error", error);
            throw error;
        }
    }

    async getExpenses(userId) {
        try {
            if (!userId) return { documents: [] };
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("userid", userId), Query.orderDesc("transferDate")]
            )
        } catch (error) {
            console.log("Appwrite serive :: getExpenses :: error", error);
            throw error;
        }
    }

    // --- Income Methods ---

    async addIncome({ Category, slug, Description, amount, transferDate, userid }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteIncomeCollectionId || conf.appwriteCollectionId, // Fallback if not configured
                slug || ID.unique(),
                {
                    Category,
                    Description,
                    amount: parseFloat(amount),
                    transferDate,
                    userid
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: addIncome :: error", error);
            throw error;
        }
    }

    async getIncomes(userId) {
        try {
            if (!userId) return { documents: [] };
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteIncomeCollectionId || conf.appwriteCollectionId,
                [Query.equal("userid", userId), Query.orderDesc("transferDate")]
            )
        } catch (error) {
            console.log("Appwrite serive :: getIncomes :: error", error);
            throw error;
        }
    }

    async deleteIncome(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteIncomeCollectionId || conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteIncome :: error", error);
            throw error;
        }
    }

    // --- Storage Service ---

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
            500,
            500,
            95,
        )
    }
}

const service = new Service()
export default service
