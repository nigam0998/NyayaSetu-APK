import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';

const INITIAL_MESSAGE = {
    id: 1,
    text: "Namaste! I am your CodeBandhu Legal Assistant. How can I help you understand your documents today?",
    sender: 'bot',
    timestamp: new Date()
};

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyArLIA7jK4UIGxC0hDMRYCT1nVaTdABIBI");

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
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
            // Call Gemini API
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
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
                    "fixed bottom-6 right-6 w-14 h-14 bg-india-saffron hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50",
                    isOpen && "hidden"
                )}
            >
                <MessageSquare className="w-7 h-7" />
            </button>

            {/* Chat Window */}
            <div className={cn(
                "fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col transition-all z-50 overflow-hidden",
                isOpen ? "h-[500px] opacity-100 translate-y-0" : "h-0 opacity-0 translate-y-10 pointer-events-none"
            )}>
                {/* Header */}
                <div className="bg-india-blue p-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold">Legal Assistant</h3>
                            <p className="text-xs text-blue-200 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-3 max-w-[85%]",
                                msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                msg.sender === 'user' ? "bg-india-saffron text-white" : "bg-india-blue text-white"
                            )}>
                                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={cn(
                                "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                msg.sender === 'user'
                                    ? "bg-india-saffron text-white rounded-tr-none"
                                    : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
                            )}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-3 max-w-[85%]">
                            <div className="w-8 h-8 rounded-full bg-india-blue text-white flex items-center justify-center shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a legal question..."
                            className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:border-india-blue focus:ring-1 focus:ring-india-blue outline-none text-sm text-slate-900"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="p-2 bg-india-blue text-white rounded-full hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
