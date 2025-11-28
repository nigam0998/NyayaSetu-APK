import React, { useEffect, useState } from 'react';
import { Users, FileText, Activity, Server } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
    const [userCount, setUserCount] = useState(0);
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            // Fetch total count
            const { count } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true });
            setUserCount(count || 0);

            // Fetch recent users
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);
            setRecentUsers(data || []);
        };
        fetchStats();
    }, []);

    const stats = [
        { label: 'Total Users', value: userCount.toString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Documents Processed', value: '0', icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10' },
        { label: 'API Requests', value: '0', icon: Server, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'System Status', value: 'Healthy', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                <p className="text-slate-400">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-glass-surface border border-glass-border hover:bg-white/5 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-slate-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-glass-surface border border-glass-border">
                    <h3 className="text-xl font-bold mb-6">Recent User Signups</h3>
                    <div className="space-y-4">
                        {recentUsers.length === 0 ? (
                            <p className="text-slate-400 text-center py-4">No recent signups found.</p>
                        ) : (
                            recentUsers.map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold uppercase">
                                            {user.first_name?.[0] || user.email?.[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{user.first_name || 'User'} {user.last_name}</h4>
                                            <p className="text-xs text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-glass-surface border border-glass-border">
                    <h3 className="text-xl font-bold mb-6">System Logs</h3>
                    <div className="space-y-2 font-mono text-sm">
                        <div className="text-green-400">[INFO] Server started successfully</div>
                        <div className="text-blue-400">[INFO] Connected to Supabase</div>
                        <div className="text-yellow-400">[WARN] High API latency detected</div>
                        <div className="text-blue-400">[INFO] User #1234 logged in</div>
                        <div className="text-green-400">[INFO] Document processed (ID: 9988)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
