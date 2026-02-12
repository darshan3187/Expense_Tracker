import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DashboardLayout from './components/layout/DashboardLayout';
import Expenses from './pages/Expense';
// import authService from './appwrite/auth';
import authService from './lib/mockService'; // Using mock login for easy access
import { login, logout } from './store/authSlice';
import { Loader2 } from 'lucide-react';

import Analytics from './pages/Analytics';
const Budgets = () => <div className="p-4 text-zinc-400">Budgets Page (Coming Soon)</div>;
const Settings = () => <div className="p-4 text-zinc-400">Settings Page (Coming Soon)</div>;

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Auth check failed:", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-500" />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default App;
