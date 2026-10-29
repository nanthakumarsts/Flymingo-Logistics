export const BRAND = {
  name: 'Flymingo Logistics',
  shortName: 'Flymingo',
  tagline: 'Any Size, Any Weight, Anywhere',
  motto: 'Any Size, Any Weight, Anywhere',
  subTagline: 'Global Marine Logistics, International Couriers & Freight Forwarding',
  primaryPhone: '+91 90879 24488',
  supportPhones: ['+91 90872 54488', '+91 95662 54488', '+91 96006 44889'],
  primaryEmail: 'info@flymingologistics.com',
  alternateEmail: 'arun@flamingologistics.in',
  brochurePath: '/assets/flamingo_brochure.pdf',
  logoPath: '/assets/FlymingoLogo.svg',
};

export const OFFICES = [
  {
    city: 'Coimbatore',
    title: 'Headquarters & Operations Center',
    address: '1, Kondasamy Naidu Layout, Peelamedu, Lakshmipuram, Hopes College, Coimbatore - 641004, Tamil Nadu, India.',
    phones: ['+91 90879 24488', '+91 90872 54488'],
    email: 'info@flymingologistics.com',
    mapQuery: '1, Kondasamy Naidu Layout, Peelamedu, Lakshmipuram, Hopes College, Coimbatore 641004'
  },
  {
    city: 'Chennai',
    title: 'Port & Air Cargo Logistics Hub',
    address: 'No.45, 2nd Dr.Ambedkar Street, Near MM Tower, Meenambakkam, Chennai - 600 027, Tamil Nadu, India.',
    phones: ['+91 95662 54488', '+91 96006 44889'],
    email: 'arun@flamingologistics.in',
    mapQuery: 'No.45, 2nd Dr.Ambedkar Street, Near MM Tower, Meenambakkam, Chennai 600027'
  }
];

export const STATS = [
  { label: 'Packages Delivered', value: '4,000+', suffix: 'km', desc: 'Active road, rail & maritime corridors' },
  { label: 'Countries Covered', value: '190+', suffix: '', desc: 'Direct international delivery countries' },
  { label: 'Happy Customers', value: '101k+', suffix: '', desc: 'Cargo safely delivered on deck & doorstep' },
  { label: 'Years Of Experience', value: '10+', suffix: 'Yrs', desc: 'Decade of trusted maritime & freight expertise' },
];

export const CORE_SERVICES = [
  {
    id: 'international-courier',
    title: 'International Courier Service',
    path: '/services/international-courier',
    icon: 'Package',
    image: '/assets/courier.jpg',
    badge: 'B2B, B2C & C2C',
    shortDesc: 'Fast, secure doorstep delivery worldwide for urgent parcels, food, medicine, university docs, and personal luggage.',
    bullets: ['Door-to-door express delivery', 'Complete customs documentation', 'Real-time online tracking', 'Custom protective packaging']
  },
  {
    id: 'freight-forwarding',
    title: 'Freight Forwarding (Sea & Air)',
    path: '/services/freight-forwarding',
    icon: 'Plane',
    image: '/assets/air cargo.jpg',
    badge: 'FCL / LCL & Air Charter',
    shortDesc: 'Comprehensive ocean container shipping and air cargo logistics with aggressive airline/carrier rate negotiation.',
    bullets: ['Full & Less container loads (FCL/LCL)', 'Priority flight routing & space booking', 'Port-to-port and door-to-door transit', 'Fragile & oversized cargo handling']
  },
  {
    id: 'ship-spares',
    title: 'Ship Spares Logistics',
    path: '/services/ship-spares-logistics',
    icon: 'Anchor',
    image: '/assets/ship.png',
    badge: 'Maritime 24/7 Port Deck',
    shortDesc: 'Urgent ship spare parts clearance and direct on-board launch delivery across major Indian and global sea ports.',
    bullets: ['Customs bonded in-transit provisions', 'Direct on-board vessel delivery', 'AOG & vessel-in-port emergency 24/7', 'Port authority & launch coordination']
  },
  {
    id: 'dg-shipping',
    title: 'Dangerous Goods (DG) Shipping',
    path: '/services/dangerous-goods-shipping',
    icon: 'AlertTriangle',
    image: '/assets/dangerous.png',
    badge: 'IATA & IMO Certified',
    shortDesc: 'Certified compliant transportation for hazardous materials across Class 1 to Class 9 chemicals and substances.',
    bullets: ['Certified IATA/IMO cargo specialists', 'UN-specification packaging & labeling', 'Dangerous goods declaration (DGD)', 'Guaranteed carrier acceptance']
  },
  {
    id: 'international-relocation',
    title: 'International Relocation',
    path: '/services/international-relocation',
    icon: 'Truck',
    image: '/assets/packer.jpg',
    badge: 'Packers & Movers',
    shortDesc: 'Complete overseas household relocation, transfer of residency customs duty optimization, and safe unpacking.',
    bullets: ['Pre-move physical/virtual survey', 'Multi-layer export quality packaging', 'Comprehensive marine transit insurance', 'Transfer of Residence (TR) paperwork']
  },
  {
    id: 'customs-clearance',
    title: 'Customs Clearance Brokerage',
    path: '/services/customs-clearance',
    icon: 'ShieldCheck',
    image: '/assets/customs clearance.jpg',
    badge: 'Import & Export Compliance',
    shortDesc: 'Licensed customs brokerage team ensuring exact HS code classification, rapid duty clearance, and zero port detention.',
    bullets: ['Exact HS code classification', 'Duty calculation & optimization', 'Bill of entry & shipping bill filing', 'Post-clearance bonded delivery']
  }
];

