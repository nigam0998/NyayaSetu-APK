import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, Award, Star, Filter, Briefcase, X, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const lawyersData = [
    {
        id: 1,
        name: "Adv. Rajesh Kumar",
        specialization: "Criminal Law",
        experience: "15 years",
        city: "New Delhi",
        state: "Delhi",
        rating: 4.8,
        languages: ["English", "Hindi"],
        availability: "Mon-Fri",
        phone: "+91 98765 43210",
        email: "rajesh.kumar@legalaid.in",
        fees: "₹500 per consultation"
    },
    {
        id: 2,
        name: "Adv. Priya Sharma",
        specialization: "Family Law",
        experience: "10 years",
        city: "Mumbai",
        state: "Maharashtra",
        rating: 4.9,
        languages: ["English", "Hindi", "Marathi"],
        availability: "Mon-Sat",
        phone: "+91 98765 43211",
        email: "priya.sharma@legalaid.in",
        fees: "₹700 per consultation"
    },
    {
        id: 3,
        name: "Adv. Amit Patel",
        specialization: "Corporate Law",
        experience: "12 years",
        city: "Ahmedabad",
        state: "Gujarat",
        rating: 4.7,
        languages: ["English", "Gujarati", "Hindi"],
        availability: "Mon-Fri",
        phone: "+91 98765 43212",
        email: "amit.patel@legalaid.in",
        fees: "₹1000 per consultation"
    },
    {
        id: 4,
        name: "Adv. Sneha Gupta",
        specialization: "Civil Rights",
        experience: "8 years",
        city: "Bangalore",
        state: "Karnataka",
        rating: 4.6,
        languages: ["English", "Kannada", "Hindi"],
        availability: "Tue-Sun",
        phone: "+91 98765 43213",
        email: "sneha.gupta@legalaid.in",
        fees: "Pro Bono (Free)"
    },
    // Jalandhar (Punjab)
    {
        id: 5,
        name: "Advocate Vikram Singh",
        specialization: "Criminal Defense",
        experience: "18 years",
        city: "Jalandhar",
        state: "Punjab",
        rating: 4.9,
        phone: "+91 98765 43214",
        email: "vikram.singh@legalaid.in",
        languages: ["Punjabi", "Hindi", "English"],
        fees: "₹500 per consultation",
        availability: "Mon-Sat, 9 AM - 6 PM"
    },
    {
        id: 6,
        name: "Advocate Neha Kapoor",
        specialization: "Family & Divorce Law",
        experience: "12 years",
        city: "Jalandhar",
        state: "Punjab",
        rating: 4.7,
        phone: "+91 98765 43224",
        email: "neha.kapoor@legalaid.in",
        languages: ["English", "Hindi", "Punjabi"],
        fees: "₹600 per consultation",
        availability: "Mon-Fri, 10 AM - 5 PM"
    },
    // Amritsar (Punjab)
    {
        id: 7,
        name: "Advocate Rohan Mehra",
        specialization: "Property & Real Estate",
        experience: "15 years",
        city: "Amritsar",
        state: "Punjab",
        rating: 4.8,
        phone: "+91 98765 43225",
        email: "rohan.mehra@legalaid.in",
        languages: ["Punjabi", "Hindi"],
        fees: "₹450 per consultation",
        availability: "Tue-Sun, 9 AM - 7 PM"
    },
    {
        id: 8,
        name: "Advocate Simran Kaur",
        specialization: "Civil Litigation",
        experience: "9 years",
        city: "Amritsar",
        state: "Punjab",
        rating: 4.6,
        phone: "+91 98765 43235",
        email: "simran.kaur@legalaid.in",
        languages: ["English", "Punjabi"],
        fees: "₹300 per consultation",
        availability: "Mon-Fri, 9 AM - 5 PM"
    },
    // Chandigarh (Punjab)
    {
        id: 9,
        name: "Advocate Harpreet Singh",
        specialization: "Criminal & Civil Litigation",
        experience: "20 years",
        city: "Chandigarh",
        state: "Punjab",
        rating: 4.9,
        phone: "+91 98765 43215",
        email: "harpreet.singh@legalaid.in",
        languages: ["English", "Hindi", "Punjabi"],
        fees: "Free Legal Aid for Underprivileged",
        availability: "Mon-Sat, 10 AM - 7 PM"
    },
    // Ludhiana (Punjab)
    {
        id: 10,
        name: "Advocate Gurpreet Kaur",
        specialization: "Women's Rights & Family Law",
        experience: "14 years",
        city: "Ludhiana",
        state: "Punjab",
        rating: 4.8,
        phone: "+91 98765 43216",
        email: "gurpreet.kaur@legalaid.in",
        languages: ["English", "Hindi", "Punjabi"],
        fees: "Free for Women",
        availability: "Mon-Fri, 9 AM - 6 PM"
    },
    {
        id: 11,
        name: "Advocate Manjit Singh Brar",
        specialization: "Agricultural & Land Law",
        experience: "16 years",
        city: "Ludhiana",
        state: "Punjab",
        rating: 4.7,
        phone: "+91 98765 43226",
        email: "manjit.brar@legalaid.in",
        languages: ["Punjabi", "Hindi", "English"],
        fees: "₹400 per consultation",
        availability: "Mon-Sat, 8 AM - 5 PM"
    },
    // Pune
    {
        id: 12,
        name: "Advocate Sanjay Deshmukh",
        specialization: "Criminal Law & Litigation",
        experience: "13 years",
        city: "Pune",
        state: "Maharashtra",
        rating: 4.6,
        phone: "+91 98765 43217",
        email: "sanjay.deshmukh@legalaid.in",
        languages: ["English", "Hindi", "Marathi"],
        fees: "Free Legal Aid for Economically Weaker Sections",
        availability: "Mon-Sat, 10 AM - 7 PM"
    },
    // Kolkata
    {
        id: 13,
        name: "Advocate Ananya Banerjee",
        specialization: "Women & Child Rights",
        experience: "10 years",
        city: "Kolkata",
        state: "West Bengal",
        rating: 4.8,
        phone: "+91 98765 43218",
        email: "ananya.banerjee@legalaid.in",
        languages: ["English", "Hindi", "Bengali"],
        fees: "Free for Women & Children",
        availability: "Tue-Sat, 11 AM - 6 PM"
    },
    // Chennai
    {
        id: 14,
        name: "Advocate Karthik Subramanian",
        specialization: "Property & Real Estate Law",
        experience: "12 years",
        city: "Chennai",
        state: "Tamil Nadu",
        rating: 4.7,
        phone: "+91 98765 43219",
        email: "karthik.s@legalaid.in",
        languages: ["English", "Tamil", "Hindi"],
        fees: "₹600 per consultation",
        availability: "Mon-Fri, 9 AM - 6 PM"
    }
];

