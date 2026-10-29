import React, { useState } from 'react';
import { Sliders, Plus, Trash2, Save, ArrowRight, Video, AlertCircle } from 'lucide-react';
import { DragDropUploader } from '../components/DragDropUploader';

const API_BASE = 'http://localhost:5000';

export const SlidersBannersTab = ({ data, onUpdate }) => {
  const [bannerVideo, setBannerVideo] = useState(data.bannerVideo || '/assets/fliqmarine-hero.mov');
  const [slides, setSlides] = useState(data.heroSlides || []);
  const [banners, setBanners] = useState(data.pageBanners || {});
  const [savedMsg, setSavedMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [invalidSlideId, setInvalidSlideId] = useState(null);

  const handleSaveSlides = async () => {
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
        setErrorMsg(`Slide "${slide.titlePrefix} ${slide.highlight}" is missing the description text.`);
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

    // Attempt save to Express Backend API
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
      console.warn('Backend server unreachable, saved to browser storage:', err);
    }

    // Update frontend state & localStorage
    onUpdate((prev) => ({
      ...prev,
      bannerVideo,
      heroSlides: slides,
      pageBanners: banners
    }));

    if (backendSaved) {
      setSavedMsg('Saved to Backend Server & Local Store successfully!');
    } else {
      setSavedMsg('Saved to Local Store (Backend offline)');
    }
    setTimeout(() => setSavedMsg(''), 4000);
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
    setBanners({
      ...banners,
      [page]: {
        ...banners[page],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header with Save Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <h1 className="text-xl font-black text-slate-900">Hero Sliders & Page Banners</h1>
          <p className="text-xs text-slate-500">
            Configure single continuous video background, slide headlines with custom button links, and inner page banners.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
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
            onClick={handleSaveSlides}
            className="px-5 py-2.5 bg-[#005687] hover:bg-[#ed2926] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Banners</span>
          </button>
        </div>
      </div>

      {/* Part 1: Single Continuous Video for all Home Sliders */}
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
                This continuous video plays smoothly in the background while slide headlines rotate over it.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Shared Video
          </span>
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
            <span>Hero Slide Headlines & Action Buttons</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {slides.length} Slides
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
                      className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#005687] outline-none ${
                        !slide.titlePrefix ? 'border-red-300' : 'border-slate-200'
                      }`}
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
                      className={`w-full px-3 py-2 bg-red-50/50 border rounded-lg text-xs font-bold text-[#ed2926] focus:ring-2 focus:ring-[#ed2926] outline-none ${
                        !slide.highlight ? 'border-red-300' : 'border-red-200'
                      }`}
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
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-[#005687] outline-none ${
                      !slide.desc ? 'border-red-300' : 'border-slate-200'
                    }`}
                  />
                </div>

                {/* Two Action Buttons with Custom Labels and Slugs */}
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
                  <span className="text-xs font-black uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-[#005687]" />
                    <span>Two Action Buttons & Navigation Slugs</span>
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Button 1 */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-[#ed2926] uppercase">Primary Button (Solid Red)</span>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                          <span>Button 1 Label</span>
                          <span className="text-red-500 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Explore Services"
                          value={slide.primaryCta || ''}
                          onChange={(e) => handleSlideChange(slide.id, 'primaryCta', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                          <span>Button 1 Slug / Path</span>
                          <span className="text-red-500 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="/services or /quote or /contact"
                          value={slide.primarySlug || ''}
                          onChange={(e) => handleSlideChange(slide.id, 'primarySlug', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Button 2 */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-[#005687] uppercase">Secondary Button (White Outline)</span>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                          <span>Button 2 Label</span>
                          <span className="text-red-500 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Get Fare Quote"
                          value={slide.secondaryCta || ''}
                          onChange={(e) => handleSlideChange(slide.id, 'secondaryCta', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                          <span>Button 2 Slug / Path</span>
                          <span className="text-red-500 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="/contact or /quote or /services"
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

      {/* Part 3: Inner Page Banners */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-base font-extrabold text-slate-900">
          Inner Page Banners (About, Services, Contact)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {Object.entries(banners).map(([pageKey, b]) => (
            <div key={pageKey} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-black uppercase text-[#005687] tracking-wider">{pageKey} Page Banner</span>
                <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">Live</span>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Banner Heading</label>
                <input
                  type="text"
                  value={b.title || ''}
                  onChange={(e) => handleBannerChange(pageKey, 'title', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#ed2926]">Red Highlight Part</label>
                <input
                  type="text"
                  value={b.highlight || ''}
                  onChange={(e) => handleBannerChange(pageKey, 'highlight', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-red-50/50 border border-red-200 rounded-md text-xs font-bold text-[#ed2926]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Tagline / Subheading</label>
                <input
                  type="text"
                  value={b.tagline || ''}
                  onChange={(e) => handleBannerChange(pageKey, 'tagline', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs"
                />
              </div>
              <DragDropUploader
                label="Banner Background Image"
                value={b.image || ''}
                onChange={(val) => handleBannerChange(pageKey, 'image', val)}
                accept="image/*"
                isVideo={false}
                helpText="Drop image or click browse"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
