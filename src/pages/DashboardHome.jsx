import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, TrendingUp, Plus, ArrowRight, Activity, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function DashboardHome() {
    const { currentUser } = useAuth();
    const { t } = useLanguage();

    const handleRefresh = async () => {
        // Simulate data fetching
        return new Promise(resolve => setTimeout(resolve, 2000));
    };

    const { isRefreshing, pullDistance } = usePullToRefresh(handleRefresh);

    const stats = [
        { label: t('dashboard.stats.documents'), value: '12', icon: FileText, color: 'text-neon-blue', bg: 'bg-neon-blue/10' },
        { label: t('dashboard.stats.time'), value: '4.5 hrs', icon: Clock, color: 'text-neon-purple', bg: 'bg-neon-purple/10' },
        { label: t('dashboard.stats.score'), value: '85%', icon: TrendingUp, color: 'text-neon-pink', bg: 'bg-neon-pink/10' },
    ];

    const recentDocs = [
        { name: 'Rental_Agreement.pdf', date: '2 hours ago', status: 'Analyzed' },
        { name: 'Employment_Contract.docx', date: 'Yesterday', status: 'Pending' },
        { name: 'Notice_Reply.pdf', date: '2 days ago', status: 'Analyzed' },
    ];

    return (
        <div className="space-y-8 animate-slide-up relative">
            {/* Pull to Refresh Indicator */}
            <div
                className={cn(
                    "fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 shadow-lg",
                    (pullDistance > 50 || isRefreshing) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                )}
            >
                <RefreshCw className={cn("w-4 h-4 text-neon-blue", isRefreshing && "animate-spin")} />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                    {isRefreshing ? "Refreshing..." : "Release to refresh"}
                </span>
            </div>

            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {t('dashboard.welcome')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">{currentUser?.firstName || 'User'}</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">{t('dashboard.subtitle')}</p>
                </div>
                <Link
                    to="/dashboard/upload"
                    className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(188,19,254,0.5)] transition-all hover:scale-105"
                >
                    <Plus className="w-5 h-5" />
                    {t('dashboard.newAnalysis')}
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-glass-surface border border-glass-border hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400">+12% this week</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-glass-surface border border-glass-border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-neon-blue" />
                            {t('dashboard.recentActivity.title')}
                        </h3>
                        <Link to="/dashboard/documents" className="text-sm text-neon-blue hover:text-neon-purple transition-colors">{t('dashboard.recentActivity.viewAll')}</Link>
                    </div>
                    <div className="space-y-4">
                        {recentDocs.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-dark-bg flex items-center justify-center text-slate-500 dark:text-slate-400">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-[var(--text-primary)]">{doc.name}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{doc.date}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${doc.status === 'Analyzed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                    }`}>
                                    {doc.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-dark-bg border border-neon-purple/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                    <h3 className="text-xl font-bold mb-6 relative z-10">{t('dashboard.quickActions.title')}</h3>
                    <div className="space-y-3 relative z-10">
                        <Link to="/dashboard/upload" className="flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 group">
                            <span className="font-medium">{t('dashboard.quickActions.upload')}</span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </Link>
                        <Link to="/dashboard/legal-aid" className="flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 group">
                            <span className="font-medium">{t('dashboard.quickActions.findLawyer')}</span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </Link>
                        <Link to="/dashboard/account" className="flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 group">
                            <span className="font-medium">{t('dashboard.quickActions.updateProfile')}</span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
