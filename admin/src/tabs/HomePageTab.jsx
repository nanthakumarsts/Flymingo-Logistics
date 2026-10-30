import React, { useState, useEffect } from 'react';
import {
  Save,
  Truck,
  Boxes,
  BarChart3,
  Edit3,
  X,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  Tag,
  Layers,
  Image as ImageIcon,
  Flame,
  ArrowRight,
  Check
} from 'lucide-react';
import { DragDropUploader } from '../components/DragDropUploader';

const API_BASE = 'http://localhost:5000';

const DEFAULT_TICKER_ITEMS = [
  { id: '1', text: 'ANY SIZE • ANY WEIGHT • ANYWHERE', isHighlight: true },
  { id: '2', text: '190+ COUNTRIES CONNECTED', isHighlight: false },
  { id: '3', text: '24/7 SHIP SPARES MARITIME BERTH', isHighlight: false },
  { id: '4', text: 'FREE DOORSTEP PICKUP IN COIMBATORE & CHENNAI', isHighlight: false },
  { id: '5', text: 'ZERO DEMURRAGE PROTOCOL', isHighlight: false }
];

export const HomePageTab = ({ data, onUpdate }) => {
  // Navigation tabs for Home sections: Ticker, Metrics, Steps, Sectors
  const [activeTab, setActiveTab] = useState('ticker');
  const [home, setHome] = useState(() => {
    const raw = data.homeSections || {};
    return {
      ...raw,
      tickerItems: (raw.tickerItems && raw.tickerItems.length > 0)
        ? raw.tickerItems
        : DEFAULT_TICKER_ITEMS
    };
  });
  const [savedMsg, setSavedMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Modals state for editing
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [stepFormData, setStepFormData] = useState(null);

  const [editingSectorId, setEditingSectorId] = useState(null);
  const [sectorFormData, setSectorFormData] = useState(null);

  const [editingStatId, setEditingStatId] = useState(null);
  const [statFormData, setStatFormData] = useState(null);

  // Sync state if external data updates
  useEffect(() => {
    if (data.homeSections) {
      setHome((prev) => ({
        ...prev,
        ...data.homeSections,
        tickerItems: (data.homeSections.tickerItems && data.homeSections.tickerItems.length > 0)
          ? data.homeSections.tickerItems
          : (prev.tickerItems && prev.tickerItems.length > 0 ? prev.tickerItems : DEFAULT_TICKER_ITEMS)
      }));
    }
  }, [data.homeSections]);

  const handleSaveAll = async (newHomeData = null) => {
    const payload = newHomeData || home;
    setIsSaving(true);

    // 1. Update React / LocalStorage Store
    onUpdate((prev) => ({
      ...prev,
      homeSections: payload
    }));

    // 2. Persist directly into MySQL Database
    try {
      await fetch(`${API_BASE}/api/banner`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homeSections: payload })
      });
      setSavedMsg('Homepage sections saved successfully!');
    } catch (err) {
      console.warn('Backend sync failed, saved locally:', err);
      setSavedMsg('Saved locally!');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  // --- 1. Ticker Ribbon Handlers ---
  const handleTickerChange = (id, field, value) => {
    const currentList = (home.tickerItems && home.tickerItems.length > 0)
      ? home.tickerItems
      : DEFAULT_TICKER_ITEMS;
    const updated = currentList.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    const updatedHome = { ...home, tickerItems: updated };
    setHome(updatedHome);
  };

  const handleAddTickerItem = () => {
    const currentList = (home.tickerItems && home.tickerItems.length > 0)
      ? home.tickerItems
      : DEFAULT_TICKER_ITEMS;
    const newItem = {
      id: `tick-${Date.now()}`,
      text: 'NEW ANNOUNCEMENT / PROMO MESSAGE',
      isHighlight: false
    };
    const updatedHome = {
      ...home,
      tickerItems: [...currentList, newItem]
    };
    setHome(updatedHome);
  };

  const handleDeleteTickerItem = (id) => {
    const currentList = (home.tickerItems && home.tickerItems.length > 0)
      ? home.tickerItems
      : DEFAULT_TICKER_ITEMS;
    const updated = currentList.filter((item) => item.id !== id);
    const updatedHome = { ...home, tickerItems: updated };
    setHome(updatedHome);
  };

  // --- 2. Step Modal Handlers ---
  const openStepModal = (index) => {
    const s = home.pickupToDeliverySteps?.[index] || {};
    setEditingStepIndex(index);
    setStepFormData({
      step: s.step || String(index + 1).padStart(2, '0'),
      badge: s.badge || `Step ${index + 1}`,
      title: s.title || '',
      desc: s.desc || '',
      tick1: s.tick1 || 'Real-time milestone logging',
      tick2: s.tick2 || 'Zero-delay customs pre-check'
    });
  };

  const saveStepModal = () => {
    if (!stepFormData.title?.trim() || !stepFormData.desc?.trim()) {
      alert('Step heading and description are required!');
      return;
    }
    const updatedSteps = [...(home.pickupToDeliverySteps || [])];
    updatedSteps[editingStepIndex] = stepFormData;
    const updatedHome = { ...home, pickupToDeliverySteps: updatedSteps };
    setHome(updatedHome);
    setEditingStepIndex(null);
    setStepFormData(null);
    handleSaveAll(updatedHome);
  };

  // --- 3. Sector Modal Handlers ---
  const openSectorModal = (sector) => {
    setEditingSectorId(sector.id);
    setSectorFormData({
      ...sector,
      bullets: sector.bullets ? [...sector.bullets] : []
    });
  };

  const saveSectorModal = () => {
    if (!sectorFormData.title?.trim() || !sectorFormData.desc?.trim()) {
      alert('Sector title and description are required!');
      return;
    }
    const updatedSectors = home.criticalSectors.map((s) =>
      s.id === editingSectorId ? sectorFormData : s
    );
    const updatedHome = { ...home, criticalSectors: updatedSectors };
    setHome(updatedHome);
    setEditingSectorId(null);
    setSectorFormData(null);
    handleSaveAll(updatedHome);
  };

  // --- 4. Stat Counter Modal Handlers ---
  const openStatModal = (stat) => {
    setEditingStatId(stat.id);
    setStatFormData({ ...stat });
  };

  const saveStatModal = () => {
    const updatedStats = home.stats.map((s) =>
      s.id === editingStatId ? statFormData : s
    );
    const updatedHome = { ...home, stats: updatedStats };
    setHome(updatedHome);
    setEditingStatId(null);
    setStatFormData(null);
    handleSaveAll(updatedHome);
  };

  const effectiveTickerItems = (home.tickerItems && home.tickerItems.length > 0)
    ? home.tickerItems
    : DEFAULT_TICKER_ITEMS;

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto pb-16">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Home Page Content Manager</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-100 uppercase tracking-widest">
              Live Config
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure marquee ticker ribbon, operational metrics, 6-step consignment journey, and critical industry sectors
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{savedMsg}</span>
            </span>
          )}
          <button
            onClick={() => handleSaveAll()}
            disabled={isSaving}
            className="px-5 py-2.5 bg-brand-blue hover:bg-brand-red text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Top Navigation Sub-Tabs (Pills) */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 w-fit overflow-x-auto max-w-full">
        <button
          type="button"
          onClick={() => setActiveTab('ticker')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'ticker'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-brand-red" />
          <span>Brand Ticker Ribbon</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600">
            {effectiveTickerItems.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'metrics'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-brand-blue" />
          <span>Operational Metrics</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600">
            {home.stats?.length || 0}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('steps')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'steps'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Truck className="w-4 h-4 text-brand-red" />
          <span>Pickup To Delivery (6 Steps)</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600">
            {home.pickupToDeliverySteps?.length || 6}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sectors')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'sectors'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Boxes className="w-4 h-4 text-brand-blue" />
          <span>Critical Sectors (6 Industries)</span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600">
            {home.criticalSectors?.length || 6}
          </span>
        </button>
      </div>

      {/* ================= TAB 1: BRAND TICKER RIBBON ================= */}
      {activeTab === 'ticker' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Ticker Items Editor Card (No dark preview box) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-red" />
                  <span>Configure Running Ribbon Messages</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  These announcements scroll continuously across the client homepage ribbon.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddTickerItem}
                className="px-4 py-2 bg-slate-900 hover:bg-brand-red text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Message</span>
              </button>
            </div>

            <div className="space-y-3">
              {effectiveTickerItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-500 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => handleTickerChange(item.id, 'text', e.target.value)}
                        placeholder="e.g. ANY SIZE • ANY WEIGHT • ANYWHERE"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900 focus:border-brand-blue focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pl-9 sm:pl-0">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(item.isHighlight)}
                        onChange={(e) => handleTickerChange(item.id, 'isHighlight', e.target.checked)}
                        className="w-4 h-4 rounded text-brand-red focus:ring-brand-red"
                      />
                      <span>Highlight Pill (Red Badge)</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleDeleteTickerItem(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete ticker message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: OPERATIONAL METRICS ================= */}
      {activeTab === 'metrics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-extrabold text-slate-900">Section 2: Key Operational Metrics Strip (4 Counters)</h2>
              <p className="text-xs text-slate-500">Edit values, titles, and subheadings displayed directly beneath the hero video banner</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {home.stats?.map((st) => (
                <div
                  key={st.id}
                  className="p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-brand-blue/40 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400">
                      <span>Counter #{st.id}</span>
                      <BarChart3 className="w-4 h-4 text-brand-blue opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-2xl font-black text-brand-blue">{st.value}</div>
                    <div className="text-sm font-bold text-slate-800">{st.label}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{st.desc}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openStatModal(st)}
                    className="w-full py-2 bg-white hover:bg-brand-blue hover:text-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Metric</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: FROM PICKUP TO DELIVERY (6 STEPS) - NO IMAGES ================= */}
      {activeTab === 'steps' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-red" />
                <span>From Pickup To Delivery: 6-Step Cargo Consignment Journey</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage step badge, heading, subhead description, and 2 feature tick marks for each stage
              </p>
            </div>

            {/* Box Cards without Images (Clean Heading, Subhead, 2 Tick marks) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {home.pickupToDeliverySteps?.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between gap-5 group"
                >
                  <div className="space-y-3.5">
                    {/* Card Header & Badge */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-black">
                        Step {step.step}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                        {step.badge || `Step ${idx + 1}`}
                      </span>
                    </div>

                    {/* Step Heading */}
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors leading-tight">
                      {step.title}
                    </h3>

                    {/* Step Subheading / Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>

                    {/* 2 Tick Marks */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-150">
                        <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span className="truncate">{step.tick1 || 'Real-time milestone logging'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-150">
                        <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span className="truncate">{step.tick2 || 'Zero-delay customs pre-check'}</span>
                      </div>
                    </div>
                  </div>

                  {/* ONLY EDIT BUTTON (No Add, No Delete) */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => openStepModal(idx)}
                      className="w-full py-2.5 bg-slate-50 hover:bg-brand-red hover:text-white border border-slate-200 hover:border-brand-red text-slate-700 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Step</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: SERVING CRITICAL SECTORS (6 INDUSTRIES) ================= */}
      {activeTab === 'sectors' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-extrabold text-slate-900">
                Serving Critical Sectors (6 Industry Applications)
              </h2>
              <p className="text-xs text-slate-500">
                Click "Edit Sector" to modify industry title, tag badge, bullet highlights, and update images with drag & drop uploader
              </p>
            </div>

            {/* Box Cards with Drag & Drop Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {home.criticalSectors?.map((sec, idx) => (
                <div
                  key={sec.id || idx}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  {/* Card Header & Badge */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-50 text-brand-blue text-xs font-black border border-brand-blue-100">
                      {sec.tag || 'Sector Focus'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                    {sec.image ? (
                      <img
                        src={sec.image}
                        alt={sec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/assets/banner-sectors-hd.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1">
                        <ImageIcon className="w-8 h-8 opacity-40" />
                        <span className="text-[11px] font-bold">No Image Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors leading-tight">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                        {sec.desc}
                      </p>

                      {/* Bullets Preview */}
                      {sec.bullets && sec.bullets.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {sec.bullets.map((b, bIdx) => (
                            <span
                              key={bIdx}
                              className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                            >
                              • {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ONLY EDIT BUTTON (No Add, No Delete) */}
                    <div className="pt-4 border-t border-slate-100 mt-4">
                      <button
                        type="button"
                        onClick={() => openSectorModal(sec)}
                        className="w-full py-2.5 bg-slate-50 hover:bg-brand-blue hover:text-white border border-slate-200 hover:border-brand-blue text-slate-700 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Sector</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT STEP (NO IMAGE, HEADING + SUBHEAD + 2 TICK MARKS) ================= */}
      {editingStepIndex !== null && stepFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-black text-sm">
                  {stepFormData.step}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Edit Step {stepFormData.step}: {stepFormData.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Consignment Journey Stage Details
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingStepIndex(null);
                  setStepFormData(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Badge Text & Heading */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Badge Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={stepFormData.badge}
                    onChange={(e) =>
                      setStepFormData({ ...stepFormData, badge: e.target.value })
                    }
                    placeholder="e.g. Step 1"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Step Heading <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={stepFormData.title}
                    onChange={(e) =>
                      setStepFormData({ ...stepFormData, title: e.target.value })
                    }
                    placeholder="e.g. End-to-End Packing"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Subhead / Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Step Subhead / Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="3"
                  required
                  value={stepFormData.desc}
                  onChange={(e) =>
                    setStepFormData({ ...stepFormData, desc: e.target.value })
                  }
                  placeholder="Detailed operational workflow for this consignment stage..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              {/* 2 Tick Mark Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-red" />
                    <span>Tick Mark 1 (Point 1) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={stepFormData.tick1}
                    onChange={(e) =>
                      setStepFormData({ ...stepFormData, tick1: e.target.value })
                    }
                    placeholder="e.g. Real-time milestone logging"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-red" />
                    <span>Tick Mark 2 (Point 2) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={stepFormData.tick2}
                    onChange={(e) =>
                      setStepFormData({ ...stepFormData, tick2: e.target.value })
                    }
                    placeholder="e.g. Zero-delay customs pre-check"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50/50">
              <button
                type="button"
                onClick={() => {
                  setEditingStepIndex(null);
                  setStepFormData(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveStepModal}
                className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Step Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT SECTOR (WITH DRAG & DROP UPLOADER) ================= */}
      {editingSectorId !== null && sectorFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-black text-sm">
                  <Boxes className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Edit Sector: {sectorFormData.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Serving Critical Sectors & Industry Showcase
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingSectorId(null);
                  setSectorFormData(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Sector Title & Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Sector Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={sectorFormData.title}
                    onChange={(e) =>
                      setSectorFormData({ ...sectorFormData, title: e.target.value })
                    }
                    placeholder="e.g. Marine Shipowners & Vessel Managers"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={sectorFormData.tag}
                    onChange={(e) =>
                      setSectorFormData({ ...sectorFormData, tag: e.target.value })
                    }
                    placeholder="e.g. Maritime Priority"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Drag & Drop Image Uploader */}
              <DragDropUploader
                label="Sector Background Image"
                value={sectorFormData.image}
                onChange={(url) => setSectorFormData({ ...sectorFormData, image: url })}
                helpText="Drag & drop sector photo here, or click to browse (JPG, PNG, WebP)"
              />

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Sector Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="3"
                  required
                  value={sectorFormData.desc}
                  onChange={(e) =>
                    setSectorFormData({ ...sectorFormData, desc: e.target.value })
                  }
                  placeholder="Key capabilities and service standards for this industrial sector..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              {/* Highlights / Bullets (Optional) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">
                  Key Bullet Highlights (Comma separated)
                </label>
                <input
                  type="text"
                  value={sectorFormData.bullets?.join(', ') || ''}
                  onChange={(e) =>
                    setSectorFormData({
                      ...sectorFormData,
                      bullets: e.target.value
                        .split(',')
                        .map((b) => b.trim())
                        .filter(Boolean)
                    })
                  }
                  placeholder="e.g. Berth launch boat logistics, Bonded transit clearance, 24/7 Port master access"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-hidden"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50/50">
              <button
                type="button"
                onClick={() => {
                  setEditingSectorId(null);
                  setSectorFormData(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveSectorModal}
                className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-red text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Sector Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT STAT METRIC ================= */}
      {editingStatId !== null && statFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-black text-sm">
                  #{statFormData.id}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Edit Metric Counter
                  </h3>
                  <p className="text-xs text-slate-500">
                    Operational Performance Statistics
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingStatId(null);
                  setStatFormData(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Metric Value *</label>
                <input
                  type="text"
                  required
                  value={statFormData.value}
                  onChange={(e) =>
                    setStatFormData({ ...statFormData, value: e.target.value })
                  }
                  placeholder="e.g. 4,000+"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-black text-brand-blue focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Metric Label *</label>
                <input
                  type="text"
                  required
                  value={statFormData.label}
                  onChange={(e) =>
                    setStatFormData({ ...statFormData, label: e.target.value })
                  }
                  placeholder="e.g. Packages Delivered"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Subtext Description</label>
                <input
                  type="text"
                  value={statFormData.desc}
                  onChange={(e) =>
                    setStatFormData({ ...statFormData, desc: e.target.value })
                  }
                  placeholder="e.g. Active road, rail & maritime corridors"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 focus:border-brand-blue focus:outline-hidden"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50/50">
              <button
                type="button"
                onClick={() => {
                  setEditingStatId(null);
                  setStatFormData(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveStatModal}
                className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-red text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Metric</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageTab;
