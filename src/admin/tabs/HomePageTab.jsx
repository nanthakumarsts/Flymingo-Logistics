import React, { useState } from 'react';
import { Save, Plus, Trash2, Truck, Boxes, BarChart3, Image } from 'lucide-react';

export const HomePageTab = ({ data, onUpdate }) => {
  const [home, setHome] = useState(data.homeSections || {});
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = () => {
    onUpdate((prev) => ({
      ...prev,
      homeSections: home
    }));
    setSavedMsg('Homepage sections updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleStatChange = (id, field, value) => {
    const updated = home.stats.map(s => s.id === id ? { ...s, [field]: value } : s);
    setHome({ ...home, stats: updated });
  };

  const handleStepChange = (idx, field, value) => {
    const updated = [...home.pickupToDeliverySteps];
    updated[idx][field] = value;
    setHome({ ...home, pickupToDeliverySteps: updated });
  };

  const handleSectorChange = (id, field, value) => {
    const updated = home.criticalSectors.map(s => s.id === id ? { ...s, [field]: value } : s);
    setHome({ ...home, criticalSectors: updated });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <h1 className="text-xl font-black text-slate-900">Home Page Content Manager</h1>
          <p className="text-xs text-slate-500">Configure key stats strip, 6-step pickup-to-delivery journey, and serving critical sectors</p>
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
            <span>Save Home Changes</span>
          </button>
        </div>
      </div>

      {/* 1. Key Metrics Strip */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#005687]" />
          <span>Section 2: Key Operational Metrics Strip (4 Counters)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {home.stats?.map((st) => (
            <div key={st.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <input
                type="text"
                value={st.value}
                onChange={(e) => handleStatChange(st.id, 'value', e.target.value)}
                className="w-full text-lg font-black text-[#005687] bg-white px-2 py-1 border border-slate-200 rounded"
              />
              <input
                type="text"
                value={st.label}
                onChange={(e) => handleStatChange(st.id, 'label', e.target.value)}
                className="w-full text-xs font-bold text-slate-800 bg-white px-2 py-1 border border-slate-200 rounded"
              />
              <input
                type="text"
                value={st.desc}
                onChange={(e) => handleStatChange(st.id, 'desc', e.target.value)}
                className="w-full text-[11px] text-slate-500 bg-white px-2 py-1 border border-slate-200 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. From Pickup to Delivery (6-Step Journey) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#ed2926]" />
          <span>From Pickup To Delivery: 6-Step Cargo Consignment Journey</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {home.pickupToDeliverySteps?.map((step, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-xs font-black text-[#ed2926]">Step {step.step}</span>
                <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{step.badge}</span>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Step Title</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Step Image</label>
                <input
                  type="text"
                  value={step.image}
                  onChange={(e) => handleStepChange(idx, 'image', e.target.value)}
                  className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded text-[11px] font-mono text-slate-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Description</label>
                <textarea
                  rows="2"
                  value={step.desc}
                  onChange={(e) => handleStepChange(idx, 'desc', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Serving Critical Sectors (6 Industries) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Boxes className="w-4 h-4 text-[#005687]" />
          <span>Serving Critical Sectors (6 Industry Applications)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {home.criticalSectors?.map((sec) => (
            <div key={sec.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-black text-[#005687]">{sec.tag}</span>
                <span className="text-[10px] font-mono text-slate-400">{sec.id}</span>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Sector Title</label>
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => handleSectorChange(sec.id, 'title', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Image Path</label>
                <input
                  type="text"
                  value={sec.image}
                  onChange={(e) => handleSectorChange(sec.id, 'image', e.target.value)}
                  className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded text-[11px] font-mono text-slate-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Description</label>
                <textarea
                  rows="2"
                  value={sec.desc}
                  onChange={(e) => handleSectorChange(sec.id, 'desc', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
