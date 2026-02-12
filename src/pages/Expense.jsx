import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Wallet, TrendingUp, TrendingDown, Calendar, Trash2, Loader2, IndianRupee, Edit } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { formatCurrency, cn } from '../lib/utils';
import { fetchExpenses, addExpense, deleteExpense, updateExpense } from '../store/expenseSlice';
import { ID } from 'appwrite';
import { Skeleton } from '../components/ui/Skeleton';

export default function Expenses() {
    const dispatch = useDispatch();
    const { expenses, status, error } = useSelector((state) => state.expenses);
    const { userData } = useSelector((state) => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    const transactions = expenses?.map(doc => ({
        id: doc.$id,
        title: doc.Description || "Untitled",
        amount: Number(doc.amount) || 0,
        date: doc.transferDate ? new Date(doc.transferDate).toLocaleDateString() : 'N/A',
        category: doc.Category || 'Uncategorized',
        type: 'expense',
        original: doc // Keep original for editing
    })) || [];

    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this expense?")) {
            dispatch(deleteExpense(id));
        }
    }

    const handleEdit = (expense) => {
        setSelectedExpense(expense.original);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedExpense(null);
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Dashboard</h1>
                    <p className="text-zinc-400 mt-1">Overview of your expenses.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Expense
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Expenses"
                    amount={totalExpense}
                    icon={TrendingDown}
                    variant="secondary"
                />
                <StatsCard
                    title="Transactions"
                    amount={transactions.length}
                    isCount={true}
                    icon={TrendingUp}
                    variant="secondary"
                />
            </div>

            {/* Transactions Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-zinc-100">Recent Transactions</h2>
                </div>

                <Card className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-zinc-800 text-zinc-400">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Description</th>
                                    <th className="px-6 py-4 font-medium">Category</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {status === 'loading' && (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                                            <td className="px-6 py-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                                            <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                                            <td className="px-6 py-4"><Skeleton className="h-4 w-16 ml-auto" /></td>
                                            <td className="px-6 py-4"><Skeleton className="h-8 w-8 ml-auto rounded-full" /></td>
                                        </tr>
                                    ))
                                )}
                                {status === 'failed' && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-red-400">
                                            Failed to load expenses. Is Appwrite configured?
                                            <br /> <span className="text-xs text-zinc-500">{error}</span>
                                        </td>
                                    </tr>
                                )}

                                {transactions.length > 0 ? transactions.map((t) => (
                                    <tr key={t.id} className="group hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-red-500/10 text-red-500">
                                                    <TrendingDown size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-zinc-200">{t.title}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">
                                            <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                                                {t.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">{t.date}</td>
                                        <td className="px-6 py-4 text-right font-medium text-zinc-200">
                                            {formatCurrency(t.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(t)} className="text-zinc-500 hover:text-indigo-400">
                                                    <Edit size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} className="text-zinc-500 hover:text-red-400">
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : status === 'succeeded' && (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-zinc-500">
                                            No transactions found. Add one to get started!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            <ExpenseFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                userId={userData?.$id || 'guest'}
                initialData={selectedExpense}
            />

        </div>
    );
}

function StatsCard({ title, amount, icon: Icon, isCount, variant }) {
    return (
        <Card className="relative overflow-hidden group hover:bg-zinc-800/40 transition-all border-zinc-800 bg-zinc-900">
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "rounded-xl p-3",
                        variant === 'primary' ? "bg-indigo-500/10 text-indigo-400" : "bg-zinc-800 text-zinc-400"
                    )}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-400">{title}</p>
                        <h3 className="text-2xl font-bold text-zinc-100 mt-1">
                            {isCount ? amount : formatCurrency(amount)}
                        </h3>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function ExpenseFormModal({ isOpen, onClose, userId, initialData }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        Description: '',
        amount: '',
        Category: 'Food & Dining',
        transferDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                Description: initialData.Description || '',
                amount: initialData.amount || '',
                Category: initialData.Category || 'Food & Dining',
                transferDate: initialData.transferDate ? new Date(initialData.transferDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            });
        } else {
            setFormData({
                Description: '',
                amount: '',
                Category: 'Food & Dining',
                transferDate: new Date().toISOString().split('T')[0]
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (initialData) {
                await dispatch(updateExpense({
                    ...formData,
                    slug: initialData.$id,
                    amount: Number(formData.amount),
                    // Only update editable fields present in service call
                })).unwrap();
            } else {
                await dispatch(addExpense({
                    ...formData,
                    amount: Number(formData.amount),
                    userid: userId,
                    recipt: null,
                })).unwrap();
            }
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save expense: " + error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Expense" : "Add New Expense"} className="max-w-md">
            <form className="space-y-6 mt-2" onSubmit={handleSubmit}>

                <Input
                    label="Title"
                    placeholder="e.g. Grocery Shopping"
                    value={formData.Description}
                    onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                    required
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Amount"
                        type="number"
                        placeholder="0.00"
                        startIcon={IndianRupee}
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={formData.transferDate}
                        onChange={(e) => setFormData({ ...formData, transferDate: e.target.value })}
                        required
                    />
                </div>

                <Select
                    label="Category"
                    options={['Food & Dining', 'Transport', 'Shopping', 'Bills & Utilities', 'Healthcare', 'Travel', 'Education', 'Personal Care', 'Other']}
                    value={formData.Category}
                    onChange={(e) => setFormData({ ...formData, Category: e.target.value })}
                />

                <div className="pt-2 flex gap-3">
                    <Button type="button" variant="ghost" className="w-full" onClick={onClose}>Cancel</Button>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" isLoading={isLoading}>
                        {initialData ? "Save Changes" : "Add Expense"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}