import React, { useId } from 'react';
import { Compass } from 'lucide-react';

export const COMMON_ROUTES = [
  {
    group: '⚡ Fare Rate & Instant Forms',
    items: [
      { label: 'Fare Rate Quote Form (/quote)', value: '/quote' },
      { label: 'Contact Us Inquiry (/contact)', value: '/contact' },
    ]
  },
  {
    group: '📄 Main Pages',
    items: [
      { label: 'Home Page (/)', value: '/' },
      { label: 'Services Overview (/services)', value: '/services' },
      { label: 'About Company (/about)', value: '/about' },
    ]
  },
  {
    group: '🚢 Core Services',
    items: [
      { label: 'Ship Spares Logistics (/services/ship-spares-logistics)', value: '/services/ship-spares-logistics' },
      { label: 'Freight Forwarding (/services/freight-forwarding)', value: '/services/freight-forwarding' },
      { label: 'International Courier (/services/international-courier)', value: '/services/international-courier' },
      { label: 'Customs Clearance (/services/customs-clearance)', value: '/services/customs-clearance' },
      { label: 'Dangerous Goods Cargo (/services/dangerous-goods-shipping)', value: '/services/dangerous-goods-shipping' },
      { label: 'International Relocation (/services/international-relocation)', value: '/services/international-relocation' },
    ]
  },
  {
    group: '📞 Quick Contact Actions',
    items: [
      { label: 'Direct Call (+91 90879 24488)', value: 'tel:+919087924488' },
      { label: 'Direct Email (support@flymingologistics.com)', value: 'mailto:support@flymingologistics.com' },
      { label: 'WhatsApp Instant Chat', value: 'https://wa.me/919087924488' },
    ]
  }
];

export const SlugInput = ({
  value = '',
  onChange,
  required = false,
  placeholder = '/quote',
  label = 'Button Slug / Link',
  className = ''
}) => {
  const datalistId = useId();

  // Find if current value matches any preset
  const allPresets = COMMON_ROUTES.flatMap((g) => g.items);
  const matchedPreset = allPresets.find((item) => item.value === value);

  const handleSelect = (e) => {
    const selected = e.target.value;
    if (selected) {
      onChange(selected);
    }
  };

  return (
    <div className={`space-y-1.5 w-full max-w-full min-w-0 ${className}`}>
      {label && (
        <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5 truncate">
            <Compass className="w-3.5 h-3.5 text-brand-blue shrink-0" />
            <span className="truncate">{label}</span>
            {required && <span className="text-red-500 font-bold shrink-0">*</span>}
          </span>
          <span className="text-[10px] font-normal text-slate-400 shrink-0">Type or pick route</span>
        </label>
      )}

      {/* Direct typeable input box */}
      <div className="relative w-full min-w-0">
        <input
          type="text"
          list={datalistId}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800 focus:border-brand-blue focus:outline-hidden placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 shadow-2xs"
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

      {/* Preset route dropdown that directly sets value into the box */}
      <div className="w-full min-w-0">
        <select
          value={matchedPreset ? matchedPreset.value : ''}
          onChange={handleSelect}
          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700 focus:border-brand-blue focus:outline-hidden cursor-pointer shadow-2xs transition-colors truncate"
          title="Pick a preset route or form"
        >
          <option value="" disabled>
            {value ? (matchedPreset ? matchedPreset.label.split(' (')[0] : value) : '-- Select Route / Form ▾ --'}
          </option>
          {COMMON_ROUTES.map((grp) => (
            <optgroup key={grp.group} label={grp.group}>
              {grp.items.map((it) => (
                <option key={it.value} value={it.value}>
                  {it.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SlugInput;
