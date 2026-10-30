const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.DB_PORT || 3306;
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'flymingo';

// Initialize Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Model 1: BannerSetting (Hero Video, Global Settings)
const BannerSetting = sequelize.define('BannerSetting', {
  setting_key: {
    type: DataTypes.STRING(64),
    primaryKey: true
  },
  setting_value: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'banner_settings',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: false
});

// Model 2: HeroSlide (Carousel Slides for Home)
const HeroSlide = sequelize.define('HeroSlide', {
  slide_id: {
    type: DataTypes.STRING(64),
    primaryKey: true
  },
  title_prefix: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  highlight: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  title_suffix: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  primary_cta: {
    type: DataTypes.STRING(128),
    defaultValue: 'Explore Services'
  },
  primary_slug: {
    type: DataTypes.STRING(255),
    defaultValue: '/services'
  },
  secondary_cta: {
    type: DataTypes.STRING(128),
    defaultValue: 'Get Quote'
  },
  secondary_slug: {
    type: DataTypes.STRING(255),
    defaultValue: '/contact'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'hero_slides',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: false
});

// Model 3: PageBanner (All Inner and Detail Pages)
const PageBanner = sequelize.define('PageBanner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  page_key: {
    type: DataTypes.STRING(64),
    unique: true,
    allowNull: false
  },
  page_name: {
    type: DataTypes.STRING(128),
    defaultValue: ''
  },
  page_type: {
    type: DataTypes.STRING(64),
    defaultValue: 'service_detail'
  },
  badge: {
    type: DataTypes.STRING(128),
    defaultValue: 'SOUTH INDIA → THE WORLD'
  },
  title: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  highlight: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  button_label: {
    type: DataTypes.STRING(128),
    defaultValue: ''
  },
  button_slug: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  bg_image: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  side_image: {
    type: DataTypes.TEXT,
    defaultValue: ''
  }
}, {
  tableName: 'page_banners',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: false
});

