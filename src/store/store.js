import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import expenseSlice from './expenseSlice';
import incomeSlice from './incomeSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        expenses: expenseSlice,
        incomes: incomeSlice,
    }
});


export default store;