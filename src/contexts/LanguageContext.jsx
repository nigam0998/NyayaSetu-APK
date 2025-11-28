import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

const translations = {
    en: {
        nav: {
            upload: 'Upload Document',
            documents: 'My Documents',
            settings: 'Settings',
            legalAid: 'Legal Aid',
        },
        dashboard: {
            title: 'Dashboard',
        },
        upload: {
            title: 'Upload Document',
            subtitle: 'Upload a legal document (PDF) to get started.',
            dragDrop: 'Drag & drop your PDF here',
            browse: 'or click to browse files',
            selectFile: 'Select File',
            process: 'Process Document',
            extracting: 'Extracting Text...',
        },
        legalAid: {
            title: 'Find Legal Aid',
            subtitle: 'Connect with experienced lawyers and legal aid volunteers near you',
            searchPlaceholder: 'Search by name or specialization...',
            selectLocation: 'Select Your Location',
            allCities: 'All Cities',
            selectSpecialization: 'Select Specialization',
            allSpecializations: 'All Specializations',
            found: 'Found',
            providers: 'legal aid providers',
            call: 'Call',
            email: 'Email',
            experience: 'Experience',
            languages: 'Languages',
            availability: 'Availability',
            noResults: 'No legal aid providers found matching your criteria.',
            clearFilters: 'Clear Filters',
        },
        account: {
            title: 'My Account',
            subtitle: 'Manage your profile settings',
            editProfile: 'Edit Profile',
            cancel: 'Cancel',
            firstName: 'First Name',
            lastName: 'Last Name',
            emailAddress: 'Email Address',
            emailCannotChange: 'Email cannot be changed.',
            saveChanges: 'Save Changes',
            freePlan: 'Free Plan',
            updateSuccess: 'Profile updated successfully!',
            updateFailed: 'Failed to update profile.',
        },
    },
    hi: {
        nav: {
            upload: 'दस्तावेज़ अपलोड करें',
            documents: 'मेरे दस्तावेज़',
            settings: 'सेटिंग्स',
            legalAid: 'कानूनी सहायता',
        },
        dashboard: {
            title: 'डैशबोर्ड',
        },
        upload: {
            title: 'दस्तावेज़ अपलोड करें',
            subtitle: 'शुरू करने के लिए एक कानूनी दस्तावेज़ (पीडीएफ) अपलोड करें।',
            dragDrop: 'अपनी पीडीएफ यहां खींचें और छोड़ें',
            browse: 'या फ़ाइलों को ब्राउज़ करने के लिए क्लिक करें',
            selectFile: 'फ़ाइल चुनें',
            process: 'दस्तावेज़ प्रक्रिया करें',
            extracting: 'पाठ निकाला जा रहा है...',
        },
        legalAid: {
            title: 'कानूनी सहायता खोजें',
            subtitle: 'अपने पास अनुभवी वकीलों और कानूनी सहायता स्वयंसेवकों से जुड़ें',
            searchPlaceholder: 'नाम या विशेषज्ञता के आधार पर खोजें...',
            selectLocation: 'अपना स्थान चुनें',
            allCities: 'सभी शहर',
            selectSpecialization: 'विशेषज्ञता चुनें',
            allSpecializations: 'सभी विशेषज्ञताएं',
            found: 'मिला',
            providers: 'कानूनी सहायता प्रदाता',
            call: 'कॉल करें',
            email: 'ईमेल करें',
            experience: 'अनुभव',
            languages: 'भाषाएं',
            availability: 'उपलब्धता',
            noResults: 'आपके मानदंडों से मेल खाने वाले कोई कानूनी सहायता प्रदाता नहीं मिले।',
            clearFilters: 'फ़िल्टर साफ़ करें',
        },
        account: {
            title: 'मेरा खाता',
            subtitle: 'अपनी प्रोफ़ाइल सेटिंग्स प्रबंधित करें',
            editProfile: 'प्रोफ़ाइल संपादित करें',
            cancel: 'रद्द करें',
            firstName: 'पहला नाम',
            lastName: 'अंतिम नाम',
            emailAddress: 'ईमेल पता',
            emailCannotChange: 'ईमेल बदला नहीं जा सकता।',
            saveChanges: 'परिवर्तन सहेजें',
            freePlan: 'मुक्त योजना',
            updateSuccess: 'प्रोफ़ाइल सफलतापूर्वक अपडेट किया गया!',
            updateFailed: 'प्रोफ़ाइल अपडेट करने में विफल।',
        },
    },
    pa: {
        nav: {
            upload: 'ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ',
            documents: 'ਮੇਰੇ ਦਸਤਾਵੇਜ਼',
            settings: 'ਸੈਟਿੰਗਜ਼',
            legalAid: 'ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ',
        },
        dashboard: {
            title: 'ਡੈਸ਼ਬੋਰਡ',
        },
        upload: {
            title: 'ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ',
            subtitle: 'ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਇੱਕ ਕਾਨੂੰਨੀ ਦਸਤਾਵੇਜ਼ (PDF) ਅੱਪਲੋਡ ਕਰੋ।',
            dragDrop: 'ਆਪਣੀ PDF ਇੱਥੇ ਖਿੱਚੋ ਅਤੇ ਛੱਡੋ',
            browse: 'ਜਾਂ ਫਾਈਲਾਂ ਬ੍ਰਾਊਜ਼ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ',
            selectFile: 'ਫਾਈਲ ਚੁਣੋ',
            process: 'ਦਸਤਾਵੇਜ਼ ਪ੍ਰਕਿਰਿਆ ਕਰੋ',
            extracting: 'ਟੈਕਸਟ ਕੱਢਿਆ ਜਾ ਰਿਹਾ ਹੈ...',
        },
        legalAid: {
            title: 'ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ ਲੱਭੋ',
            subtitle: 'ਆਪਣੇ ਨੇੜੇ ਤਜਰਬੇਕਾਰ ਵਕੀਲਾਂ ਅਤੇ ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ ਵਲੰਟੀਅਰਾਂ ਨਾਲ ਜੁੜੋ',
            searchPlaceholder: 'ਨਾਮ ਜਾਂ ਮਾਹਰਤਾ ਦੁਆਰਾ ਖੋਜੋ...',
            selectLocation: 'ਆਪਣਾ ਸਥਾਨ ਚੁਣੋ',
            allCities: 'ਸਾਰੇ ਸ਼ਹਿਰ',
            selectSpecialization: 'ਮਾਹਰਤਾ ਚੁਣੋ',
            allSpecializations: 'ਸਾਰੀਆਂ ਮਾਹਰਤਾਵਾਂ',
            found: 'ਮਿਲੇ',
            providers: 'ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ ਪ੍ਰਦਾਤਾ',
            call: 'ਕਾਲ ਕਰੋ',
            email: 'ਈਮੇਲ ਕਰੋ',
            experience: 'ਤਜਰਬਾ',
            languages: 'ਭਾਸ਼ਾਵਾਂ',
            availability: 'ਉਪਲਬਧਤਾ',
            noResults: 'ਤੁਹਾਡੇ ਮਾਪਦੰਡ ਨਾਲ ਮੇਲ ਖਾਂਦੇ ਕੋਈ ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ ਪ੍ਰਦਾਤਾ ਨਹੀਂ ਮਿਲੇ।',
            clearFilters: 'ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ',
        },
        account: {
            title: 'ਮੇਰਾ ਖਾਤਾ',
            subtitle: 'ਆਪਣੇ ਪ੍ਰੋਫਾਈਲ ਸੈਟਿੰਗਜ਼ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ',
            editProfile: 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ',
            cancel: 'ਰੱਦ ਕਰੋ',
            firstName: 'ਪਹਿਲਾ ਨਾਮ',
            lastName: 'ਆਖਰੀ ਨਾਮ',
            emailAddress: 'ਈਮੇਲ ਪਤਾ',
            emailCannotChange: 'ਈਮੇਲ ਬਦਲੀ ਨਹੀਂ ਜਾ ਸਕਦੀ।',
            saveChanges: 'ਤਬਦੀਲੀਆਂ ਸੁਰੱਖਿਅਤ ਕਰੋ',
            freePlan: 'ਮੁਫ਼ਤ ਯੋਜਨਾ',
            updateSuccess: 'ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਅੱਪਡੇਟ ਕੀਤਾ ਗਿਆ!',
            updateFailed: 'ਪ੍ਰੋਫਾਈਲ ਅੱਪਡੇਟ ਕਰਨ ਵਿੱਚ ਅਸਫਲ।',
        },
    },
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');
    const [apiKey, setApiKey] = useState('51b41678b6-7a84-4376-ab16-32805268447a');

    const changeLanguage = (langCode) => {
        setLanguage(langCode);
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t, apiKey, setApiKey }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
