import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Brain, FileText, Lock, Globe, Building2, Users, Scale } from 'lucide-react';
import Navbar from '../components/Navbar';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

export default function Landing() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        const hasSeen = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeen) {
            navigate('/onboarding');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-dark-bg text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-neon-blue/20 rounded-full blur-[120px] animate-pulse-glow" />
                    <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-slide-up">
                        <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                        <span className="text-sm font-medium text-slate-300">{t('landing.hero.badge')}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {t('landing.hero.title')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                            {t('landing.hero.subtitle')}
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        {t('landing.hero.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Link
                            to="/signup"
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold text-lg shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:shadow-[0_0_50px_rgba(188,19,254,0.6)] transition-all hover:scale-105 flex items-center gap-2"
                        >
                            {t('landing.hero.startFree')} <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/login"
                            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-md"
                        >
                            {t('landing.hero.liveDemo')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('landing.features.title')}</h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t('landing.features.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FileText className="w-8 h-8 text-neon-blue" />}
                            title={t('landing.features.simplification.title')}
                            description={t('landing.features.simplification.desc')}
                            color="bg-neon-blue/10 border-neon-blue/20"
                        />
                        <FeatureCard
                            icon={<Brain className="w-8 h-8 text-neon-purple" />}
                            title={t('landing.features.summarization.title')}
                            description={t('landing.features.summarization.desc')}
                            color="bg-neon-purple/10 border-neon-purple/20"
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-neon-pink" />}
                            title={t('landing.features.advisory.title')}
                            description={t('landing.features.advisory.desc')}
                            color="bg-neon-pink/10 border-neon-pink/20"
                        />
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section id="how-it-works" className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 -z-10" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('landing.howItWorks.title')}</h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t('landing.howItWorks.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent -translate-y-1/2 z-0" />

                        {[
                            { step: "01", title: t('landing.howItWorks.step1.title'), desc: t('landing.howItWorks.step1.desc'), icon: FileText },
                            { step: "02", title: t('landing.howItWorks.step2.title'), desc: t('landing.howItWorks.step2.desc'), icon: Brain },
                            { step: "03", title: t('landing.howItWorks.step3.title'), desc: t('landing.howItWorks.step3.desc'), icon: Zap }
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 bg-dark-bg p-8 rounded-3xl border border-white/10 text-center group hover:border-neon-blue/50 transition-colors">
                                <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-neon-blue group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 mb-4">
                                    STEP {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('landing.testimonials.title')}</h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t('landing.testimonials.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Rahul S.", role: "Small Business Owner", text: "CodeBandhu saved me thousands in legal fees. I understood my rental agreement in minutes!" },
                            { name: "Priya M.", role: "Law Student", text: "An incredible tool for quick case summaries. It helps me prepare for my internships so much faster." },
                            { name: "Amit K.", role: "Freelancer", text: "I was confused by a client contract. CodeBandhu highlighted the risky clauses instantly. Highly recommended!" }
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-glass-surface p-8 rounded-3xl border border-glass-border hover:bg-white/5 transition-colors">
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Zap key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                                        <p className="text-xs text-slate-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 -z-10" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-blue/10 text-neon-blue border border-neon-blue/20 rounded-full text-sm font-medium mb-6">
                                <Building2 className="w-4 h-4" />
                                <span>{t('landing.about.mission')}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('landing.about.title')}</h2>
                            <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                                {t('landing.about.desc1')}
                            </p>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                <span className="font-semibold text-white">CodeBandhu</span> {t('landing.about.desc2')}
                            </p>
                            <div className="flex gap-12">
                                <div>
                                    <p className="text-4xl font-bold text-white mb-2">98%</p>
                                    <p className="text-sm text-slate-400">{t('landing.about.stats.accuracy')}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-white mb-2">24/7</p>
                                    <p className="text-sm text-slate-400">{t('landing.about.stats.availability')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 rounded-3xl transform rotate-3 blur-xl"></div>
                            <div className="relative bg-glass-surface p-10 rounded-3xl border border-glass-border">
                                <div className="space-y-8">
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-neon-blue shrink-0 border border-white/10">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-2">{t('landing.about.citizens.title')}</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">{t('landing.about.citizens.desc')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-neon-purple shrink-0 border border-white/10">
                                            <Scale className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-2">{t('landing.about.legalAid.title')}</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">{t('landing.about.legalAid.desc')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-neon-pink shrink-0 border border-white/10">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-2">{t('landing.about.ngos.title')}</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">{t('landing.about.ngos.desc')}</p>
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
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('landing.contact.title')}</h2>
                    <p className="text-lg text-slate-400 mb-12">
                        {t('landing.contact.subtitle')}
                    </p>

                    <div className="bg-glass-surface p-10 rounded-3xl text-left border border-glass-border">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">{t('landing.contact.firstName')}</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all placeholder-white/20" placeholder="Aditya" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">{t('landing.contact.lastName')}</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all placeholder-white/20" placeholder="Sharma" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">{t('landing.contact.email')}</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all placeholder-white/20" placeholder="aditya@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">{t('landing.contact.message')}</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all placeholder-white/20" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="button" className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                                {t('landing.contact.send')}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-slate-400 py-16 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shadow-lg shadow-neon-blue/20">
                                    <Shield className="w-8 h-8 text-neon-blue" />
                                </div>
                                <span className="text-2xl font-bold text-white">CodeBandhu</span>
                            </div>
                            <p className="max-w-xs text-sm leading-relaxed">
                                {t('landing.footer.desc')}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">{t('landing.footer.product')}</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#features" className="hover:text-white transition-colors">{t('nav.features')}</a></li>
                                <li><Link to="/login" className="hover:text-white transition-colors">{t('nav.signIn')}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">{t('landing.footer.legal')}</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footer.privacy')}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footer.terms')}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{t('landing.footer.disclaimer')}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p>© 2025 CodeBandhu. {t('landing.footer.rights')}</p>
                        <p>{t('landing.footer.madeWith')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description, color }) {
    return (
        <div className="bg-glass-surface p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group border border-glass-border">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border", color)}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
    );
}
