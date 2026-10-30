import React, { useState, useEffect } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Star,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit3,
  X,
  ThumbsUp,
  Filter
} from 'lucide-react';

const API_BASE = 'http://localhost:5000';

export const TestimonialsTab = ({ data, onUpdate }) => {
  const [testimonials, setTestimonials] = useState(data.testimonials || []);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved'
  const [savedMsg, setSavedMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  const [newFormData, setNewFormData] = useState({
    name: '',
    company: '',
    role: '',
    rating: 5,
    service: 'International Courier',
    quote: '',
    status: 'approved'
  });

  // Sync external changes
  useEffect(() => {
    if (data.testimonials) {
      setTestimonials(data.testimonials);
    }
  }, [data.testimonials]);

  // Fetch testimonials from API if available
  useEffect(() => {
    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.success && json.testimonials) {
          setTestimonials(json.testimonials);
          onUpdate((prev) => ({
            ...prev,
            testimonials: json.testimonials
          }));
        }
      })
      .catch(() => {});
  }, []);

  const persistTestimonials = async (updatedList) => {
    setTestimonials(updatedList);
    onUpdate((prev) => ({
      ...prev,
      testimonials: updatedList
    }));

    setIsSaving(true);
    try {
      await fetch(`${API_BASE}/api/banner`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testimonials: updatedList })
      });
      setSavedMsg('Testimonials updated successfully!');
    } catch (e) {
      setSavedMsg('Saved locally!');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  // Toggle approve / pending status
  const handleSetStatus = async (id, newStatus) => {
    const updated = testimonials.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    await persistTestimonials(updated);

    // Call individual API endpoint if server is active
    fetch(`${API_BASE}/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    const updated = testimonials.filter((t) => t.id !== id);
    await persistTestimonials(updated);

    fetch(`${API_BASE}/api/testimonials/${id}`, {
      method: 'DELETE'
    }).catch(() => {});
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newFormData.name.trim() || !newFormData.quote.trim()) {
      alert('Please fill out client name and quote.');
      return;
    }
    const newT = {
      id: 't-' + Date.now(),
      name: newFormData.name.trim(),
      company: newFormData.company.trim() || newFormData.role.trim() || 'Client',
      role: newFormData.role.trim() || 'Verified Customer',
      rating: Number(newFormData.rating) || 5,
      service: newFormData.service.trim() || 'International Courier',
      quote: newFormData.quote.trim(),
      date: 'Just Now',
      status: newFormData.status || 'approved'
    };

    const updated = [newT, ...testimonials];
    await persistTestimonials(updated);
    setIsAddModalOpen(false);
    setNewFormData({
      name: '',
      company: '',
      role: '',
      rating: 5,
      service: 'International Courier',
      quote: '',
      status: 'approved'
    });
  };

  const handleEditOpen = (t) => {
    setEditingId(t.id);
    setEditFormData({ ...t });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editFormData.name.trim() || !editFormData.quote.trim()) {
      alert('Client name and review are required.');
      return;
    }
    const updated = testimonials.map((t) =>
      t.id === editingId ? editFormData : t
    );
    await persistTestimonials(updated);
    setEditingId(null);
    setEditFormData(null);
  };

  // Filtered counts
  const pendingCount = testimonials.filter((t) => t.status === 'pending').length;
  const approvedCount = testimonials.filter((t) => t.status === 'approved' || !t.status).length;

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === 'pending') return t.status === 'pending';
    if (filter === 'approved') return t.status === 'approved' || !t.status;
    return true;
  });

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-brand-blue" />
            <span>Client Testimonials & Feedback</span>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black animate-pulse">
                {pendingCount} Pending
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review authentic client feedback, approve pending submissions, or remove reviews from the public website
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{savedMsg}</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-brand-red text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review</span>
          </button>

          <button
            type="button"
            onClick={() => persistTestimonials(testimonials)}
            disabled={isSaving}
            className="px-5 py-2.5 bg-brand-blue hover:bg-brand-red text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Counters */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 w-fit">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>All Reviews</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-600">
              {testimonials.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              filter === 'pending'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Pending Approval</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
              pendingCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
            }`}>
              {pendingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              filter === 'approved'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Approved & Live</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-[10px] font-mono font-bold text-emerald-700">
              {approvedCount}
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{filteredTestimonials.length}</span> of {testimonials.length} reviews
        </div>
      </div>

      {/* Testimonials Grid Cards */}
      {filteredTestimonials.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No testimonials found in this tab</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {filter === 'pending'
              ? 'No pending reviews right now. Any review submitted by clients from the website will appear here for approval.'
              : 'Add new client reviews or switch to the All tab.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map((t) => {
            const isPending = t.status === 'pending';
            return (
              <div
                key={t.id}
                className={`bg-white rounded-3xl border p-6 flex flex-col justify-between gap-5 transition-all shadow-xs hover:shadow-md ${
                  isPending
                    ? 'border-amber-300 ring-2 ring-amber-100 bg-gradient-to-b from-amber-50/20 via-white to-white'
                    : 'border-slate-200'
                }`}
              >
                {/* Card Top: Status & Rating */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    {/* Status Badge */}
                    {isPending ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black animate-pulse">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pending Approval</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Approved & Live</span>
                      </span>
                    )}

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (t.rating || 5)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-mono font-bold text-slate-500 ml-1">
                        ({t.rating || 5}.0)
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-sm text-slate-700 leading-relaxed italic bg-slate-50/70 p-4 rounded-2xl border border-slate-150">
                    "{t.quote}"
                  </blockquote>

                  {/* Author Meta */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-bold flex items-center justify-center text-sm ring-2 ring-brand-red/20 shrink-0">
                      {(t.name || 'C').charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-extrabold text-slate-900 truncate">
                        {t.name}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {t.company || t.role || 'Client'}
                      </div>
                      {t.service && (
                        <span className="inline-block text-[10px] font-bold text-brand-blue bg-brand-blue-50 px-2 py-0.5 rounded mt-1">
                          {t.service}
                        </span>
                      )}
                    </div>
                    {t.date && (
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {t.date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions: Approve, Pending, Edit, Delete */}
                <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-2">
                    {isPending ? (
                      <button
                        type="button"
                        onClick={() => handleSetStatus(t.id, 'approved')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                        title="Approve this review to show on the public website"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Review</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetStatus(t.id, 'pending')}
                        className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                        title="Hide this review from the public website"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Mark Pending</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleEditOpen(t)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(t.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= MODAL: ADD TESTIMONIAL ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-black">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Add Customer Testimonial</h3>
                  <p className="text-xs text-slate-500">Create a verified client testimonial</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newFormData.name}
                    onChange={(e) => setNewFormData({ ...newFormData, name: e.target.value })}
                    placeholder="e.g. Capt. Rajesh Varma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Position / Company *</label>
                  <input
                    type="text"
                    required
                    value={newFormData.company}
                    onChange={(e) => setNewFormData({ ...newFormData, company: e.target.value, role: e.target.value })}
                    placeholder="e.g. Fleet Director, Pacific Marine"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Service Category</label>
                  <input
                    type="text"
                    value={newFormData.service}
                    onChange={(e) => setNewFormData({ ...newFormData, service: e.target.value })}
                    placeholder="e.g. Ship Spares Logistics"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Star Rating</label>
                  <select
                    value={newFormData.rating}
                    onChange={(e) => setNewFormData({ ...newFormData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:border-brand-blue focus:outline-hidden"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                    <option value={2}>2 Stars ★★☆☆☆</option>
                    <option value={1}>1 Star ★☆☆☆☆</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Initial Status</label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={newFormData.status === 'approved'}
                      onChange={() => setNewFormData({ ...newFormData, status: 'approved' })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Approved (Publish Immediately)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={newFormData.status === 'pending'}
                      onChange={() => setNewFormData({ ...newFormData, status: 'pending' })}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>Pending Approval</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Testimonial Review *</label>
                <textarea
                  rows="4"
                  required
                  value={newFormData.quote}
                  onChange={(e) => setNewFormData({ ...newFormData, quote: e.target.value })}
                  placeholder="Detailed customer feedback and experience..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-red text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT TESTIMONIAL ================= */}
      {editingId && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-blue-50 text-brand-blue flex items-center justify-center font-black">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Edit Testimonial</h3>
                  <p className="text-xs text-slate-500">Update client feedback and approval status</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setEditingId(null); setEditFormData(null); }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Position / Company *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.company}
                    onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Service Category</label>
                  <input
                    type="text"
                    value={editFormData.service || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-brand-blue focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Star Rating</label>
                  <select
                    value={editFormData.rating || 5}
                    onChange={(e) => setEditFormData({ ...editFormData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:border-brand-blue focus:outline-hidden"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                    <option value={2}>2 Stars ★★☆☆☆</option>
                    <option value={1}>1 Star ★☆☆☆☆</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Moderation Status</label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="editStatus"
                      checked={editFormData.status === 'approved' || !editFormData.status}
                      onChange={() => setEditFormData({ ...editFormData, status: 'approved' })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Approved & Live</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="editStatus"
                      checked={editFormData.status === 'pending'}
                      onChange={() => setEditFormData({ ...editFormData, status: 'pending' })}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>Pending Approval</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Testimonial Quote *</label>
                <textarea
                  rows="4"
                  required
                  value={editFormData.quote}
                  onChange={(e) => setEditFormData({ ...editFormData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:border-brand-blue focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setEditFormData(null); }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-red text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsTab;
