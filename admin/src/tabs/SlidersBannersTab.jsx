import React, { useState, useEffect } from 'react';
import { Sliders, Plus, Trash2, Save, ArrowRight, Video, AlertCircle, CheckCircle2, Layers, FileText } from 'lucide-react';
import { DragDropUploader } from '../components/DragDropUploader';

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
  const [bannerVideo, setBannerVideo] = useState(data.bannerVideo || '/assets/fliqmarine-hero.mov');
  const [slides, setSlides] = useState(data.heroSlides || []);
  const [banners, setBanners] = useState(data.pageBanners || {});
  const [savedMsg, setSavedMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [invalidSlideId, setInvalidSlideId] = useState(null);

  // Active sub-tabs for inner banners
  const [activeCoreTab, setActiveCoreTab] = useState('about');
  const [activeServiceTab, setActiveServiceTab] = useState('ship-spares');

  // Load latest page banners from MySQL API on mount
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

  const handleSaveAll = async () => {
    setErrorMsg('');
    setSavedMsg('');
    setInvalidSlideId(null);

    // Validate global video
    if (!bannerVideo || !bannerVideo.trim()) {
      setErrorMsg('Global Homepage Banner Video is required!');
      return;
    }

    // Validate required fields in each active slide
    for (const slide of slides) {
      if (!slide.titlePrefix?.trim() || !slide.highlight?.trim()) {
        setErrorMsg(`Slide "${slide.titlePrefix || 'Untitled'}" is missing required Title or Red Highlight text.`);
        setInvalidSlideId(slide.id);
        return;
      }
      if (!slide.desc?.trim()) {
        setErrorMsg(`Slide "${slide.titlePrefix} ${slide.highlight}" is missing description text.`);
        setInvalidSlideId(slide.id);
        return;
      }
      if (!slide.primaryCta?.trim() || !slide.primarySlug?.trim()) {
        setErrorMsg(`Slide "${slide.titlePrefix} ${slide.highlight}" requires Button 1 Label & Slug.`);
        setInvalidSlideId(slide.id);
        return;
      }
      if (!slide.secondaryCta?.trim() || !slide.secondarySlug?.trim()) {
        setErrorMsg(`Slide "${slide.titlePrefix} ${slide.highlight}" requires Button 2 Label & Slug.`);
        setInvalidSlideId(slide.id);
        return;
      }
    }

    // Attempt save to Express Backend API (MySQL flymingo)
    const payload = {
      bannerVideo,
      heroSlides: slides,
      pageBanners: banners
    };

    let backendSaved = false;
    try {
      const res = await fetch(`${API_BASE}/api/banner`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        backendSaved = true;
      }
    } catch (err) {
      console.warn('Backend server unreachable, saved to local cache:', err);
    }

    // Update frontend state & localStorage
    onUpdate((prev) => ({
      ...prev,
      bannerVideo,
      heroSlides: slides,
      pageBanners: banners
    }));

    if (backendSaved) {
      setSavedMsg('All Banners & Slides Saved to MySQL Database (flymingo)!');
    } else {
      setSavedMsg('Saved to Local Cache (MySQL Server Offline)');
    }
    setTimeout(() => setSavedMsg(''), 4000);
  };

  const handleSaveSingleBanner = async (pageKey) => {
    setErrorMsg('');
    setSavedMsg('');
    const bannerToSave = banners[pageKey];
    if (!bannerToSave) return;

    if (!bannerToSave.title?.trim() || !bannerToSave.highlight?.trim()) {
      setErrorMsg(`Title and Red Highlight are required for ${pageKey} banner!`);
      return;
    }
    if (!bannerToSave.bgImage?.trim()) {
      setErrorMsg(`Background image is required for ${pageKey} banner!`);
      return;
    }

    let saved = false;
    try {
      const res = await fetch(`${API_BASE}/api/page-banners/${pageKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerToSave)
      });
      if (res.ok) {
        saved = true;
      }
    } catch (err) {
      console.warn('Backend error:', err);
    }

    onUpdate((prev) => ({
      ...prev,
      pageBanners: {
        ...prev.pageBanners,
        [pageKey]: bannerToSave
      }
    }));

    if (saved) {
      setSavedMsg(`✅ ${bannerToSave.pageName || pageKey} banner saved to MySQL!`);
    } else {
      setSavedMsg(`Saved to local cache (${pageKey})`);
    }
    setTimeout(() => setSavedMsg(''), 3500);
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: 'slide-' + Date.now(),
      titlePrefix: 'Global Priority ',
      highlight: 'Express Delivery',
      titleSuffix: '',
      desc: 'Seamless worldwide delivery connecting South India to 190+ countries with door-to-door tracking and dedicated customs clearance.',
      primaryCta: 'Explore Services',
      primarySlug: '/services',
      secondaryCta: 'Get Fare Quote',
      secondarySlug: '/quote',
      serviceId: 'international-courier',
      isActive: true
    };
    setSlides([...slides, newSlide]);
  };

  const handleDeleteSlide = (id) => {
    setSlides(slides.filter((s) => s.id !== id));
  };

  const handleSlideChange = (id, field, value) => {
    setSlides(slides.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleBannerChange = (page, field, value) => {
    setBanners((prev) => ({
      ...prev,
      [page]: {
        ...(prev[page] || {}),
        [field]: value
      }
    }));
  };

  const currentCoreBanner = banners[activeCoreTab] || {};
  const currentServiceBanner = banners[activeServiceTab] || {};

  return (
    <div className="space-y-8 select-none">
      {/* Top Header with Save Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900">Hero Sliders & Page Banners</h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              MySQL flymingo Live
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Dynamic banner configuration for Homepage Carousel, Core Pages (About, Contact, Services), and 6 Services Detail pages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {savedMsg}
            </span>
          )}
          {errorMsg && (
            <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-200 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </span>
          )}
          <button
            type="button"
            onClick={handleAddSlide}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-5 py-2.5 bg-[#005687] hover:bg-[#ed2926] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All to MySQL</span>
          </button>
        </div>
      </div>

      {/* Part 1: Homepage Hero Video */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-[#ed2926] flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900">
                Global Homepage Hero Background Video (1 Single Video for all Slides)
              </h2>
              <p className="text-[11px] text-slate-500">
                Stored in MySQL database table <span className="font-mono text-[#005687]">banner_settings</span>
              </p>
            </div>
          </div>
        </div>

        <DragDropUploader
          label="Hero Background Video"
          value={bannerVideo}
          onChange={setBannerVideo}
          accept="video/mp4,video/quicktime,video/webm"
          isVideo={true}
          helpText="Drag & drop high-definition MP4/MOV video here, or browse files"
          required={true}
        />
      </div>

      {/* Part 2: Homepage Hero Carousel Slides */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span>Homepage Hero Carousel Slides</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {slides.length} Slides &bull; MySQL table hero_slides
            </span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Fields marked with <span className="text-red-500 font-bold">*</span> are required
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {slides.map((slide, idx) => {
            const isInvalid = invalidSlideId === slide.id;
            return (
              <div 
                key={slide.id} 
                className={`bg-white rounded-2xl border p-6 space-y-4 shadow-sm transition-all ${
                  isInvalid ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#005687]/10 text-[#005687] text-xs font-black flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {slide.titlePrefix} <span className="text-[#ed2926]">{slide.highlight}</span>
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">{slide.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={slide.isActive}
                        onChange={(e) => handleSlideChange(slide.id, 'isActive', e.target.checked)}
                        className="rounded text-[#005687]"
                      />
                      <span>Active</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Headline Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <span>Title Prefix</span>
                      <span className="text-red-500 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Your Global "
                      value={slide.titlePrefix || ''}
                      onChange={(e) => handleSlideChange(slide.id, 'titlePrefix', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#005687] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#ed2926] flex items-center gap-1">
                      <span>Red Highlight Text</span>
                      <span className="text-red-500 font-black">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Logistics Partner"
                      value={slide.highlight || ''}
                      onChange={(e) => handleSlideChange(slide.id, 'highlight', e.target.value)}
                      className="w-full px-3 py-2 bg-red-50/50 border border-red-200 rounded-lg text-xs font-bold text-[#ed2926] focus:ring-2 focus:ring-[#ed2926] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Title Suffix (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Worldwide"
                      value={slide.titleSuffix || ''}
                      onChange={(e) => handleSlideChange(slide.id, 'titleSuffix', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#005687] outline-none"
                    />
                  </div>
                </div>

                {/* Slide Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span>Slide Description Narrative</span>
                    <span className="text-red-500 font-black">*</span>
                  </label>
                  <textarea
                    rows="2"
                    required
                    placeholder="Enter slide description text..."
                    value={slide.desc || ''}
                    onChange={(e) => handleSlideChange(slide.id, 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-[#005687] outline-none"
                  />
                </div>

                {/* Two Action Buttons with Custom Slugs */}
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
                  <span className="text-xs font-black uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-[#005687]" />
                    <span>Two Action Buttons & Navigation Slugs</span>
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Button 1 */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-[#ed2926] uppercase">Button 1 (Solid Red)</span>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Button 1 Label *</label>
                        <input
                          type="text"
                          required
                          value={slide.primaryCta || ''}
                          onChange={(e) => handleSlideChange(slide.id, 'primaryCta', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Button 1 Slug / Path *</label>
                        <input
                          type="text"
                          required
                          value={slide.primarySlug || ''}
                          onChange={(e) => handleSlideChange(slide.id, 'primarySlug', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Button 2 */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-[#005687] uppercase">Button 2 (White Outline)</span>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Button 2 Label *</label>
                        <input
                          type="text"
                          required
                          value={slide.secondaryCta || ''}
                          onChange={(e) => handleSlideChange(slide.id, 'secondaryCta', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600">Button 2 Slug / Path *</label>
                        <input
                          type="text"
                          required
                          value={slide.secondarySlug || ''}
                          onChange={(e) => handleSlideChange(slide.id, 'secondarySlug', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 3: Core Page Banners (About, Contact, Services Hub) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#005687]" />
              <span>Core Page Banners (About, Contact, Services Hub)</span>
            </h2>
            <p className="text-xs text-slate-500">
              CRUD banner management stored in MySQL table <span className="font-mono text-[#005687]">page_banners</span>
            </p>
          </div>
          {/* Sub-tab pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
            {['about', 'contact', 'services'].map((key) => {
              const label = key === 'about' ? 'About Us' : key === 'contact' ? 'Contact Us' : 'Services Hub';
              const isActive = activeCoreTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveCoreTab(key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive ? 'bg-[#005687] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Core Banner Editor */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-black uppercase text-[#005687] tracking-wider">
                {currentCoreBanner.pageName || activeCoreTab.toUpperCase()} BANNER
              </span>
              <p className="text-[11px] text-slate-400">
                {activeCoreTab === 'services'
                  ? 'Configures: Background Image, Eyebrow Badge, Headline, Paragraph, and Action Button'
                  : 'Configures: Background Image, Eyebrow Badge, Headline, Paragraph, Action Button, and Side Image'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSaveSingleBanner(activeCoreTab)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save {currentCoreBanner.pageName || activeCoreTab} to MySQL</span>
            </button>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>Eyebrow Badge</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SOUTH INDIA → THE WORLD"
                value={currentCoreBanner.badge || ''}
                onChange={(e) => handleBannerChange(activeCoreTab, 'badge', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#005687] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>Banner Heading</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. We Are The Bridge..."
                value={currentCoreBanner.title || ''}
                onChange={(e) => handleBannerChange(activeCoreTab, 'title', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-[#005687] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#ed2926] flex items-center gap-1">
                <span>Red Highlight Text</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Across Oceans & Continents."
                value={currentCoreBanner.highlight || ''}
                onChange={(e) => handleBannerChange(activeCoreTab, 'highlight', e.target.value)}
                className="w-full px-3 py-2 bg-red-50/50 border border-red-200 rounded-lg text-xs font-bold text-[#ed2926] focus:ring-2 focus:ring-[#ed2926] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>Button Label</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Explore Our Services"
                value={currentCoreBanner.buttonLabel || ''}
                onChange={(e) => handleBannerChange(activeCoreTab, 'buttonLabel', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#005687] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>Button Slug / Path</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="/services or /quote or /contact"
                value={currentCoreBanner.buttonSlug || ''}
                onChange={(e) => handleBannerChange(activeCoreTab, 'buttonSlug', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-[#005687] outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>Paragraph Description</span>
              <span className="text-red-500 font-black">*</span>
            </label>
            <textarea
              rows="2"
              required
              placeholder="Enter banner narrative description..."
              value={currentCoreBanner.description || ''}
              onChange={(e) => handleBannerChange(activeCoreTab, 'description', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-[#005687] outline-none"
            />
          </div>

          {/* Uploaders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <DragDropUploader
              label="Banner Background Image"
              value={currentCoreBanner.bgImage || currentCoreBanner.image || ''}
              onChange={(val) => {
                handleBannerChange(activeCoreTab, 'bgImage', val);
                handleBannerChange(activeCoreTab, 'image', val);
              }}
              accept="image/*"
              isVideo={false}
              helpText="Drag & drop background image or click browse"
              required={true}
            />

            {(activeCoreTab === 'about' || activeCoreTab === 'contact') && (
              <DragDropUploader
                label={`Side Feature Image (${activeCoreTab === 'about' ? 'Arch Photo' : 'Contact Photo'})`}
                value={currentCoreBanner.sideImage || ''}
                onChange={(val) => handleBannerChange(activeCoreTab, 'sideImage', val)}
                accept="image/*"
                isVideo={false}
                helpText="Drag & drop side image or click browse"
                required={true}
              />
            )}
          </div>
        </div>
      </div>

      {/* Part 4: Services Detail Pages Banners (6 Services) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#ed2926]" />
              <span>Services Detail Pages Banners (6 Individual Services)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Configure Background Image, Eyebrow Badge, Headline, Paragraph, and Button with Slug for each service
            </p>
          </div>
        </div>

        {/* 6 Services Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {SERVICE_KEYS.map((s) => {
            const isActive = activeServiceTab === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setActiveServiceTab(s.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#ed2926] text-white border-[#ed2926] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#ed2926] hover:text-[#ed2926]'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Active Service Detail Banner Editor */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-black uppercase text-[#ed2926] tracking-wider">
                {currentServiceBanner.pageName || activeServiceTab} BANNER
              </span>
              <p className="text-[11px] text-slate-400">
                Route: /services/{activeServiceTab} &bull; Stored in MySQL table page_banners
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSaveSingleBanner(activeServiceTab)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save {currentServiceBanner.pageName || activeServiceTab} to MySQL</span>
            </button>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>Eyebrow Badge</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 24/7 MARITIME LOGISTICS"
                value={currentServiceBanner.badge || ''}
                onChange={(e) => handleBannerChange(activeServiceTab, 'badge', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#005687] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>Title Prefix</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ship Spares & "
                value={currentServiceBanner.title || ''}
                onChange={(e) => handleBannerChange(activeServiceTab, 'title', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-[#005687] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#ed2926] flex items-center gap-1">
                <span>Red Highlight Part</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. On-Board Delivery"
                value={currentServiceBanner.highlight || ''}
                onChange={(e) => handleBannerChange(activeServiceTab, 'highlight', e.target.value)}
                className="w-full px-3 py-2 bg-red-50/50 border border-red-200 rounded-lg text-xs font-bold text-[#ed2926] focus:ring-2 focus:ring-[#ed2926] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>Button Label</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Request Spares Delivery"
                value={currentServiceBanner.buttonLabel || ''}
                onChange={(e) => handleBannerChange(activeServiceTab, 'buttonLabel', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#005687] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>Button Slug / Path</span>
                <span className="text-red-500 font-black">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="/quote or /contact or /services"
                value={currentServiceBanner.buttonSlug || ''}
                onChange={(e) => handleBannerChange(activeServiceTab, 'buttonSlug', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-[#005687] outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>Paragraph Description</span>
              <span className="text-red-500 font-black">*</span>
            </label>
            <textarea
              rows="2"
              required
              placeholder="Enter service banner description..."
              value={currentServiceBanner.description || ''}
              onChange={(e) => handleBannerChange(activeServiceTab, 'description', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-[#005687] outline-none"
            />
          </div>

          {/* Background Image Drag & Drop */}
          <DragDropUploader
            label="Service Banner Background Image"
            value={currentServiceBanner.bgImage || currentServiceBanner.image || ''}
            onChange={(val) => {
              handleBannerChange(activeServiceTab, 'bgImage', val);
              handleBannerChange(activeServiceTab, 'image', val);
            }}
            accept="image/*"
            isVideo={false}
            helpText="Drag & drop high-definition banner photo or click browse"
            required={true}
          />
        </div>
      </div>
    </div>
  );
};
