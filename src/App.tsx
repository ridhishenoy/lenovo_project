import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { AiAdvisorModal } from './components/common/AiAdvisorModal';
import { CompareModal } from './components/common/CompareModal';
import { VoiceSearchModal } from './components/common/VoiceSearchModal';
import { ImageSearchModal } from './components/common/ImageSearchModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceBookingPage } from './pages/ServiceBookingPage';
import { RepairTrackingPage } from './pages/RepairTrackingPage';
import { PcBuilderPage } from './pages/PcBuilderPage';
import { TradeInPage } from './pages/TradeInPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { StoreLocatorPage } from './pages/StoreLocatorPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { FaqPage } from './pages/FaqPage';

const AppContent: React.FC = () => {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-600 selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Header */}
      <Header
        onOpenVoiceSearch={() => setIsVoiceModalOpen(true)}
        onOpenImageSearch={() => setIsImageModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<ServiceBookingPage />} />
          <Route path="/track" element={<RepairTrackingPage />} />
          <Route path="/pc-builder" element={<PcBuilderPage />} />
          <Route path="/trade-in" element={<TradeInPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/stores" element={<StoreLocatorPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <AiAdvisorModal />
      <CompareModal />
      <VoiceSearchModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
      <ImageSearchModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