// Model 4: Service (Multimodal Cargo & Logistics Services)
const Service = sequelize.define('Service', {
  service_id: {
    type: DataTypes.STRING(64),
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tagline: {
    type: DataTypes.STRING(255),
    defaultValue: ''
  },
  badge: {
    type: DataTypes.STRING(128),
    defaultValue: 'SPECIALIZED LOGISTICS'
  },
  badge_color: {
    type: DataTypes.STRING(128),
    defaultValue: 'bg-brand-blue-50 text-brand-blue border-brand-blue-200'
  },
  image: {
    type: DataTypes.TEXT,
    defaultValue: '/assets/service banner.jpg'
  },
  lead: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  short_desc: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  features: {
    type: DataTypes.TEXT,
    defaultValue: '[]'
  },
  bullets: {
    type: DataTypes.TEXT,
    defaultValue: '[]'
  },
  path: {
    type: DataTypes.STRING(255),
    defaultValue: '/services'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'services',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

// Model 5: Testimonial (Moderated Client Reviews)
const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.STRING(64),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(128),
    defaultValue: 'Verified Customer'
  },
  company: {
    type: DataTypes.STRING(128),
    defaultValue: ''
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  quote: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  service: {
    type: DataTypes.STRING(128),
    defaultValue: 'Logistics Service'
  },
  date: {
    type: DataTypes.STRING(64),
    defaultValue: 'Recent'
  },
  status: {
    type: DataTypes.STRING(32),
    defaultValue: 'pending' // 'pending', 'approved', 'rejected'
  }
}, {
  tableName: 'testimonials',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

// Seed data definitions for all 9 page banners
const DEFAULT_PAGE_BANNERS = [
  {
    page_key: 'about',
    page_name: 'About Us Page',
    page_type: 'main_page',
    badge: 'SOUTH INDIA → THE WORLD',
    title: 'We Are The Bridge Between You And Your Relations.',
    highlight: 'Across Oceans & Continents.',
    description: "Delivering uncompromised trust, maritime operational rigor, and door-to-door courier precision connecting South India's industrial and family roots to 190+ countries worldwide.",
    button_label: 'Explore Our Services',
    button_slug: '/services',
    bg_image: '/assets/banner-marine-hd.jpg',
    side_image: '/assets/sea cargo.jpg'
  },
  {
    page_key: 'contact',
    page_name: 'Contact Us Page',
    page_type: 'main_page',
    badge: 'SOUTH INDIA → THE WORLD',
    title: 'Direct Lines.',
    highlight: 'Immediate Logistics Response.',
    description: 'Reach our logistics coordinators directly for emergency vessel spare dispatches, international door courier pickups, dangerous goods compliance, and air cargo bookings.',
    button_label: 'Speak To Logistics Desk',
    button_slug: 'tel:+919087924488',
    bg_image: '/assets/banner-contact-hd.jpg',
    side_image: '/assets/communication.jpg'
  },
  {
    page_key: 'services',
    page_name: 'Services Hub Page',
    page_type: 'main_page',
    badge: 'SOUTH INDIA → THE WORLD',
    title: 'Six Proven Channels.',
    highlight: 'Zero Cargo Gaps.',
    description: 'From time-critical vessel spares delivery on-board at outer anchorage berths to worldwide express courier and heavy air/ocean freight forwarders, Flymingo Logistics handles every consignment with shipowner precision.',
    button_label: 'Request Instant Fare Quote',
    button_slug: '/quote',
    bg_image: '/assets/banner-courier-hd.jpg',
    side_image: ''
  },
  {
    page_key: 'ship-spares',
    page_name: 'Ship Spares Logistics',
    page_type: 'service_detail',
    badge: '24/7 MARITIME LOGISTICS',
    title: 'Ship Spares & ',
    highlight: 'On-Board Delivery',
    description: 'Time-critical marine replacement parts cleared through customs and delivered direct to the vessel deck, without port detention.',
    button_label: 'Request Spares Delivery',
    button_slug: '/quote',
    bg_image: '/assets/ship-spares-hd.jpg',
    side_image: ''
  },
  {
    page_key: 'freight-forwarding',
    page_name: 'Freight Forwarding',
    page_type: 'service_detail',
    badge: 'FCL / LCL & AIR CHARTER',
    title: 'Air & Ocean ',
    highlight: 'Freight Forwarding',
    description: 'Direct contracts with premier airlines and ocean carriers for expedited air cargo and full container loads across major global trade lanes.',
    button_label: 'Book Freight Consignment',
    button_slug: '/quote',
    bg_image: '/assets/air cargo.jpg',
    side_image: ''
  },
  {
    page_key: 'international-courier',
    page_name: 'International Courier',
    page_type: 'service_detail',
    badge: 'DOORSTEP EXPRESS WORLDWIDE',
    title: 'Worldwide Priority ',
    highlight: 'Door-to-Door Courier',
    description: 'Express transit to USA, UK, Europe, UAE, and 190+ countries with door pickup across Tamil Nadu, automated tracking, and transparent rates.',
    button_label: 'Check Courier Rates',
    button_slug: '/quote',
    bg_image: '/assets/courier.jpg',
    side_image: ''
  },
  {
    page_key: 'customs-clearance',
    page_name: 'Customs Clearance (CHA)',
    page_type: 'service_detail',
    badge: 'LICENSED CHA BROKERAGE',
    title: 'Seaport & Airport ',
    highlight: 'Customs Clearance (CHA)',
    description: 'In-house licensed customs house agent filing direct EDI through ICEGATE, handling export-import clearance, bonded warehousing, and duty drawback.',
    button_label: 'Consult Customs Broker',
    button_slug: '/contact',
    bg_image: '/assets/customs clearance.jpg',
    side_image: ''
  },
  {
    page_key: 'dg-shipping',
    page_name: 'Dangerous Goods (DG) Cargo',
    page_type: 'service_detail',
    badge: 'IATA & IMO COMPLIANT',
    title: 'Certified ',
    highlight: 'Dangerous Goods (DG) Cargo',
    description: "Certified hazmat logistics complying with IATA-DGR and IMDG codes, featuring UN-certified packaging, shipper's declaration (DGD), and safe transport.",
    button_label: 'Request DG Consultation',
    button_slug: '/quote',
    bg_image: '/assets/dg-hazmat-hd.jpg',
    side_image: ''
  },
  {
    page_key: 'international-relocation',
    page_name: 'International Relocation',
    page_type: 'service_detail',
    badge: 'GLOBAL HOUSEHOLD PACKERS',
    title: 'Door-to-Door ',
    highlight: 'International Relocation',
    description: 'Bespoke overseas home relocation with export crating, comprehensive marine transit cover, and Transfer of Residence (TR) customs documentation.',
    button_label: 'Book Moving Survey',
    button_slug: '/contact',
    bg_image: '/assets/movers.jpg',
    side_image: ''
  }
];

// Default hero slides
const DEFAULT_HERO_SLIDES = [
  {
    slide_id: 'marine-logistics',
    title_prefix: 'Your Global ',
    highlight: 'Logistics Partner',
    title_suffix: ' worldwide',
    description: 'End-to-end logistics and courier solutions with maritime precision, airport customs clearance, and global air cargo reach.',
    primary_cta: 'Explore Our Services',
    primary_slug: '/services',
    secondary_cta: 'Request Fast Fare Quote',
    secondary_slug: '/quote',
    is_active: true,
    sort_order: 1
  },
  {
    slide_id: 'doorstep-courier',
    title_prefix: 'Rapid Door-to-Door ',
    highlight: 'International Courier',
    title_suffix: ' across 190+ countries',
    description: 'Reliable parcel delivery, commercial sample transit, and household shipping with real-time tracking and free doorstep pickup.',
    primary_cta: 'Book Courier Pickup',
    primary_slug: '/quote',
    secondary_cta: 'Check Country Transit Times',
    secondary_slug: '/services/international-courier',
    is_active: true,
    sort_order: 2
  },
  {
    slide_id: 'ship-spares',
    title_prefix: 'Critical Marine ',
    highlight: 'Ship Spares Logistics',
    title_suffix: ' on-board 24/7',
    description: 'Emergency vessel parts clearance and direct delivery on board at Indian seaports with zero demurrage and zero downtime.',
    primary_cta: 'Maritime Dispatch Desk',
    primary_slug: '/contact',
    secondary_cta: 'View Seaport Coverage',
    secondary_slug: '/services/ship-spares-logistics',
    is_active: true,
    sort_order: 3
  }
];

// Default 6 Multimodal Services
const DEFAULT_SERVICES = [
  {
    service_id: 'ship-spares',
    title: 'Ship Spares Logistics & 24/7 Port Berth Delivery',
    tagline: 'Zero Port Delay Guarantee',
    badge: 'Flagship Maritime Service',
    badge_color: 'bg-brand-red-50 text-brand-red border-brand-red-200',
    image: '/assets/ship-spares-hd.jpg',
    lead: 'Time-critical marine equipment and engine parts delivered directly on board to vessel masters at outer anchorage berths across 10+ major Indian seaports.',
    short_desc: 'Urgent ship spare parts clearance and direct on-board launch delivery across major Indian and global sea ports.',
    features: JSON.stringify([
      'Direct supply launch boat delivery to outer anchorage',
      'Customs boarding passes & bonded gate passes pre-cleared',
      'Emergency response mobilization in under 45 minutes',
      'Coverage: Chennai, Tuticorin, Cochin, Ennore, Kattupalli, JNPT'
    ]),
    bullets: JSON.stringify([
      'Customs bonded in-transit provisions',
      'Direct on-board vessel delivery',
      'AOG & vessel-in-port emergency 24/7',
      'Port authority & launch coordination'
    ]),
    path: '/services/ship-spares-logistics',
    sort_order: 1,
    is_active: true
  },
  {
    service_id: 'freight-forwarding',
    title: 'Ocean & Air Freight Forwarding',
    tagline: 'Direct Airline & Shipping Line Rates',
    badge: 'FCL / LCL & Priority Air Charter',
    badge_color: 'bg-brand-blue-50 text-brand-blue border-brand-blue-200',
    image: '/assets/air cargo.jpg',
    lead: 'Comprehensive ocean container shipping (FCL/LCL) and expedited air cargo forwarding with aggressive airline and ocean liner contract pricing.',
    short_desc: 'Comprehensive ocean container shipping and air cargo logistics with aggressive airline/carrier rate negotiation.',
    features: JSON.stringify([
      'Full container load (FCL) & consolidated less container (LCL)',
      'Priority flight allocation with Next Flight Out (NFO) routing',
      'End-to-end multimodal transit from inland factory to destination dock',
      'Direct port-to-port and door-to-door global logistics'
    ]),
    bullets: JSON.stringify([
      'Full & Less container loads (FCL/LCL)',
      'Priority flight routing & space booking',
      'Port-to-port and door-to-door transit',
      'Fragile & oversized cargo handling'
    ]),
    path: '/services/freight-forwarding',
    sort_order: 2,
    is_active: true
  },
  {
    service_id: 'international-courier',
    title: 'International Courier Express',
    tagline: '190+ Countries Delivered',
    badge: 'B2B, B2C & NRI Parcels',
    badge_color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    image: '/assets/courier.jpg',
    lead: 'Door-to-door express worldwide courier delivery connecting Indian diaspora across 190+ countries for NRI food sweets, medicines, university luggage, and gifts.',
    short_desc: 'Fast, secure doorstep delivery worldwide for urgent parcels, food, medicine, university docs, and personal luggage.',
    features: JSON.stringify([
      'Free doorstep pickup across Coimbatore, Chennai & Tamil Nadu',
      'Food-grade protective multi-layer packaging for homemade masalas',
      'Real-time milestone tracking with automated SMS/email alerts',
      'Express 2 to 4 business days transit to USA, UK, UAE & Europe'
    ]),
    bullets: JSON.stringify([
      'Door-to-door express delivery',
      'Complete customs documentation',
      'Real-time online tracking',
      'Custom protective packaging'
    ]),
    path: '/services/international-courier',
    sort_order: 3,
    is_active: true
  },
  {
    service_id: 'customs-clearance',
    title: 'Licensed Customs House Brokerage (CHA)',
    tagline: 'Direct ICEGATE EDI Filing',
    badge: 'Licensed Brokerage (CHA)',
    badge_color: 'bg-purple-50 text-purple-700 border-purple-200',
    image: '/assets/customs clearance.jpg',
    lead: 'In-house licensed customs brokerage filing real-time EDI entries through ICEGATE at sea ports, air cargo complexes, and Inland Container Depots (ICDs).',
    short_desc: 'Licensed customs brokerage team ensuring exact HS code classification, rapid duty clearance, and zero port detention.',
    features: JSON.stringify([
      'Accurate 8-digit HS classification and preferential tariff benefits',
      'Pre-arrival import documentation filing for green-channel delivery',
      'Export shipping bill processing with duty drawback optimization',
      'Bonded warehouse clearance, EPCG scheme, and ATA Carnet assistance'
    ]),
    bullets: JSON.stringify([
      'Exact HS code classification',
      'Duty calculation & optimization',
      'Bill of entry & shipping bill filing',
      'Post-clearance bonded delivery'
    ]),
    path: '/services/customs-clearance',
    sort_order: 4,
    is_active: true
  },
  {
    service_id: 'dg-shipping',
    title: 'Dangerous Goods (DG) Cargo Shipping',
    tagline: '100% International Safety Compliance',
    badge: 'IATA & IMO Certified',
    badge_color: 'bg-amber-50 text-amber-800 border-amber-200',
    image: '/assets/dg-hazmat-hd.jpg',
    lead: 'IATA and IMDG certified hazardous cargo logistics covering Classes 1 through 9 with UN-certified protective packaging and DGD filing.',
    short_desc: 'Certified compliant transportation for hazardous materials across Class 1 to Class 9 chemicals and substances.',
    features: JSON.stringify([
      'Complete coverage of Classes 1 to 9 (flammable, toxic, corrosive)',
      'UN-approved packaging certification and UN-spec labeling',
      "Shipper's Declaration for Dangerous Goods (DGD) preparation",
      'Dangerous goods trained personnel handling every shipment'
    ]),
    bullets: JSON.stringify([
      'Certified IATA/IMO cargo specialists',
      'UN-specification packaging & labeling',
      'Dangerous goods declaration (DGD)',
      'Guaranteed carrier acceptance'
    ]),
    path: '/services/dangerous-goods-shipping',
    sort_order: 5,
    is_active: true
  },
  {
    service_id: 'international-relocation',
    title: 'International Household Relocation',
    tagline: 'Zero-Damage Moving Guarantee',
    badge: 'Packers & Movers',
    badge_color: 'bg-teal-50 text-teal-800 border-teal-200',
    image: '/assets/movers.jpg',
    lead: 'Turnkey overseas moving services for families, corporate transfers, and NRI returnees with custom wooden crating and destination customs clearance.',
    short_desc: 'Complete overseas household relocation, transfer of residency customs duty optimization, and safe unpacking.',
    features: JSON.stringify([
      'Specialized export-grade multi-layer packaging & custom crates',
      'Transfer of Residence (TR) customs facilitation and checklist',
      'Complete destination door-to-door unpacking and debris removal',
      'Comprehensive marine cargo transit insurance coverage'
    ]),
    bullets: JSON.stringify([
      'Pre-move physical/virtual survey',
      'Multi-layer export quality packaging',
      'Comprehensive marine transit insurance',
      'Transfer of Residence (TR) paperwork'
    ]),
    path: '/services/international-relocation',
    sort_order: 6,
    is_active: true
  }
];

// Default Testimonials
const DEFAULT_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Capt. Rajesh Varma',
    company: 'Pacific Marine Technical Fleet',
    role: 'Fleet Technical Director',
    rating: 5,
    service: 'Ship Spares Logistics',
    quote: 'Flymingo delivered our main engine cylinder head directly on-board at Tuticorin outer anchorage within 4 hours of flight arrival. Zero port delay saved our vessel over $18,000 in demurrage.',
    date: '12 Oct 2024',
    status: 'approved'
  },
  {
    id: 't2',
    name: 'Dr. Meenakshi Sundaram',
    company: 'NRI Health Services',
    role: 'Physician, UK',
    rating: 5,
    service: 'International Courier',
    quote: 'Sent urgent Ayurvedic medication and homemade sweets from Coimbatore to Manchester. Delivered in just 3 business days with flawless food packaging and real-time tracking updates.',
    date: '28 Sep 2024',
    status: 'approved'
  },
  {
    id: 't3',
    name: 'Anand Chandrasekar',
    company: 'Apex Precision Engineering Ltd',
    role: 'VP Global Supply Chain',
    rating: 5,
    service: 'Freight Forwarding',
    quote: 'Their contract airline rates and multimodal transit from our factory in Peelamedu to Hamburg saved our quarterly export budget by 22%. Outstanding CHA clearance speed.',
    date: '15 Sep 2024',
    status: 'approved'
  },
  {
    id: 't4',
    name: 'Suresh Kumar',
    company: 'Chemicals & Coatings India',
    role: 'Logistics Head',
    rating: 5,
    service: 'Dangerous Goods Logistics',
    quote: 'Handling Class 3 flammable paints is complex due to strict airline DGD regulations. Flymingo certified inspectors handled UN packaging and DGD filing without a single hitch.',
    date: '02 Aug 2024',
    status: 'approved'
  }
];

// Initialize Database & Tables via Sequelize
async function initDb() {
  try {
    // 1. Ensure the MySQL database exists
    const tempConn = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword
    });
    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await tempConn.end();

    // 2. Authenticate Sequelize
    await sequelize.authenticate();
    console.log('Sequelize connected to MySQL database:', dbName);

    // 3. Sync Models
    await sequelize.sync({ alter: true });
    console.log('Sequelize models synchronized successfully.');

    // 4. Seed banner_video if not present
    const videoSetting = await BannerSetting.findByPk('banner_video');
    if (!videoSetting) {
      await BannerSetting.create({
        setting_key: 'banner_video',
        setting_value: '/assets/fliqmarine-hero.mov'
      });
      console.log('Seeded default banner_video.');
    }

    // 5. Seed hero_slides if empty
    const slideCount = await HeroSlide.count();
    if (slideCount === 0) {
      await HeroSlide.bulkCreate(DEFAULT_HERO_SLIDES);
      console.log('Seeded default hero_slides.');
    }

    // 6. Seed page_banners if missing
    for (const pb of DEFAULT_PAGE_BANNERS) {
      const existing = await PageBanner.findOne({ where: { page_key: pb.page_key } });
      if (!existing) {
        await PageBanner.create(pb);
      }
    }
    console.log('Page banners verified/seeded in Sequelize.');

    // 7. Seed services if empty
    const serviceCount = await Service.count();
    if (serviceCount === 0) {
      await Service.bulkCreate(DEFAULT_SERVICES);
      console.log('Seeded default services in Sequelize.');
    }

    // 8. Seed testimonials if empty
    const testimonialCount = await Testimonial.count();
    if (testimonialCount === 0) {
      await Testimonial.bulkCreate(DEFAULT_TESTIMONIALS);
      console.log('Seeded default testimonials in Sequelize.');
    }

    return true;
  } catch (err) {
    console.error('Error during Sequelize initDb:', err);
    throw err;
  }
}

