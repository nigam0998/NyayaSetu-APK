import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './layouts/DashboardLayout';
import Upload from './pages/Upload';
import Processing from './pages/Processing';
import Results from './pages/Results';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LegalAid from './pages/LegalAid';

import { LanguageProvider } from './contexts/LanguageContext';
import MyDocuments from './pages/MyDocuments';
import Settings from './pages/Settings';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/upload" replace />} />
            <Route path="upload" element={<Upload />} />
            <Route path="documents" element={<MyDocuments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="processing" element={<Processing />} />
            <Route path="results" element={<Results />} />
            <Route path="legal-aid" element={<LegalAid />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
