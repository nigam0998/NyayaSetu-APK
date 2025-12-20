import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useConfig } from '../contexts/ConfigContext';

// Remove static initialization
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const INITIAL_MESSAGE = {
    id: 1,
    text: "Namaste! I am your NyayaSetu Legal Assistant. How can I help you understand your documents today?",
    sender: 'bot',
    timestamp: new Date()
};

export default function AIAssistant() {
    const { geminiApiKey } = useConfig();
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        if (!geminiApiKey) {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: "Please configure the Gemini API Key in Admin Settings.",
                sender: 'bot',
                timestamp: new Date()
            }]);
            return;
        }

        const userMessage = {
            id: messages.length + 1,
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-flash-latest",
                systemInstruction: "You are a helpful legal assistant. Your responses must be short, crisp, and easy to understand for a common user. Avoid long paragraphs and complex legal jargon. Use bullet points where possible."
            });
            const result = await model.generateContent(input);
            const response = await result.response;
            const botResponse = response.text();

            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            }]);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: `I apologize, but I encountered an error: ${error.message || "Unknown error"}. Please check your API key or internet connection.`,
                sender: 'bot',
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center justify-center transition-all z-50 hover:scale-110 hover:rotate-12",
                    isOpen && "hidden"
                )}
            >
                <MessageSquare className="w-7 h-7" />
            </button>

            {/* Chat Window */}
            <div className={cn(
                "fixed z-50 transition-all duration-500 ease-in-out flex flex-col bg-dark-bg/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden",
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
                isExpanded
                    ? "inset-0 md:inset-10 rounded-2xl"
                    : "bottom-20 md:bottom-8 right-6 w-[90vw] md:w-[400px] h-[600px] rounded-2xl"
            )}>
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white flex items-center gap-2">
                                Legal Assistant <Sparkles className="w-3 h-3 text-neon-yellow animate-pulse" />
                            </h3>
                            <p className="text-xs text-neon-blue flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse"></span>
                                Online & Ready
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors hidden md:block"
                        >
                            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-4 max-w-[85%]",
                                msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg",
                                msg.sender === 'user' ? "bg-white/10 text-white" : "bg-gradient-to-br from-neon-blue to-neon-purple text-white"
                            )}>
                                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={cn(
                                "p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm border",
                                msg.sender === 'user'
                                    ? "bg-neon-blue/10 border-neon-blue/20 text-white rounded-tr-none"
                                    : "bg-white/5 border-white/10 text-slate-200 rounded-tl-none"
                            )}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-4 max-w-[85%]">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-white flex items-center justify-center shrink-0 shadow-lg">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none shadow-lg">
                                <div className="flex gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-neon-pink rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a legal question..."
                            className="flex-1 px-6 py-3 rounded-full bg-dark-bg border border-white/10 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none text-sm text-white placeholder-slate-500 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="p-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