// Helper: Get all page banners
async function getAllPageBannersFromDb() {
  const records = await PageBanner.findAll({
    order: [['id', 'ASC']]
  });

  const result = {};
  for (const r of records) {
    result[r.page_key] = {
      id: r.id,
      pageKey: r.page_key,
      pageName: r.page_name,
      pageType: r.page_type,
      badge: r.badge,
      title: r.title,
      highlight: r.highlight,
      description: r.description,
      buttonLabel: r.button_label,
      buttonSlug: r.button_slug,
      bgImage: r.bg_image,
      sideImage: r.side_image,
      updatedAt: r.updated_at
    };
  }
  return result;
}

// Helper: Get single page banner by key
async function getPageBannerFromDb(pageKey) {
  const r = await PageBanner.findOne({ where: { page_key: pageKey } });
  if (!r) return null;
  return {
    id: r.id,
    pageKey: r.page_key,
    pageName: r.page_name,
    pageType: r.page_type,
    badge: r.badge,
    title: r.title,
    highlight: r.highlight,
    description: r.description,
    buttonLabel: r.button_label,
    buttonSlug: r.button_slug,
    bgImage: r.bg_image,
    sideImage: r.side_image,
    updatedAt: r.updated_at
  };
}

// Helper: Update a single page banner
async function updatePageBannerInDb(pageKey, data) {
  let record = await PageBanner.findOne({ where: { page_key: pageKey } });
  
  const updatePayload = {
    badge: data.badge !== undefined ? data.badge : (data.eyebrow || 'SOUTH INDIA → THE WORLD'),
    title: data.title !== undefined ? data.title : '',
    highlight: data.highlight !== undefined ? data.highlight : '',
    description: data.description !== undefined ? data.description : (data.desc || ''),
    button_label: data.buttonLabel !== undefined ? data.buttonLabel : (data.button_label || ''),
    button_slug: data.buttonSlug !== undefined ? data.buttonSlug : (data.button_slug || ''),
    bg_image: data.bgImage !== undefined ? data.bgImage : (data.bg_image || data.image || ''),
    side_image: data.sideImage !== undefined ? data.sideImage : (data.side_image || '')
  };

  if (data.pageName) updatePayload.page_name = data.pageName;
  if (data.pageType) updatePayload.page_type = data.pageType;

  if (record) {
    await record.update(updatePayload);
  } else {
    record = await PageBanner.create({
      page_key: pageKey,
      page_name: data.pageName || pageKey,
      page_type: data.pageType || (['about', 'contact', 'services'].includes(pageKey) ? 'main_page' : 'service_detail'),
      ...updatePayload
    });
  }

  return getPageBannerFromDb(pageKey);
}

