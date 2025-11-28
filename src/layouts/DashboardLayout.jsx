import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import AIAssistant from '../components/AIAssistant';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import { ArrowLeft, Home } from 'lucide-react';

export default function DashboardLayout() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-neon-purple selection:text-white pb-20 md:pb-0 md:pl-64 transition-all duration-300">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="min-h-screen relative">
                {/* Background Elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-glow" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
                </div>

                {/* Header for Mobile/Tablet (and Desktop controls) */}
                <header className="sticky top-0 z-30 flex items-center justify-between p-4 md:p-8 gap-4 pointer-events-none">
                    {/* Navigation Controls */}
                    <div className="pointer-events-auto flex items-center gap-3 bg-glass-surface backdrop-blur-md p-2 rounded-full border border-glass-border shadow-lg">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[var(--text-primary)]"
                            title="Go Back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="w-px h-6 bg-black/10 dark:bg-white/10" />
                        <Link
                            to="/"
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[var(--text-primary)]"
                            title="Go Home"
                        >
                            <Home className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Settings Controls */}
                    <div className="pointer-events-auto flex items-center gap-3 bg-glass-surface backdrop-blur-md p-2 rounded-full border border-glass-border shadow-lg">
                        <ThemeToggle />
                        <div className="w-px h-6 bg-black/10 dark:bg-white/10" />
                        <LanguageSelector />
                    </div>
                </header>

                {/* Content */}
                <div className="relative z-10 px-4 md:px-8 pb-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <MobileNav />
            </div>

            {/* AI Assistant - Global Access */}
            <AIAssistant />
        </div>
    );
}
