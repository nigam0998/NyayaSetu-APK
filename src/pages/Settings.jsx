import React from 'react';
import { Save, Key, Globe, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Settings() {
    const { t, apiKey, setApiKey } = useLanguage();

    return (
        <div className="max-w-3xl space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">{t('settings.title')}</h2>
                <p className="text-ios-textSec">Manage your account settings and API configurations.</p>
            </div>

            {/* API Configuration */}
            <div className="glass rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                        <Key className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">API Configuration</h3>
                        <p className="text-sm text-ios-textSec">Manage your external service keys</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-ios-textSec mb-2">
                            {t('settings.api')}
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none font-mono text-sm text-white placeholder-white/20 transition-all"
                                placeholder="Enter your API key..."
                            />
                            <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5">
                                <Save className="w-4 h-4" />
                                Save
                            </button>
                        </div>
                        <p className="mt-3 text-xs text-ios-textSec flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-ios-accent"></span>
                            This key is used for the Bashbandhu Translation API services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="glass rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <Bell className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Notifications</h3>
                        <p className="text-sm text-ios-textSec">Manage how you receive updates</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                        <div>
                            <p className="font-medium text-white group-hover:text-ios-accent transition-colors">Email Notifications</p>
                            <p className="text-sm text-ios-textSec">Receive updates about your document status</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-12 h-7 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ios-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-ios-accent"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
