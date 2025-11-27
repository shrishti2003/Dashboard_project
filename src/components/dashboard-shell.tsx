"use client";

import React from 'react';
import { LayoutDashboard, Activity, Settings, User, Menu, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

interface DashboardShellProps {
    children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex h-screen bg-background overflow-hidden transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 bg-pbi-dark text-white flex-shrink-0 hidden md:flex flex-col shadow-xl z-20">
                <div className="p-4 flex items-center gap-2 border-b border-gray-700 bg-black/20">
                    <Activity className="h-6 w-6 text-pbi-yellow" />
                    <span className="font-bold text-lg tracking-tight">HeartAnalytics</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2 bg-pbi-yellow/10 text-pbi-yellow border-l-4 border-pbi-yellow rounded-r-md cursor-pointer">
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="font-medium">Overview</span>
                    </div>
                    {/* <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white rounded-md cursor-pointer transition-all duration-200">
                        <User className="h-5 w-5" />
                        <span className="font-medium">Patients</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white rounded-md cursor-pointer transition-all duration-200">
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Settings</span>
                    </div> */}
                </nav>

                <div className="p-4 border-t border-gray-700 bg-black/20">
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-400">
                        {/* <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pbi-yellow to-yellow-600 flex items-center justify-center text-xs text-black font-bold shadow-lg">
                            SR
                        </div> */}
                        {/* <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">Dr. Raina</span>
                            <span className="text-xs opacity-70">Cardiologist</span>
                        </div> */}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
                {/* Top Header */}
                <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm z-10 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-muted-foreground hover:text-foreground">
                            <Menu className="h-6 w-6" />
                        </button>
                        <h1 className="text-xl font-bold text-foreground tracking-tight">Heart Disease Analysis Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        {/* <div className="text-sm text-muted-foreground hidden sm:block">
                            Last Updated: <span className="font-medium text-foreground">{new Date().toLocaleDateString()}</span>
                        </div> */}
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-auto p-6 bg-muted/30">
                    <div className="max-w-7xl mx-auto space-y-6 pb-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
