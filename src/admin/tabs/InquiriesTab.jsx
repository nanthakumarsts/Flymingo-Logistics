import React, { useState } from 'react';
import { HelpCircle, Search, Filter, Eye, Phone, Mail, MapPin, CheckCircle, Clock, Save, ArrowDownToLine } from 'lucide-react';

export const InquiriesTab = ({ data, onUpdate }) => {
  const [inquiries, setInquiries] = useState(data.inquiries || []);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [savedMsg, setSavedMsg] = useState('');

  const handleStatusChange = (id, newStatus) => {
    const updated = inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i);
    setInquiries(updated);
    onUpdate(prev => ({ ...prev, inquiries: updated }));
    setSavedMsg(`Lead ${id} updated to ${newStatus}`);
    setTimeout(() => setSavedMsg(''), 2500);
  };

  const filtered = inquiries.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.email.toLowerCase().includes(search.toLowerCase()) ||
                        item.phone.includes(search) ||
                        item.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
        <div>
          <h1 className="text-xl font-black text-slate-900">Customer Inquiries & Fare Rate Desk</h1>
          <p className="text-xs text-slate-500">Live incoming bookings, instant fare requests, and customer contact leads</p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              {savedMsg}
            </span>
          )}
          <span className="text-xs font-mono font-bold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl">
            {filtered.length} Leads
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#005687]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'New', 'In Progress', 'Contacted', 'Quoted', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                statusFilter === st
                  ? 'bg-[#005687] text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Lead ID & Type</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Service & Route</th>
                <th className="py-3 px-4">Cargo Weight</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <div>{item.id}</div>
                    <span className="text-[10px] text-slate-400 font-sans">{item.type}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{item.phone}</span> &bull; <span>{item.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#005687]">{item.service}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {item.origin} &rarr; {item.destination}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {item.weight || 'N/A'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold border focus:outline-none cursor-pointer ${
                        item.status === 'New' ? 'bg-red-50 text-[#ed2926] border-red-200' :
                        item.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        item.status === 'Contacted' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                        item.status === 'Quoted' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedInquiry(item)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#005687] hover:text-white rounded text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      View Note
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#ed2926]">{selectedInquiry.id}</span>
                <h3 className="text-lg font-black text-slate-900">{selectedInquiry.name}</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                {selectedInquiry.type}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-bold">Contact Phone:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-bold">Email Address:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-bold">Service Category:</span>
                <span className="font-bold text-[#005687]">{selectedInquiry.service}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-bold">Routing:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.origin} &rarr; {selectedInquiry.destination}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-bold">Consignment Weight:</span>
                <span className="font-bold text-slate-800">{selectedInquiry.weight}</span>
              </div>
            </div>

            <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Customer Note / Message:</span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedInquiry.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-400 font-mono">
                Received: {selectedInquiry.date}
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-[#ed2926] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