// Helper: Get combined banner settings, hero slides, and page banners
async function getBannerFromDb() {
  // 1. Video
  const videoRec = await BannerSetting.findByPk('banner_video');
  const bannerVideo = videoRec ? videoRec.setting_value : '/assets/fliqmarine-hero.mov';

  // 2. Hero slides
  const slideRecs = await HeroSlide.findAll({
    order: [['sort_order', 'ASC']]
  });
  const heroSlides = slideRecs.map((s) => ({
    id: s.slide_id,
    titlePrefix: s.title_prefix,
    highlight: s.highlight,
    titleSuffix: s.title_suffix,
    desc: s.description,
    primaryCta: s.primary_cta,
    primarySlug: s.primary_slug,
    secondaryCta: s.secondary_cta,
    secondarySlug: s.secondary_slug,
    isActive: Boolean(s.is_active)
  }));

  // 3. Page banners
  const pageBanners = await getAllPageBannersFromDb();

  // 4. Home sections
  let homeSections = null;
  const homeSectionsRecord = await BannerSetting.findByPk('home_sections');
  if (homeSectionsRecord?.setting_value) {
    try {
      homeSections = JSON.parse(homeSectionsRecord.setting_value);
    } catch (e) {}
  }

  return { bannerVideo, heroSlides, pageBanners, homeSections };
}

