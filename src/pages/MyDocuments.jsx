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
                <h2 className="text-3xl font-bold text-white">{t('documents.title')}</h2>
            </div>

            <div className="glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            <th className="px-6 py-5 font-semibold text-ios-textSec">Document Name</th>
                            <th className="px-6 py-5 font-semibold text-ios-textSec">Date</th>
                            <th className="px-6 py-5 font-semibold text-ios-textSec">Type</th>
                            <th className="px-6 py-5 font-semibold text-ios-textSec">Status</th>
                            <th className="px-6 py-5 font-semibold text-ios-textSec">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-white">{doc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-ios-textSec">{doc.date}</td>
                                <td className="px-6 py-5">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-ios-textSec border border-white/10">
                                        {doc.type}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        {doc.status === 'Processed' ? (
                                            <CheckCircle className="w-4 h-4 text-ios-success" />
                                        ) : (
                                            <Clock className="w-4 h-4 text-ios-warning" />
                                        )}
                                        <span className={doc.status === 'Processed' ? 'text-ios-success' : 'text-ios-warning'}>
                                            {doc.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-ios-textSec hover:text-white transition-colors">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {documents.length === 0 && (
                    <div className="p-16 text-center text-ios-textSec">
                        {t('documents.empty')}
                    </div>
                )}
            </div>
        </div>
    );
}
