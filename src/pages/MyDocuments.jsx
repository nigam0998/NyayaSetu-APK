import React, { useState } from 'react';
import { FileText, Search, Download, Trash2, Eye, MoreVertical, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const documentsData = [
    { id: 1, name: "Rental_Agreement_2024.pdf", date: "2024-03-15", type: "Contract", status: "Analyzed", size: "2.4 MB" },
    { id: 2, name: "Legal_Notice_Sharma.pdf", date: "2024-03-10", type: "Notice", status: "Pending", size: "1.1 MB" },
    { id: 3, name: "Property_Deed_Final.pdf", date: "2024-02-28", type: "Deed", status: "Analyzed", size: "5.7 MB" },
    { id: 4, name: "Employment_Contract.pdf", date: "2024-02-15", type: "Contract", status: "Analyzed", size: "1.8 MB" },
    { id: 5, name: "Vehicle_Registration.pdf", date: "2024-01-20", type: "Registration", status: "Analyzed", size: "3.2 MB" },
];

export default function MyDocuments() {
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useLanguage();

    const filteredDocs = documentsData.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t('documents.title')}</h2>
                    <p className="text-slate-500 dark:text-slate-400">Manage and access your analyzed legal documents.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-glass-surface border border-glass-border text-[var(--text-primary)] focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all placeholder-slate-500 dark:placeholder-slate-400"
                    />
                </div>
            </div>

            <div className="glass-card rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-black/5 dark:bg-white/5 border-b border-glass-border">
                                <th className="text-left py-4 px-6 text-slate-500 dark:text-slate-400 font-medium text-sm">{t('documents.headers.name')}</th>
                                <th className="text-left py-4 px-6 text-slate-500 dark:text-slate-400 font-medium text-sm">{t('documents.headers.date')}</th>
                                <th className="text-left py-4 px-6 text-slate-500 dark:text-slate-400 font-medium text-sm">{t('documents.headers.type')}</th>
                                <th className="text-left py-4 px-6 text-slate-500 dark:text-slate-400 font-medium text-sm">{t('documents.headers.status')}</th>
                                <th className="text-right py-4 px-6 text-slate-500 dark:text-slate-400 font-medium text-sm">{t('documents.headers.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocs.length > 0 ? (
                                filteredDocs.map((doc) => (
                                    <tr key={doc.id} className="border-b border-glass-border hover:bg-glass-surface transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center border border-neon-blue/20 group-hover:border-neon-blue/50 transition-colors">
                                                    <FileText className="w-5 h-5 text-neon-blue" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[var(--text-primary)] group-hover:text-neon-blue transition-colors">{doc.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{doc.size}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                                <Calendar className="w-4 h-4" />
                                                {doc.date}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="px-3 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm">
                                                {doc.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${doc.status === 'Analyzed'
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                }`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[var(--text-primary)] transition-colors" title="View">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[var(--text-primary)] transition-colors" title="Download">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-slate-500 dark:text-slate-400">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                                <FileText className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                                            </div>
                                            <p>{t('documents.empty')}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
