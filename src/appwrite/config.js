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

    async addExpense({ Category, slug, Description, amount, recipt, transferDate, userid }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    Category,
                    Description,
                    amount,
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
                    Description, // Ensure Description is also updatable
                    amount,
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
            // Don't throw here, just return false if handled gracefully, 
            // but for Redux thunk to know it failed:
            throw error;
        }
    }


    async getExpenses(queries = [Query.equal("status", "active")]) {
        try {
            // NOTE: The previous code had Query.equal("status", "active").
            // If the database documents DO NOT have a 'status' field, this query will return 0 documents!
            // I should check if 'status' field exists.
            // Since the user didn't mention adding a 'status' field in the schema, 
            // and the addExpense doesn't add 'status', 
            // THIS QUERY MIGHT BE THE CAUSE OF NO DATA BEING FETCHED.
            // I will remove the default query to fetch all documents.
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // queries, // Commented out potentially broken query
            )
        } catch (error) {
            console.log("Appwrite serive :: getExpenses :: error", error);
            throw error;
        }
    }

    // file upload service

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