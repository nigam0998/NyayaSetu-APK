import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, FileText, Settings, LogOut, Scale } from 'lucide-react';
import { cn } from '../lib/utils';
import AIAssistant from '../components/AIAssistant';
import { useLanguage, languages } from '../contexts/LanguageContext';

export default function DashboardLayout() {
    const location = useLocation();
    const { t, language, changeLanguage } = useLanguage();

    const navItems = [
        { icon: UploadCloud, label: t('nav.upload'), path: '/dashboard/upload' },
        { icon: FileText, label: t('nav.documents'), path: '/dashboard/documents' },
        { icon: Scale, label: t('nav.legalAid'), path: '/dashboard/legal-aid' },
        { icon: Settings, label: t('nav.settings'), path: '/dashboard/settings' },
    ];

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 border-b border-slate-100">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900">CodeBandhu</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 font-medium"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        {t('nav.signout')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <h1 className="text-lg font-semibold text-slate-900">
                        {navItems.find(i => location.pathname.startsWith(i.path))?.label || t('dashboard.title')}
                    </h1>
                    <div className="flex items-center gap-4">
                        <select
                            value={language}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-india-saffron focus:border-india-saffron block p-2 outline-none"
                        >
                            {languages.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            JD
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
            <AIAssistant />
        </div>
    );
}
