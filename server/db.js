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

module.exports = {
  sequelize,
  Sequelize,
  BannerSetting,
  HeroSlide,
  PageBanner,
  initDb,
  getBannerFromDb,
  saveBannerToDb,
  getAllPageBannersFromDb,
  getPageBannerFromDb,
  updatePageBannerInDb,
  createHeroSlideInDb,
  deleteHeroSlideFromDb,
  DEFAULT_PAGE_BANNERS
};