// Helper: Save combined banner data
async function saveBannerToDb(data) {
  const transaction = await sequelize.transaction();
  try {
    // 1. Video
    if (data.bannerVideo) {
      await BannerSetting.upsert({
        setting_key: 'banner_video',
        setting_value: data.bannerVideo
      }, { transaction });
    }

    // 2. Hero slides
    if (Array.isArray(data.heroSlides)) {
      await HeroSlide.destroy({ where: {}, truncate: true, transaction });
      const slidesToInsert = data.heroSlides.map((s, i) => ({
        slide_id: s.id || `slide-${Date.now()}-${i}`,
        title_prefix: s.titlePrefix || '',
        highlight: s.highlight || '',
        title_suffix: s.titleSuffix || '',
        description: s.desc || '',
        primary_cta: s.primaryCta || 'Explore Services',
        primary_slug: s.primarySlug || '/services',
        secondary_cta: s.secondaryCta || 'Get Quote',
        secondary_slug: s.secondarySlug || '/contact',
        is_active: s.isActive !== false,
        sort_order: i + 1
      }));
      await HeroSlide.bulkCreate(slidesToInsert, { transaction });
    }

    // 3. Page banners
    if (data.pageBanners && typeof data.pageBanners === 'object') {
      for (const [pageKey, p] of Object.entries(data.pageBanners)) {
        await PageBanner.upsert({
          page_key: pageKey,
          page_name: p.pageName || pageKey,
          page_type: p.pageType || (['about', 'contact', 'services'].includes(pageKey) ? 'main_page' : 'service_detail'),
          badge: p.badge || 'SOUTH INDIA → THE WORLD',
          title: p.title || '',
          highlight: p.highlight || '',
          description: p.description || '',
          button_label: p.buttonLabel || '',
          button_slug: p.buttonSlug || '',
          bg_image: p.bgImage || p.image || '',
          side_image: p.sideImage || ''
        }, { transaction });
      }
    }

    // 4. Home sections
    if (data.homeSections && typeof data.homeSections === 'object') {
      await BannerSetting.upsert({
        setting_key: 'home_sections',
        setting_value: JSON.stringify(data.homeSections)
      }, { transaction });
    }

    await transaction.commit();
    return true;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

// Create single hero slide
async function createHeroSlideInDb(slideData) {
  const count = await HeroSlide.count();
  const slideId = slideData.id || `slide-${Date.now()}`;
  return HeroSlide.create({
    slide_id: slideId,
    title_prefix: slideData.titlePrefix || '',
    highlight: slideData.highlight || '',
    title_suffix: slideData.titleSuffix || '',
    description: slideData.desc || '',
    primary_cta: slideData.primaryCta || 'Explore Services',
    primary_slug: slideData.primarySlug || '/services',
    secondary_cta: slideData.secondaryCta || 'Get Quote',
    secondary_slug: slideData.secondarySlug || '/contact',
    is_active: slideData.isActive !== false,
    sort_order: count + 1
  });
}

// Delete single hero slide
async function deleteHeroSlideFromDb(slideId) {
  return HeroSlide.destroy({ where: { slide_id: slideId } });
}

// Helper: Format service record
function formatServiceRecord(r) {
  let features = [];
  let bullets = [];
  try {
    features = JSON.parse(r.features || '[]');
  } catch (e) {
    features = [];
  }
  try {
    bullets = JSON.parse(r.bullets || '[]');
  } catch (e) {
    bullets = [];
  }
  return {
    id: r.service_id,
    service_id: r.service_id,
    title: r.title,
    tagline: r.tagline,
    badge: r.badge,
    badgeColor: r.badge_color,
    badge_color: r.badge_color,
    image: r.image,
    lead: r.lead,
    shortDesc: r.short_desc,
    short_desc: r.short_desc,
    features: features,
    bullets: bullets,
    path: r.path,
    sortOrder: r.sort_order,
    sort_order: r.sort_order,
    isActive: r.is_active,
    is_active: r.is_active,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  };
}

// Service CRUD Helpers
async function getAllServicesFromDb() {
  const records = await Service.findAll({
    order: [['sort_order', 'ASC']]
  });
  return records.map(formatServiceRecord);
}

async function createServiceInDb(data) {
  const count = await Service.count();
  const serviceId = data.id || data.service_id || `service-${Date.now()}`;
  const featuresStr = Array.isArray(data.features) ? JSON.stringify(data.features) : (typeof data.features === 'string' ? data.features : '[]');
  const bulletsStr = Array.isArray(data.bullets) ? JSON.stringify(data.bullets) : (typeof data.bullets === 'string' ? data.bullets : '[]');

  const created = await Service.create({
    service_id: serviceId,
    title: data.title || 'New Service',
    tagline: data.tagline || '',
    badge: data.badge || 'SPECIALIZED LOGISTICS',
    badge_color: data.badgeColor || data.badge_color || 'bg-brand-blue-50 text-brand-blue border-brand-blue-200',
    image: data.image || '/assets/service banner.jpg',
    lead: data.lead || '',
    short_desc: data.shortDesc || data.short_desc || data.lead || '',
    features: featuresStr,
    bullets: bulletsStr,
    path: data.path || `/services/${serviceId}`,
    sort_order: data.sortOrder || data.sort_order || count + 1,
    is_active: data.isActive !== false
  });
  return formatServiceRecord(created);
}

async function updateServiceInDb(serviceId, data) {
  const record = await Service.findByPk(serviceId);
  if (!record) return null;

  const updatePayload = {};
  if (data.title !== undefined) updatePayload.title = data.title;
  if (data.tagline !== undefined) updatePayload.tagline = data.tagline;
  if (data.badge !== undefined) updatePayload.badge = data.badge;
  if (data.badgeColor !== undefined) updatePayload.badge_color = data.badgeColor;
  if (data.badge_color !== undefined) updatePayload.badge_color = data.badge_color;
  if (data.image !== undefined) updatePayload.image = data.image;
  if (data.lead !== undefined) updatePayload.lead = data.lead;
  if (data.shortDesc !== undefined) updatePayload.short_desc = data.shortDesc;
  if (data.short_desc !== undefined) updatePayload.short_desc = data.short_desc;
  if (data.path !== undefined) updatePayload.path = data.path;
  if (data.sortOrder !== undefined) updatePayload.sort_order = data.sortOrder;
  if (data.sort_order !== undefined) updatePayload.sort_order = data.sort_order;
  if (data.isActive !== undefined) updatePayload.is_active = data.isActive;
  if (data.is_active !== undefined) updatePayload.is_active = data.is_active;

  if (data.features !== undefined) {
    updatePayload.features = Array.isArray(data.features) ? JSON.stringify(data.features) : String(data.features);
  }
  if (data.bullets !== undefined) {
    updatePayload.bullets = Array.isArray(data.bullets) ? JSON.stringify(data.bullets) : String(data.bullets);
  }

  await record.update(updatePayload);
  return formatServiceRecord(record);
}

async function deleteServiceInDb(serviceId) {
  return Service.destroy({ where: { service_id: serviceId } });
}

async function saveServicesBatchToDb(servicesList) {
  if (!Array.isArray(servicesList)) return false;
  for (let i = 0; i < servicesList.length; i++) {
    const s = servicesList[i];
    const sId = s.id || s.service_id;
    if (!sId) continue;
    const existing = await Service.findByPk(sId);
    const featuresStr = Array.isArray(s.features) ? JSON.stringify(s.features) : (typeof s.features === 'string' ? s.features : '[]');
    const bulletsStr = Array.isArray(s.bullets) ? JSON.stringify(s.bullets) : (typeof s.bullets === 'string' ? s.bullets : '[]');

    const payload = {
      title: s.title,
      tagline: s.tagline || '',
      badge: s.badge || 'SPECIALIZED LOGISTICS',
      badge_color: s.badgeColor || s.badge_color || 'bg-brand-blue-50 text-brand-blue border-brand-blue-200',
      image: s.image || '/assets/service banner.jpg',
      lead: s.lead || '',
      short_desc: s.shortDesc || s.short_desc || s.lead || '',
      features: featuresStr,
      bullets: bulletsStr,
      path: s.path || `/services/${sId}`,
      sort_order: i + 1,
      is_active: s.isActive !== false
    };

    if (existing) {
      await existing.update(payload);
    } else {
      await Service.create({ service_id: sId, ...payload });
    }
  }
  return getAllServicesFromDb();
}

// Testimonials CRUD Helpers
async function getAllTestimonialsFromDb() {
  const records = await Testimonial.findAll({
    order: [['created_at', 'DESC']]
  });
  return records.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company,
    rating: t.rating,
    quote: t.quote,
    service: t.service,
    date: t.date,
    status: t.status,
    createdAt: t.created_at,
    updatedAt: t.updated_at
  }));
}

