import React, { useState } from 'react';
import { User, Mail, Shield, Save, Camera, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Account() {
    const { currentUser } = useAuth();
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        firstName: 'User',
        lastName: 'Name',
        email: currentUser?.email || 'user@nyayasetu.in',
    });

    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = React.useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setIsEditing(false);
            setMessage({ type: 'success', text: t('account.updateSuccess') });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t('account.title')}</h2>
                    <p className="text-slate-500 dark:text-slate-400">{t('account.subtitle')}</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-6 py-2.5 rounded-xl font-medium transition-all ${isEditing
                        ? 'bg-black/10 dark:bg-white/10 text-[var(--text-primary)] hover:bg-black/20 dark:hover:bg-white/20'
                        : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/20'
                        }`}
                >
                    {isEditing ? t('account.cancel') : t('account.editProfile')}
                </button>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400'
                    }`}>
                    <AlertCircle className="w-5 h-5" />
                    {message.text}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="bg-glass-surface rounded-3xl p-6 border border-glass-border text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 -z-10" />
                        <div className="relative inline-block mb-4 mt-8">
                            <div className="w-32 h-32 rounded-full bg-[var(--bg-primary)] p-1 border-4 border-white/10 shadow-xl relative group">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-4xl font-bold text-white">
                                        {formData.firstName[0]}
                                    </div>
                                )}

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            {isEditing && (
                                <button
                                    onClick={triggerFileInput}
                                    className="absolute bottom-0 right-0 p-2 bg-neon-blue text-white rounded-full shadow-lg hover:bg-neon-purple transition-colors z-10"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{formData.firstName} {formData.lastName}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{formData.email}</p>

                        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 border border-black/10 dark:border-white/10 text-left">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-500 dark:text-slate-400 text-sm">Plan</span>
                                <span className="text-neon-green font-bold text-sm bg-neon-green/10 px-2 py-0.5 rounded-lg border border-neon-green/20">{t('account.freePlan')}</span>
                            </div>
                            <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-neon-green h-full w-3/4 rounded-full" />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">75% of monthly limit used</p>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="md:col-span-2">
                    <div className="bg-glass-surface rounded-3xl p-8 border border-glass-border">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{t('account.firstName')}</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[var(--text-primary)] focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{t('account.lastName')}</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[var(--text-primary)] focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{t('account.emailAddress')}</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled={true}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                    <Shield className="w-3 h-3" /> {t('account.emailCannotChange')}
                                </p>
                            </div>

                            {isEditing && (
                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-xl shadow-lg hover:shadow-neon-blue/20 transition-all hover:-translate-y-0.5 disabled:opacity-70"
                                    >
                                        <Save className="w-5 h-5" />
                                        {loading ? 'Saving...' : t('account.saveChanges')}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
