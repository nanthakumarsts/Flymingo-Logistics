import React, { useState } from 'react';
import {
  Save, Plus, Trash2, Award, Compass, Target, CheckCircle2,
  Info, TrendingUp, Image as ImageIcon, Check, Edit3, X, Sparkles
} from 'lucide-react';
import { DragDropUploader } from '../components/DragDropUploader';

const DEFAULT_ABOUT = {
  whoWeAre: {
    badge: 'About Flymingo Logistics',
    title: 'We Are The Bridge Between You And',
    highlight: 'Your Relations',
    paragraph1: 'Flymingo Logistics is an International Logistics company that offers high quality international courier services, packers and movers services and all mode international shipping within budget worldwide. Our primary objective is to provide quick delivery, clearance and door to door delivery worldwide. We are based out of Coimbatore.',
    paragraph2: 'Flymingo Logistics has an excellent track record of success in delivering packages both on time and damage free. We have partnered with leading international companies worldwide to reach each corner of the world. We are glad to mention that our services are best leading in position within the present market.',
    metrics: [
      { id: '1', value: '220+', label: 'Countries Served', desc: 'Global air & ocean routes', color: 'text-brand-blue' },
      { id: '2', value: '99%', label: 'On-Time Clearance', desc: 'Zero damage track record', color: 'text-brand-red' },
      { id: '3', value: '2018', label: 'Year Established', desc: 'Founded in Coimbatore', color: 'text-slate-900' }
    ],
    sideImage: '/assets/about page  first relation image.jpg',
    sideCardTag: 'DELIVERING WITH CARE',
    sideCardTitle: 'Trusted Doorstep International Courier'
  },
  journey: {
    eyebrow: 'Milestone History',
    title: 'Our Journey of Growth',
    subtitle: 'Connecting the world, one shipment at a time.',
    timeline: [
      {
        id: '2018',
        year: '2018',
        name: 'Foundation',
        head: 'Foundation in Coimbatore',
        tag: 'Coimbatore Inception',
        metric: 'Coimbatore Hub Established',
        desc: 'Flymingo Logistics was established in Coimbatore with a vision to simplify international logistics for individuals and regional manufacturers.',
        image: '/assets/movers.jpg',
        features: ['Personal Courier Focus', 'Doorstep Pickup In Coimbatore', 'Transparent Direct Pricing']
      },
      {
        id: '2019',
        year: '2019',
        name: 'Expanding Horizons',
        head: 'Expanding Horizons Worldwide',
        tag: 'Global Scale',
        metric: '50+ Countries Connected',
        desc: 'Expanded our network to cover 50+ countries, partnering with major global carriers to offer seamless courier services.',
        image: '/assets/movers.jpg',
        features: ['Major Global Airline Partnerships', 'Commercial Samples Transit', 'Rapid Document Courier']
      },
      {
        id: '2021',
        year: '2021',
        name: 'Multi-Modal Logistics',
        head: 'Air & Sea Freight Divisions',
        tag: 'Intermodal Expansion',
        metric: 'Air & Ocean Freight Divisions',
        desc: 'Launched dedicated Sea and Air Freight divisions, enabling us to handle heavy cargo and commercial shipments efficiently.',
        image: '/assets/sea cargo.jpg',
        features: ['FCL & LCL Ocean Freight', 'Heavy Commercial Air Cargo', 'Multi-Layer Packing Standards']
      },
      {
        id: '2023',
        year: '2023',
        name: 'Technological Leap',
        head: 'Automated Customs & Real-Time Tracking',
        tag: 'Digital Automation',
        metric: '99% On-Time Delivery Benchmark',
        desc: 'Implemented advanced tracking systems and automated customs clearance processes to ensure 99% on-time delivery.',
        image: '/assets/service banner.jpg',
        features: ['Real-Time GPS Tracking', 'Direct Seaport EDI Clearance', 'Zero-Delay Clearance Protocol']
      },
      {
        id: '2024',
        year: '2024',
        name: 'Global Leader',
        head: '220+ Countries & Outer Anchorage Berth Services',
        tag: 'Worldwide Maritime Leader',
        metric: '220+ Countries & Berth Services',
        desc: 'Now serving 220+ countries with specialized services like Ship Spares Logistics and DG Shipping, setting new industry standards.',
        image: '/assets/international_courier_banner.jpg',
        features: ['24/7 Ship Spares Deck Delivery', 'IMO / IATA Certified DG Handling', 'Full International Network']
      }
    ]
  },
  pillars: [
    {
      id: '1',
      title: 'Values',
      badge: 'Core Identity',
      desc: 'Values us unit what bind us together to move towards our vision with integrity and trust.',
      image: '/assets/value.jpg'
    },
    {
      id: '2',
      title: 'Quality',
      badge: 'Zero Defect',
      desc: 'Attention to detail and attributes of balanced perfection are accomplished from Quality. Quality could also be a true concern for finishing work well and is gained through education, training, and information. We, at Flymingo Logistics, lay durable stress on work our workers, as we tend to believe that the absolute best levels of consumer satisfaction and operational excellence unit achieved only with this worth.',
      image: '/assets/quality.jpg'
    },
    {
      id: '3',
      title: 'Communication',
      badge: '24/7 Responsiveness',
      desc: "Effective communication is the key for sustained business relationships. At Flymingo Logistics, we tend to trust that language supported effective listening; understanding other's points of browse, and applicable discretion would cause durable teams and partnerships.",
      image: '/assets/communication.jpg'
    }
  ],
  whyChooseUs: [
    'We Carry anything globally',
    'Most Competitive Prices! Unmatched',
    'Door Pickup – Door delivery – Free Packing',
    'Your packages will be delivered in 4 to 6 business days',
    'We ship with DHL, FEDEX, TNT & ETC world renown companies',
    'You save up to 50% due to our high volume of shipping',
    'Each shipment carries insurance'
  ],
  ourGoals: [
    'Rendering quality services at your door step',
    'We maintain genuineness with our service',
    'We maintain good rapport with our customer'
  ]
};

