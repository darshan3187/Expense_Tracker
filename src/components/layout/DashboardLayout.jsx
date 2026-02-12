import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { cn } from '../../lib/utils';
import { Bell, Search, Menu } from 'lucide-react';
import React from 'react';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="flex min-h-screen bg-background text-text-main overflow-hidden">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Desktop & Mobile */}
            <Sidebar
                className={cn(
                    "lg:translate-x-0 w-64",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    "transition-transform duration-300 ease-in-out"
                )}
            />

            <div className="flex flex-1 flex-col overflow-x-hidden pt-16 lg:pl-64 lg:pt-0">

                {/* Header */}
                <header className="fixed top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-surface/80 backdrop-blur-md px-4 lg:ml-64 lg:w-[calc(100%-16rem)] lg:px-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-zinc-400 hover:text-white"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="h-9 w-64 rounded-full border border-border bg-zinc-900/50 pl-9 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 ring-2 ring-background cursor-pointer hover:shadow-lg hover:shadow-indigo-500/20 transition-all"></div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children || <Outlet />}
                    </div>
                </main>
            </div>
        </div>
    );
}
