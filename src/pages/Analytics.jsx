import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, CartesianGrid, Legend
} from 'recharts';
import { Card } from '../components/ui/Card';
import { formatCurrency, cn } from '../lib/utils';
import { TrendingUp, TrendingDown, DollarSign, Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Skeleton } from '../components/ui/Skeleton';
import { fetchExpenses } from '../store/expenseSlice';
import { fetchIncomes } from '../store/incomeSlice';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'];
const INCOME_COLOR = '#10b981';
const EXPENSE_COLOR = '#ef4444';

export default function Analytics() {
    const dispatch = useDispatch();
    const { expenses, status: expStatus } = useSelector((state) => state.expenses);
    const { incomes, status: incStatus } = useSelector((state) => state.incomes);
    const { userData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userData?.$id) {
            dispatch(fetchExpenses(userData.$id));
            dispatch(fetchIncomes(userData.$id));
        }
    }, [dispatch, userData?.$id]);

    const transactionData = useMemo(() => {
        const exps = expenses?.map(doc => ({
            amount: Number(doc.amount) || 0,
            date: doc.transferDate ? new Date(doc.transferDate) : new Date(),
            category: doc.Category || 'Uncategorized',
            type: 'expense'
        })) || [];

        const incs = incomes?.map(doc => ({
            amount: Number(doc.amount) || 0,
            date: doc.transferDate ? new Date(doc.transferDate) : new Date(),
            category: doc.Category || 'Salary',
            type: 'income'
        })) || [];

        return [...exps, ...incs];
    }, [expenses, incomes]);

    // --- Calculations ---
    const totalExpense = useMemo(() => transactionData.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0), [transactionData]);
    const totalIncome = useMemo(() => transactionData.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0), [transactionData]);
    const netBalance = totalIncome - totalExpense;

    // Category Data for Pie Chart (Expenses only)
    const expenseCategoryData = useMemo(() => {
        const map = {};
        transactionData.filter(t => t.type === 'expense').forEach(t => {
            if (!map[t.category]) map[t.category] = 0;
            map[t.category] += t.amount;
        });
        return Object.keys(map).map(k => ({ name: k, value: map[k] })).sort((a, b) => b.value - a.value);
    }, [transactionData]);

    // Monthly Comparison Data
    const monthlyComparisonData = useMemo(() => {
        const map = {};
        transactionData.forEach(t => {
            const month = t.date.toLocaleString('default', { month: 'short' });
            if (!map[month]) map[month] = { name: month, Income: 0, Expense: 0 };
            if (t.type === 'income') map[month].Income += t.amount;
            else map[month].Expense += t.amount;
        });
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthOrder.map(m => map[m] || { name: m, Income: 0, Expense: 0 }).filter(d => d.Income > 0 || d.Expense > 0);
    }, [transactionData]);

    if (expStatus === 'loading' || incStatus === 'loading') {
        return <AnalyticsSkeleton />;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Financial Insights</h1>
                <p className="text-zinc-400 mt-1">Comprehensive view of your cash flow and spending.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Income"
                    amount={totalIncome}
                    icon={ArrowUpRight}
                    variant="emerald"
                />
                <StatsCard
                    title="Total Expenses"
                    amount={totalExpense}
                    icon={ArrowDownLeft}
                    variant="rose"
                />
                <StatsCard
                    title="Net Balance"
                    amount={netBalance}
                    icon={Wallet}
                    variant="indigo"
                    isBalance
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Income vs Expense (Bar) */}
                <Card className="p-6 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-zinc-100 mb-6">Income vs Expenses</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyComparisonData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v >= 1000 ? v / 1000 + 'k' : v}`} />
                                <Tooltip
                                    cursor={{ fill: '#27272a', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#e4e4e7' }}
                                    formatter={(value) => formatCurrency(value)}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Bar dataKey="Income" fill={INCOME_COLOR} radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Expense" fill={EXPENSE_COLOR} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Expense Breakdown (Pie) */}
                <Card className="p-6 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-zinc-100 mb-6">Expense Breakdown</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={expenseCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {expenseCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    formatter={(value) => formatCurrency(value)}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                        {expenseCategoryData.slice(0, 6).map((cat, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                <span className="text-zinc-400 truncate w-20">{cat.name}</span>
                                <span className="ml-auto font-medium text-zinc-200">{formatCurrency(cat.value)}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

function StatsCard({ title, amount, icon: Icon, variant, isBalance }) {
    const variants = {
        emerald: "bg-emerald-500/10 text-emerald-400",
        rose: "bg-rose-500/10 text-rose-400",
        indigo: "bg-indigo-500/10 text-indigo-400",
    };

    return (
        <Card className="relative overflow-hidden group hover:bg-zinc-800/40 transition-all border-zinc-800 bg-zinc-900/50">
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <div className={cn("rounded-xl p-3", variants[variant] || "bg-zinc-800 text-zinc-400")}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-400">{title}</p>
                        <h3 className={cn(
                            "text-2xl font-bold mt-1",
                            isBalance ? (amount >= 0 ? "text-emerald-400" : "text-rose-400") : "text-zinc-100"
                        )}>
                            {formatCurrency(amount)}
                        </h3>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function AnalyticsSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="h-10 w-48 bg-zinc-800 rounded-md"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-28 bg-zinc-900 rounded-xl border border-zinc-800"></div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-[400px] bg-zinc-900 rounded-xl border border-zinc-800"></div>
                <div className="h-[400px] bg-zinc-900 rounded-xl border border-zinc-800"></div>
            </div>
        </div>
    )
}
