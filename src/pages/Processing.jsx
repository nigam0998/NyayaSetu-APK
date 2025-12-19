import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Loader2, Brain, FileText, Shield, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useConfig } from '../contexts/ConfigContext';



const steps = [
    { id: 1, label: 'OCR Extraction & Text Cleaning', icon: FileText, duration: 1500 },
    { id: 2, label: 'Identifying Rhetorical Roles', icon: Brain, duration: 2000 },
    { id: 3, label: 'Simplifying Legal Jargon', icon: Sparkles, duration: 2000 },
    { id: 4, label: 'Generating Strategic Advisory', icon: Shield, duration: 1500 },
];

export default function Processing() {
    const { geminiApiKey } = useConfig();
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const documentText = location.state?.documentText || '';
    const fileName = location.state?.fileName || 'Document';

    useEffect(() => {
        if (currentStep >= steps.length) {
            // All steps done, now call Gemini API
            const generateAnalysis = async () => {
                try {
                    const genAI = new GoogleGenerativeAI(geminiApiKey);
                    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

                    const prompt = `You are a legal document analyzer. Analyze the following legal document and provide:
1. A simplified explanation of 3 key clauses (identify the most important ones)
2. A summary with key facts and critical obligations
3. 3 actionable legal advisory suggestions

Document Text:
${documentText}

Please format your response as JSON with this structure:
{
  "simplification": [
    {"original": "original legal text", "simplified": "plain English explanation", "label": "clause name"},
    ...
  ],
  "summary": {
    "overview": "brief overview",
    "keyFacts": ["fact1", "fact2", ...],
    "obligations": ["obligation1", "obligation2", ...]
  },
  "advisory": [
    {"title": "action title", "description": "detailed description"},
    ...
  ]
}`;

                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    const analysisText = response.text();

                    // Try to extract JSON from the response
                    let analysisData;
                    try {
                        // Remove markdown code blocks if present
                        const jsonMatch = analysisText.match(/```json\n([\s\S]*?)\n```/) || analysisText.match(/```\n([\s\S]*?)\n```/);
                        const jsonText = jsonMatch ? jsonMatch[1] : analysisText;
                        analysisData = JSON.parse(jsonText);
                    } catch (e) {
                        console.error("Failed to parse JSON, using raw text", e);
                        analysisData = { rawAnalysis: analysisText };
                    }

                    navigate('/dashboard/results', {
                        state: {
                            analysis: analysisData,
                            fileName: fileName,
                            documentText: documentText
                        }
                    });
                } catch (error) {
                    console.error("Gemini analysis error:", error);
                    navigate('/dashboard/results', {
                        state: {
                            analysis: { error: "Failed to analyze document. Please try again." },
                            fileName: fileName
                        }
                    });
                }
            };

            generateAnalysis();
            return;
        }

        const timer = setTimeout(() => {
            setCurrentStep(prev => prev + 1);
        }, steps[currentStep].duration);

        return () => clearTimeout(timer);
    }, [currentStep, navigate, documentText, fileName, geminiApiKey]);

    return (
        <div className="max-w-2xl mx-auto text-center pt-10 px-4">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-neon-blue/20 blur-[100px] rounded-full" />
                <h2 className="relative text-3xl font-bold text-white mb-2">Analyzing Document</h2>
                <p className="relative text-slate-400">Our AI is processing your legal document...</p>
            </div>

            <div className="space-y-4 relative z-10">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isPending = index > currentStep;

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500",
                                isCurrent
                                    ? "bg-white/10 border-neon-blue/50 shadow-[0_0_20px_rgba(0,243,255,0.1)] scale-105"
                                    : "bg-glass-surface border-glass-border",
                                isPending && "opacity-50"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500",
                                isCompleted ? "bg-green-500/20 text-green-400" :
                                    isCurrent ? "bg-neon-blue/20 text-neon-blue" : "bg-white/5 text-slate-500"
                            )}>
                                {isCompleted ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : isCurrent ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <step.icon className="w-6 h-6" />
                                )}
                            </div>
                            <div className="text-left flex-1">
                                <p className={cn(
                                    "font-medium transition-colors text-lg",
                                    isCompleted ? "text-white" :
                                        isCurrent ? "text-neon-blue" : "text-slate-500"
                                )}>
                                    {step.label}
                                </p>
                                {isCurrent && (
                                    <div className="h-1 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple animate-slide-up w-full origin-left" />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
