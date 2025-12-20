import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

import AdminMobileNav from '../components/AdminMobileNav';

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-dark-bg text-white flex flex-col md:flex-row pb-20 md:pb-0">
            {/* Sidebar - Hidden on Mobile */}
            <div className="hidden md:flex w-64 bg-glass-surface border-r border-glass-border flex-col fixed h-full z-50 backdrop-blur-xl">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-purple to-pink-500 flex items-center justify-center shadow-lg shadow-neon-purple/20">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Admin Panel</h1>
                        <p className="text-xs text-slate-400">NyayaSetu</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                                isActive
                                    ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-glass-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 p-4 md:p-8">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-purple to-pink-500 flex items-center justify-center shadow-lg shadow-neon-purple/20">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Admin Panel</h1>
                            <p className="text-xs text-slate-400">NyayaSetu</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

                <Outlet />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <AdminMobileNav />
            </div>
        </div>
    );
}
