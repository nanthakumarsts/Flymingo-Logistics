import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Tag as TagIcon, 
  Video, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ExternalLink,
  Eye,
  Layers
} from 'lucide-react';
import { DragDropUploader } from '../components/DragDropUploader';
import { SlugInput } from '../components/SlugInput';

const API_BASE = 'http://localhost:5000';

const SERVICE_KEYS = [
  { key: 'ship-spares', label: 'Ship Spares Logistics' },
  { key: 'freight-forwarding', label: 'Freight Forwarding' },
  { key: 'international-courier', label: 'International Courier' },
  { key: 'customs-clearance', label: 'Customs Clearance (CHA)' },
  { key: 'dg-shipping', label: 'Dangerous Goods Cargo' },
  { key: 'international-relocation', label: 'International Relocation' }
];

export const SlidersBannersTab = ({ data, onUpdate }) => {
  const [activeMainTab, setActiveMainTab] = useState('slides'); // 'slides' | 'banners' | 'video'
  const [bannerFilter, setBannerFilter] = useState('all'); // 'all' | 'core' | 'services'
  
  const [bannerVideo, setBannerVideo] = useState(data.bannerVideo || '/assets/fliqmarine-hero.mov');
  const [slides, setSlides] = useState(data.heroSlides || []);
  const [banners, setBanners] = useState(data.pageBanners || {});

  const [savedMsg, setSavedMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Modal States
  const [editingSlide, setEditingSlide] = useState(null); // slide object or null
  const [isAddSlideOpen, setIsAddSlideOpen] = useState(false);
  const [editingBannerKey, setEditingBannerKey] = useState(null); // pageKey string or null
  const [bannerFormData, setBannerFormData] = useState(null);
  const [slideFormData, setSlideFormData] = useState(null);

  // Load latest page banners from backend on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/page-banners`)
      .then((res) => (res.ok ? res.json() : null))
      .then((res) => {
        if (res && res.success && res.banners) {
          setBanners((prev) => ({ ...prev, ...res.banners }));
        }
      })
      .catch(() => {});
  }, []);

  // Global Save All
  const handleSaveAll = async () => {
    setErrorMsg('');
    setSavedMsg('');
    setIsSaving(true);

    const payload = {
      bannerVideo,
      heroSlides: slides,
      pageBanners: banners
    };

    let savedOk = false;
    try {
      const res = await fetch(`${API_BASE}/api/banner`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) savedOk = true;
    } catch (err) {
      console.warn('Backend server unreachable, saved locally:', err);
    }

    onUpdate((prev) => ({
      ...prev,
      bannerVideo,
      heroSlides: slides,
      pageBanners: banners
    }));

    setIsSaving(false);
    if (savedOk) {
      setSavedMsg('All changes saved successfully!');
    } else {
      setSavedMsg('Saved to local session.');
    }
    setTimeout(() => setSavedMsg(''), 3500);
  };

  // --- SLIDE MODAL HANDLERS ---
  const handleOpenEditSlide = (slide) => {
    setEditingSlide(slide);
    setSlideFormData({ ...slide });
  };

  const handleOpenAddSlide = () => {
    setIsAddSlideOpen(true);
    setSlideFormData({
      id: 'slide-' + Date.now(),
      titlePrefix: 'Global Priority ',
      highlight: 'Express Logistics',
      titleSuffix: ' worldwide',
      desc: 'Seamless worldwide delivery connecting South India to 190+ countries with door-to-door tracking.',
      primaryCta: 'Explore Services',
      primarySlug: '/services',
      secondaryCta: 'Get Fare Quote',
      secondarySlug: '/quote',
      serviceId: 'international-courier',
      isActive: true
    });
  };

  const handleSaveSlideForm = async (e) => {
    if (e) e.preventDefault();
    if (!slideFormData.titlePrefix?.trim() || !slideFormData.highlight?.trim()) {
      alert('Title and Highlight are required!');
      return;
    }
    if (!slideFormData.desc?.trim()) {
      alert('Description narrative is required!');
      return;
    }
    if (!slideFormData.primaryCta?.trim() || !slideFormData.primarySlug?.trim()) {
      alert('Button 1 Label and Slug are required!');
      return;
    }

    let updatedSlides;
    if (isAddSlideOpen) {
      updatedSlides = [...slides, slideFormData];
    } else {
      updatedSlides = slides.map((s) => (s.id === slideFormData.id ? slideFormData : s));
    }

    setSlides(updatedSlides);
    setEditingSlide(null);
    setIsAddSlideOpen(false);
    setSlideFormData(null);

    // Persist to backend
    try {
      await fetch(`${API_BASE}/api/banner`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bannerVideo, heroSlides: updatedSlides, pageBanners: banners })
      });
    } catch (e) {}

    onUpdate((prev) => ({ ...prev, heroSlides: updatedSlides }));
    setSavedMsg('Slide saved successfully!');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  const handleDeleteSlide = async (slideId) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    const updatedSlides = slides.filter((s) => s.id !== slideId);
    setSlides(updatedSlides);

    try {
      await fetch(`${API_BASE}/api/hero-slides/${slideId}`, { method: 'DELETE' });
      await fetch(`${API_BASE}/api/banner`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bannerVideo, heroSlides: updatedSlides, pageBanners: banners })
      });
    } catch (e) {}

    onUpdate((prev) => ({ ...prev, heroSlides: updatedSlides }));
    setSavedMsg('Slide deleted.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  // --- PAGE BANNER MODAL HANDLERS ---
  const handleOpenEditBanner = (pageKey) => {
    const b = banners[pageKey] || {};
    setEditingBannerKey(pageKey);
    setBannerFormData({
      pageKey,
      pageName: b.pageName || pageKey,
      pageType: b.pageType || (['about', 'contact', 'services'].includes(pageKey) ? 'main_page' : 'service_detail'),
      badge: b.badge || 'SOUTH INDIA → THE WORLD',
      title: b.title || '',
      highlight: b.highlight || '',
      description: b.description || '',
      buttonLabel: b.buttonLabel || 'Explore Services',
      buttonSlug: b.buttonSlug || '/services',
      bgImage: b.bgImage || '/assets/banner-marine-hd.jpg',
      sideImage: b.sideImage || ''
    });
  };

  const handleSaveBannerForm = async (e) => {
    if (e) e.preventDefault();
    if (!bannerFormData.title?.trim() || !bannerFormData.highlight?.trim()) {
      alert('Title and Highlight are required!');
      return;
    }
    if (!bannerFormData.description?.trim()) {
      alert('Description is required!');
      return;
    }
    if (!bannerFormData.bgImage?.trim()) {
      alert('Background Image is required!');
      return;
    }

    const key = editingBannerKey;
    const updatedBanners = {
      ...banners,
      [key]: bannerFormData
    };

    setBanners(updatedBanners);
    setEditingBannerKey(null);
    setBannerFormData(null);

    // Save to backend endpoint
    try {
      await fetch(`${API_BASE}/api/page-banners/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerFormData)
      });
    } catch (e) {}

    onUpdate((prev) => ({ ...prev, pageBanners: updatedBanners }));
    setSavedMsg(`Saved ${bannerFormData.pageName || key} banner!`);
    setTimeout(() => setSavedMsg(''), 3500);
  };

  // Filtered page banners list
  const bannerEntries = Object.entries(banners).filter(([key, b]) => {
    if (bannerFilter === 'core') return ['about', 'contact', 'services'].includes(key);
    if (bannerFilter === 'services') return !['about', 'contact', 'services'].includes(key);
    return true;
  });

  return (
    <div className="space-y-6 select-none pb-16">
      {/* ========================================================= */}
      {/* 1. TOP HEADER & NAVIGATION TABS (MATCHING IMAGES 3 & 4)    */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 bg-slate-100/95 backdrop-blur-md py-2 -mt-2">
        {/* Navigation Tabs Pill Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveMainTab('slides')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeMainTab === 'slides'
                ? 'bg-[#107c41] text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Home Hero Sliders ({slides.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('banners')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeMainTab === 'banners'
                ? 'bg-[#107c41] text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <TagIcon className="w-4 h-4" />
            <span>All Page Banners ({Object.keys(banners).length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('video')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeMainTab === 'video'
                ? 'bg-[#107c41] text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Hero Background Video</span>
          </button>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {savedMsg}
            </span>
          )}

          {activeMainTab === 'slides' && (
            <button
              type="button"
              onClick={handleOpenAddSlide}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#107c41] hover:bg-[#0e6b37] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Hero Slide</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Sub-header text */}
      {/* <div className="text-xs sm:text-sm text-slate-500 font-medium pl-1">
        {activeMainTab === 'slides' && 'Manage the animated hero slides shown on the home page header.'}
        {activeMainTab === 'banners' && 'Manage page header banners (title, subtitle, background image) across all subpages.'}
        {activeMainTab === 'video' && 'Configure the global background video rendered across all homepage slides.'}
      </div> */}

      {/* ========================================================= */}
      {/* 2. TAB CONTENT 1: HOME HERO SLIDERS (BOX CARDS - IMAGE 3) */}
      {/* ========================================================= */}
      {activeMainTab === 'slides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                {/* Top Tags & Order */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <TagIcon className="w-3 h-3 text-emerald-600" />
                      TAB: {slide.serviceId ? slide.serviceId.toUpperCase() : `SLIDE #${idx + 1}`}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Hero Slide
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Order #{idx + 1}
                  </span>
                </div>

                {/* Slide Headline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {slide.titlePrefix}{' '}
                    <span className="text-brand-red font-black">
                      {slide.highlight}
                    </span>{' '}
                    {slide.titleSuffix}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed font-normal">
                    {slide.desc}
                  </p>
                </div>

                {/* Action Buttons Details Box */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="font-extrabold text-slate-900">Button 1:</span>
                    <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                      {slide.primaryCta}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">({slide.primarySlug})</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="font-extrabold text-slate-900">Button 2:</span>
                    <span className="text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                      {slide.secondaryCta}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">({slide.secondarySlug})</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                    <span className="font-extrabold text-slate-900">Status:</span>
                    <span className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      slide.isActive !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {slide.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Buttons */}
              <div className="flex items-center gap-3 pt-5 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleOpenEditSlide(slide)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#107c41] hover:bg-[#0e6b37] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Slide</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteSlide(slide.id)}
                  title="Delete Slide"
                  className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. TAB CONTENT 2: ALL PAGE BANNERS (BOX CARDS - IMAGE 4)  */}
      {/* ========================================================= */}
      {activeMainTab === 'banners' && (
        <div className="space-y-6">
          {/* Sub-Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBannerFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                bannerFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              All Banners ({Object.keys(banners).length})
            </button>
            <button
              type="button"
              onClick={() => setBannerFilter('core')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                bannerFilter === 'core'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Core Pages (3)
            </button>
            <button
              type="button"
              onClick={() => setBannerFilter('services')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                bannerFilter === 'services'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              Service Details (6)
            </button>
          </div>

          {/* Page Banners Grid (Image 4 Design) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bannerEntries.map(([pageKey, banner]) => (
              <div
                key={pageKey}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="space-y-4">
                  {/* Top Badge & Page Key */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                      {banner.pageName || banner.badge || pageKey.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      Key: {pageKey}
                    </span>
                  </div>

                  {/* Image Preview Box with Path Tag (matching Image 4) */}
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group-hover:border-brand-blue/30 transition-colors">
                    <img
                      src={banner.bgImage || '/assets/banner-marine-hd.jpg'}
                      alt={banner.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = '/assets/banner-marine-hd.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Image path overlay */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 truncate border border-white/10">
                      <ImageIcon className="w-3 h-3 flex-shrink-0 text-white/70" />
                      <span className="truncate">{banner.bgImage}</span>
                    </div>

                    {banner.sideImage && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-brand-red text-white text-[9px] font-bold shadow-md">
                        + Side Image
                      </div>
                    )}
                  </div>

                  {/* Title & Narrative */}
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug line-clamp-2">
                      {banner.title}{' '}
                      {banner.highlight && (
                        <span className="text-brand-red font-black">
                          {banner.highlight}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {banner.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button (Full Width Green Button Matching Image 4) */}
                <button
                  type="button"
                  onClick={() => handleOpenEditBanner(pageKey)}
                  className="w-full mt-5 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#107c41] hover:bg-[#0e6b37] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Page Banner</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. TAB CONTENT 3: HERO BACKGROUND VIDEO                   */}
      {/* ========================================================= */}
      {activeMainTab === 'video' && (
        <div className="max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Hero Background Video</h2>
            <p className="text-xs text-slate-500">
              This video loops in the background on the homepage hero banner behind all carousel slides.
            </p>
          </div>

          <DragDropUploader
            label="Hero Background Video"
            accept="video/*"
            value={bannerVideo}
            onChange={(url) => setBannerVideo(url)}
            placeholder="Drop hero background video here or click to browse (MP4, WebM, MOV)"
            required={true}
          />

          <div className="flex items-center justify-end pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleSaveAll}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#107c41] hover:bg-[#0e6b37] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Video</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MODAL: EDIT PAGE BANNER                                */}
      {/* ========================================================= */}
      {editingBannerKey && bannerFormData && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red">
                  Page Banner Editor
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {bannerFormData.pageName || editingBannerKey}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => { setEditingBannerKey(null); setBannerFormData(null); }}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveBannerForm} className="space-y-5">
              {/* Background Image Drag & Drop */}
              <DragDropUploader
                label="Background Cover Image"
                accept="image/*"
                value={bannerFormData.bgImage}
                onChange={(url) => setBannerFormData({ ...bannerFormData, bgImage: url })}
                placeholder="Drag & drop banner background image here"
                required={true}
              />

              {/* Side Image Drag & Drop (Only for About & Contact) */}
              {['about', 'contact'].includes(editingBannerKey) && (
                <DragDropUploader
                  label="Side Card Feature Image"
                  accept="image/*"
                  value={bannerFormData.sideImage}
                  onChange={(url) => setBannerFormData({ ...bannerFormData, sideImage: url })}
                  placeholder="Drag & drop floating side motif image here"
                  required={true}
                />
              )}

              {/* Eyebrow Badge */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Eyebrow Badge <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={bannerFormData.badge}
                  onChange={(e) => setBannerFormData({ ...bannerFormData, badge: e.target.value })}
                  placeholder="e.g. SOUTH INDIA → THE WORLD"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              {/* Title & Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Main Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={bannerFormData.title}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-red">
                    Red Highlight Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={bannerFormData.highlight}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, highlight: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-red/30 bg-red-50/20 text-xs font-bold text-brand-red focus:border-brand-red focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Description Narrative <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={bannerFormData.description}
                  onChange={(e) => setBannerFormData({ ...bannerFormData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              {/* Button Label & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Action Button Label <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={bannerFormData.buttonLabel}
                    onChange={(e) => setBannerFormData({ ...bannerFormData, buttonLabel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <SlugInput
                  label="Target Slug / Link"
                  required
                  value={bannerFormData.buttonSlug}
                  onChange={(val) => setBannerFormData({ ...bannerFormData, buttonSlug: val })}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setEditingBannerKey(null); setBannerFormData(null); }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#107c41] hover:bg-[#0e6b37] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Banner</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. MODAL: EDIT / ADD HERO SLIDE                           */}
      {/* ========================================================= */}
      {(editingSlide || isAddSlideOpen) && slideFormData && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red">
                  Hero Slide Configuration
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {isAddSlideOpen ? 'Add New Hero Slide' : 'Edit Hero Slide'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => { setEditingSlide(null); setIsAddSlideOpen(false); setSlideFormData(null); }}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveSlideForm} className="space-y-5">
              {/* Title Prefix & Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Title Prefix <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={slideFormData.titlePrefix}
                    onChange={(e) => setSlideFormData({ ...slideFormData, titlePrefix: e.target.value })}
                    placeholder="e.g. Your Global"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-red">
                    Red Highlight Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={slideFormData.highlight}
                    onChange={(e) => setSlideFormData({ ...slideFormData, highlight: e.target.value })}
                    placeholder="e.g. Logistics Partner"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-red/30 bg-red-50/20 text-xs font-bold text-brand-red focus:border-brand-red focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Title Suffix */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Title Suffix (Optional)
                </label>
                <input
                  type="text"
                  value={slideFormData.titleSuffix}
                  onChange={(e) => setSlideFormData({ ...slideFormData, titleSuffix: e.target.value })}
                  placeholder="e.g. worldwide"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Slide Description Narrative <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={slideFormData.desc}
                  onChange={(e) => setSlideFormData({ ...slideFormData, desc: e.target.value })}
                  placeholder="Enter slide narrative text..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              {/* Button 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-extrabold text-slate-800">
                  Button 1 (Primary Action)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Button Label *</label>
                    <input
                      type="text"
                      required
                      value={slideFormData.primaryCta}
                      onChange={(e) => setSlideFormData({ ...slideFormData, primaryCta: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <SlugInput
                      label="Navigation Slug"
                      required
                      value={slideFormData.primarySlug}
                      onChange={(val) => setSlideFormData({ ...slideFormData, primarySlug: val })}
                    />
                  </div>
                </div>
              </div>

              {/* Button 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-extrabold text-slate-800">
                  Button 2 (Secondary Action)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Button Label *</label>
                    <input
                      type="text"
                      required
                      value={slideFormData.secondaryCta}
                      onChange={(e) => setSlideFormData({ ...slideFormData, secondaryCta: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <SlugInput
                      label="Navigation Slug"
                      required
                      value={slideFormData.secondarySlug}
                      onChange={(val) => setSlideFormData({ ...slideFormData, secondarySlug: val })}
                    />
                  </div>
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="slideActiveToggle"
                  checked={slideFormData.isActive !== false}
                  onChange={(e) => setSlideFormData({ ...slideFormData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue"
                />
                <label htmlFor="slideActiveToggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Display this slide actively on Homepage Hero Carousel
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setEditingSlide(null); setIsAddSlideOpen(false); setSlideFormData(null); }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#107c41] hover:bg-[#0e6b37] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Slide</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
