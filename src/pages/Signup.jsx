import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function Signup() {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-india-green p-8 text-center">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-india-green font-bold text-2xl">C</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                    <p className="text-green-100 mt-2">Join CodeBandhu today</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-india-green focus:border-transparent outline-none transition-all"
                                    placeholder="Rahul"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-india-green focus:border-transparent outline-none transition-all"
                                    placeholder="Sharma"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-india-green focus:border-transparent outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-india-green focus:border-transparent outline-none transition-all"
                                placeholder="Create a strong password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-india-green hover:bg-green-700 text-white font-bold rounded-lg shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                        >
                            <UserPlus className="w-5 h-5" />
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-india-green font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
