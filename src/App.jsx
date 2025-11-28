import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Settings from './pages/Settings';
import Account from './pages/Account';
import DashboardLayout from './layouts/DashboardLayout';
import Upload from './pages/Upload';
import Processing from './pages/Processing';
import Results from './pages/Results';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LegalAid from './pages/LegalAid';
import MyDocuments from './pages/MyDocuments';
import DashboardHome from './pages/DashboardHome';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Background from './components/Background';
import PageLoader from './components/PageLoader';
import PageTransition from './components/PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardLayout /></PageTransition>}>
          <Route index element={<PageTransition><DashboardHome /></PageTransition>} />
          <Route path="upload" element={<PageTransition><Upload /></PageTransition>} />
          <Route path="documents" element={<PageTransition><MyDocuments /></PageTransition>} />
          <Route path="settings" element={<PageTransition><Settings /></PageTransition>} />
          <Route path="processing" element={<PageTransition><Processing /></PageTransition>} />
          <Route path="results" element={<PageTransition><Results /></PageTransition>} />
          <Route path="legal-aid" element={<PageTransition><LegalAid /></PageTransition>} />
          <Route path="account" element={<PageTransition><Account /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

import { ThemeProvider } from './contexts/ThemeContext';

import { ConfigProvider } from './contexts/ConfigContext';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import Onboarding from './pages/Onboarding';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ConfigProvider>
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Background />
            <AuthProvider>
              {loading && <PageLoader />}
              {!loading && (
                <AnimatePresence mode="wait">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
                    <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
                    <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                    <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />

                    {/* User Dashboard Routes */}
                    <Route path="/dashboard" element={<PageTransition><DashboardLayout /></PageTransition>}>
                      <Route index element={<PageTransition><DashboardHome /></PageTransition>} />
                      <Route path="upload" element={<PageTransition><Upload /></PageTransition>} />
                      <Route path="documents" element={<PageTransition><MyDocuments /></PageTransition>} />
                      <Route path="settings" element={<PageTransition><Settings /></PageTransition>} />
                      <Route path="processing" element={<PageTransition><Processing /></PageTransition>} />
                      <Route path="results" element={<PageTransition><Results /></PageTransition>} />
                      <Route path="legal-aid" element={<PageTransition><LegalAid /></PageTransition>} />
                      <Route path="account" element={<PageTransition><Account /></PageTransition>} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path="/admin" element={<PageTransition><AdminLayout /></PageTransition>}>
                      <Route index element={<PageTransition><AdminDashboard /></PageTransition>} />
                      <Route path="settings" element={<PageTransition><AdminSettings /></PageTransition>} />
                      <Route path="users" element={<PageTransition><AdminUsers /></PageTransition>} />
                    </Route>
                  </Routes>
                </AnimatePresence>
              )}
            </AuthProvider>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