export default function LegalAid() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('All');
    const [selectedSpecialization, setSelectedSpecialization] = useState('All');
    const [showLocationModal, setShowLocationModal] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);

    const cities = ['All', ...new Set(lawyersData.map(l => l.city))];
    const specializations = ['All', ...new Set(lawyersData.map(l => l.specialization))];

    // Auto-detect location on mount
    useEffect(() => {
        const detectLocation = async () => {
            setIsDetectingLocation(true);

            if (!navigator.geolocation) {
                setIsDetectingLocation(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;

                        // Use OpenStreetMap Nominatim for reverse geocoding (free, no API key needed)
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
                        );
                        const data = await response.json();

                        // Extract city from response
                        const detectedCity = data.address?.city ||
                            data.address?.town ||
                            data.address?.village ||
                            data.address?.state_district;

                        // Find matching city in our list (case-insensitive partial match)
                        const matchingCity = cities.find(city =>
                            city !== 'All' &&
                            (city.toLowerCase().includes(detectedCity?.toLowerCase()) ||
                                detectedCity?.toLowerCase().includes(city.toLowerCase()))
                        );

                        if (matchingCity) {
                            handleLocationSelect(matchingCity);
                        }
                    } catch (error) {
                        console.error('Error detecting location:', error);
                    } finally {
                        setIsDetectingLocation(false);
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setIsDetectingLocation(false);
                }
            );
        };

        detectLocation();
    }, []);

    const handleLocationSelect = (city) => {
        setUserLocation(city);
        setSelectedCity(city);
        setShowLocationModal(false);
    };

    const filteredLawyers = lawyersData.filter(lawyer => {
        const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = selectedCity === 'All' || lawyer.city === selectedCity;
        const matchesSpec = selectedSpecialization === 'All' || lawyer.specialization === selectedSpecialization;
        return matchesSearch && matchesCity && matchesSpec;
    });

    return (
        <div className="max-w-7xl mx-auto">
            {/* Location Modal - only show if no location detected yet */}
            {showLocationModal && !userLocation && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-glass-border">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{t('legalAid.selectLocation')}</h3>
                                {isDetectingLocation ? (
                                    <p className="text-neon-blue flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Detecting your location...
                                    </p>
                                ) : (
                                    <p className="text-slate-500 dark:text-slate-400">Select your city to find nearby lawyers</p>
                                )}
                            </div>
                            <button
                                onClick={() => setShowLocationModal(false)}
                                className="text-slate-500 dark:text-slate-400 hover:text-[var(--text-primary)] transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
                            {cities.filter(c => c !== 'All').map(city => (
                                <button
                                    key={city}
                                    onClick={() => handleLocationSelect(city)}
                                    className="w-full text-left px-4 py-3.5 rounded-xl border border-glass-border hover:border-neon-blue/50 hover:bg-glass-surface transition-all flex items-center gap-3 text-[var(--text-primary)] group"
                                >
                                    <MapPin className="w-5 h-5 text-neon-blue group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">{city}</span>
                                </button>
                            ))}
                            <button
                                onClick={() => handleLocationSelect('All')}
                                className="w-full text-left px-4 py-3.5 rounded-xl border border-neon-blue/50 bg-neon-blue/10 hover:bg-neon-blue/20 transition-all flex items-center gap-3 text-[var(--text-primary)]"
                            >
                                <MapPin className="w-5 h-5 text-neon-blue" />
                                <span className="font-medium text-neon-blue">{t('legalAid.allCities')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t('legalAid.title')}</h2>
                <p className="text-slate-500 dark:text-slate-400">{t('legalAid.subtitle')}</p>
                {userLocation && userLocation !== 'All' && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-neon-blue/10 text-neon-blue rounded-lg border border-neon-blue/20">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">Showing results for: {userLocation}</span>
                        <button
                            onClick={() => setShowLocationModal(true)}
                            className="ml-2 text-[var(--text-primary)] hover:text-blue-300 underline text-sm"
                        >
                            Change
                        </button>
                    </div>
                )}
            </div>

            {/* Search and Filters */}
            <div className="glass-card rounded-2xl p-6 mb-8 shadow-lg">
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t('legalAid.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-glass-surface border border-glass-border rounded-xl text-[var(--text-primary)] placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-neon-blue transition-all"
                        />
                    </div>

                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 w-5 h-5" />
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-glass-surface border border-glass-border rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-neon-blue appearance-none cursor-pointer [&>option]:bg-white dark:[&>option]:bg-dark-bg"
                        >
                            {cities.map(city => (
                                <option key={city} value={city}>{city === 'All' ? t('legalAid.allCities') : city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 w-5 h-5" />
                        <select
                            value={selectedSpecialization}
                            onChange={(e) => setSelectedSpecialization(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-glass-surface border border-glass-border rounded-xl text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-neon-blue appearance-none cursor-pointer [&>option]:bg-white dark:[&>option]:bg-dark-bg"
                        >
                            <option value="All">{t('legalAid.allSpecializations')}</option>
                            {specializations.filter(s => s !== 'All').map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mb-6 text-sm text-slate-500 dark:text-slate-400">
                {t('legalAid.found')} <strong className="text-[var(--text-primary)]">{filteredLawyers.length}</strong> {t('legalAid.providers')}
            </div>

            {/* Lawyers List */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredLawyers.map(lawyer => (
                    <div key={lawyer.id} className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-neon-blue/30 transition-all group hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-neon-blue transition-colors">{lawyer.name}</h3>
                                <p className="text-neon-purple font-medium mt-1">{lawyer.specialization}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="text-sm font-bold text-amber-500">{lawyer.rating}</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <MapPin className="w-4 h-4 text-slate-500" />
                                {lawyer.city}, {lawyer.state}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                <span className="font-medium text-[var(--text-primary)]">{t('legalAid.experience')}:</span> {lawyer.experience}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                <span className="font-medium text-[var(--text-primary)]">{t('legalAid.languages')}:</span> {lawyer.languages.join(', ')}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                <span className="font-medium text-[var(--text-primary)]">{t('legalAid.availability')}:</span> {lawyer.availability}
                            </div>
                            <div className="text-sm font-semibold text-green-400 bg-green-500/10 px-3 py-1 rounded-lg inline-block border border-green-500/20">
                                {lawyer.fees}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-glass-border">
                            <a
                                href={`tel:${lawyer.phone}`}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-neon-blue text-dark-bg font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-neon-blue/20"
                            >
                                <Phone className="w-4 h-4" />
                                {t('legalAid.call')}
                            </a>
                            <a
                                href={`mailto:${lawyer.email}`}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-glass-surface border border-glass-border text-[var(--text-primary)] rounded-xl hover:bg-white/10 transition-all"
                            >
                                <Mail className="w-4 h-4" />
                                {t('legalAid.email')}
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {filteredLawyers.length === 0 && (
                <div className="text-center py-16 glass-card rounded-3xl">
                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">{t('legalAid.noResults')}</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCity('All');
                            setSelectedSpecialization('All');
                        }}
                        className="px-8 py-3 bg-neon-blue text-dark-bg font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-neon-blue/20"
                    >
                        {t('legalAid.clearFilters')}
                    </button>
                </div>
            )}
        </div>
    );
}
