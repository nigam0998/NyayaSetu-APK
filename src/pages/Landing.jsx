import React from 'react';
import { ArrowRight, FileText, Shield, Brain, Scale, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import AshokaChakra from '../components/AshokaChakra';

export default function Landing() {
    return (
        <div className="min-h-screen bg-ios-bg font-sans text-ios-text selection:bg-ios-accent selection:text-white overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ios-accent/20 via-ios-bg to-ios-bg -z-10" />
            <div className="fixed top-0 left-0 w-96 h-96 bg-india-saffron/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-india-green/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shadow-lg shadow-india-saffron/20">
                            <AshokaChakra className="w-8 h-8 text-india-saffron" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight group-hover:text-ios-accent transition-colors">CodeBandhu</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ios-textSec">
                            <a href="#features" className="hover:text-white transition-colors hover:scale-105 transform duration-200">Features</a>
                            <a href="#about" className="hover:text-white transition-colors hover:scale-105 transform duration-200">About</a>
                            <a href="#contact" className="hover:text-white transition-colors hover:scale-105 transform duration-200">Contact</a>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/login" className="px-6 py-2.5 text-white hover:text-ios-accent font-semibold transition-colors relative group">
                                Login
                                <span className="absolute bottom-1 left-6 right-6 h-0.5 bg-ios-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </Link>
                            <Link to="/signup" className="px-6 py-2.5 bg-white text-black rounded-xl hover:bg-gray-200 font-bold transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 active:translate-y-0">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-40 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 bg-india-green rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-ios-textSec">Empowering Digital India</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                        Democratizing Legal <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-india-saffron via-white to-india-green animate-gradient">
                            Justice for Every Indian
                        </span>
                    </h1>
                    <p className="text-xl text-ios-textSec mb-12 max-w-2xl mx-auto leading-relaxed">
                        CodeBandhu bridges the gap between complex legal documents and the common citizen.
                        Powered by advanced AI to Simplify, Summarize, and Advise.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Link to="/signup" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-india-saffron to-orange-600 rounded-2xl hover:shadow-orange-500/40 transition-all shadow-xl shadow-orange-500/20 hover:-translate-y-1">
                            Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-md">
                            View Demo
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="py-10 border-y border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <p className="text-4xl font-bold text-india-blue mb-1 drop-shadow-lg">10k+</p>
                        <p className="text-sm text-ios-textSec font-medium">Documents Processed</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-india-saffron mb-1 drop-shadow-lg">500+</p>
                        <p className="text-sm text-ios-textSec font-medium">Legal Experts</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-india-green mb-1 drop-shadow-lg">12</p>
                        <p className="text-sm text-ios-textSec font-medium">Indian Languages</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-white mb-1 drop-shadow-lg">24/7</p>
                        <p className="text-sm text-ios-textSec font-medium">AI Assistance</p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="px-6 py-32 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose CodeBandhu?</h2>
                        <p className="text-lg text-ios-textSec max-w-2xl mx-auto">Built specifically for the Indian legal framework to help citizens, students, and professionals.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FileText className="w-8 h-8 text-india-blue" />}
                            title="Instant Simplification"
                            description="Translate complex legalese into plain English (and Hindi soon) using our Legal-BERT powered engine."
                            color="bg-blue-500/10 border-blue-500/20"
                        />
                        <FeatureCard
                            icon={<Brain className="w-8 h-8 text-india-saffron" />}
                            title="Smart Summarization"
                            description="Get concise summaries that highlight the Issue, Facts, Arguments, and Conclusions automatically."
                            color="bg-orange-500/10 border-orange-500/20"
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-india-green" />}
                            title="Actionable Advisory"
                            description="Receive non-binding legal suggestions on what steps to take next (e.g., RTI, FIR, Grievance)."
                            color="bg-green-500/10 border-green-500/20"
                        />
                    </div>
                </div>
            </section>


            {/* About Section */}
            <section id="about" className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 -z-10" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm font-medium mb-6">
                                <Building2 className="w-4 h-4" />
                                <span>Our Mission</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Bridging the Legal Gap</h2>
                            <p className="text-lg text-ios-textSec mb-6 leading-relaxed">
                                In India, millions of citizens struggle to understand their legal rights due to complex language and lack of accessible resources.
                            </p>
                            <p className="text-lg text-ios-textSec mb-8 leading-relaxed">
                                <span className="font-semibold text-white">CodeBandhu</span> is an AI-powered initiative designed to democratize legal access. We combine cutting-edge Natural Language Processing (NLP) with deep legal expertise to make justice accessible to everyone, from rural citizens to urban professionals.
                            </p>
                            <div className="flex gap-12">
                                <div>
                                    <p className="text-4xl font-bold text-white mb-2">98%</p>
                                    <p className="text-sm text-ios-textSec">Accuracy Rate</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-white mb-2">24/7</p>
                                    <p className="text-sm text-ios-textSec">Availability</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-india-saffron/20 to-india-green/20 rounded-3xl transform rotate-3 blur-xl"></div>
                            <div className="relative glass p-10 rounded-3xl">
                                <div className="space-y-8">
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-india-blue shrink-0 border border-white/10">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-2">For Citizens</h4>
                                            <p className="text-ios-textSec text-sm leading-relaxed">Understand contracts, notices, and rights in simple language.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-india-saffron shrink-0 border border-white/10">
                                            <Scale className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-2">For Legal Aid</h4>
                                            <p className="text-ios-textSec text-sm leading-relaxed">Accelerate case processing and document review.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-india-green shrink-0 border border-white/10">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-2">For NGOs</h4>
                                            <p className="text-ios-textSec text-sm leading-relaxed">Empower communities with instant legal literacy tools.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 relative">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Get in Touch</h2>
                    <p className="text-lg text-ios-textSec mb-12">
                        Have questions about CodeBandhu? Our team is here to help you navigate the platform.
                    </p>

                    <div className="glass p-10 rounded-3xl text-left">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-ios-textSec mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none transition-all placeholder-white/20" placeholder="Aditya" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-ios-textSec mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none transition-all placeholder-white/20" placeholder="Sharma" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ios-textSec mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none transition-all placeholder-white/20" placeholder="aditya@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-ios-textSec mb-2">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-ios-accent focus:border-transparent outline-none transition-all placeholder-white/20" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="button" className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-ios-textSec py-16 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shadow-lg shadow-india-saffron/20">
                                    <AshokaChakra className="w-8 h-8 text-india-saffron" />
                                </div>
                                <span className="text-2xl font-bold text-white">CodeBandhu</span>
                            </div>
                            <p className="max-w-xs text-sm leading-relaxed">
                                Making Indian Law simple, accessible, and understandable for everyone through the power of AI.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Product</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Legal</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p>© 2025 CodeBandhu. All rights reserved.</p>
                        <p>Made with ❤️ for India</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description, color }) {
    return (
        <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border", color)}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-ios-accent transition-colors">{title}</h3>
            <p className="text-ios-textSec leading-relaxed">{description}</p>
        </div>
    );
}
