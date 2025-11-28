import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, List, Shield, AlertCircle, Check, BookOpen, ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Results() {
    const [activeTab, setActiveTab] = useState('simplification');
    const location = useLocation();
    const navigate = useNavigate();

    const analysisData = location.state?.analysis || {};
    const fileName = location.state?.fileName || 'Document.pdf';

    const tabs = [
        { id: 'simplification', label: 'Simplification', icon: FileText },
        { id: 'summary', label: 'Summary', icon: List },
        { id: 'advisory', label: 'Legal Advisory', icon: Shield },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-20 animate-slide-up">
            <button
                onClick={() => navigate('/dashboard/upload')}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Upload
            </button>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Analysis Results</h2>
                    <p className="text-slate-400">Document: <span className="text-neon-blue">{fileName}</span></p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                                activeTab === tab.id
                                    ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-glass-surface rounded-2xl border border-glass-border shadow-2xl min-h-[600px] backdrop-blur-xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10">
                    {activeTab === 'simplification' && <SimplificationView data={analysisData} />}
                    {activeTab === 'summary' && <SummaryView data={analysisData} />}
                    {activeTab === 'advisory' && <AdvisoryView data={analysisData} navigate={navigate} />}
                </div>
            </div>
        </div>
    );
}

function SimplificationView({ data }) {
    const simplifications = data.simplification || [];

    if (data.error) {
        return <div className="p-8 text-center text-red-400">{data.error}</div>;
    }

    if (data.rawAnalysis) {
        return <div className="p-8"><pre className="whitespace-pre-wrap text-sm text-slate-300 font-mono bg-black/30 p-4 rounded-xl border border-white/10">{data.rawAnalysis}</pre></div>;
    }

    return (
        <div className="grid md:grid-cols-2 h-full divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Original Text (Legalese)
                </h3>
                <div className="space-y-4">
                    {simplifications.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 relative group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-xl" />
                            <p className="text-slate-300 text-sm leading-relaxed italic">"{item.original}"</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-8 bg-white/[0.02]">
                <h3 className="text-sm font-bold text-neon-blue uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Simplified (Plain English)
                </h3>
                <div className="space-y-4">
                    {simplifications.map((item, idx) => (
                        <div key={idx} className="p-5 rounded-xl border border-neon-blue/20 bg-neon-blue/5 shadow-[0_0_15px_rgba(0,243,255,0.05)] hover:bg-neon-blue/10 transition-colors">
                            <span className="inline-block px-2 py-1 rounded-md bg-neon-blue/20 text-neon-blue text-xs font-bold mb-2 border border-neon-blue/20">
                                {item.label}
                            </span>
                            <p className="text-white leading-relaxed">
                                {item.simplified}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SummaryView({ data }) {
    const summary = data.summary || {};

    if (data.error) {
        return <div className="p-8 text-center text-red-400">{data.error}</div>;
    }

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-neon-blue to-neon-purple mb-6 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Document Overview</h3>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                        {summary.overview || 'Analysis of the provided legal document.'}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-neon-blue/30 transition-colors">
                        <h4 className="font-bold text-neon-blue mb-6 flex items-center gap-2 text-lg">
                            <div className="w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center">
                                <List className="w-4 h-4" />
                            </div>
                            Key Facts
                        </h4>
                        <ul className="space-y-4">
                            {(summary.keyFacts || []).map((fact, idx) => (
                                <li key={idx} className="flex gap-3 text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-2 shrink-0 shadow-[0_0_5px_#00f3ff]" />
                                    <span className="leading-relaxed">{fact}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-neon-purple/30 transition-colors">
                        <h4 className="font-bold text-neon-purple mb-6 flex items-center gap-2 text-lg">
                            <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                                <AlertCircle className="w-4 h-4" />
                            </div>
                            Critical Obligations
                        </h4>
                        <ul className="space-y-4">
                            {(summary.obligations || []).map((obligation, idx) => (
                                <li key={idx} className="flex gap-3 text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-purple mt-2 shrink-0 shadow-[0_0_5px_#bc13fe]" />
                                    <span className="leading-relaxed">{obligation}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdvisoryView({ data, navigate }) {
    const advisoryItems = data.advisory || [];

    if (data.error) {
        return <div className="p-8 text-center text-red-400">{data.error}</div>;
    }

    return (
        <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-neon-green" />
                            Suggested Actions
                        </h3>
                        <div className="space-y-4">
                            {advisoryItems.map((item, idx) => (
                                <div key={idx} className="flex gap-5 p-5 bg-black/20 rounded-xl border border-white/5 hover:border-neon-green/30 transition-all hover:bg-white/5 group">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-neon-green/20 group-hover:text-neon-green transition-colors font-bold">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg mb-2 group-hover:text-neon-green transition-colors">{item.title}</h4>
                                        <p className="text-slate-400 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="font-bold text-xl mb-2 relative z-10">Need Legal Help?</h3>
                        <p className="text-slate-300 text-sm mb-6 relative z-10">Connect with verified legal aid volunteers near you for expert assistance.</p>
                        <button
                            onClick={() => navigate('/dashboard/legal-aid')}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-lg relative z-10"
                        >
                            Find Legal Aid
                        </button>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-slate-400" /> Analysis Stats
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/5">
                                <span className="flex items-center gap-2 text-slate-400">
                                    <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_5px_red]"></span> Issues
                                </span>
                                <span className="font-bold text-white">3 Detected</span>
                            </div>
                            <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/5">
                                <span className="flex items-center gap-2 text-slate-400">
                                    <span className="w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_5px_#00f3ff]"></span> Facts
                                </span>
                                <span className="font-bold text-white">12 Detected</span>
                            </div>
                            <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-white/5">
                                <span className="flex items-center gap-2 text-slate-400">
                                    <span className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_5px_#00ff9d]"></span> Arguments
                                </span>
                                <span className="font-bold text-white">8 Detected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
