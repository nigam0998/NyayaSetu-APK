import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';

export default function LanguageSelector() {
    const { language, changeLanguage } = useLanguage();
    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors text-white text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-glass-surface backdrop-blur-xl border border-glass-border rounded-xl shadow-xl overflow-hidden hidden group-hover:block animate-slide-up z-50">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors flex items-center justify-between ${language === lang.code ? 'text-neon-blue bg-white/5' : 'text-slate-300'}`}
                    >
                        <span>{lang.name}</span>
                        <span className="text-xs opacity-50">{lang.nativeName}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
