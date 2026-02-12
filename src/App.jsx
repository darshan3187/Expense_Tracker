import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DashboardLayout from './components/layout/DashboardLayout';
import Expenses from './pages/Expense';
import Incomes from './pages/Incomes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthLayout from './components/AuthLayout';
import authService from './firebase/auth';
import { login, logout } from './store/authSlice';
import { Loader2 } from 'lucide-react';
import Analytics from './pages/Analytics';

const Budgets = () => <div className="p-4 text-zinc-400">Budgets Page (Coming Soon)</div>;

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
      <Route path="/login" element={
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      } />
      <Route path="/signup" element={
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      } />

      <Route element={
        <AuthLayout authentication={true}>
          <DashboardLayout />
        </AuthLayout>
      }>
        <Route path="/" element={<Navigate to="/expenses" replace />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/budgets" element={<Budgets />} />
      </Route>

      <Route path="*" element={<Navigate to="/expenses" replace />} />
    </Routes>
  );
}

export default App;
