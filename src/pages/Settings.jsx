import React from 'react';
import { Save, Key, Globe, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Settings() {
    const { t, apiKey, setApiKey } = useLanguage();

    return (
        <div className="max-w-3xl space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('settings.title')}</h2>
                <p className="text-slate-600">Manage your account settings and API configurations.</p>
            </div>

            {/* API Configuration */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                        <Key className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">API Configuration</h3>
                        <p className="text-sm text-slate-500">Manage your external service keys</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            {t('settings.api')}
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-india-saffron focus:border-transparent outline-none font-mono text-sm text-slate-600 bg-slate-50"
                            />
                            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
                                <Save className="w-4 h-4" />
                                Save
                            </button>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                            This key is used for the Bashbandhu Translation API services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
                        <p className="text-sm text-slate-500">Manage how you receive updates</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="font-medium text-slate-900">Email Notifications</p>
                            <p className="text-sm text-slate-500">Receive updates about your document status</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-india-blue"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
