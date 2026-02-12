import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts';
import { Card } from '../components/ui/Card';
import { formatCurrency, cn } from '../lib/utils';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieIcon } from 'lucide-react';
import { Skeleton } from '../components/ui/Skeleton';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'];

export default function Analytics() {
    const { expenses, status } = useSelector((state) => state.expenses);

    const transactions = useMemo(() => {
        return expenses?.map(doc => ({
            id: doc.$id,
            amount: Number(doc.amount) || 0,
            date: doc.transferDate ? new Date(doc.transferDate) : new Date(),
            category: doc.Category || 'Uncategorized',
            type: 'expense'
        })) || [];
    }, [expenses]);

    // --- Calculations ---

    const totalExpense = transactions.reduce((acc, t) => acc + t.amount, 0);

    // Category Data for Pie Chart
    const categoryData = useMemo(() => {
        const map = {};
        transactions.forEach(t => {
            if (!map[t.category]) map[t.category] = 0;
            map[t.category] += t.amount;
        });
        return Object.keys(map).map(k => ({ name: k, value: map[k] })).sort((a, b) => b.value - a.value);
    }, [transactions]);

    // Monthly Trend Data for Bar Chart
    const monthlyData = useMemo(() => {
        const map = {};
        transactions.forEach(t => {
            // Use "Mon DD" or just "Mon" depending on density. Let's do month grouping.
            const month = t.date.toLocaleString('default', { month: 'short' });
            if (!map[month]) map[month] = 0;
            map[month] += t.amount;
        });
        // Sort by month index ideally, but keys are unsorted in object.
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthOrder.map(m => ({ name: m, amount: map[m] || 0 })).filter(d => d.amount > 0 || true); // keep all months? No, maybe only relevant ones. For now, keep all for structure.
    }, [transactions]);

    // Highest Spending Category
    const topCategory = categoryData.length > 0 ? categoryData[0] : { name: 'N/A', value: 0 };

    // Average Spending
    const averageSpend = transactions.length > 0 ? totalExpense / transactions.length : 0;

    if (status === 'loading') {
        return <AnalyticsSkeleton />;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Analytics</h1>
                <p className="text-zinc-400 mt-1">Deep dive into your spending habits.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Spent"
                    amount={totalExpense}
                    icon={DollarSign}
                    variant="primary"
                />
                <StatsCard
                    title="Top Category"
                    value={topCategory.name}
                    subValue={formatCurrency(topCategory.value)}
                    icon={TrendingUp}
                    variant="secondary"
                />
                <StatsCard
                    title="Avg. Transaction"
                    amount={averageSpend}
                    icon={TrendingDown}
                    variant="secondary"
                />
                <StatsCard
                    title="Total Transactions"
                    value={transactions.length}
                    icon={PieIcon}
                    variant="secondary"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Spending by Category (Pie) */}
                <Card className="p-6 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm min-h-[400px]">
                    <h3 className="text-lg font-semibold text-zinc-100 mb-6">Spending by Category</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#e4e4e7' }}
                                    formatter={(value) => formatCurrency(value)}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        {categoryData.slice(0, 6).map((cat, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                <span className="text-zinc-400 truncate">{cat.name}</span>
                                <span className="ml-auto font-medium text-zinc-200">{formatCurrency(cat.value)}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Monthly Spending Trend (Bar) */}
                <Card className="p-6 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm min-h-[400px]">
                    <h3 className="text-lg font-semibold text-zinc-100 mb-6">Monthly Trends</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#71717a"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#71717a"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `₹${value / 1000}k`}
                                />
                                <Tooltip
                                    cursor={{ fill: '#27272a', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                                    itemStyle={{ color: '#e4e4e7' }}
                                    formatter={(value) => [formatCurrency(value), 'Spent']}
                                />
                                <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

            </div>
        </div>
    );
}

function StatsCard({ title, amount, value, subValue, icon: Icon, variant }) {
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
                            {value || formatCurrency(amount)}
                        </h3>
                        {subValue && <p className="text-xs text-zinc-500 mt-1">{subValue}</p>}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-zinc-900 rounded-xl border border-zinc-800"></div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-[400px] bg-zinc-900 rounded-xl border border-zinc-800"></div>
                <div className="h-[400px] bg-zinc-900 rounded-xl border border-zinc-800"></div>
            </div>
        </div>
    )
}
