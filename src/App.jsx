import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingButtons } from './components/FloatingButtons';
import { QuoteModal } from './components/QuoteModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { InternationalCourierPage } from './pages/InternationalCourierPage';
import { FreightForwardingPage } from './pages/FreightForwardingPage';
import { InternationalRelocationPage } from './pages/InternationalRelocationPage';
import { ShipSparesLogisticsPage } from './pages/ShipSparesLogisticsPage';
import { DangerousGoodsPage } from './pages/DangerousGoodsPage';
import { CustomsClearancePage } from './pages/CustomsClearancePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

function AppContent({ quoteOpen, setQuoteOpen, selectedService, handleOpenQuote }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-brand-blue selection:text-white">
      {!isAdmin && <Navbar onOpenQuote={handleOpenQuote} />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} />} />
          <Route path="/about" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/international-courier" element={<InternationalCourierPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/freight-forwarding" element={<FreightForwardingPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/international-relocation" element={<InternationalRelocationPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/ship-spares-logistics" element={<ShipSparesLogisticsPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/dangerous-goods-shipping" element={<DangerousGoodsPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/customs-clearance" element={<CustomsClearancePage onOpenQuote={handleOpenQuote} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdmin && <Footer onOpenQuote={() => handleOpenQuote()} />}
      {!isAdmin && <FloatingButtons />}

      {/* Global Interactive Modals */}
      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
}

export function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(undefined);

  const handleOpenQuote = (serviceId) => {
    setSelectedService(serviceId);
    setQuoteOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <AppContent 
        quoteOpen={quoteOpen}
        setQuoteOpen={setQuoteOpen}
        selectedService={selectedService}
        handleOpenQuote={handleOpenQuote}
      />
    </Router>
  );
}

export default App;
