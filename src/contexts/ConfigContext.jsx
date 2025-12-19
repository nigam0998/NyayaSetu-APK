import React, { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext();

export function useConfig() {
    return useContext(ConfigContext);
}

export function ConfigProvider({ children }) {
    const [geminiApiKey, setGeminiApiKey] = useState(() => {
        return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('geminiApiKey') || '';
    });

    const [bhashiniApiKey, setBhashiniApiKey] = useState(() => {
        return localStorage.getItem('bhashiniApiKey') || import.meta.env.VITE_BHASHINI_API_KEY || '';
    });

    useEffect(() => {
        if (geminiApiKey) {
            localStorage.setItem('geminiApiKey', geminiApiKey);
        }
    }, [geminiApiKey]);

    useEffect(() => {
        if (bhashiniApiKey) {
            localStorage.setItem('bhashiniApiKey', bhashiniApiKey);
        }
    }, [bhashiniApiKey]);

    const updateGeminiKey = (key) => {
        setGeminiApiKey(key);
    };

    const updateBhashiniKey = (key) => {
        setBhashiniApiKey(key);
    };

    const value = {
        geminiApiKey,
        bhashiniApiKey,
        updateGeminiKey,
        updateBhashiniKey
    };

    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    );
}
