import React, { useId } from 'react';
import { Compass } from 'lucide-react';

export const COMMON_ROUTES = [
  { group: 'Main Pages', items: [
    { label: 'Services Hub (/services)', value: '/services' },
    { label: 'Request Quote (/quote)', value: '/quote' },
    { label: 'Contact Us (/contact)', value: '/contact' },
    { label: 'About Us (/about)', value: '/about' },
  ]},
  { group: 'Service Details', items: [
    { label: 'Ship Spares Logistics (/services/ship-spares-logistics)', value: '/services/ship-spares-logistics' },
    { label: 'Freight Forwarding (/services/freight-forwarding)', value: '/services/freight-forwarding' },
    { label: 'International Courier (/services/international-courier)', value: '/services/international-courier' },
    { label: 'Customs Clearance (/services/customs-clearance)', value: '/services/customs-clearance' },
    { label: 'Dangerous Goods Cargo (/services/dangerous-goods-shipping)', value: '/services/dangerous-goods-shipping' },
    { label: 'International Relocation (/services/international-relocation)', value: '/services/international-relocation' },
  ]},
  { group: 'Quick Actions', items: [
    { label: 'Call Desk (tel:+919087924488)', value: 'tel:+919087924488' },
    { label: 'Email Desk (mailto:support@flymingologistics.com)', value: 'mailto:support@flymingologistics.com' },
  ]}
];

export const SlugInput = ({
  value = '',
  onChange,
  required = false,
  placeholder = '/services',
  label = 'Navigation Slug / Link',
  className = ''
}) => {
  const datalistId = useId();

  const handleSelect = (e) => {
    const selected = e.target.value;
    if (selected) {
      onChange(selected);
      // Reset the dropdown back to empty so it doesn't stay stuck on the selected item
      e.target.value = '';
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-blue" />
            <span>{label}</span>
            {required && <span className="text-red-500 font-bold">*</span>}
          </span>
          <span className="text-[10px] font-normal text-slate-400">Type URL or select route</span>
        </label>
      )}

      <div className="flex items-center gap-1.5">
        {/* Direct typeable input with datalist auto-completion */}
        <div className="relative flex-1">
          <input
            type="text"
            list={datalistId}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800 focus:border-brand-blue focus:outline-hidden placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 shadow-xs"
          />

          <datalist id={datalistId}>
            {COMMON_ROUTES.map((grp) =>
              grp.items.map((it) => (
                <option key={it.value} value={it.value}>
                  {it.label}
                </option>
              ))
            )}
          </datalist>
        </div>

        {/* Quick select dropdown selector */}
        <div className="shrink-0">
          <select
            defaultValue=""
            onChange={handleSelect}
            className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-bold text-slate-700 focus:border-brand-blue focus:outline-hidden cursor-pointer shadow-xs transition-colors"
            title="Pick a preset destination route"
          >
            <option value="" disabled>
              Select Route ▾
            </option>
            {COMMON_ROUTES.map((grp) => (
              <optgroup key={grp.group} label={grp.group}>
                {grp.items.map((it) => (
                  <option key={it.value} value={it.value}>
                    {it.value} ({it.label.split(' (')[0]})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SlugInput;
