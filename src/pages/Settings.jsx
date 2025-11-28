import React from 'react';
import { Save, Key, Globe, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Settings() {
    const { t, apiKey, setApiKey } = useLanguage();

    return (
        <div className="max-w-3xl space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t('settings.title')}</h2>
                <p className="text-slate-500 dark:text-slate-400">Manage your account settings and API configurations.</p>
            </div>

            {/* Notifications */}
            <div className="glass rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl p-8 bg-glass-surface">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <Bell className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">Notifications</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage how you receive updates</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                        <div>
                            <p className="font-medium text-[var(--text-primary)] group-hover:text-ios-accent transition-colors">Email Notifications</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Receive updates about your document status</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-12 h-7 bg-black/10 dark:bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ios-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-ios-accent"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
