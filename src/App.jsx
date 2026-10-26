import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingButtons } from './components/FloatingButtons';
import { QuoteModal } from './components/QuoteModal';
import { TrackingModal } from './components/TrackingModal';

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

export function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(undefined);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingAwb, setTrackingAwb] = useState(undefined);

  const handleOpenQuote = (serviceId) => {
    setSelectedService(serviceId);
    setQuoteOpen(true);
  };

  const handleOpenTracking = (awb) => {
    setTrackingAwb(awb);
    setTrackingOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-brand-blue selection:text-white">
        <Navbar 
          onOpenQuote={handleOpenQuote} 
          onOpenTracking={() => handleOpenTracking()} 
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} onOpenTracking={handleOpenTracking} />} />
            <Route path="/about" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services/international-courier" element={<InternationalCourierPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services/freight-forwarding" element={<FreightForwardingPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services/international-relocation" element={<InternationalRelocationPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services/ship-spares-logistics" element={<ShipSparesLogisticsPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services/dangerous-goods-shipping" element={<DangerousGoodsPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services/customs-clearance" element={<CustomsClearancePage onOpenQuote={handleOpenQuote} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer 
          onOpenQuote={() => handleOpenQuote()} 
          onOpenTracking={() => handleOpenTracking()} 
        />

        <FloatingButtons />

        {/* Global Interactive Modals */}
        <QuoteModal
          isOpen={quoteOpen}
          onClose={() => setQuoteOpen(false)}
          defaultService={selectedService}
        />

        <TrackingModal
          isOpen={trackingOpen}
          onClose={() => setTrackingOpen(false)}
          initialAwb={trackingAwb}
        />
      </div>
    </Router>
  );
}

export default App;
