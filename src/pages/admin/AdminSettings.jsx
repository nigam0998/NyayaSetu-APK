import React, { useState } from 'react';
import { Save, Key, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { useConfig } from '../../contexts/ConfigContext';

export default function AdminSettings() {
    const { geminiApiKey, bhashiniApiKey, updateGeminiKey, updateBhashiniKey } = useConfig();
    const [geminiKey, setGeminiKey] = useState(geminiApiKey);
    const [bhashiniKey, setBhashiniKey] = useState(bhashiniApiKey);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSave = (e) => {
        e.preventDefault();
        try {
            updateGeminiKey(geminiKey);
            updateBhashiniKey(bhashiniKey);
            setStatus({ type: 'success', message: 'Configuration saved successfully!' });
            setTimeout(() => setStatus({ type: '', message: '' }), 3000);
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to save configuration.' });
        }
    };

    return (
        <div className="max-w-4xl space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold mb-2">API Configuration</h1>
                <p className="text-slate-400">Manage external API keys for Gemini AI and Bhashini.</p>
            </div>

            {status.message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
                {/* Gemini API */}
                <div className="p-6 rounded-2xl bg-glass-surface border border-glass-border">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <Key className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Gemini AI Configuration</h3>
                            <p className="text-sm text-slate-400">Required for document analysis and chat features.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-400">API Key</label>
                        <input
                            type="password"
                            value={geminiKey}
                            onChange={(e) => setGeminiKey(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                            placeholder="Enter Gemini API Key"
                        />
                    </div>
                </div>

                {/* Bhashini API */}
                <div className="p-6 rounded-2xl bg-glass-surface border border-glass-border">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                            <Globe className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Bhashini Configuration</h3>
                            <p className="text-sm text-slate-400">Required for translation and localization features.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-400">API Key / Config</label>
                        <input
                            type="password"
                            value={bhashiniKey}
                            onChange={(e) => setBhashiniKey(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all font-mono text-sm"
                            placeholder="Enter Bhashini API Key"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-neon-purple to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-neon-purple/20 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
