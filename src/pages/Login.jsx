import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import AshokaChakra from '../components/AshokaChakra';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('user@codebandhu.in');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to sign in. ' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ios-bg flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ios-accent/20 via-ios-bg to-ios-bg -z-10" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-india-saffron/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-india-green/10 rounded-full blur-3xl animate-pulse-slow" />

            <div className="max-w-md w-full glass rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative z-10">
                <div className="bg-gradient-to-br from-india-blue/80 to-blue-900/80 p-8 text-center backdrop-blur-md">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg">
                        <AshokaChakra className="w-10 h-10 text-india-saffron" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="text-blue-100 mt-2">Sign in to your CodeBandhu account</p>
                    {error && <div className="mt-4 p-2 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm">{error}</div>}
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-ios-textSec mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none transition-all placeholder-white/20"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ios-textSec mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none transition-all placeholder-white/20"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ios-textSec hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-ios-accent rounded border-white/20 bg-white/5 focus:ring-ios-accent" />
                                <span className="text-ios-textSec">Remember me</span>
                            </label>
                            <a href="#" className="text-ios-accent hover:text-blue-400 hover:underline font-medium transition-colors">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-ios-accent hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LogIn className="w-5 h-5" />
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-ios-textSec">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-ios-accent font-bold hover:underline hover:text-blue-400 transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-sm text-blue-200">
                        <p className="font-semibold mb-1 text-blue-100">Demo Credentials:</p>
                        <p>Email: user@codebandhu.in</p>
                        <p>Password: admin123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
