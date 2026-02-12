import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../firebase/db";

const initialState = {
    expenses: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
};

// Async Thunks
export const fetchExpenses = createAsyncThunk(
    "expenses/fetchExpenses",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await service.getExpenses(userId);
            if (response && response.documents) {
                return response.documents;
            }
            return [];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addExpense = createAsyncThunk(
    "expenses/addExpense",
    async (expenseData, { rejectWithValue }) => {
        try {
            const response = await service.addExpense(expenseData);
            if (response) {
                return response;
            }
            throw new Error("Failed to add expense");
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateExpense = createAsyncThunk(
    "expenses/updateExpense",
    async ({ slug, ...data }, { rejectWithValue }) => {
        try {
            const response = await service.updateExpense(slug, data);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteExpense = createAsyncThunk(
    "expenses/deleteExpense",
    async (slug, { rejectWithValue }) => {
        try {
            await service.deleteExpense(slug);
            return slug;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchExpenses.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.expenses = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Add
            .addCase(addExpense.fulfilled, (state, action) => {
                state.expenses.unshift(action.payload);
            })
            // Update
            .addCase(updateExpense.fulfilled, (state, action) => {
                const index = state.expenses.findIndex((e) => e.$id === action.payload.$id);
                if (index !== -1) {
                    state.expenses[index] = action.payload;
                }
            })
            // Delete
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter((e) => e.$id !== action.payload && e.slug !== action.payload);
            });
    },
});

export const { resetStatus } = expenseSlice.actions;

export default expenseSlice.reducer;
