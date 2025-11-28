import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, FileText, Settings, LogOut, Scale } from 'lucide-react';
import { cn } from '../lib/utils';
import AIAssistant from '../components/AIAssistant';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

import AshokaChakra from '../components/AshokaChakra';

export default function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, language, changeLanguage } = useLanguage();
    const { currentUser, logout } = useAuth();

    React.useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleSignout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { icon: UploadCloud, label: t('nav.upload'), path: '/dashboard/upload' },
        { icon: FileText, label: t('nav.documents'), path: '/dashboard/documents' },
        { icon: Scale, label: t('nav.legalAid'), path: '/dashboard/legal-aid' },
    ];

    return (
        <div className="flex h-screen text-ios-text overflow-hidden selection:bg-ios-accent selection:text-white">
            {/* Sidebar */}
            <aside className="w-72 glass border-r border-white/5 flex flex-col z-20 m-4 rounded-3xl shadow-2xl backdrop-blur-2xl">
                <div className="p-8 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shadow-lg shadow-india-saffron/20 group-hover:scale-105 transition-transform">
                            <AshokaChakra className="w-8 h-8 text-india-saffron" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">CodeBandhu</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                    isActive
                                        ? "text-white bg-white/10 shadow-lg border border-white/5"
                                        : "text-ios-textSec hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-ios-accent rounded-r-full" />
                                )}
                                <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-ios-accent" : "group-hover:text-white")} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleSignout}
                        className="flex items-center gap-3 px-4 py-3.5 w-full text-ios-textSec hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all group"
                    >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{t('nav.signout')}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                <header className="h-20 flex items-center justify-between px-8 pt-4">
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {navItems.find(i => location.pathname.startsWith(i.path))?.label || t('dashboard.title')}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="glass rounded-xl p-1 border border-white/10">
                            <select
                                value={language}
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="bg-transparent text-ios-textSec text-sm font-medium outline-none cursor-pointer px-2 py-1 hover:text-white transition-colors"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code} className="bg-gray-900 text-white">
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="h-8 w-px bg-white/10"></div>
                        <Link to="/dashboard/account" className="flex items-center gap-3 glass px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                                {currentUser?.firstName?.[0] || currentUser?.email?.[0] || 'U'}
                            </div>
                            <span className="text-sm font-medium text-white hidden sm:block">
                                {currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName || ''}` : (currentUser?.email || 'User')}
                            </span>
                        </Link>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-6xl mx-auto animate-fade-in-up">
                        <Outlet />
                    </div>
                </div>
            </main>
            <AIAssistant />
        </div>
    );
}
