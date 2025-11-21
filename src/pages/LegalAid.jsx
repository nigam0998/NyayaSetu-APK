import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, Star, Filter, X, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

const lawyersData = [
    // Mumbai
    {
        id: 1,
        name: "Advocate Priya Sharma",
        specialization: "Civil & Property Law",
        experience: "12 years",
        city: "Mumbai",
        state: "Maharashtra",
        rating: 4.8,
        phone: "+91 98765 43210",
        email: "priya.sharma@legalaid.in",
        languages: ["English", "Hindi", "Marathi"],
        fees: "Free Consultation Available",
        availability: "Mon-Fri, 10 AM - 6 PM"
    },
    {
        id: 2,
        name: "Advocate Anil Mehta",
        specialization: "Corporate & Business Law",
        experience: "18 years",
        city: "Mumbai",
        state: "Maharashtra",
        rating: 4.9,
        phone: "+91 98765 43220",
        email: "anil.mehta@legalaid.in",
        languages: ["English", "Hindi", "Gujarati"],
        fees: "₹1000 per consultation",
        availability: "Mon-Sat, 9 AM - 7 PM"
    },
    // Delhi
    {
        id: 3,
        name: "Advocate Rajesh Kumar",
        specialization: "Consumer Rights & RTI",
        experience: "8 years",
        city: "Delhi",
        state: "Delhi",
        rating: 4.6,
        phone: "+91 98765 43211",
        email: "rajesh.kumar@legalaid.in",
        languages: ["English", "Hindi"],
        fees: "₹500 per consultation",
        availability: "Mon-Sat, 9 AM - 5 PM"
    },
    {
        id: 4,
        name: "Advocate Neha Kapoor",
        specialization: "Family & Divorce Law",
        experience: "11 years",
        city: "Delhi",
        state: "Delhi",
        rating: 4.7,
        phone: "+91 98765 43221",
        email: "neha.kapoor@legalaid.in",
        languages: ["English", "Hindi", "Punjabi"],
        fees: "Free for Women",
        availability: "Tue-Sat, 10 AM - 6 PM"
    },
    // Bangalore
    {
        id: 5,
        name: "Advocate Lakshmi Menon",
        specialization: "Family & Matrimonial Law",
        experience: "15 years",
        city: "Bangalore",
        state: "Karnataka",
        rating: 4.9,
        phone: "+91 98765 43212",
        email: "lakshmi.menon@legalaid.in",
        languages: ["English", "Hindi", "Kannada", "Tamil"],
        fees: "Free for Women & Senior Citizens",
        availability: "Mon-Fri, 11 AM - 7 PM"
    },
    {
        id: 6,
        name: "Advocate Suresh Rao",
        specialization: "IT & Cyber Law",
        experience: "9 years",
        city: "Bangalore",
        state: "Karnataka",
        rating: 4.5,
        phone: "+91 98765 43222",
        email: "suresh.rao@legalaid.in",
        languages: ["English", "Kannada", "Tamil"],
        fees: "₹800 per consultation",
        availability: "Mon-Fri, 10 AM - 6 PM"
    },
    // Ahmedabad
    {
        id: 7,
        name: "Advocate Arjun Patel",
        specialization: "Tenant Rights & Rental Disputes",
        experience: "10 years",
        city: "Ahmedabad",
        state: "Gujarat",
        rating: 4.7,
        phone: "+91 98765 43213",
        email: "arjun.patel@legalaid.in",
        languages: ["English", "Hindi", "Gujarati"],
        fees: "Free Consultation for Low-Income Groups",
        availability: "Tue-Sat, 10 AM - 6 PM"
    },
    // Hyderabad
    {
        id: 8,
        name: "Advocate Meera Reddy",
        specialization: "Labour & Employment Law",
        experience: "9 years",
        city: "Hyderabad",
        state: "Telangana",
        rating: 4.5,
        phone: "+91 98765 43214",
        email: "meera.reddy@legalaid.in",
        languages: ["English", "Hindi", "Telugu"],
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('legalAid.selectLocation')}</h3>
                                {isDetectingLocation ? (
                                    <p className="text-indigo-600 flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Detecting your location...
                                    </p>
                                ) : (
                                    <p className="text-slate-600">Select your city to find nearby lawyers</p>
                                )}
                            </div>
                            <button
                                onClick={() => setShowLocationModal(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {cities.filter(c => c !== 'All').map(city => (
                                <button
                                    key={city}
                                    onClick={() => handleLocationSelect(city)}
                                    className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors flex items-center gap-3"
                                >
                                    <MapPin className="w-5 h-5 text-indigo-600" />
                                    <span className="font-medium">{city}</span>
                                </button>
                            ))}
                            <button
                                onClick={() => handleLocationSelect('All')}
                                className="w-full text-left px-4 py-3 rounded-lg border-2 border-indigo-600 bg-indigo-50 transition-colors flex items-center gap-3"
                            >
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                <span className="font-medium text-indigo-700">{t('legalAid.allCities')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('legalAid.title')}</h2>
                <p className="text-slate-600">{t('legalAid.subtitle')}</p>
                {userLocation && userLocation !== 'All' && (
                    <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">Showing results for: {userLocation}</span>
                        <button
                            onClick={() => setShowLocationModal(true)}
                            className="ml-2 text-indigo-600 hover:text-indigo-800 underline text-sm"
                        >
                            Change
                        </button>
                    </div>
                )}
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t('legalAid.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                        >
                            {cities.map(city => (
                                <option key={city} value={city}>{city === 'All' ? t('legalAid.allCities') : city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <select
                            value={selectedSpecialization}
                            onChange={(e) => setSelectedSpecialization(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                        >
                            <option value="All">{t('legalAid.allSpecializations')}</option>
                            {specializations.filter(s => s !== 'All').map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mb-4 text-sm text-slate-600">
                {t('legalAid.found')} <strong>{filteredLawyers.length}</strong> {t('legalAid.providers')}
            </div>

            {/* Lawyers List */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredLawyers.map(lawyer => (
                    <div key={lawyer.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{lawyer.name}</h3>
                                <p className="text-indigo-600 font-medium">{lawyer.specialization}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="text-sm font-semibold text-amber-700">{lawyer.rating}</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                {lawyer.city}, {lawyer.state}
                            </div>
                            <div className="text-sm text-slate-600">
                                <span className="font-medium">{t('legalAid.experience')}:</span> {lawyer.experience}
                            </div>
                            <div className="text-sm text-slate-600">
                                <span className="font-medium">{t('legalAid.languages')}:</span> {lawyer.languages.join(', ')}
                            </div>
                            <div className="text-sm text-slate-600">
                                <span className="font-medium">{t('legalAid.availability')}:</span> {lawyer.availability}
                            </div>
                            <div className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-lg inline-block">
                                {lawyer.fees}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-slate-100">
                            <a
                                href={`tel:${lawyer.phone}`}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                {t('legalAid.call')}
                            </a>
                            <a
                                href={`mailto:${lawyer.email}`}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                {t('legalAid.email')}
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {filteredLawyers.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500">{t('legalAid.noResults')}</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCity('All');
                            setSelectedSpecialization('All');
                        }}
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        {t('legalAid.clearFilters')}
                    </button>
                </div>
            )}
        </div>
    );
}
