import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../firebase/db";

const initialState = {
    incomes: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
};

// Async Thunks
export const fetchIncomes = createAsyncThunk(
    "incomes/fetchIncomes",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await service.getIncomes(userId);
            if (response && response.documents) {
                return response.documents;
            }
            return [];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addIncome = createAsyncThunk(
    "incomes/addIncome",
    async (incomeData, { rejectWithValue }) => {
        try {
            const response = await service.addIncome(incomeData);
            if (response) {
                return response;
            }
            throw new Error("Failed to add income");
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteIncome = createAsyncThunk(
    "incomes/deleteIncome",
    async (slug, { rejectWithValue }) => {
        try {
            await service.deleteIncome(slug);
            return slug;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const incomeSlice = createSlice({
    name: "incomes",
    initialState,
    reducers: {
        resetIncomeStatus: (state) => {
            state.status = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchIncomes.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchIncomes.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.incomes = action.payload;
            })
            .addCase(fetchIncomes.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Add
            .addCase(addIncome.fulfilled, (state, action) => {
                state.incomes.unshift(action.payload);
            })
            // Delete
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.incomes = state.incomes.filter((i) => i.$id !== action.payload);
            });
    },
});

export const { resetIncomeStatus } = incomeSlice.actions;

export default incomeSlice.reducer;
