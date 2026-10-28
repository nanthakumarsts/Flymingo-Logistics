import React, { useState } from 'react';
import { Sliders, Plus, Trash2, Edit3, Check, Save, Image, ArrowRight } from 'lucide-react';

export const SlidersBannersTab = ({ data, onUpdate }) => {
  const [slides, setSlides] = useState(data.heroSlides || []);
  const [banners, setBanners] = useState(data.pageBanners || {});
  const [editingSlideId, setEditingSlideId] = useState(null);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveSlides = () => {
    onUpdate((prev) => ({
      ...prev,
      heroSlides: slides,
      pageBanners: banners
    }));
    setSavedMsg('Hero Sliders and Page Banners saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: 'slide-' + Date.now(),
      badge: 'SOUTH INDIA → THE WORLD',
      titlePrefix: 'New Express ',
      highlight: 'Global Shipping',
      titleSuffix: '',
      tagline: 'Fast. Secure. Insured Delivery.',
      desc: 'Seamless worldwide delivery connecting South India to 190+ countries with door-to-door tracking.',
      image: '/assets/banner-courier-hd.jpg',
      primaryCta: 'Explore Services',
      secondaryCta: 'Get Fare Quote',
      secondaryLink: '/services',
      serviceId: 'international-courier',
      isActive: true
    };
    setSlides([...slides, newSlide]);
    setEditingSlideId(newSlide.id);
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
          <p className="text-xs text-slate-500">Configure homepage carousel slides and inner page banner titles, subtitles & images</p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              {savedMsg}
            </span>
          )}
          <button
            onClick={handleAddSlide}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>
          <button
            onClick={handleSaveSlides}
            className="px-5 py-2.5 bg-[#005687] hover:bg-[#ed2926] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Banners</span>
          </button>
        </div>
      </div>

      {/* Part 1: Homepage Hero Sliders */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <span>Homepage Hero Carousel Slides</span>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
            {slides.length} Slides
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-5">
          {slides.map((slide, idx) => (
            <div 
              key={slide.id} 
              className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#005687]/10 text-[#005687] text-xs font-black flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{slide.titlePrefix} {slide.highlight}</h3>
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
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Editable Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Badge Text</label>
                  <input
                    type="text"
                    value={slide.badge}
                    onChange={(e) => handleSlideChange(slide.id, 'badge', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Title Prefix</label>
                  <input
                    type="text"
                    value={slide.titlePrefix}
                    onChange={(e) => handleSlideChange(slide.id, 'titlePrefix', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#ed2926]">Red Highlight Text</label>
                  <input
                    type="text"
                    value={slide.highlight}
                    onChange={(e) => handleSlideChange(slide.id, 'highlight', e.target.value)}
                    className="w-full px-3 py-2 bg-red-50/50 border border-red-200 rounded-lg text-xs font-bold text-[#ed2926]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Tagline</label>
                  <input
                    type="text"
                    value={slide.tagline}
                    onChange={(e) => handleSlideChange(slide.id, 'tagline', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Background Image Path</label>
                  <input
                    type="text"
                    value={slide.image}
                    onChange={(e) => handleSlideChange(slide.id, 'image', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Primary CTA Text</label>
                  <input
                    type="text"
                    value={slide.primaryCta}
                    onChange={(e) => handleSlideChange(slide.id, 'primaryCta', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Slide Description Narrative</label>
                <textarea
                  rows="2"
                  value={slide.desc}
                  onChange={(e) => handleSlideChange(slide.id, 'desc', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Inner Page Banners */}
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
                  value={b.title}
                  onChange={(e) => handleBannerChange(pageKey, 'title', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#ed2926]">Red Highlight Part</label>
                <input
                  type="text"
                  value={b.highlight}
                  onChange={(e) => handleBannerChange(pageKey, 'highlight', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-red-50/50 border border-red-200 rounded-md text-xs font-bold text-[#ed2926]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Tagline / Subheading</label>
                <input
                  type="text"
                  value={b.tagline}
                  onChange={(e) => handleBannerChange(pageKey, 'tagline', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Background Image</label>
                <input
                  type="text"
                  value={b.image}
                  onChange={(e) => handleBannerChange(pageKey, 'image', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