export const AboutPageTab = ({ data, onUpdate }) => {
  const [about, setAbout] = useState(() => {
    const raw = data.aboutContent || {};
    return {
      ...DEFAULT_ABOUT,
      ...raw,
      whoWeAre: {
        ...DEFAULT_ABOUT.whoWeAre,
        ...(raw.whoWeAre || {})
      },
      journey: {
        ...DEFAULT_ABOUT.journey,
        ...(raw.journey || {}),
        timeline: (raw.journey?.timeline && raw.journey.timeline.length > 0)
          ? raw.journey.timeline
          : DEFAULT_ABOUT.journey.timeline
      },
      pillars: (raw.pillars && raw.pillars.length > 0) ? raw.pillars : DEFAULT_ABOUT.pillars,
      whyChooseUs: (raw.whyChooseUs && raw.whyChooseUs.length > 0) ? raw.whyChooseUs : DEFAULT_ABOUT.whyChooseUs,
      ourGoals: (raw.ourGoals && raw.ourGoals.length > 0) ? raw.ourGoals : DEFAULT_ABOUT.ourGoals
    };
  });

  const [activeTab, setActiveTab] = useState('whoWeAre'); // 'whoWeAre' | 'journey' | 'pillars' | 'whyUsGoals'
  const [savedMsg, setSavedMsg] = useState('');

  // Milestone edit modal state
  const [editingMilestoneIndex, setEditingMilestoneIndex] = useState(null);
  const [milestoneFormData, setMilestoneFormData] = useState(null);

  const handleSaveAll = (updatedAbout = about) => {
    onUpdate((prev) => ({
      ...prev,
      aboutContent: updatedAbout
    }));

    // Also persist to backend API if available
    fetch('http://localhost:5000/api/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aboutContent: updatedAbout })
    }).catch(() => {});

    setSavedMsg('About page changes saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  // --- Handlers: Who We Are ---
  const handleWhoWeAreChange = (field, value) => {
    const updated = {
      ...about,
      whoWeAre: {
        ...about.whoWeAre,
        [field]: value
      }
    };
    setAbout(updated);
  };

  const handleMetricChange = (index, field, value) => {
    const metrics = [...(about.whoWeAre?.metrics || [])];
    metrics[index] = { ...metrics[index], [field]: value };
    const updated = {
      ...about,
      whoWeAre: { ...about.whoWeAre, metrics }
    };
    setAbout(updated);
  };

  // --- Handlers: Journey of Growth ---
  const handleJourneyHeaderChange = (field, value) => {
    const updated = {
      ...about,
      journey: {
        ...about.journey,
        [field]: value
      }
    };
    setAbout(updated);
  };

  const openMilestoneModal = (index) => {
    const item = about.journey.timeline[index];
    setEditingMilestoneIndex(index);
    setMilestoneFormData({
      id: item.id || String(Date.now()),
      year: item.year || '',
      name: item.name || item.title || '',
      head: item.head || item.title || '',
      tag: item.tag || '',
      metric: item.metric || '',
      desc: item.desc || '',
      image: item.image || '/assets/movers.jpg',
      badge1: item.features?.[0] || '',
      badge2: item.features?.[1] || '',
      badge3: item.features?.[2] || ''
    });
  };

  const openAddMilestoneModal = () => {
    const nextYear = String(new Date().getFullYear() + 1);
    setEditingMilestoneIndex(-1);
    setMilestoneFormData({
      id: String(Date.now()),
      year: nextYear,
      name: 'New Milestone',
      head: 'New Milestone Achievement',
      tag: 'Global Expansion',
      metric: 'Milestone Target',
      desc: 'Describe this strategic growth achievement in detail.',
      image: '/assets/sea cargo.jpg',
      badge1: 'Global Reach',
      badge2: 'Express Delivery',
      badge3: 'Zero Damage Guarantee'
    });
  };

  const saveMilestoneModal = () => {
    if (!milestoneFormData.year || !milestoneFormData.name) {
      alert('Year and milestone name are required!');
      return;
    }
    const features = [
      milestoneFormData.badge1?.trim(),
      milestoneFormData.badge2?.trim(),
      milestoneFormData.badge3?.trim()
    ].filter(Boolean);

    const updatedTimeline = [...about.journey.timeline];
    const newMilestone = {
      id: milestoneFormData.id,
      year: milestoneFormData.year,
      name: milestoneFormData.name,
      head: milestoneFormData.head || milestoneFormData.name,
      tag: milestoneFormData.tag,
      metric: milestoneFormData.metric,
      desc: milestoneFormData.desc,
      image: milestoneFormData.image,
      features
    };

    if (editingMilestoneIndex >= 0) {
      updatedTimeline[editingMilestoneIndex] = newMilestone;
    } else {
      updatedTimeline.push(newMilestone);
    }

    const updated = {
      ...about,
      journey: {
        ...about.journey,
        timeline: updatedTimeline
      }
    };
    setAbout(updated);
    setEditingMilestoneIndex(null);
    setMilestoneFormData(null);
    handleSaveAll(updated);
  };

  const deleteMilestone = (index) => {
    if (about.journey.timeline.length <= 1) {
      alert('At least one milestone must remain in the journey!');
      return;
    }
    if (confirm(`Delete milestone "${about.journey.timeline[index].year} - ${about.journey.timeline[index].name}"?`)) {
      const updatedTimeline = about.journey.timeline.filter((_, i) => i !== index);
      const updated = {
        ...about,
        journey: {
          ...about.journey,
          timeline: updatedTimeline
        }
      };
      setAbout(updated);
      handleSaveAll(updated);
    }
  };

  // --- Handlers: Pillars ---
  const handlePillarChange = (idx, field, value) => {
    const updatedPillars = [...about.pillars];
    updatedPillars[idx] = { ...updatedPillars[idx], [field]: value };
    setAbout({ ...about, pillars: updatedPillars });
  };

  // --- Handlers: Why Us & Goals ---
  const handleWhyUsChange = (idx, value) => {
    const updated = [...about.whyChooseUs];
    updated[idx] = value;
    setAbout({ ...about, whyChooseUs: updated });
  };

  const addWhyUsPoint = () => {
    setAbout({ ...about, whyChooseUs: [...about.whyChooseUs, 'New competitive advantage point'] });
  };

  const deleteWhyUsPoint = (idx) => {
    setAbout({ ...about, whyChooseUs: about.whyChooseUs.filter((_, i) => i !== idx) });
  };

  const handleGoalChange = (idx, value) => {
    const updated = [...about.ourGoals];
    updated[idx] = value;
    setAbout({ ...about, ourGoals: updated });
  };

  const addGoalPoint = () => {
    setAbout({ ...about, ourGoals: [...about.ourGoals, 'New corporate goal statement'] });
  };

  const deleteGoalPoint = (idx) => {
    setAbout({ ...about, ourGoals: about.ourGoals.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto pb-16">
      {/* Top Action Bar (Sub-Tabs Pills side-by-side matching HomePageTab) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Navigation Sub-Tabs (Pills) */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab('whoWeAre')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'whoWeAre'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Info className="w-4 h-4 text-brand-red" />
            <span>Section 1: Who We Are</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600">
              Overview
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('journey')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'journey'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-brand-blue" />
            <span>Section 2: Journey of Growth</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600">
              {about.journey.timeline?.length || 5}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pillars')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'pillars'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Section 3: Core Pillars</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600">
              {about.pillars?.length || 3}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('whyUsGoals')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'whyUsGoals'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Target className="w-4 h-4 text-emerald-600" />
            <span>Section 4: Why Us & Goals</span>
          </button>
        </div>

        {/* Save Changes Button */}
        <div className="flex items-center gap-3 shrink-0">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>{savedMsg}</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => handleSaveAll()}
            className="px-6 py-2.5 rounded-xl bg-[#005687] hover:bg-[#ed2926] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save About Changes</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SECTION 1 - WHO WE ARE / ABOUT FLYMINGO LOGISTICS (IMAGE 3)       */}
      {/* ========================================================================= */}
      {activeTab === 'whoWeAre' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red">
                  Section 1 Configuration
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  Who We Are (About Flymingo Logistics)
                </h2>
                <p className="text-xs text-slate-500">
                  Matches client UI Image 3: Badge, Heading, 2 Paragraphs, 3 Metric Highlights, and Photo Card.
                </p>
              </div>
            </div>

            {/* Badge & Headings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Section Badge</label>
                <input
                  type="text"
                  value={about.whoWeAre?.badge || ''}
                  onChange={(e) => handleWhoWeAreChange('badge', e.target.value)}
                  placeholder="e.g. About Flymingo Logistics"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:border-[#005687] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Main Heading</label>
                <input
                  type="text"
                  value={about.whoWeAre?.title || ''}
                  onChange={(e) => handleWhoWeAreChange('title', e.target.value)}
                  placeholder="e.g. We Are The Bridge Between You And"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:border-[#005687] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#005687]">Highlighted Words (Colored)</label>
                <input
                  type="text"
                  value={about.whoWeAre?.highlight || ''}
                  onChange={(e) => handleWhoWeAreChange('highlight', e.target.value)}
                  placeholder="e.g. Your Relations"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blue-200 bg-blue-50/40 text-xs font-bold text-[#005687] focus:border-[#005687] focus:outline-hidden"
                />
              </div>
            </div>

            {/* 2 Paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Paragraph 1</label>
                <textarea
                  rows={4}
                  value={about.whoWeAre?.paragraph1 || ''}
                  onChange={(e) => handleWhoWeAreChange('paragraph1', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs leading-relaxed text-slate-800 focus:border-[#005687] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Paragraph 2</label>
                <textarea
                  rows={4}
                  value={about.whoWeAre?.paragraph2 || ''}
                  onChange={(e) => handleWhoWeAreChange('paragraph2', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs leading-relaxed text-slate-800 focus:border-[#005687] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Bottom 3 Metric Highlights (Kela iruka 3 section) */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">
                Bottom 3 Metric Highlights (Kela iruka 3 section)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {about.whoWeAre?.metrics?.map((m, idx) => (
                  <div key={m.id || idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                        Metric #{idx + 1}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500">Value Number</label>
                      <input
                        type="text"
                        value={m.value || ''}
                        onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                        placeholder="e.g. 220+"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-black font-mono text-[#005687]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500">Label</label>
                      <input
                        type="text"
                        value={m.label || ''}
                        onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                        placeholder="e.g. Countries Served"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500">Subtext Description</label>
                      <input
                        type="text"
                        value={m.desc || ''}
                        onChange={(e) => handleMetricChange(idx, 'desc', e.target.value)}
                        placeholder="e.g. Global air & ocean routes"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Image & Inside Card Text */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">
                Side Image & Floating Glass Card (Side img athukula iruka text)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <DragDropUploader
                    label="Side Showcase Photo"
                    value={about.whoWeAre?.sideImage}
                    onChange={(url) => handleWhoWeAreChange('sideImage', url)}
                    placeholder="Drop relation showcase photo here or click to browse"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Inside Glass Card Floating Text
                  </span>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Card Eyebrow / Tag</label>
                    <input
                      type="text"
                      value={about.whoWeAre?.sideCardTag || ''}
                      onChange={(e) => handleWhoWeAreChange('sideCardTag', e.target.value)}
                      placeholder="e.g. DELIVERING WITH CARE"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold text-brand-red"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Card Title</label>
                    <input
                      type="text"
                      value={about.whoWeAre?.sideCardTitle || ''}
                      onChange={(e) => handleWhoWeAreChange('sideCardTitle', e.target.value)}
                      placeholder="e.g. Trusted Doorstep International Courier"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SECTION 2 - OUR JOURNEY OF GROWTH (MILESTONES)                      */}
      {/* ========================================================================= */}
      {activeTab === 'journey' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red">
                  Section 2 Configuration
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  Our Journey of Growth (Milestones)
                </h2>
                <p className="text-xs text-slate-500">
                  Configure Year, Milestone Name, Image, Head, Subhead, and 3 Feature Badges for each stage.
                </p>
              </div>
              <button
                type="button"
                onClick={openAddMilestoneModal}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#005687] hover:bg-[#ed2926] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone Year</span>
              </button>
            </div>

            {/* Section Header Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Section Eyebrow</label>
                <input
                  type="text"
                  value={about.journey?.eyebrow || ''}
                  onChange={(e) => handleJourneyHeaderChange('eyebrow', e.target.value)}
                  placeholder="e.g. Milestone History"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Section Title</label>
                <input
                  type="text"
                  value={about.journey?.title || ''}
                  onChange={(e) => handleJourneyHeaderChange('title', e.target.value)}
                  placeholder="e.g. Our Journey of Growth"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Section Subtitle</label>
                <input
                  type="text"
                  value={about.journey?.subtitle || ''}
                  onChange={(e) => handleJourneyHeaderChange('subtitle', e.target.value)}
                  placeholder="e.g. Connecting the world, one shipment at a time."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-600"
                />
              </div>
            </div>

            {/* Milestone Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {about.journey?.timeline?.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="group relative rounded-3xl bg-white border border-slate-200 hover:border-brand-blue/50 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  {/* Card Image Banner */}
                  <div className="relative h-40 bg-slate-900 overflow-hidden">
                    <img
                      src={item.image || '/assets/movers.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      onError={(e) => { e.currentTarget.src = '/assets/sea cargo.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-red text-white text-xs font-mono font-black shadow-md">
                      {item.year}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-mono font-bold uppercase text-brand-red-light block">
                        {item.tag || 'Milestone'}
                      </span>
                      <h4 className="text-sm font-black truncate">{item.name || item.title}</h4>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <div>
                      <h5 className="text-xs font-extrabold text-slate-900 line-clamp-1">
                        {item.head || item.title}
                      </h5>
                      <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* 3 Badges */}
                    <div className="space-y-1 pt-2 border-t border-slate-100 mt-auto">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                        3 Badges:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.features?.slice(0, 3).map((f, fi) => (
                          <span
                            key={fi}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700"
                          >
                            <Check className="w-2.5 h-2.5 text-brand-red" />
                            <span className="truncate max-w-[140px]">{f}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => openMilestoneModal(idx)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#005687] hover:bg-[#ed2926] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Milestone</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteMilestone(idx)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SECTION 3 - CORE PILLARS                                           */}
      {/* ========================================================================= */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red">
                Section 3 Configuration
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-0.5">
                Core Pillars: Values, Quality & Communication
              </h2>
              <p className="text-xs text-slate-500">
                Manage the 3 foundational pillars of Flymingo Logistics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {about.pillars?.map((pil, idx) => (
                <div key={pil.id || idx} className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-sm font-black text-[#005687]">{pil.title}</span>
                    <span className="text-[10px] font-mono font-bold text-brand-red bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                      {pil.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Pillar Title</label>
                    <input
                      type="text"
                      value={pil.title || ''}
                      onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Pillar Badge Tag</label>
                    <input
                      type="text"
                      value={pil.badge || ''}
                      onChange={(e) => handlePillarChange(idx, 'badge', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Description</label>
                    <textarea
                      rows={5}
                      value={pil.desc || ''}
                      onChange={(e) => handlePillarChange(idx, 'desc', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs leading-relaxed text-slate-700"
                    />
                  </div>

                  <DragDropUploader
                    label="Pillar Visual Photo"
                    value={pil.image}
                    onChange={(url) => handlePillarChange(idx, 'image', url)}
                    placeholder="Drop pillar photo here or click to browse"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: SECTION 4 - WHY CHOOSE US & GOALS                                   */}
      {/* ========================================================================= */}
      {activeTab === 'whyUsGoals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Why Choose Us */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red">
                  Section 4A
                </span>
                <h3 className="text-base font-black text-slate-900">Why Choose Us (7 Points)</h3>
              </div>
              <button
                type="button"
                onClick={addWhyUsPoint}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#005687] hover:text-white text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Point</span>
              </button>
            </div>

            <div className="space-y-2">
              {about.whyChooseUs?.map((pt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center text-[10px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={pt}
                    onChange={(e) => handleWhyUsChange(i, e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:border-[#005687] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => deleteWhyUsPoint(i)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove point"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Our Goals */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red">
                  Section 4B
                </span>
                <h3 className="text-base font-black text-slate-900">Our Goals (3 Points)</h3>
              </div>
              <button
                type="button"
                onClick={addGoalPoint}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#005687] hover:text-white text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Goal</span>
              </button>
            </div>

            <div className="space-y-2">
              {about.ourGoals?.map((pt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={pt}
                    onChange={(e) => handleGoalChange(i, e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:border-[#005687] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => deleteGoalPoint(i)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove goal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT / ADD JOURNEY MILESTONE                                       */}
      {/* ========================================================================= */}
      {editingMilestoneIndex !== null && milestoneFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-black text-sm">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {editingMilestoneIndex >= 0 ? `Edit Milestone: ${milestoneFormData.year}` : 'Add New Milestone Year'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure milestone header, narrative, image, and 3 feature badges
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingMilestoneIndex(null);
                  setMilestoneFormData(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto overflow-x-hidden">
              {/* Year & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Milestone Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={milestoneFormData.year}
                    onChange={(e) => setMilestoneFormData({ ...milestoneFormData, year: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold font-mono focus:border-brand-blue focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Milestone Name / Rail Label <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={milestoneFormData.name}
                    onChange={(e) => setMilestoneFormData({ ...milestoneFormData, name: e.target.value })}
                    placeholder="e.g. Global Leader"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Head & Subhead / Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Card Heading (Head)</label>
                  <input
                    type="text"
                    value={milestoneFormData.head}
                    onChange={(e) => setMilestoneFormData({ ...milestoneFormData, head: e.target.value })}
                    placeholder="e.g. 220+ Countries & Outer Anchorage Berth Services"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Subhead Tag (Dub Head)</label>
                  <input
                    type="text"
                    value={milestoneFormData.tag}
                    onChange={(e) => setMilestoneFormData({ ...milestoneFormData, tag: e.target.value })}
                    placeholder="e.g. Worldwide Maritime Leader"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Metric Chip */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Metric Chip Display</label>
                <input
                  type="text"
                  value={milestoneFormData.metric}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, metric: e.target.value })}
                  placeholder="e.g. 220+ Countries & Berth Services"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              {/* Description Paragraph */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Detailed Narrative Description</label>
                <textarea
                  rows={3}
                  value={milestoneFormData.desc}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, desc: e.target.value })}
                  placeholder="Describe key logistics advancements..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              {/* Milestone Image */}
              <DragDropUploader
                label="Milestone Visual Image (Img)"
                value={milestoneFormData.image}
                onChange={(url) => setMilestoneFormData({ ...milestoneFormData, image: url })}
                placeholder="Drop milestone photo or click to upload"
                required={true}
              />

              {/* 3 Badges */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 block">
                  3 Feature Badges (3 badge athula irukanum)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Badge #1</label>
                    <input
                      type="text"
                      value={milestoneFormData.badge1}
                      onChange={(e) => setMilestoneFormData({ ...milestoneFormData, badge1: e.target.value })}
                      placeholder="e.g. 24/7 Ship Spares Deck Delivery"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-brand-blue focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Badge #2</label>
                    <input
                      type="text"
                      value={milestoneFormData.badge2}
                      onChange={(e) => setMilestoneFormData({ ...milestoneFormData, badge2: e.target.value })}
                      placeholder="e.g. IMO / IATA Certified DG Handling"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-brand-blue focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Badge #3</label>
                    <input
                      type="text"
                      value={milestoneFormData.badge3}
                      onChange={(e) => setMilestoneFormData({ ...milestoneFormData, badge3: e.target.value })}
                      placeholder="e.g. Full International Network"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-brand-blue focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50/50">
              <button
                type="button"
                onClick={() => {
                  setEditingMilestoneIndex(null);
                  setMilestoneFormData(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveMilestoneModal}
                className="px-6 py-2.5 rounded-xl bg-[#005687] hover:bg-[#ed2926] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Milestone</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPageTab;
