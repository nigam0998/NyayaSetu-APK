import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'How it Works', href: '#how-it-works' },
        { label: 'Testimonials', href: '#testimonials' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled ? "bg-dark-bg/80 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-6"
        )}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.3)] group-hover:scale-105 transition-transform">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        CodeBandhu
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}

                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <ThemeToggle />
                        <LanguageSelector />
                    </div>

                    <Link
                        to="/login"
                        className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/signup"
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(188,19,254,0.5)] transition-all hover:scale-105"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-white"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                "md:hidden absolute top-full left-0 right-0 bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden",
                isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="p-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium text-slate-300 hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="h-px bg-white/10 my-2" />

                    <div className="flex items-center justify-between py-2">
                        <span className="text-slate-300">Theme</span>
                        <ThemeToggle />
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-slate-300">Language</span>
                        <LanguageSelector />
                    </div>

                    <div className="h-px bg-white/10 my-2" />
                    <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-center py-3 rounded-xl bg-white/5 text-white font-medium"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-center py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
