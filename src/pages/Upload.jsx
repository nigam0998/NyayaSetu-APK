import React, { useState } from 'react';
import { UploadCloud, File, X, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import * as pdfjsLib from 'pdfjs-dist';
import { useLanguage } from '../contexts/LanguageContext';

// Match worker version to the installed pdfjs-dist version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function Upload() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
        } else {
            alert('Please upload a PDF file');
        }
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const extractTextFromPDF = async (file) => {
        setIsExtracting(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({
                data: arrayBuffer,
                verbosity: 0
            });
            const pdf = await loadingTask.promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
            }

            return fullText;
        } catch (error) {
            console.error("Error extracting text:", error);
            // Don't alert here, return empty string so we can fall back to image processing
            return "";
        } finally {
            setIsExtracting(false);
        }
    };

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleProcess = async () => {
        if (!file) return;

        const text = await extractTextFromPDF(file);

        // Read file as base64 for fallback
        let base64 = null;
        try {
            base64 = await readFileAsBase64(file);
        } catch (e) {
            console.error("Error reading file as base64", e);
        }

        navigate('/dashboard/processing', {
            state: {
                documentText: text,
                fileData: base64,
                mimeType: file.type,
                fileName: file.name
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">{t('upload.title')}</h2>
                <p className="text-slate-400">{t('upload.subtitle')}</p>
            </div>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "bg-glass-surface border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300",
                    isDragging
                        ? "border-neon-blue bg-neon-blue/10 scale-[1.02]"
                        : "border-white/10 hover:border-neon-blue/50 hover:bg-white/5",
                    file ? "border-green-500/50 bg-green-500/5" : ""
                )}
            >
                {!file ? (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-neon-blue/20 group">
                            <UploadCloud className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                            {t('upload.dragDrop')}
                        </h3>
                        <p className="text-slate-400 mb-8">{t('upload.browse')}</p>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="px-8 py-3.5 bg-white text-black rounded-xl font-bold hover:bg-gray-200 cursor-pointer transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
                        >
                            {t('upload.selectFile')}
                        </label>
                    </div>
                ) : (
                    <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                                <File className="w-7 h-7 text-red-500" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-white text-lg">{file.name}</p>
                                <p className="text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setFile(null)}
                            className="p-3 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </div>

            {file && (
                <div className="mt-10 flex justify-end animate-slide-up">
                    <button
                        onClick={handleProcess}
                        disabled={isExtracting}
                        className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-neon-blue/30 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
                    >
                        {isExtracting ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                {t('upload.extracting')}
                            </>
                        ) : (
                            <>
                                {t('upload.process')} <ArrowRight className="w-6 h-6" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
