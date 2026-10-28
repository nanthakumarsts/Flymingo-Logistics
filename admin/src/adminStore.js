import { useState, useEffect } from 'react';

// Default initial data for all admin modules
export const INITIAL_ADMIN_DATA = {
  // 1. SLIDERS & BANNERS
  heroSlides: [
    {
      id: 'marine-logistics',
      badge: 'SOUTH INDIA → THE WORLD',
      titlePrefix: 'Your Global ',
      highlight: 'Logistics Partner',
      titleSuffix: '',
      tagline: 'Connecting Businesses. Delivering Possibilities.',
      desc: 'End-to-end logistics and courier solutions with operational excellence, global reach and a commitment to trust, safety and timely delivery across 190+ countries.',
      image: '/assets/banner-marine-hd.jpg',
      primaryCta: 'Explore Our Services',
      secondaryCta: 'Get Fare Rate',
      secondaryLink: '/services',
      serviceId: 'ship-spares',
      isActive: true
    },
    {
      id: 'worldwide-courier',
      badge: 'SOUTH INDIA → THE WORLD',
      titlePrefix: 'Rapid Door-to-Door ',
      highlight: 'Worldwide Delivery',
      titleSuffix: '',
      tagline: 'Delivering Packages. Connecting Families.',
      desc: 'Connecting 190+ countries with priority doorstep pickup across South India for commercial samples, urgent documents, and specialized NRI parcels.',
      image: '/assets/banner-aircargo-hd.jpg',
      primaryCta: 'Explore Courier Rates',
      secondaryCta: 'Calculate Fare',
      secondaryLink: '/services/international-courier',
      serviceId: 'international-courier',
      isActive: true
    },
    {
      id: 'multimodal-freight',
      badge: 'SOUTH INDIA → THE WORLD',
      titlePrefix: 'Critical Air & ',
      highlight: 'Ocean Freight Forwarding',
      titleSuffix: '',
      tagline: 'Precision Transit. Zero Port Delays.',
      desc: 'High-speed air cargo charters, consolidated FCL/LCL container shipping, and emergency vessel spares delivery right on board at outer anchorage berths.',
      image: '/assets/banner-sectors-hd.jpg',
      primaryCta: 'Explore Freight Solutions',
      secondaryCta: 'Track Cargo',
      secondaryLink: '/services/freight-forwarding',
      serviceId: 'freight-forwarding',
      isActive: true
    }
  ],

  pageBanners: {
    about: {
      eyebrow: 'SOUTH INDIA → THE WORLD',
      title: 'We Are The Bridge Between You And Your Relations.',
      highlight: 'Across Oceans & Continents.',
      tagline: 'Connecting Families. Empowering Global Trade.',
      description: "Delivering uncompromised trust, maritime operational rigor, and door-to-door courier precision connecting South India's industrial and family roots to 190+ countries worldwide.",
      image: '/assets/banner-marine-hd.jpg'
    },
    services: {
      eyebrow: 'SOUTH INDIA → THE WORLD',
      title: 'Six Proven Channels.',
      highlight: 'Zero Cargo Gaps.',
      tagline: 'Connecting Businesses. Delivering Possibilities.',
      description: 'From time-critical vessel spares delivery on-board at outer anchorage berths to worldwide express courier and heavy air/ocean freight forwarders, Flymingo Logistics handles every consignment with shipowner precision.',
      image: '/assets/banner-courier-hd.jpg'
    },
    contact: {
      eyebrow: 'SOUTH INDIA → THE WORLD',
      title: 'Direct Lines.',
      highlight: 'Immediate Logistics Response.',
      tagline: 'Always On Call. Ready For Rapid Dispatch.',
      description: 'Reach our logistics coordinators directly for emergency vessel spare dispatches, international door courier pickups, dangerous goods compliance, and air cargo bookings.',
      image: '/assets/banner-contact-hd.jpg'
    }
  },

  // 2. HOME PAGE SECTIONS
  homeSections: {
    stats: [
      { id: '1', label: 'Packages Delivered', value: '4,000+', desc: 'Active road, rail & maritime corridors' },
      { id: '2', label: 'Countries Covered', value: '190+', desc: 'Direct international delivery countries' },
      { id: '3', label: 'Happy Customers', value: '101k+', desc: 'Cargo safely delivered on deck & doorstep' },
      { id: '4', label: 'Years Of Experience', value: '10+', desc: 'Decade of trusted maritime & freight expertise' }
    ],
    pickupToDeliverySteps: [
      {
        step: '01',
        title: 'Booking & Dispatch Order',
        desc: 'Customer submits origin, destination, cargo specs, and urgency tier through our online fare calculator or direct 24/7 hotline.',
        image: '/assets/banner-process-hd.jpg',
        badge: 'Step 1'
      },
      {
        step: '02',
        title: 'Doorstep Pickup & Consolidation',
        desc: 'Our dispatch team arrives at your doorstep in Coimbatore, Chennai, or across South India with digital scales and security sealing.',
        image: '/assets/movers.jpg',
        badge: 'Step 2'
      },
      {
        step: '03',
        title: 'Export-Grade Protective Packaging',
        desc: 'Custom wooden crating, moisture-barrier wrapping, DG compliance labeling, and food-grade insulation applied at our hub.',
        image: '/assets/packing.jpg',
        badge: 'Step 3'
      },
      {
        step: '04',
        title: 'Customs ICEGATE EDI Filing',
        desc: 'In-house licensed Customs House Brokerage (CHA) handles immediate Bill of Entry / Shipping Bill submission and zero-delay clearance.',
        image: '/assets/customs clearance.jpg',
        badge: 'Step 4'
      },
      {
        step: '05',
        title: 'Global Multimodal Transit',
        desc: 'Consignment departs on priority air charter or ocean vessel liner with satellite live GPS tracking and automated milestone notifications.',
        image: '/assets/air cargo.jpg',
        badge: 'Step 5'
      },
      {
        step: '06',
        title: 'Final Doorstep or Vessel On-Board Delivery',
        desc: 'Direct handover to consignee doorstep across 190+ countries or launch-boat delivery to vessel master at outer port berths.',
        image: '/assets/ship-spares-hd.jpg',
        badge: 'Step 6'
      }
    ],
    criticalSectors: [
      {
        id: 'marine-sector',
        title: 'Marine Shipowners & Vessel Managers',
        desc: 'Outer anchorage berth delivery of critical main engine valves, governors, turbochargers, radar parts, and safety spares under 45 minutes.',
        image: '/assets/banner-marine-hd.jpg',
        tag: 'Maritime Priority',
        bullets: ['Berth launch boat logistics', 'Bonded transit clearance', '24/7 Port master access']
      },
      {
        id: 'auto-sector',
        title: 'Automotive & Heavy Engineering',
        desc: 'Just-in-Time (JIT) delivery of precision casting moulds, CNC machine assemblies, engine blocks, and assembly-line spares.',
        image: '/assets/banner-aircargo-hd.jpg',
        tag: 'Industrial Logistics',
        bullets: ['Zero assembly halt policy', 'Heavy-lift wooden crating', 'Air charter expedite']
      },
      {
        id: 'dg-sector',
        title: 'Defense, Chemicals & DG Cargo',
        desc: 'Class 1 through Class 9 hazardous chemicals, lithium battery consignments, flammable solvents, and marine paints certified under IATA/IMO.',
        image: '/assets/dg-hazmat-hd.jpg',
        tag: 'Hazardous Compliance',
        bullets: ['UN-spec container crating', 'DGD certified documentation', 'Trained DG handlers']
      },
      {
        id: 'pharma-sector',
        title: 'Pharmaceuticals & Medical Devices',
        desc: 'Temperature-monitored refrigerated transport for life-saving medicines, medical machinery, surgical kits, and diagnostic reagents.',
        image: '/assets/loading.jpg',
        tag: 'Life Sciences',
        bullets: ['Cold-chain integrity', 'Express 2-4 day transit', 'Tamper-evident seals']
      },
      {
        id: 'nri-sector',
        title: 'NRI Diaspora & International Students',
        desc: 'Reliable doorstep shipping of South Indian sweets, homemade spice masalas, student luggage, traditional clothing, and gifts worldwide.',
        image: '/assets/banner-courier-hd.jpg',
        tag: 'NRI Express Parcels',
        bullets: ['Free door pickup across TN', 'Specialized food packaging', 'Transparent flat rates']
      },
      {
        id: 'ecommerce-sector',
        title: 'Cross-Border E-Commerce & Retail',
        desc: 'End-to-end B2C and B2B express parcel delivery for Indian merchants selling textiles, handicrafts, jewellery, and books globally.',
        image: '/assets/courier.jpg',
        tag: 'Cross-Border Trade',
        bullets: ['Automated tracking APIs', 'Bulk volume discounts', 'Customs duty advisory']
      }
    ]
  },

  // 3. ABOUT PAGE CONTENT
  aboutContent: {
    hero: {
      eyebrow: 'SOUTH INDIA → THE WORLD',
      title: 'We Are The Bridge Between You And Your Relations.',
      highlight: 'Across Oceans & Continents.',
      tagline: 'Connecting Families. Empowering Global Trade.',
      description: "Delivering uncompromised trust, maritime operational rigor, and door-to-door courier precision connecting South India's industrial and family roots to 190+ countries worldwide.",
      image: '/assets/banner-marine-hd.jpg'
    },
    highlightBoxes: [
      { id: '1', number: '220+', label: 'Countries Served', icon: 'Globe' },
      { id: '2', number: 'EST. 2018', label: 'Coimbatore Inception', icon: 'Compass' },
      { id: '3', number: '99%', label: 'On-Time Clearance', icon: 'ShieldCheck' }
    ],
    timeline: [
      {
        year: '2018',
        title: 'Foundation in Coimbatore',
        desc: 'Flymingo Logistics was established in Coimbatore with a vision to simplify international logistics for individuals and regional manufacturers.',
        metric: 'Coimbatore Hub Established',
        image: '/assets/movers.jpg'
      },
      {
        year: '2020',
        title: 'Pan-India Port Network',
        desc: 'Expanded port operations across Chennai, Tuticorin, and Cochin with licensed customs house brokerage (CHA) clearance teams.',
        metric: '5 Major Port Hubs',
        image: '/assets/customs clearance.jpg'
      },
      {
        year: '2022',
        title: 'Air Charter & Fleet Expansion',
        desc: 'Introduced dedicated air cargo space allocations and 24/7 emergency ship spares delivery boat operations at outer anchorage berths.',
        metric: '150+ Direct Destinations',
        image: '/assets/air cargo.jpg'
      },
      {
        year: '2024',
        title: 'Global Multimodal Leader',
        desc: 'Now serving 220+ countries with specialized IATA/IMO Dangerous Goods certifications and zero port delay delivery commitments.',
        metric: '220+ Countries Served',
        image: '/assets/international_courier_banner.jpg'
      }
    ],
    pillars: [
      {
        title: 'Values',
        badge: 'Core Identity',
        desc: 'Values are what bind us together to move towards our vision with integrity, transparency, and deep customer relationships.',
        image: '/assets/value.jpg'
      },
      {
        title: 'Quality',
        badge: 'Zero Defect',
        desc: 'Attention to detail and balanced perfection are accomplished through rigorous staff training and operational excellence standards.',
        image: '/assets/quality.jpg'
      },
      {
        title: 'Communication',
        badge: '24/7 Responsiveness',
        desc: 'Effective communication is the cornerstone of trust. We maintain direct language, active listening, and instant coordination.',
        image: '/assets/communication.jpg'
      }
    ],
    whyChooseUs: [
      'We Carry anything globally with 100% safety protocol',
      'Most Competitive Prices! Unmatched liner contract rates',
      'Door Pickup – Door delivery – Free Export Packing',
      'Your packages will be delivered in 4 to 6 business days',
      'We ship with DHL, FEDEX, TNT & world renown global air carriers',
      'You save up to 50% due to our high volume shipping tiers',
      'Each shipment carries comprehensive transit insurance'
    ],
    ourGoals: [
      'Rendering uncompromised quality services at your doorstep',
      'Maintaining complete genuineness and transparency with every client',
      'Maintaining lifelong good rapport with our customer community'
    ]
  },

  // 4. SERVICES
  services: [
    {
      id: 'ship-spares',
      title: 'Ship Spares Logistics & Berth Delivery',
      path: '/services/ship-spares-logistics',
      badge: 'Flagship Maritime Service',
      tagline: 'Zero Port Delay Guarantee',
      image: '/assets/ship-spares-hd.jpg',
      lead: 'Time-critical marine equipment and engine parts delivered directly on board to vessel masters at outer anchorage berths across 10+ major Indian seaports.',
      features: [
        'Direct supply launch boat delivery to outer anchorage berths',
        'Customs boarding passes & bonded gate passes pre-cleared',
        'Emergency response mobilization in under 45 minutes',
        'Full port coverage: Chennai, Tuticorin, Cochin, Ennore, JNPT'
      ]
    },
    {
      id: 'freight-forwarding',
      title: 'Ocean & Air Freight Forwarding',
      path: '/services/freight-forwarding',
      badge: 'FCL / LCL & Priority Air Charter',
      tagline: 'Direct Airline & Shipping Line Rates',
      image: '/assets/air cargo.jpg',
      lead: 'Comprehensive ocean container shipping (FCL/LCL) and expedited air cargo forwarding with aggressive airline and ocean liner contract pricing.',
      features: [
        'Full container load (FCL) & consolidated less container (LCL)',
        'Priority flight allocation with Next Flight Out (NFO) routing',
        'End-to-end multimodal transit from inland factory to destination dock',
        'Direct port-to-port and door-to-door global logistics'
      ]
    },
    {
      id: 'international-courier',
      title: 'International Courier Express',
      path: '/services/international-courier',
      badge: 'B2B, B2C & NRI Parcels',
      tagline: '190+ Countries Delivered',
      image: '/assets/courier.jpg',
      lead: 'Door-to-door express worldwide courier delivery connecting Indian diaspora across 190+ countries for NRI food sweets, medicines, university luggage, and gifts.',
      features: [
        'Free doorstep pickup across Coimbatore, Chennai & Tamil Nadu',
        'Food-grade protective multi-layer packaging for homemade masalas',
        'Real-time milestone tracking with automated SMS/email alerts',
        'Express 2 to 4 business days transit to USA, UK, UAE & Europe'
      ]
    },
    {
      id: 'customs-clearance',
      title: 'Licensed Customs House Brokerage (CHA)',
      path: '/services/customs-clearance',
      badge: 'ICEGATE EDI Compliance',
      tagline: 'Zero Demurrage Protocol',
      image: '/assets/customs clearance.jpg',
      lead: 'Fully licensed in-house customs house broker ensuring rapid tariff classification, ICEGATE EDI filing, and zero demurrage cargo release.',
      features: [
        'Seamless clearance at major air cargo complexes, seaports & ICDs',
        'Accurate HSN coding and duty assessment with zero penalties',
        'Export/import documentation & DGFT regulatory advisory',
        'In-transit bonded customs movement across Indian ports'
      ]
    },
    {
      id: 'dg-shipping',
      title: 'Dangerous Goods (DG) Logistics',
      path: '/services/dangerous-goods-shipping',
      badge: 'IATA & IMO Certified',
      tagline: '100% International Safety Compliance',
      image: '/assets/dg-hazmat-hd.jpg',
      lead: 'IATA and IMDG certified hazardous cargo logistics covering Classes 1 through 9 with UN-certified protective packaging and DGD filing.',
      features: [
        'Complete coverage of Classes 1 to 9 (flammable, toxic, corrosive)',
        'UN-approved packaging certification and UN-spec labeling',
        "Shipper's Declaration for Dangerous Goods (DGD) preparation",
        'Dangerous goods trained personnel handling every shipment'
      ]
    },
    {
      id: 'international-relocation',
      title: 'International Household Relocation',
      path: '/services/international-relocation',
      badge: 'Packers & Movers',
      tagline: 'Turnkey Moving & TR Facilitation',
      image: '/assets/movers.jpg',
      lead: 'Turnkey overseas moving services for families, corporate transfers, and NRI returnees with custom wooden crating and destination customs clearance.',
      features: [
        'Specialized export-grade multi-layer packaging & custom crates',
        'Transfer of Residence (TR) customs facilitation and checklist',
        'Complete destination door-to-door unpacking and debris removal',
        'Comprehensive marine transit insurance coverage'
      ]
    }
  ],

  // 5. TESTIMONIALS
  testimonials: [
    {
      id: 't1',
      name: 'Capt. Rajesh Varma',
      company: 'Pacific Marine Technical Fleet',
      role: 'Fleet Technical Director',
      rating: 5,
      service: 'Ship Spares Logistics',
      quote: 'Flymingo delivered our main engine cylinder head directly on-board at Tuticorin outer anchorage within 4 hours of flight arrival. Zero port delay saved our vessel over $18,000 in demurrage.',
      date: '12 Oct 2024'
    },
    {
      id: 't2',
      name: 'Dr. Meenakshi Sundaram',
      company: 'NRI Health Services',
      role: 'Physician, UK',
      rating: 5,
      service: 'International Courier',
      quote: 'Sent urgent Ayurvedic medication and homemade sweets from Coimbatore to Manchester. Delivered in just 3 business days with flawless food packaging and real-time tracking updates.',
      date: '28 Sep 2024'
    },
    {
      id: 't3',
      name: 'Anand Chandrasekar',
      company: 'Apex Precision Engineering Ltd',
      role: 'VP Global Supply Chain',
      rating: 5,
      service: 'Freight Forwarding',
      quote: 'Their contract airline rates and multimodal transit from our factory in Peelamedu to Hamburg saved our quarterly export budget by 22%. Outstanding CHA clearance speed.',
      date: '15 Sep 2024'
    },
    {
      id: 't4',
      name: 'Suresh Kumar',
      company: 'Chemicals & Coatings India',
      role: 'Logistics Head',
      rating: 5,
      service: 'Dangerous Goods Logistics',
      quote: 'Handling Class 3 flammable paints is complex due to strict airline DGD regulations. Flymingo certified inspectors handled UN packaging and DGD filing without a single hitch.',
      date: '02 Aug 2024'
    }
  ],

  // 6. INQUIRIES & FARE RATE REQUESTS
  inquiries: [
    {
      id: 'INQ-1042',
      type: 'Fare Rate Request',
      name: 'Senthil Nathan',
      email: 'senthil@apexmachinery.in',
      phone: '+91 98422 11090',
      origin: 'Coimbatore, India',
      destination: 'Rotterdam, Netherlands',
      weight: '450 KG',
      service: 'Ocean & Air Freight Forwarding',
      message: 'Need urgent priority air freight quote for CNC industrial spare parts needed for factory commissioning.',
      date: '28 Oct 2024, 10:24 AM',
      status: 'New',
      priority: 'High'
    },
    {
      id: 'INQ-1041',
      type: 'Contact Inquiry',
      name: 'Kavitha Ramachandran',
      email: 'kavitha.ram@gmail.com',
      phone: '+91 97909 43210',
      origin: 'Chennai, India',
      destination: 'Dallas, TX, USA',
      weight: '35 KG',
      service: 'International Courier Express',
      message: 'Looking for home pickup in Chennai for Diwali sweets, homemade snacks, and traditional clothes for my family in Texas.',
      date: '27 Oct 2024, 04:15 PM',
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 'INQ-1040',
      type: 'Ship Spares Emergency',
      name: 'Vessel Master M.V. Ocean Pioneer',
      email: 'master@oceanpioneership.com',
      phone: '+65 9123 4567',
      origin: 'Dubai Hub',
      destination: 'Chennai Outer Anchorage',
      weight: '180 KG',
      service: 'Ship Spares Logistics',
      message: 'Urgent auxiliary engine turbocharger parts arriving at MAA airport. Need launch boat transfer to anchorage berth today.',
      date: '27 Oct 2024, 01:10 PM',
      status: 'Contacted',
      priority: 'Urgent'
    },
    {
      id: 'INQ-1039',
      type: 'Relocation Inquiry',
      name: 'Praveen Venkatesh',
      email: 'praveen.v@techcorp.com',
      phone: '+91 94433 88765',
      origin: 'Coimbatore, India',
      destination: 'Toronto, Canada',
      weight: '2.5 CBM',
      service: 'International Household Relocation',
      message: 'Moving family to Canada on PR visa. Need full household packing, wooden crating for furniture and Transfer of Residence customs guidance.',
      date: '26 Oct 2024, 06:45 PM',
      status: 'Quoted',
      priority: 'Medium'
    },
    {
      id: 'INQ-1038',
      type: 'Fare Rate Request',
      name: 'Govindaraj M.',
      email: 'govind@texexport.com',
      phone: '+91 98940 55678',
      origin: 'Tirupur, India',
      destination: 'London Heathrow, UK',
      weight: '1,200 KG',
      service: 'Ocean & Air Freight Forwarding',
      message: 'Garment samples and production carton consignment. Requesting weekly scheduled air cargo contract rates.',
      date: '25 Oct 2024, 11:30 AM',
      status: 'Closed',
      priority: 'Normal'
    }
  ]
};

