import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LayoutDashboard, Wallet, TrendingUp, Settings, LogOut, PieChart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { logout } from '../../store/authSlice';
import authService from '../../firebase/auth';

export function Sidebar({ className }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navItems = [
        { name: 'Expenses', href: '/expenses', icon: Wallet },
        { name: 'Incomes', href: '/incomes', icon: TrendingUp },
        { name: 'Analytics', href: '/analytics', icon: PieChart },
    ];

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <aside className={cn(
            "fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-xl transition-transform flex flex-col",
            className
        )}>
            <div className="flex h-16 items-center border-b border-zinc-800 px-6 shrink-0">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    ExpenseTracker
                </h1>
            </div>

            <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            isActive
                                ? "bg-indigo-500/10 text-indigo-400 shadow-sm shadow-indigo-500/10 border border-indigo-500/20"
                                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                        )}
                    >
                        <item.icon size={18} />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-zinc-800 mt-auto shrink-0">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