export const SIX_WAYS_CARGO = [
  { step: '01', title: 'End-to-End Packing', desc: 'Multi-layer industrial grade materials tailored for fragile, moisture-sensitive, and high-value cargo.' },
  { step: '02', title: 'Hassle-Free Documentation', desc: 'Expert generation of commercial invoices, certificates of origin, airway bills, and customs forms.' },
  { step: '03', title: 'Seamless Transportation', desc: 'Multimodal air, ocean, rail, and dedicated road fleets synchronized for punctual transit.' },
  { step: '04', title: 'Secure Warehousing', desc: 'Temperature-controlled and bonded storage facilities strategically situated near ports and hubs.' },
  { step: '05', title: 'Smart Space Booking', desc: 'Direct allocations with leading airlines and vessel liners ensuring confirmed cargo uplift.' },
  { step: '06', title: 'End-to-End Tracking', desc: 'Live milestone updates and tracking from initial warehouse pickup all the way to final delivery.' }
];

export const SPECIALIZED_EXPRESS = [
  { title: 'Document & Parcels', desc: 'Legal agreements, transcripts, passports & urgent corporate papers with guaranteed delivery.', icon: 'FileText' },
  { title: 'Food Product Express', desc: 'Homemade snacks, masalas, sweets & non-perishable regional delicacies to NRI families.', icon: 'Coffee' },
  { title: 'Excess Baggage Express', desc: 'Unaccompanied personal luggage and student baggage at up to 70% cheaper than airline excess baggage fees.', icon: 'Luggage' },
  { title: 'Medicine Express', desc: 'Prescription medicines with doctor validation, temperature preservation, and custom cleared delivery.', icon: 'HeartPulse' },
  { title: 'Chemicals & Hazardous Cargo', desc: 'Certified hazardous liquids, solids, flammable samples, and UN packaging materials.', icon: 'Flame' },
  { title: 'Heavy Project Cargo', desc: 'Out-of-gauge (OOD), breakbulk, heavy machinery, and customized shipping solutions.', icon: 'Boxes' }
];

export const INDUSTRIES_SERVED = [
  { name: 'Shipping, Marine & Shipbuilding', desc: 'Time-critical ship spares, deck machinery, navigation units, and vessel refit parts.', icon: 'Ship', image: '/assets/banner-marine-hd.jpg' },
  { name: 'Aerospace & High-Tech', desc: 'AOG spare components, delicate avionics, precision instruments, and high-value equipment.', icon: 'Radio', image: '/assets/banner-aircargo-hd.jpg' },
  { name: 'Food, Perishables & Cold Chain', desc: 'Temperature-controlled food products, traditional snacks, and seasonal culinary goods.', icon: 'Utensils', image: '/assets/loading.jpg' },
  { name: 'Chemicals & Dangerous Goods (DG)', desc: 'Industrial chemicals, laboratory reagents, paints, batteries, and hazardous materials.', icon: 'Atom', image: '/assets/customs.jpg' },
  { name: 'Pharmaceuticals & Healthcare', desc: 'Urgent diagnostic supplies, critical medicines, medical equipment, and healthcare logistics.', icon: 'Activity', image: '/assets/banner-courier-hd.jpg' },
  { name: 'Automotive & Manufacturing', desc: 'Assembly line parts, precision automotive engines, components, and heavy engineering cargo.', icon: 'Car', image: '/assets/why_choose.jpg' }
];

export const TESTIMONIALS = [
  {
    quote: 'One of the best courier service provider in Coimbatore. They undertake both domestic and international courier. Perfect Partners for your needs.',
    author: 'Nishanth Williams',
    role: 'Verified Customer',
    company: 'Coimbatore, India'
  },
  {
    quote: 'Good service, realtime tracking and on time delivery. Simply excellent',
    author: 'shalini nagarajan',
    role: 'Verified Customer',
    company: 'Express Courier Client'
  },
  {
    quote: 'User friendly approach guided by the firm in transacting the shipments. I done my shipment to Singapore through them and completely satisfied with their service.',
    author: 'ELANGOSENATHIPATHI',
    role: 'Verified Customer',
    company: 'Singapore Shipment'
  },
  {
    quote: 'Excellent service & delivery. Very prompt response from the owner. Exceeded my expectations with respect to packing.',
    author: 'Bavithra venkat',
    role: 'Verified Customer',
    company: 'Domestic & International Relocation'
  }
];

export const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Singapore', 'Germany',
  'Australia', 'Canada', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain', 'Malaysia',
  'France', 'Netherlands', 'Italy', 'Spain', 'Switzerland', 'South Africa', 'New Zealand',
  'Japan', 'South Korea', 'China', 'Sri Lanka', 'Bangladesh', 'Nepal', 'Mauritius', 'Maldives',
  'Ireland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria', 'Poland'
];
