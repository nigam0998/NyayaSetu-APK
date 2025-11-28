import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { t } = useLanguage();
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            const result = await login(email, password);
            if (isAdminLogin) {
                if (result.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    setError('Invalid admin credentials');
                }
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Failed to sign in. ' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-blue/20 via-dark-bg to-dark-bg -z-10" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse-slow" />

            <div className="max-w-md w-full bg-glass-surface rounded-3xl shadow-2xl overflow-hidden border border-glass-border relative z-10">
                <div className="bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 p-8 text-center backdrop-blur-md border-b border-white/5">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-lg shadow-neon-blue/20">
                        <Shield className="w-8 h-8 text-neon-blue" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{isAdminLogin ? 'Admin Login' : t('login.title')}</h2>
                    <p className="text-slate-400">{isAdminLogin ? 'Sign in to access admin dashboard' : t('login.subtitle')}</p>
                    {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}
                </div>

                <div className="p-8">
                    {/* Role Toggle */}
                    <div className="flex p-1 bg-white/5 rounded-xl mb-6 border border-white/10">
                        <button
                            type="button"
                            onClick={() => setIsAdminLogin(false)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${!isAdminLogin ? 'bg-neon-blue text-dark-bg shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            User
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsAdminLogin(true)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${isAdminLogin ? 'bg-neon-purple text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">{t('login.email')}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all placeholder-white/20"
                                placeholder={isAdminLogin ? "admin@codebandhu.in" : "name@example.com"}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">{t('login.password')}</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all placeholder-white/20"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm flex-wrap gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-neon-blue rounded border-white/20 bg-white/5 focus:ring-neon-blue" />
                                <span className="text-slate-400">{t('login.rememberMe')}</span>
                            </label>
                            {!isAdminLogin && (
                                <a href="#" className="text-neon-blue hover:text-neon-purple hover:underline font-medium transition-colors">{t('login.forgotPassword')}</a>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${isAdminLogin ? 'bg-gradient-to-r from-neon-purple to-pink-500 hover:shadow-[0_0_20px_rgba(188,19,254,0.3)] text-white' : 'bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] text-white'}`}
                        >
                            <LogIn className="w-5 h-5" />
                            {loading ? t('login.signingIn') : t('login.signIn')}
                        </button>
                    </form>

                    {!isAdminLogin && (
                        <div className="mt-8 text-center">
                            <p className="text-slate-400">
                                {t('login.noAccount')}{' '}
                                <Link to="/signup" className="text-neon-blue font-bold hover:underline hover:text-neon-purple transition-colors">
                                    {t('login.createAccount')}
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
