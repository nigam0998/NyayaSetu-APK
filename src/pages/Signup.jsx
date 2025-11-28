import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AshokaChakra from '../components/AshokaChakra';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();
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
        <div className="min-h-screen bg-ios-bg flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-ios-accent/20 via-ios-bg to-ios-bg -z-10" />
            <div className="absolute top-20 left-0 w-96 h-96 bg-india-saffron/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-india-green/10 rounded-full blur-3xl animate-pulse-slow" />

            <div className="max-w-md w-full glass rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative z-10">
                <div className="bg-gradient-to-br from-india-green/80 to-green-900/80 p-8 text-center backdrop-blur-md">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg">
                        <AshokaChakra className="w-10 h-10 text-india-saffron" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-green-100 mt-2">Join CodeBandhu today</p>
                    {error && <div className="mt-4 p-2 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm">{error}</div>}
                </div>

                <div className="p-8">
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-ios-textSec mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-india-green focus:border-transparent outline-none transition-all placeholder-white/20"
                                    placeholder="Rahul"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ios-textSec mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-india-green focus:border-transparent outline-none transition-all placeholder-white/20"
                                    placeholder="Sharma"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ios-textSec mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-india-green focus:border-transparent outline-none transition-all placeholder-white/20"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ios-textSec mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-india-green focus:border-transparent outline-none transition-all placeholder-white/20"
                                placeholder="Create a strong password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-india-green hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <UserPlus className="w-5 h-5" />
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-ios-textSec">
                            Already have an account?{' '}
                            <Link to="/login" className="text-india-green font-bold hover:underline hover:text-green-400 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>

    );
}
