import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, MapPin, Truck, Plane, ShieldCheck } from 'lucide-react';

export const TrackingModal = ({ isOpen, onClose, initialAwb = '' }) => {
  const [awb, setAwb] = useState(initialAwb || 'FLY-8924488');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleTrack = (e) => {
    e.preventDefault();
    if (!awb.trim()) return;

    const mockResult = {
      awb: awb.toUpperCase(),
      service: 'International Priority Air Courier',
      origin: 'Coimbatore Hub (CJB), India',
      destination: 'London Heathrow (LHR), United Kingdom',
      estimatedDelivery: 'Oct 28, 2026 by 16:30 BST',
      currentStatus: 'Customs Clearance in Progress',
      steps: [
        { status: 'Cargo Booked & Waybill Generated', date: 'Oct 24, 09:30 AM', location: 'Coimbatore Logistics Hub', completed: true },
        { status: 'Picked Up & Multi-Layer Export Packed', date: 'Oct 24, 02:15 PM', location: 'Peelamedu Facility', completed: true },
        { status: 'Dispatched to Gateway Airport (MAA)', date: 'Oct 25, 04:45 AM', location: 'Chennai Cargo Terminal', completed: true },
        { status: 'Departed on Flight BA-036', date: 'Oct 25, 11:20 PM', location: 'In-Transit International Skies', completed: true },
        { status: 'Arrived at Destination Airport & Customs Cleared', date: 'Oct 26, 08:15 AM', location: 'London Heathrow Terminal 4', completed: true, current: true },
        { status: 'Out for Final Door Delivery', date: 'Estimated Oct 27', location: 'London Distribution Unit', completed: false },
        { status: 'Delivered to Consignee Deck/Door', date: 'Estimated Oct 28', location: 'Destination Address', completed: false }
      ]
    };

    setResult(mockResult);
    setSearched(true);
  };

  const handleSample = (code) => {
    setAwb(code);
    const mockResult = {
      awb: code,
      service: code.startsWith('SPARE') ? 'Maritime Ship Spares Direct Deck Delivery' : 'International Priority Air Courier',
      origin: 'Chennai Port Logistics Center, India',
      destination: 'Singapore Anchorage Berth 4, Singapore',
      estimatedDelivery: 'Oct 29, 2026 by 10:00 SGT',
      currentStatus: code.startsWith('SPARE') ? 'Bonded Transit to Launch Boat' : 'Customs Cleared at Gateway',
      steps: [
        { status: 'Bonded Spares Received & Surveyed', date: 'Oct 25, 11:00 AM', location: 'Chennai Port Terminal', completed: true },
        { status: 'Customs Duty Bonded Transit Approved', date: 'Oct 25, 05:30 PM', location: 'Meenambakkam Customs Gate', completed: true },
        { status: 'Vessel In-Port Handoff Coordinated', date: 'Oct 26, 09:40 AM', location: 'Marine Operations Desk', completed: true, current: true },
        { status: 'Launch Boat Boarding to Vessel Deck', date: 'Oct 27, 02:00 PM', location: 'Deepwater Anchorage', completed: false },
        { status: 'Master Receipt & Delivery Confirmation Signed', date: 'Oct 27, 04:30 PM', location: 'Vessel Deck', completed: false }
      ]
    };
    setResult(mockResult);
    setSearched(true);
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
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Track Your Shipment / Cargo</h3>
              <p className="text-xs text-slate-500">Real-time status updates across all global air &amp; ocean routes</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Tracking Form */}
          <form onSubmit={handleTrack} className="space-y-3">
            <div className="relative flex items-center">
              <input
                type="text"
                value={awb}
                onChange={(e) => setAwb(e.target.value)}
                placeholder="Enter AWB or Tracking No (e.g. FLY-8924488)"
                className="w-full pl-11 pr-28 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold tracking-wide text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue placeholder:text-slate-400 uppercase"
                required
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Track Now
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Quick Samples:</span>
              <button
                type="button"
                onClick={() => handleSample('FLY-8924488')}
                className="font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-brand-blue-50 hover:text-brand-blue text-slate-700 font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                FLY-8924488 (Courier)
              </button>
              <button
                type="button"
                onClick={() => handleSample('SPARE-55021')}
                className="font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-brand-blue-50 hover:text-brand-blue text-slate-700 font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                SPARE-55021 (Marine)
              </button>
            </div>
          </form>

          {/* Results Display */}
          {searched && result && (
            <div className="space-y-5 animate-fade-in">
              {/* Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Waybill Number</span>
                    <h4 className="text-lg font-mono font-bold text-brand-blue">{result.awb}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {result.currentStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-0.5">Origin:</span>
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                      {result.origin}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Destination:</span>
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-red" />
                      {result.destination}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Service Type:</span>
                    <p className="font-semibold text-slate-800">{result.service}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Estimated Delivery:</span>
                    <p className="font-bold text-emerald-700">{result.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Milestones Timeline */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-blue" />
                  <span>Shipment Progress History</span>
                </h5>

                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {result.steps.map((s, idx) => (
                    <div key={idx} className="relative flex items-start gap-3 text-xs">
                      <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                        s.current 
                          ? 'bg-brand-blue ring-4 ring-brand-blue/20 text-white' 
                          : s.completed 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-slate-200 text-slate-400'
                      }`}>
                        {s.completed ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className={`font-bold ${s.current ? 'text-brand-blue font-semibold' : s.completed ? 'text-slate-800' : 'text-slate-400'}`}>
                            {s.status}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{s.date}</span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">{s.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-blue-50 border border-brand-blue-100 rounded-xl p-3 flex items-center gap-2 text-xs text-brand-blue">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Need urgent dispatch support or customs assistance? Call our direct 24/7 desk at <strong>+91 90879 24488</strong>.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
