import React, { useState } from 'react';
import { Save, Plus, Trash2, Star, MessageSquare } from 'lucide-react';

export const TestimonialsTab = ({ data, onUpdate }) => {
  const [testimonials, setTestimonials] = useState(data.testimonials || []);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = () => {
    onUpdate((prev) => ({
      ...prev,
      testimonials: testimonials
    }));
    setSavedMsg('Testimonials updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleAdd = () => {
    const newT = {
      id: 't' + Date.now(),
      name: 'Client Name',
      company: 'Global Enterprises Ltd',
      role: 'Managing Director',
      rating: 5,
      service: 'International Courier',
      quote: 'Exceptional door-to-door courier service with transparent tracking and zero delay.',
      date: 'Just Now'
    };
    setTestimonials([newT, ...testimonials]);
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const handleChange = (id, field, value) => {
    setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <h1 className="text-xl font-black text-slate-900">Client Testimonials & Feedback</h1>
          <p className="text-xs text-slate-500">Manage authentic customer reviews, star ratings, and company feedback displayed on the site</p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              {savedMsg}
            </span>
          )}
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Review</span>
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#005687] hover:bg-[#ed2926] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Testimonials</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Client Name</label>
                <input
                  type="text"
                  value={t.name}
                  onChange={(e) => handleChange(t.id, 'name', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Company / Title</label>
                <input
                  type="text"
                  value={t.company}
                  onChange={(e) => handleChange(t.id, 'company', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Service Utilized</label>
              <input
                type="text"
                value={t.service}
                onChange={(e) => handleChange(t.id, 'service', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">Testimonial Quote</label>
              <textarea
                rows="3"
                value={t.quote}
                onChange={(e) => handleChange(t.id, 'quote', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
