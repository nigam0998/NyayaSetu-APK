import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Mail, Save, Edit2 } from 'lucide-react';

export default function Account() {
    const { currentUser, updateUser } = useAuth();
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [message, setMessage] = useState('');

    React.useEffect(() => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || ''
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await updateUser(formData);
            setMessage(t('account.updateSuccess'));
            setIsEditing(false);
        } catch (error) {
            setMessage(t('account.updateFailed'));
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{t('account.title')}</h2>
                    <p className="text-ios-textSec">{t('account.subtitle')}</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                >
                    {isEditing ? t('account.cancel') : <><Edit2 className="w-4 h-4" /> {t('account.editProfile')}</>}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-xl ${message.includes(t('account.updateSuccess')) ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {message}
                </div>
            )}

            <div className="glass p-8 rounded-3xl border border-white/10">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-india-saffron to-india-green flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                        {currentUser?.firstName?.[0] || currentUser?.email?.[0] || 'U'}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">
                            {currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName || ''}` : (currentUser?.email || 'User')}
                        </h3>
                        <p className="text-ios-textSec">{currentUser?.email || 'No email found'}</p>
                        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                            {t('account.freePlan')}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-ios-textSec mb-2">{t('account.firstName')}</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ios-textSec" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ios-textSec mb-2">{t('account.lastName')}</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ios-textSec" />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-ios-textSec mb-2">{t('account.emailAddress')}</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ios-textSec" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={true} // Email usually shouldn't be editable easily
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none transition-all opacity-50 cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-ios-textSec mt-2 ml-1">{t('account.emailCannotChange')}</p>
                    </div>

                    {isEditing && (
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-ios-accent hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 hover:-translate-y-0.5"
                            >
                                <Save className="w-5 h-5" />
                                {t('account.saveChanges')}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