const STORAGE_KEY = 'flamingo_admin_data_v1';
const AUTH_KEY = 'flamingo_admin_auth_v1';

// Hook to access and manage admin state
export function useAdminStore() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading admin data from localStorage:', e);
    }
    return INITIAL_ADMIN_DATA;
  });

  const [auth, setAuth] = useState(() => {
    try {
      const savedAuth = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
      if (savedAuth) return JSON.parse(savedAuth);
    } catch (e) {
      console.error('Error loading auth from storage:', e);
    }
    return { isAuthenticated: false, user: null };
  });

  // Save to localStorage whenever data changes
  const updateData = (updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Error saving admin data:', e);
      }
      return next;
    });
  };

  const login = (username, password, remember = false) => {
    // Simple demo validation
    if (username.trim() && password.trim()) {
      const userObj = {
        username: username.trim(),
        role: 'Super Administrator',
        loginTime: new Date().toISOString()
      };
      const authState = { isAuthenticated: true, user: userObj };
      setAuth(authState);
      if (remember) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
      } else {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(authState));
      }
      return { success: true };
    }
    return { success: false, error: 'Please enter valid username and password' };
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
  };

  const resetToDefault = () => {
    updateData(INITIAL_ADMIN_DATA);
  };

  return {
    data,
    updateData,
    auth,
    login,
    logout,
    resetToDefault
  };
}
