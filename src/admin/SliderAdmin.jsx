import React, { useState, useEffect } from 'react';
import { 
  Loader2, X, CheckCircle, Edit, Trash2, 
  Archive, Folder, Calendar, Settings,
  Menu, LogOut, Plus, Copy, Check
} from 'lucide-react';
import { BRAND, CORE_SERVICES } from '../data/siteData';
import INITIAL_HERO_SLIDES from '../data/heroSlides.json';

export const SliderAdmin = () => {
  const [slides, setSlides] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSlides(INITIAL_HERO_SLIDES);
  }, []);

  const getBadgeBg = (slide) => {
    const badges = {
      marine: 'bg-brand-red-50 text-brand-red border-brand-red-200',
      courier: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      customs: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return badges[slide.id?.split('-')[0]] || 'bg-slate-50 text-slate-600 border-slate-200';
  };

  const getGradientColors = (slide) => {
    const gradients = {
      marine: { start: '#003d63', end: '#00243d', accent: '#E8291F' },
      courier: { start: '#0a5f90', end: '#00243d', accent: '#005687' },
      customs: { start: '#003d63', end: '#001a2d', accent: '#005687' }
    };
    const key = slide.id?.split('-')[0];
    return gradients[key] || { start: '#003d63', end: '#00243d', accent: '#E8291F' };
  };

  const handleOpenNew = () => {
    setEditingSlide({
      id: `slide-${Date.now()}`,
      badge: 'New Service',
      titlePrefix: 'Fast shipping from ',
      highlight: 'origin to destination',
      titleSuffix: '.',
      desc: 'Seamless worldwide logistics and freight forwarding solutions.',
      image: '/assets/slide-marine.jpg',
      primaryCta: 'Get fare rate',
      secondaryCta: 'Explore services',
      secondaryLink: '/services',
      serviceId: 'ship-spares',
      featureBadge: 'Priority Desk',
      featureTitle: 'Logistics Service',
      featureDesc: '24/7 dedicated support and fast customs clearance.',
      highlights: ['24/7 Port deck delivery', 'Verified Protocol', 'Live tracking'],
      isActive: true,
      design: {
        gradientStart: '#003d63',
        gradientEnd: '#00243d',
        accentColor: '#E8291F',
        overlayOpacity: '90%',
        badgeBackground: 'bg-brand-red-50 text-brand-red border-brand-red-200',
        showFeatureCard: true
      }
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (slide) => {
    setEditingSlide({ ...slide });
    setIsOpen(true);
  };

  const handleDeleteSlide = (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setSlides(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSaveSlide = (e) => {
    e.preventDefault();
    if (!editingSlide || !editingSlide.id) return;

    setSlides(prev => {
      const idx = prev.findIndex(s => s.id === editingSlide.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = editingSlide;
        return next;
      }
      return [...prev, editingSlide];
    });

    setIsOpen(false);
    setEditingSlide(null);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(slides, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm rounded-xl mb-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue-50 flex items-center justify-center">
              <Settings className="w-5 h-5 text-brand-blue" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Hero Slider Management</h2>
              <p className="text-slate-500 text-sm">Manage your home page slider slides and content</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJson}
              className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              title="Copy current slides JSON to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleOpenNew}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-red text-white rounded-lg text-sm font-semibold hover:bg-brand-red-dark transition-colors cursor-pointer shadow-sm"
              aria-label="Add new slide"
            >
              <Plus className="w-4 h-4" />
              <span>New Slide</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Filters */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-brand-red text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All ({slides.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === 'active' ? 'bg-brand-red text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Active ({slides.filter(s => s.isActive !== false).length})
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === 'inactive' ? 'bg-brand-red text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Inactive ({slides.filter(s => s.isActive === false).length})
            </button>
          </div>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide, idx) => {
            const isFiltered = 
              filter === 'all' ? true :
              filter === 'active' ? slide.isActive !== false :
              slide.isActive === false;

            if (!isFiltered) return null;

            const { gradientStart, gradientEnd } = getGradientColors(slide);
            const badgeBg = getBadgeBg(slide);

            return (
              <div
                key={slide.id}
                className="group rounded-2xl bg-white p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Slide Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white text-sm font-bold shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})` }}
                    >
                      <span>{slide.id ? (slide.id.charAt(0).toUpperCase() + (slide.id.split('-')[1]?.charAt(0)?.toUpperCase() || '')) : 'S'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-800 truncate">{slide.badge}</h3>
                        {slide.isActive === false && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">Inactive</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {slide.titlePrefix} <span className="font-semibold text-brand-red">{slide.highlight}</span> {slide.titleSuffix}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 ml-2">
                      <button
                        onClick={() => handleOpenEdit(slide)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-brand-blue hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Edit slide"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-red hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Slide Preview Card */}
                  <div 
                    className="relative rounded-xl overflow-hidden mb-4 border border-slate-200/60 bg-brand-blue-dark aspect-video flex items-center justify-center"
                  >
                    <img
                      src={slide.image}
                      alt={slide.badge}
                      className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] font-mono text-brand-red font-bold uppercase tracking-wider">{slide.badge}</div>
                      <div className="text-xs font-bold leading-snug truncate drop-shadow">{slide.titlePrefix}{slide.highlight}{slide.titleSuffix}</div>
                    </div>
                  </div>

                  {/* Slide Details */}
                  <div className="space-y-2.5 text-xs text-slate-600 mb-4">
                    <div>
                      <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Description</span>
                      <p className="line-clamp-2 text-slate-700 mt-0.5">{slide.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Primary CTA</span>
                        <span className="font-semibold text-slate-800">{slide.primaryCta}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] block">Service</span>
                        <span className="font-mono text-slate-600">{slide.serviceId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Slide #{idx + 1}</span>
                  <span className="font-mono">{slide.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {slides.length === 0 && (
          <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <Loader2 className="w-10 h-10 mx-auto mb-3 text-slate-400 animate-spin" />
            <p className="font-semibold text-slate-700">No slides configured</p>
            <p className="text-xs text-slate-400 mt-1">Click "+ New Slide" above to add your first slide.</p>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingSlide && slides.some(s => s.id === editingSlide.id) ? 'Edit Slide' : 'Add New Slide'}
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">Configure your hero slider text, image, and CTAs</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveSlide} className="p-6 overflow-y-auto space-y-4 text-sm flex-1">
              {/* Slide ID & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Slide ID (Unique identifier)
                  </label>
                  <input
                    type="text"
                    value={editingSlide?.id || ''}
                    onChange={(e) => setEditingSlide(prev => ({ ...prev, id: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                    placeholder="e.g. marine-logistics"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={editingSlide?.badge || ''}
                    onChange={(e) => setEditingSlide(prev => ({ ...prev, badge: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                    placeholder="e.g. Marine Logistics"
                    required
                  />
                </div>
              </div>

              {/* Title Prefix & Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Title Prefix</label>
                  <input
                    type="text"
                    value={editingSlide?.titlePrefix || ''}
                    onChange={(e) => setEditingSlide(prev => ({ ...prev, titlePrefix: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                    placeholder="e.g. Six ways we get your cargo from "
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Highlight Word (Red)</label>
                  <input
                    type="text"
                    value={editingSlide?.highlight || ''}
                    onChange={(e) => setEditingSlide(prev => ({ ...prev, highlight: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                    placeholder="e.g. origin to destination"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingSlide?.desc || ''}
                  onChange={(e) => setEditingSlide(prev => ({ ...prev, desc: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm resize-none"
                  placeholder="e.g. From ship spares delivered on board at global anchorages..."
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={editingSlide?.image || ''}
                  onChange={(e) => setEditingSlide(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm font-mono"
                  placeholder="e.g. /assets/slide-marine.jpg"
                  required
                />
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Primary CTA</label>
                  <input
                    type="text"
                    value={editingSlide?.primaryCta || ''}
                    onChange={(e) => setEditingSlide(prev => ({ ...prev, primaryCta: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                    placeholder="e.g. Get fare rate"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Secondary CTA</label>
                  <input
                    type="text"
                    value={editingSlide?.secondaryCta || ''}
                    onChange={(e) => setEditingSlide(prev => ({ ...prev, secondaryCta: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                    placeholder="e.g. Explore services"
                    required
                  />
                </div>
              </div>

              {/* Link & Service ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Secondary Link</label>
                  <input
                    type="text"
                    value={editingSlide?.secondaryLink || ''}
                    onChange={(e) => setEditingSlide(prev => ({ ...prev, secondaryLink: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                    placeholder="e.g. /services"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Service ID</label>
                  <select
                    value={editingSlide?.serviceId || ''}
                    onChange={(e) => setEditingSlide(prev => ({ ...prev, serviceId: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
                    required
                  >
                    <option value="">Select service</option>
                    {CORE_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Highlights (comma-separated)</label>
                <textarea
                  rows={2}
                  value={editingSlide?.highlights?.join(', ') || ''}
                  onChange={(e) => setEditingSlide(prev => ({
                    ...prev,
                    highlights: e.target.value.split(',').map(h => h.trim()).filter(h => h.length > 0)
                  }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm resize-none"
                  placeholder="e.g. 24/7 Port deck delivery, IATA / IMO certified DG, Zero-demurrage focus"
                  required
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="slide-active-chk"
                  checked={editingSlide?.isActive !== false}
                  onChange={(e) => setEditingSlide(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 rounded text-brand-red focus:ring-brand-red cursor-pointer"
                />
                <label htmlFor="slide-active-chk" className="text-xs font-medium text-slate-700 cursor-pointer">
                  Slide is active and visible on Home Page
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-bold bg-brand-red text-white hover:bg-brand-red-dark transition-colors cursor-pointer shadow-sm"
                >
                  {editingSlide && slides.some(s => s.id === editingSlide.id) ? 'Update Slide' : 'Add Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};