import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, PlusSquare, Scale, User, LogOut, Settings, Shield } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const navItems = [
        { icon: Home, label: 'My Documents', path: '/dashboard/documents' },
        { icon: Search, label: 'Search & Analyze', path: '/dashboard/results' },
        { icon: PlusSquare, label: 'Upload New', path: '/dashboard/upload' },
        { icon: Scale, label: 'Legal Aid', path: '/dashboard/legal-aid' },
        { icon: User, label: 'Profile', path: '/dashboard/account' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-r border-glass-border z-50">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)]/60">
                    CodeBandhu
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                            isActive
                                ? "bg-glass-surface text-[var(--text-primary)] shadow-lg border border-glass-border"
                                : "text-slate-600 dark:text-slate-400 hover:bg-glass-surface hover:text-[var(--text-primary)]"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-neon-blue" : "group-hover:text-neon-blue"
                                )} />
                                <span className="font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_10px_#00f3ff]" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-glass-border">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
}
