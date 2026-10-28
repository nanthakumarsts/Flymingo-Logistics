import React, { useState } from 'react';
import { Save, Plus, Trash2, Award, Compass, Shield, Target } from 'lucide-react';

export const AboutPageTab = ({ data, onUpdate }) => {
  const [about, setAbout] = useState(data.aboutContent || {});
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = () => {
    onUpdate((prev) => ({
      ...prev,
      aboutContent: about
    }));
    setSavedMsg('About page content saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleHeroChange = (field, value) => {
    setAbout({
      ...about,
      hero: { ...about.hero, [field]: value }
    });
  };

  const handleBoxChange = (id, field, value) => {
    const updated = about.highlightBoxes.map(b => b.id === id ? { ...b, [field]: value } : b);
    setAbout({ ...about, highlightBoxes: updated });
  };

  const handleTimelineChange = (idx, field, value) => {
    const updated = [...about.timeline];
    updated[idx][field] = value;
    setAbout({ ...about, timeline: updated });
  };

  const handlePillarChange = (idx, field, value) => {
    const updated = [...about.pillars];
    updated[idx][field] = value;
    setAbout({ ...about, pillars: updated });
  };

  const handleWhyUsChange = (idx, value) => {
    const updated = [...about.whyChooseUs];
    updated[idx] = value;
    setAbout({ ...about, whyChooseUs: updated });
  };

  const handleGoalsChange = (idx, value) => {
    const updated = [...about.ourGoals];
    updated[idx] = value;
    setAbout({ ...about, ourGoals: updated });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <h1 className="text-xl font-black text-slate-900">About Page Content Manager</h1>
          <p className="text-xs text-slate-500">Configure hero content, 3 highlight chips, growth timeline, core pillars, why choose us, and goals</p>
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
            <span>Save About Changes</span>
          </button>
        </div>
      </div>

      {/* 1. Hero & 3 Highlight Boxes */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
        <h2 className="text-base font-extrabold text-slate-900">
          Section 1: Hero Banner & 3 Floating Highlight Boxes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Heading Text</label>
            <input
              type="text"
              value={about.hero?.title}
              onChange={(e) => handleHeroChange('title', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#ed2926]">Red Highlight Line</label>
            <input
              type="text"
              value={about.hero?.highlight}
              onChange={(e) => handleHeroChange('highlight', e.target.value)}
              className="w-full px-3 py-2 bg-red-50/50 border border-red-200 rounded-lg text-xs font-bold text-[#ed2926]"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-600">Lead Narrative Description</label>
            <textarea
              rows="2"
              value={about.hero?.description}
              onChange={(e) => handleHeroChange('description', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
            />
          </div>
        </div>

        {/* 3 Highlight Boxes */}
        <div className="pt-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            3 Floating Metric Chips (Photo Collage Side)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {about.highlightBoxes?.map((b) => (
              <div key={b.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <input
                  type="text"
                  value={b.number}
                  onChange={(e) => handleBoxChange(b.id, 'number', e.target.value)}
                  className="w-full font-black text-sm text-[#005687] bg-white px-2 py-1 border border-slate-200 rounded"
                />
                <input
                  type="text"
                  value={b.label}
                  onChange={(e) => handleBoxChange(b.id, 'label', e.target.value)}
                  className="w-full text-xs font-semibold text-slate-600 bg-white px-2 py-1 border border-slate-200 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Growth Journey Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#005687]" />
          <span>Our Journey of Growth (Timeline Milestones)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {about.timeline?.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="text-xs font-black text-[#ed2926] font-mono">{item.year}</span>
                <span className="text-[10px] font-bold text-slate-500">{item.metric}</span>
              </div>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)}
                className="w-full text-xs font-bold text-slate-900 bg-white px-2 py-1 border border-slate-200 rounded"
              />
              <textarea
                rows="2"
                value={item.desc}
                onChange={(e) => handleTimelineChange(idx, 'desc', e.target.value)}
                className="w-full text-xs text-slate-600 bg-white px-2 py-1 border border-slate-200 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Pillars (Values, Quality, Communication) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#ed2926]" />
          <span>Core Pillars: Values, Quality & Communication</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {about.pillars?.map((pil, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                <span className="text-xs font-black text-[#005687]">{pil.title}</span>
                <span className="text-[10px] font-bold text-[#ed2926]">{pil.badge}</span>
              </div>
              <textarea
                rows="4"
                value={pil.desc}
                onChange={(e) => handlePillarChange(idx, 'desc', e.target.value)}
                className="w-full text-xs text-slate-600 bg-white px-2 py-1.5 border border-slate-200 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Why Choose Us & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3">
          <h2 className="text-base font-extrabold text-slate-900">Why Choose Us (7 Points)</h2>
          <div className="space-y-2">
            {about.whyChooseUs?.map((pt, i) => (
              <input
                key={i}
                type="text"
                value={pt}
                onChange={(e) => handleWhyUsChange(i, e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-800"
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3">
          <h2 className="text-base font-extrabold text-slate-900">Our Goals (3 Points)</h2>
          <div className="space-y-2">
            {about.ourGoals?.map((pt, i) => (
              <input
                key={i}
                type="text"
                value={pt}
                onChange={(e) => handleGoalsChange(i, e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium text-slate-800"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
