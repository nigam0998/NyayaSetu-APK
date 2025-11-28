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

            if (!fullText.trim()) {
                alert("This PDF appears to be empty or contains only images. Please try a text-based PDF.");
                return null;
            }

            return fullText;
        } catch (error) {
            console.error("Error extracting text:", error);
            alert(`Failed to read PDF: ${error.message}. The file may be corrupted, encrypted, or password-protected.`);
            return null;
        } finally {
            setIsExtracting(false);
        }
    };

    const handleProcess = async () => {
        if (!file) return;

        const text = await extractTextFromPDF(file);
        if (text) {
            navigate('/dashboard/processing', {
                state: {
                    documentText: text,
                    fileName: file.name
                }
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">{t('upload.title')}</h2>
                <p className="text-ios-textSec">{t('upload.subtitle')}</p>
            </div>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "glass border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300",
                    isDragging
                        ? "border-ios-accent bg-ios-accent/10 scale-[1.02]"
                        : "border-white/10 hover:border-ios-accent/50 hover:bg-white/5",
                    file ? "border-ios-success/50 bg-ios-success/5" : ""
                )}
            >
                {!file ? (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-ios-accent to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group">
                            <UploadCloud className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                            {t('upload.dragDrop')}
                        </h3>
                        <p className="text-ios-textSec mb-8">{t('upload.browse')}</p>
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
                                <p className="text-sm text-ios-textSec">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setFile(null)}
                            className="p-3 hover:bg-white/10 rounded-full text-ios-textSec hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </div>

            {file && (
                <div className="mt-10 flex justify-end animate-fade-in-up">
                    <button
                        onClick={handleProcess}
                        disabled={isExtracting}
                        className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-ios-accent to-blue-600 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
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
