import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { cn } from '../lib/utils';

const slides = [
    {
        id: 1,
        title: "Welcome to CodeBandhu",
        description: "Your personal AI Legal Assistant. Simplifying law for everyone.",
        icon: Shield,
        color: "text-neon-blue",
        bg: "bg-neon-blue/10"
    },
    {
        id: 2,
        title: "Simplify Documents",
        description: "Upload complex legal documents and get simple, easy-to-understand summaries instantly.",
        icon: FileText,
        color: "text-neon-purple",
        bg: "bg-neon-purple/10"
    },
    {
        id: 3,
        title: "Chat in Your Language",
        description: "Ask questions about your documents in Hindi, Tamil, Punjabi, and more.",
        icon: MessageSquare,
        color: "text-neon-pink",
        bg: "bg-neon-pink/10"
    }
];

export default function Onboarding() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(curr => curr + 1);
        } else {
            completeOnboarding();
        }
    };

    const completeOnboarding = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-blue/10 via-dark-bg to-dark-bg -z-10" />

            <div className="w-full max-w-md flex-1 flex flex-col justify-center">
                <div className="relative h-[400px]">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={cn(
                                "absolute inset-0 flex flex-col items-center text-center transition-all duration-500 ease-in-out transform",
                                index === currentSlide
                                    ? "opacity-100 translate-x-0 scale-100"
                                    : index < currentSlide
                                        ? "opacity-0 -translate-x-full scale-95"
                                        : "opacity-0 translate-x-full scale-95"
                            )}
                        >
                            <div className={cn(
                                "w-32 h-32 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-white/10",
                                slide.bg
                            )}>
                                <slide.icon className={cn("w-16 h-16", slide.color)} />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">{slide.title}</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">{slide.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="w-full max-w-md mt-8">
                {/* Indicators */}
                <div className="flex justify-center gap-2 mb-8">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                index === currentSlide ? "w-8 bg-neon-blue" : "w-2 bg-white/20"
                            )}
                        />
                    ))}
                </div>

                {/* Buttons */}
                <button
                    onClick={handleNext}
                    className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all flex items-center justify-center gap-2 group"
                >
                    {currentSlide === slides.length - 1 ? (
                        <>Get Started <Check className="w-5 h-5" /></>
                    ) : (
                        <>Next <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                </button>

                <button
                    onClick={completeOnboarding}
                    className="w-full mt-4 py-2 text-slate-500 text-sm font-medium hover:text-white transition-colors"
                >
                    Skip
                </button>
            </div>
        </div>
    );
}
