import React, { useState } from 'react';
import { X, CheckCircle, Calculator, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { CORE_SERVICES, COUNTRIES, BRAND } from '../data/siteData.js';

export const QuoteModal = ({ isOpen, onClose, defaultService }) => {
  const [service, setService] = useState(defaultService || CORE_SERVICES[0].id);
  const [fromCountry, setFromCountry] = useState('India');
  const [toCountry, setToCountry] = useState('United States');
  const [weight, setWeight] = useState('10');
  const [dimensions, setDimensions] = useState('30x20x20');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomRef = 'FLM-' + Math.floor(100000 + Math.random() * 900000);
    setQuoteRef(randomRef);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] overflow-y-auto overflow-x-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Cargo Request Quote</h3>
              
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <CheckCircle className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-900">Quote Request Received!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you <span className="font-semibold text-slate-800">{name || 'valued customer'}</span>. Our logistics pricing desk is reviewing your requirements.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Reference No:</span>
                <span className="font-mono font-bold text-brand-blue">{quoteRef}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Service:</span>
                <span className="font-medium text-slate-800 capitalize">{service.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Route:</span>
                <span className="font-medium text-slate-800">{fromCountry} &rarr; {toCountry}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Weight:</span>
                <span className="font-medium text-slate-800">{weight} kg</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-blue" /> Response within 30 mins</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Best Rate Guarantee</span>
            </div>

            <div className="pt-3 flex gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-brand-blue/20 cursor-pointer"
              >
                Close Window
              </button>
              <a
                href={`tel:${BRAND.primaryPhone}`}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                Call Support Now
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Service Select */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Logistics Service *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue font-medium"
                  required
                >
                  {CORE_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.badge})
                    </option>
                  ))}
                </select>
              </div>

              {/* Origin Country */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Origin (From Country) *
                </label>
                <select
                  value={fromCountry}
                  onChange={(e) => setFromCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  required
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Destination Country */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Destination (To Country) *
                </label>
                <select
                  value={toCountry}
                  onChange={(e) => setToCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  required
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Estimated Weight */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Estimated Weight (kg) *
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  required
                />
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Approx Dimensions (L x W x H cm)
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 40x30x20"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 90879 24488"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  required
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. client@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  required
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cargo Specifics / Particular Requirements
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention contents: e.g. Medicine with prescription, Marine engine spares, Homemade snacks, Commercial sample..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue resize-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                
                
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40 transition-all cursor-pointer"
              >
                <span>Calculate &amp; Request Rate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
