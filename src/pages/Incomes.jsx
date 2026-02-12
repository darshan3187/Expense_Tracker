import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Wallet, TrendingUp, Calendar, Trash2, Loader2, IndianRupee, Edit } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { formatCurrency, cn } from '../lib/utils';
import { fetchIncomes, addIncome, deleteIncome } from '../store/incomeSlice';
import { Skeleton } from '../components/ui/Skeleton';

export default function Incomes() {
    const dispatch = useDispatch();
    const { incomes, status, error } = useSelector((state) => state.incomes);
    const { userData } = useSelector((state) => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);

    useEffect(() => {
        if (userData?.$id) {
            dispatch(fetchIncomes(userData.$id));
        }
    }, [dispatch, userData?.$id]);

    const transactions = incomes?.map(doc => ({
        id: doc.$id,
        title: doc.Description || "Untitled",
        amount: Number(doc.amount) || 0,
        date: doc.transferDate ? new Date(doc.transferDate).toLocaleDateString() : 'N/A',
        category: doc.Category || 'Salary',
        type: 'income',
        original: doc
    })) || [];

    const totalIncome = transactions.reduce((acc, curr) => acc + curr.amount, 0);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this income?")) {
            dispatch(deleteIncome(id));
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedIncome(null);
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Income Tracking</h1>
                    <p className="text-zinc-400 mt-1">Manage all your income sources here.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Income
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Income"
                    amount={totalIncome}
                    icon={TrendingUp}
                    variant="emerald"
                />
                <StatsCard
                    title="Income Sources"
                    amount={transactions.length}
                    isCount={true}
                    icon={TrendingUp}
                    variant="secondary"
                />
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-zinc-100">Recent Incomes</h2>
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
                                            Failed to load incomes. {error}
                                        </td>
                                    </tr>
                                )}

                                {transactions.length > 0 ? transactions.map((t) => (
                                    <tr key={t.id} className="group hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                                                    <TrendingUp size={18} />
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
                                        <td className="px-6 py-4 text-right font-medium text-emerald-400">
                                            + {formatCurrency(t.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} className="text-zinc-500 hover:text-red-400">
                                                <Trash2 size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                )) : status === 'succeeded' && (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-zinc-500">
                                            No income records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            <IncomeFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                userId={userData?.$id}
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
                        variant === 'emerald' ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-400"
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

function IncomeFormModal({ isOpen, onClose, userId }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        Description: '',
        amount: '',
        Category: 'Salary',
        transferDate: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) return;
        setIsLoading(true);
        try {
            await dispatch(addIncome({
                ...formData,
                amount: Number(formData.amount),
                userid: userId
            })).unwrap();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save income: " + error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Income" className="max-w-md">
            <form className="space-y-6 mt-2" onSubmit={handleSubmit}>
                <Input
                    label="Description"
                    placeholder="e.g. Monthly Salary"
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
                    options={['Salary', 'Freelance', 'Investment', 'Gift', 'Refund', 'Other']}
                    value={formData.Category}
                    onChange={(e) => setFormData({ ...formData, Category: e.target.value })}
                />
                <div className="pt-2 flex gap-3">
                    <Button type="button" variant="ghost" className="w-full" onClick={onClose}>Cancel</Button>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" isLoading={isLoading}>
                        Add Income
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
