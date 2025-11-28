import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            setError('');
            setLoading(true);
            await signup(email, password, firstName, lastName);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account. ' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neon-purple/20 via-dark-bg to-dark-bg -z-10" />
            <div className="absolute top-20 left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse-slow" />

            <div className="max-w-md w-full bg-glass-surface rounded-3xl shadow-2xl overflow-hidden border border-glass-border relative z-10">
                <div className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 p-8 text-center backdrop-blur-md border-b border-white/5">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-lg shadow-neon-purple/20">
                        <Shield className="w-8 h-8 text-neon-purple" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{t('signup.title')}</h2>
                    <p className="text-slate-400">{t('signup.subtitle')}</p>
                    {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}
                </div>

                <div className="p-8">
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">{t('signup.firstName')}</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent outline-none transition-all placeholder-white/20"
                                    placeholder="Rahul"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">{t('signup.lastName')}</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent outline-none transition-all placeholder-white/20"
                                    placeholder="Sharma"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">{t('signup.email')}</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent outline-none transition-all placeholder-white/20"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">{t('signup.password')}</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-purple focus:border-transparent outline-none transition-all placeholder-white/20"
                                placeholder="Create a strong password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-neon-purple to-neon-pink hover:shadow-[0_0_20px_rgba(188,19,254,0.3)] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <UserPlus className="w-5 h-5" />
                            {loading ? t('signup.creating') : t('signup.createAccount')}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-400">
                            {t('signup.hasAccount')}{' '}
                            <Link to="/login" className="text-neon-purple font-bold hover:underline hover:text-neon-pink transition-colors">
                                {t('signup.signIn')}
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>

    );
}
