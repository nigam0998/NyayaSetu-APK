import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-india-blue p-8 text-center">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-india-blue font-bold text-2xl">C</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="text-blue-100 mt-2">Sign in to your CodeBandhu account</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                defaultValue="user@codebandhu.in"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-india-saffron focus:border-transparent outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    defaultValue="admin123"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-india-saffron focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-india-blue rounded border-slate-300 focus:ring-india-blue" />
                                <span className="text-slate-600">Remember me</span>
                            </label>
                            <a href="#" className="text-india-blue hover:underline font-medium">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-india-saffron hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-5 h-5" />
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-india-blue font-bold hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                        <p className="font-semibold mb-1">Demo Credentials:</p>
                        <p>Email: user@codebandhu.in</p>
                        <p>Password: admin123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
