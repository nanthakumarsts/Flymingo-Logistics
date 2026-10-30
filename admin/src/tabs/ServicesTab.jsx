import React, { useState } from 'react';
import { Save, Plus, Trash2, X, Upload, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { SlugInput } from '../components/SlugInput';

export const ServicesTab = ({ data, onUpdate }) => {
  const [services, setServices] = useState(data.services || []);
  const [savedMsg, setSavedMsg] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadingId, setUploadingId] = useState(null);

  // New service modal form state
  const [newService, setNewService] = useState({
    title: '',
    tagline: '',
    badge: 'SPECIALIZED LOGISTICS',
    path: '',
    image: '/assets/service banner.jpg',
    lead: '',
    shortDesc: '',
    features: [
      'Express priority booking and departure clearance',
      'Door-to-door transit tracking and automated milestone updates',
      'Full customs documentation and export-import compliance',
      'Dedicated operations coordinator assigned 24/7'
    ]
  });

  const handleSaveAll = async () => {
    // 1. Update React Store & localStorage
    onUpdate((prev) => ({
      ...prev,
      services: services
    }));

    // 2. Persist to MySQL via Sequelize
    try {
      await fetch('http://localhost:5000/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services })
      });
      await fetch('http://localhost:5000/api/admin/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services })
      });
    } catch (e) {
      console.warn('Backend sync failed, saved locally:', e);
    }

    setSavedMsg('All services and capabilities saved to MySQL Database!');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  const handleServiceChange = (id, field, value) => {
    setServices((prev) => prev.map((s) => ((s.id === id || s.service_id === id) ? { ...s, [field]: value } : s)));
  };

  const handleFeatureChange = (serviceId, fIdx, val) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId && s.service_id !== serviceId) return s;
        const updated = [...(s.features || [])];
        updated[fIdx] = val;
        return { ...s, features: updated };
      })
    );
  };

  const handleAddFeature = (serviceId) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId && s.service_id !== serviceId) return s;
        return { ...s, features: [...(s.features || []), 'New feature deliverable point'] };
      })
    );
  };

  const handleRemoveFeature = (serviceId, fIdx) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId && s.service_id !== serviceId) return s;
        const updated = (s.features || []).filter((_, i) => i !== fIdx);
        return { ...s, features: updated };
      })
    );
  };

  const handleDeleteService = async (serviceId, title) => {
    if (!window.confirm(`Are you sure you want to delete the service "${title}"?`)) return;

    const filtered = services.filter((s) => (s.id !== serviceId && s.service_id !== serviceId));
    setServices(filtered);

    onUpdate((prev) => ({
      ...prev,
      services: filtered
    }));

    try {
      await fetch(`http://localhost:5000/api/services/${serviceId}`, {
        method: 'DELETE'
      });
      await fetch('http://localhost:5000/api/admin/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: filtered })
      });
    } catch (e) {}

    setSavedMsg(`Service "${title}" deleted.`);
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleFileUpload = async (file, serviceId = null) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    if (serviceId) setUploadingId(serviceId);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data && data.success && data.fileUrl) {
        if (serviceId) {
          handleServiceChange(serviceId, 'image', data.fileUrl);
        } else {
          setNewService((prev) => ({ ...prev, image: data.fileUrl }));
        }
      }
    } catch (err) {
      console.error('File upload error:', err);
      alert('File upload failed: ' + err.message);
    } finally {
      if (serviceId) setUploadingId(null);
    }
  };

  const handleCreateNewService = async (e) => {
    e.preventDefault();
    if (!newService.title.trim()) {
      alert('Please enter a service title');
      return;
    }

    const slug = newService.path.trim() || `/services/${newService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const serviceId = newService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const createdItem = {
      id: serviceId,
      service_id: serviceId,
      title: newService.title.trim(),
      tagline: newService.tagline.trim() || 'Comprehensive Multimodal Cargo Service',
      badge: newService.badge.trim() || 'SPECIALIZED LOGISTICS',
      badgeColor: 'bg-brand-blue-50 text-brand-blue border-brand-blue-200',
      badge_color: 'bg-brand-blue-50 text-brand-blue border-brand-blue-200',
      image: newService.image || '/assets/service banner.jpg',
      lead: newService.lead.trim() || newService.title,
      shortDesc: newService.shortDesc.trim() || newService.lead.trim() || newService.title,
      short_desc: newService.shortDesc.trim() || newService.lead.trim() || newService.title,
      features: newService.features.filter((f) => f.trim().length > 0),
      bullets: newService.features.filter((f) => f.trim().length > 0),
      path: slug,
      sortOrder: services.length + 1,
      sort_order: services.length + 1,
      isActive: true,
      is_active: true
    };

    const updatedList = [...services, createdItem];
    setServices(updatedList);

    // Save to store
    onUpdate((prev) => ({
      ...prev,
      services: updatedList
    }));

    // Post to MySQL DB via Sequelize
    try {
      await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdItem)
      });
      await fetch('http://localhost:5000/api/admin/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: updatedList })
      });
    } catch (e) {
      console.warn('DB create failed, cached locally:', e);
    }

    setIsAddModalOpen(false);
    setNewService({
      title: '',
      tagline: '',
      badge: 'SPECIALIZED LOGISTICS',
      path: '',
      image: '/assets/service banner.jpg',
      lead: '',
      shortDesc: '',
      features: [
        'Express priority booking and departure clearance',
        'Door-to-door transit tracking and automated milestone updates',
        'Full customs documentation and export-import compliance',
        'Dedicated operations coordinator assigned 24/7'
      ]
    });

    setSavedMsg(`New service "${createdItem.title}" created successfully and synced to MySQL!`);
    setTimeout(() => setSavedMsg(''), 4000);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005687]/10 text-[#005687] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            MySQL Sequelize Dynamic Store ({services.length} Services)
          </div>
          <h1 className="text-xl font-black text-slate-900">Services & Capabilities Manager</h1>
          <p className="text-xs text-slate-500">
            Configure all multimodal cargo services, add new offerings, and manage key features checklist that display on Home & Services page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{savedMsg}</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-[#ed2926] hover:bg-[#cc1e1b] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-6 py-2.5 bg-[#005687] hover:bg-[#ed2926] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Services</span>
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-6">
        {services.map((srv, idx) => {
          const sId = srv.id || srv.service_id;
          return (
            <div key={sId || idx} className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#005687] text-white font-black text-xs flex items-center justify-center shadow-sm">
                    #{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{srv.title}</h3>
                    <span className="text-xs font-mono text-slate-400">{srv.path}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-[#005687] rounded-full border border-slate-200">
                    {srv.badge || 'SERVICE'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteService(sId, srv.title)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
                    title="Delete service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Service Title</label>
                  <input
                    type="text"
                    value={srv.title || ''}
                    onChange={(e) => handleServiceChange(sId, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#ed2926]">Tagline / Highlight</label>
                  <input
                    type="text"
                    value={srv.tagline || ''}
                    onChange={(e) => handleServiceChange(sId, 'tagline', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-[#ed2926]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Badge Text</label>
                  <input
                    type="text"
                    value={srv.badge || ''}
                    onChange={(e) => handleServiceChange(sId, 'badge', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Service Slug / Route Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Service URL Route / Slug</label>
                  <SlugInput
                    value={srv.path || ''}
                    onChange={(val) => handleServiceChange(sId, 'path', val)}
                    placeholder="/services/your-service-slug"
                  />
                </div>
                {/* Image Uploader */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Service Banner Photo</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={srv.image || ''}
                      onChange={(e) => handleServiceChange(sId, 'image', e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                      placeholder="/assets/... or uploaded image url"
                    />
                    <label className="px-3.5 py-2 bg-[#005687] hover:bg-[#ed2926] text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingId === sId ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files[0], sId)}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Narratives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Short Summary (Home Page Card)</label>
                  <textarea
                    rows="2"
                    value={srv.shortDesc || srv.short_desc || srv.lead || ''}
                    onChange={(e) => {
                      handleServiceChange(sId, 'shortDesc', e.target.value);
                      handleServiceChange(sId, 'short_desc', e.target.value);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
                    placeholder="Short description displayed on the homepage services card..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Full Lead Narrative (Services Page Portfolio)</label>
                  <textarea
                    rows="2"
                    value={srv.lead || ''}
                    onChange={(e) => handleServiceChange(sId, 'lead', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
                    placeholder="In-depth lead narrative displayed on the services hub..."
                  />
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Deliverables & Capability Checklist ({srv.features?.length || 0} Points)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddFeature(sId)}
                    className="text-xs font-bold text-[#005687] hover:text-[#ed2926] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Point</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {srv.features?.map((ft, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-400 font-bold w-4 shrink-0">{fIdx + 1}.</span>
                      <input
                        type="text"
                        value={ft}
                        onChange={(e) => handleFeatureChange(sId, fIdx, e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(sId, fIdx)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                        title="Remove point"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* ADD NEW SERVICE MODAL                                   */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-fadeIn">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#005687] text-white flex items-center justify-center font-black shadow-md">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Add New Multimodal Service</h3>
                  <p className="text-xs text-slate-500">Configure new offering to show on Home Carousel & Services Page</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewService} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    placeholder="e.g. Cold Chain Pharma Courier"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#ed2926]">Tagline / Highlight</label>
                  <input
                    type="text"
                    value={newService.tagline}
                    onChange={(e) => setNewService({ ...newService, tagline: e.target.value })}
                    placeholder="e.g. Temperature Controlled 24/7"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#ed2926]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Badge Text</label>
                  <input
                    type="text"
                    value={newService.badge}
                    onChange={(e) => setNewService({ ...newService, badge: e.target.value })}
                    placeholder="e.g. TEMPERATURE CONTROLLED"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Route Slug / URL</label>
                  <SlugInput
                    value={newService.path}
                    onChange={(val) => setNewService({ ...newService, path: val })}
                    placeholder="/services/your-custom-slug"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Service Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newService.image}
                    onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                    placeholder="/assets/... or upload photo"
                  />
                  <label className="px-4 py-2 bg-[#005687] hover:bg-[#ed2926] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              {/* Short & Lead Narrative */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Short Summary (Home Page Carousel)</label>
                <textarea
                  rows="2"
                  value={newService.shortDesc}
                  onChange={(e) => setNewService({ ...newService, shortDesc: e.target.value })}
                  placeholder="Concise overview shown on the home page service card..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Detailed Lead Narrative (Services Page)</label>
                <textarea
                  rows="3"
                  value={newService.lead}
                  onChange={(e) => setNewService({ ...newService, lead: e.target.value })}
                  placeholder="Complete operational description shown in the services portfolio showcase..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                />
              </div>

              {/* Checklist */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Deliverables Checklist (4 Key Points)
                </label>
                {newService.features.map((ft, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400 w-4">{idx + 1}.</span>
                    <input
                      type="text"
                      value={ft}
                      onChange={(e) => {
                        const updated = [...newService.features];
                        updated[idx] = e.target.value;
                        setNewService({ ...newService, features: updated });
                      }}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#005687] hover:bg-[#ed2926] text-white text-xs font-bold shadow-md cursor-pointer transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ServicesTab;
