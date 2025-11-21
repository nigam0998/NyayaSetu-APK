import React from 'react';
import { FileText, Clock, CheckCircle, MoreVertical } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MyDocuments() {
    const { t } = useLanguage();

    const documents = [
        { id: 1, name: 'Rental_Agreement_2025.pdf', date: '2025-03-15', status: 'Processed', type: 'Contract' },
        { id: 2, name: 'Employment_Contract_v2.docx', date: '2025-03-10', status: 'Processed', type: 'Agreement' },
        { id: 3, name: 'Property_Deed_Draft.pdf', date: '2025-02-28', status: 'Pending', type: 'Deed' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{t('documents.title')}</h2>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Document Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-slate-900">{doc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{doc.date}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                        {doc.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {doc.status === 'Processed' ? (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Clock className="w-4 h-4 text-amber-500" />
                                        )}
                                        <span className={doc.status === 'Processed' ? 'text-green-700' : 'text-amber-700'}>
                                            {doc.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {documents.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        {t('documents.empty')}
                    </div>
                )}
            </div>
        </div>
    );
}
