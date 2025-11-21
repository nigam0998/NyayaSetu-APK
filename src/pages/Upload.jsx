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
                <h2 className="text-2xl font-bold text-slate-900">{t('upload.title')}</h2>
                <p className="text-slate-600">{t('upload.subtitle')}</p>
            </div>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "border-2 border-dashed rounded-2xl p-12 text-center transition-all",
                    isDragging
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-300 hover:border-indigo-400 bg-white",
                    file ? "border-indigo-200 bg-indigo-50/30" : ""
                )}
            >
                {!file ? (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <UploadCloud className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {t('upload.dragDrop')}
                        </h3>
                        <p className="text-slate-500 mb-6">{t('upload.browse')}</p>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="px-6 py-3 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                            {t('upload.selectFile')}
                        </label>
                    </div>
                ) : (
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-indigo-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <File className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-slate-900">{file.name}</p>
                                <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setFile(null)}
                            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {file && (
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleProcess}
                        disabled={isExtracting}
                        className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isExtracting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {t('upload.extracting')}
                            </>
                        ) : (
                            <>
                                {t('upload.process')} <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
