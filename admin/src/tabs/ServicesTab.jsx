import React, { useState } from 'react';
import { Save, Ship, Plane, Package, ShieldCheck, AlertTriangle, Truck, Plus, Trash2 } from 'lucide-react';

export const ServicesTab = ({ data, onUpdate }) => {
  const [services, setServices] = useState(data.services || []);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = () => {
    onUpdate((prev) => ({
      ...prev,
      services: services
    }));
    setSavedMsg('Services and capabilities saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleServiceChange = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleFeatureChange = (serviceId, fIdx, val) => {
    setServices(services.map(s => {
      if (s.id !== serviceId) return s;
      const updated = [...s.features];
      updated[fIdx] = val;
      return { ...s, features: updated };
    }));
  };

  return (
    <div className="space-y-8 select-none">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <h1 className="text-xl font-black text-slate-900">Services & Capabilities Manager</h1>
          <p className="text-xs text-slate-500">Configure all 6 multimodal cargo services, feature checklists, and detail banners</p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              {savedMsg}
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#005687] hover:bg-[#ed2926] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Services</span>
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-6">
        {services.map((srv, idx) => (
          <div key={srv.id} className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#005687]/10 text-[#005687] font-black text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{srv.title}</h3>
                  <span className="text-xs font-mono text-slate-400">{srv.path}</span>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-[#005687] rounded-full">
                {srv.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Service Title</label>
                <input
                  type="text"
                  value={srv.title}
                  onChange={(e) => handleServiceChange(srv.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#ed2926]">Tagline / Highlight</label>
                <input
                  type="text"
                  value={srv.tagline}
                  onChange={(e) => handleServiceChange(srv.id, 'tagline', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-[#ed2926]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Image Asset Path</label>
                <input
                  type="text"
                  value={srv.image}
                  onChange={(e) => handleServiceChange(srv.id, 'image', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Lead Overview Narrative</label>
              <textarea
                rows="2"
                value={srv.lead}
                onChange={(e) => handleServiceChange(srv.id, 'lead', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
              />
            </div>

            {/* Features list */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Service Key Features & Deliverables Checklist
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {srv.features?.map((ft, fIdx) => (
                  <input
                    key={fIdx}
                    type="text"
                    value={ft}
                    onChange={(e) => handleFeatureChange(srv.id, fIdx, e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