async function createTestimonialInDb(data) {
  const id = data.id || `t-${Date.now()}`;
  return Testimonial.create({
    id,
    name: data.name,
    role: data.role || data.position || 'Verified Customer',
    company: data.company || '',
    rating: Number(data.rating) || 5,
    quote: data.quote || data.review || '',
    service: data.service || 'Logistics Service',
    date: data.date || 'Recent',
    status: data.status || 'pending'
  });
}

async function updateTestimonialInDb(id, data) {
  const record = await Testimonial.findByPk(id);
  if (!record) return null;
  return record.update(data);
}

async function deleteTestimonialInDb(id) {
  return Testimonial.destroy({ where: { id } });
}

module.exports = {
  sequelize,
  Sequelize,
  BannerSetting,
  HeroSlide,
  PageBanner,
  Service,
  Testimonial,
  initDb,
  getBannerFromDb,
  saveBannerToDb,
  getAllPageBannersFromDb,
  getPageBannerFromDb,
  updatePageBannerInDb,
  createHeroSlideInDb,
  deleteHeroSlideFromDb,
  getAllServicesFromDb,
  createServiceInDb,
  updateServiceInDb,
  deleteServiceInDb,
  saveServicesBatchToDb,
  getAllTestimonialsFromDb,
  createTestimonialInDb,
  updateTestimonialInDb,
  deleteTestimonialInDb,
  DEFAULT_PAGE_BANNERS,
  DEFAULT_SERVICES,
  DEFAULT_TESTIMONIALS
};
