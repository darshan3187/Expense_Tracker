import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LayoutDashboard, Wallet, CreditCard, Settings, LogOut, PieChart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { logout } from '../../store/authSlice';
// import authService from '../../appwrite/auth';
import authService from '../../lib/mockService';

export function Sidebar({ className }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await authService.logout();
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { name: 'Expenses', href: '/expenses', icon: Wallet },
        { name: 'Analytics', href: '/analytics', icon: PieChart },
    ];

    return (
        <aside className={cn(
            "fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-surface/50 backdrop-blur-xl transition-transform",
            className
        )}>
            <div className="flex h-16 items-center border-b border-border px-6">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    ExpenseTracker
                </h1>
            </div>

            <div className="flex flex-col gap-1 p-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            isActive
                                ? "bg-primary/10 text-primary shadow-sm shadow-indigo-500/10 border border-primary/20"
                                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                        )}
                    >
                        <item.icon size={18} />
                        {item.name}
                    </NavLink>
                ))}
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
