import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Loader2, Brain, FileText, Shield } from 'lucide-react';
import { cn } from '../lib/utils';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyArLIA7jK4UIGxC0hDMRYCT1nVaTdABIBI");

const steps = [
    { id: 1, label: 'OCR Extraction & Text Cleaning', icon: FileText, duration: 1500 },
    { id: 2, label: 'Identifying Rhetorical Roles (Issue, Facts, Arguments)', icon: Brain, duration: 2000 },
    { id: 3, label: 'Simplifying Legal Jargon (Legal-BERT)', icon: FileText, duration: 2000 },
    { id: 4, label: 'Generating Summary & Advisory', icon: Shield, duration: 1500 },
];

export default function Processing() {
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
                    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
    }, [currentStep, navigate, documentText, fileName]);

    return (
        <div className="max-w-2xl mx-auto text-center pt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Document</h2>
            <p className="text-slate-600 mb-12">Our AI is processing your legal document...</p>

            <div className="space-y-6">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isPending = index > currentStep;

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border transition-all duration-500",
                                isCurrent ? "bg-indigo-50 border-indigo-200 scale-105 shadow-md" : "bg-white border-slate-100",
                                isPending && "opacity-50"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                isCompleted ? "bg-green-100 text-green-600" :
                                    isCurrent ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"
                            )}>
                                {isCompleted ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : isCurrent ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <step.icon className="w-5 h-5" />
                                )}
                            </div>
                            <div className="text-left flex-1">
                                <p className={cn(
                                    "font-medium transition-colors",
                                    isCompleted ? "text-slate-900" :
                                        isCurrent ? "text-indigo-900" : "text-slate-500"
                                )}>
                                    {step.label}
                                </p>
                                {isCurrent && (
                                    <p className="text-xs text-indigo-600 mt-1 animate-pulse">Processing...</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
