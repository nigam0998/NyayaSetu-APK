import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, List, Shield, AlertCircle, Check, BookOpen } from 'lucide-react';
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
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Analysis Results</h2>
                    <p className="text-slate-600">Document: {fileName}</p>
                </div>
                <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                                activeTab === tab.id
                                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[600px]">
                {activeTab === 'simplification' && <SimplificationView data={analysisData} />}
                {activeTab === 'summary' && <SummaryView data={analysisData} />}
                {activeTab === 'advisory' && <AdvisoryView data={analysisData} />}
            </div>
        </div>
    );
}

function SimplificationView({ data }) {
    const simplifications = data.simplification || [];

    if (data.error) {
        return <div className="p-8 text-center text-red-600">{data.error}</div>;
    }

    if (data.rawAnalysis) {
        return <div className="p-8"><pre className="whitespace-pre-wrap text-sm">{data.rawAnalysis}</pre></div>;
    }

    return (
        <div className="grid md:grid-cols-2 h-full divide-x divide-slate-100">
            <div className="p-8">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Original Text (Legalese)</h3>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed">
                    {simplifications.map((item, idx) => (
                        <p key={idx} className={`p-4 rounded-lg border mb-4 ${idx === 0 ? 'bg-red-50/50 border-red-100' : 'bg-slate-50 border-slate-100'
                            }`}>
                            "{item.original}"
                        </p>
                    ))}
                </div>
            </div>
            <div className="p-8 bg-indigo-50/30">
                <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-4">Simplified (Plain English)</h3>
                <div className="prose prose-indigo max-w-none text-slate-800 leading-relaxed">
                    {simplifications.map((item, idx) => (
                        <p key={idx} className="p-4 bg-white rounded-lg border border-indigo-100 shadow-sm mb-4">
                            <span className="font-semibold text-indigo-700">{item.label}:</span> {item.simplified}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SummaryView({ data }) {
    const summary = data.summary || {};

    if (data.error) {
        return <div className="p-8 text-center text-red-600">{data.error}</div>;
    }

    return (
        <div className="p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        Document Overview
                    </h3>
                    <p className="text-slate-600">
                        {summary.overview || 'Analysis of the provided legal document.'}
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            Key Facts
                        </h4>
                        <ul className="space-y-2 text-blue-800">
                            {(summary.keyFacts || []).map((fact, idx) => (
                                <li key={idx}>• {fact}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                        <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                            Critical Obligations
                        </h4>
                        <ul className="space-y-2 text-amber-800">
                            {(summary.obligations || []).map((obligation, idx) => (
                                <li key={idx}>• {obligation}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdvisoryView({ data }) {
    const advisoryItems = data.advisory || [];

    if (data.error) {
        return <div className="p-8 text-center text-red-600">{data.error}</div>;
    }

    return (
        <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-indigo-600" />
                            Suggested Actions
                        </h3>
                        <div className="space-y-4">
                            {advisoryItems.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                                        <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-indigo-600 text-white rounded-xl p-6 shadow-lg">
                        <h3 className="font-bold text-lg mb-2">Need Legal Help?</h3>
                        <p className="text-indigo-100 text-sm mb-6">Connect with free legal aid volunteers near you.</p>
                        <button
                            onClick={() => navigate('/dashboard/legal-aid')}
                            className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
                        >
                            Find Legal Aid
                        </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <h3 className="font-bold text-slate-900 mb-4">Rhetorical Analysis</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-slate-600">
                                    <span className="w-3 h-3 bg-red-500 rounded-full"></span> Issues
                                </span>
                                <span className="font-medium">3 Detected</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-slate-600">
                                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Facts
                                </span>
                                <span className="font-medium">12 Detected</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-slate-600">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span> Arguments
                                </span>
                                <span className="font-medium">8 Detected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
