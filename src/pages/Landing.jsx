import React from 'react';
import { ArrowRight, FileText, Shield, Brain, Scale, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Landing() {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-india-saffron rounded-lg flex items-center justify-center shadow-md">
                            <Scale className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 tracking-tight">CodeBandhu</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                            <a href="#features" className="hover:text-india-blue transition-colors">Features</a>
                            <a href="#about" className="hover:text-india-blue transition-colors">About</a>
                            <a href="#contact" className="hover:text-india-blue transition-colors">Contact</a>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/login" className="px-5 py-2.5 text-slate-700 hover:text-india-blue font-semibold transition-colors">
                                Login
                            </Link>
                            <Link to="/signup" className="px-5 py-2.5 bg-india-blue text-white rounded-lg hover:bg-blue-900 font-semibold transition-all shadow-lg shadow-blue-200">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50 -z-10" />
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 bg-india-green rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-600">Empowering Digital India</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
                        Democratizing Legal <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-india-saffron via-india-blue to-india-green">
                            Justice for Every Indian
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        CodeBandhu bridges the gap between complex legal documents and the common citizen.
                        Powered by advanced AI to Simplify, Summarize, and Advise.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-india-saffron rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 hover:-translate-y-1">
                            Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all hover:-translate-y-1">
                            View Demo
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="py-10 border-y border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <p className="text-4xl font-bold text-india-blue mb-1">10k+</p>
                        <p className="text-sm text-slate-500 font-medium">Documents Processed</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-india-saffron mb-1">500+</p>
                        <p className="text-sm text-slate-500 font-medium">Legal Experts</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-india-green mb-1">12</p>
                        <p className="text-sm text-slate-500 font-medium">Indian Languages</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-slate-900 mb-1">24/7</p>
                        <p className="text-sm text-slate-500 font-medium">AI Assistance</p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="px-6 py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose CodeBandhu?</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Built specifically for the Indian legal framework to help citizens, students, and professionals.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FileText className="w-8 h-8 text-india-blue" />}
                            title="Instant Simplification"
                            description="Translate complex legalese into plain English (and Hindi soon) using our Legal-BERT powered engine."
                            color="bg-blue-50"
                        />
                        <FeatureCard
                            icon={<Brain className="w-8 h-8 text-india-saffron" />}
                            title="Smart Summarization"
                            description="Get concise summaries that highlight the Issue, Facts, Arguments, and Conclusions automatically."
                            color="bg-orange-50"
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-india-green" />}
                            title="Actionable Advisory"
                            description="Receive non-binding legal suggestions on what steps to take next (e.g., RTI, FIR, Grievance)."
                            color="bg-green-50"
                        />
                    </div>
                </div>
            </section>


            {/* About Section */}
            <section id="about" className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                                <Building2 className="w-4 h-4" />
                                <span>Our Mission</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Bridging the Legal Gap</h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                In India, millions of citizens struggle to understand their legal rights due to complex language and lack of accessible resources.
                            </p>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                <span className="font-semibold text-slate-900">CodeBandhu</span> is an AI-powered initiative designed to democratize legal access. We combine cutting-edge Natural Language Processing (NLP) with deep legal expertise to make justice accessible to everyone, from rural citizens to urban professionals.
                            </p>
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-3xl font-bold text-slate-900 mb-1">98%</p>
                                    <p className="text-sm text-slate-500">Accuracy Rate</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-slate-900 mb-1">24/7</p>
                                    <p className="text-sm text-slate-500">Availability</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-india-saffron/20 to-india-green/20 rounded-3xl transform rotate-3"></div>
                            <div className="relative bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-lg">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-india-blue shrink-0">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">For Citizens</h4>
                                            <p className="text-slate-600 text-sm">Understand contracts, notices, and rights in simple language.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-india-saffron shrink-0">
                                            <Scale className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">For Legal Aid</h4>
                                            <p className="text-slate-600 text-sm">Accelerate case processing and document review.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-india-green shrink-0">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">For NGOs</h4>
                                            <p className="text-slate-600 text-sm">Empower communities with instant legal literacy tools.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-slate-50">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Get in Touch</h2>
                    <p className="text-lg text-slate-600 mb-12">
                        Have questions about CodeBandhu? Our team is here to help you navigate the platform.
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-left">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-india-blue focus:border-transparent outline-none transition-all" placeholder="Aditya" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-india-blue focus:border-transparent outline-none transition-all" placeholder="Sharma" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-india-blue focus:border-transparent outline-none transition-all" placeholder="aditya@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-india-blue focus:border-transparent outline-none transition-all" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="button" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-india-saffron rounded-lg flex items-center justify-center">
                                    <Scale className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xl font-bold text-white">CodeBandhu</span>
                            </div>
                            <p className="max-w-xs text-sm">
                                Making Indian Law simple, accessible, and understandable for everyone through the power of AI.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p>© 2025 CodeBandhu. All rights reserved.</p>
                        <p>Made with ❤️ for India</p>
                    </div>
                </div>
            </footer>
        </div >
    );
}

function FeatureCard({ icon, title, description, color }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center mb-6", color)}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
    );
}
