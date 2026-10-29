const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'flymingo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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
    badge: 'HOUSEHOLD PACKERS & MOVERS',
    title: 'Turnkey Overseas ',
    highlight: 'Relocation Services',
    description: 'Door-to-door overseas moving with multi-layer export crating, transfer of residence (TR) customs documentation, container shipping, and destination delivery.',
    button_label: 'Request Moving Survey',
    button_slug: '/quote',
    bg_image: '/assets/movers.jpg',
    side_image: ''
  }
];

// Initialize database schema and ensure full structure
async function initDb() {
  try {
    const conn = await pool.getConnection();

    // 1. Settings Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS banner_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Hero Slides Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS hero_slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slide_id VARCHAR(100) NOT NULL UNIQUE,
        title_prefix VARCHAR(255) NOT NULL,
        highlight VARCHAR(255) NOT NULL,
        title_suffix VARCHAR(255) DEFAULT '',
        description TEXT NOT NULL,
        primary_cta VARCHAR(100) NOT NULL,
        primary_slug VARCHAR(255) NOT NULL,
        secondary_cta VARCHAR(100) NOT NULL,
        secondary_slug VARCHAR(255) NOT NULL,
        is_active TINYINT(1) DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Check if page_banners has the upgraded columns (badge, button_slug, side_image)
    const [cols] = await conn.query('SHOW COLUMNS FROM page_banners LIKE "button_slug"').catch(() => [[]]);
    if (cols.length === 0) {
      // Re-create page_banners with complete schema
      await conn.query('DROP TABLE IF EXISTS page_banners');
      await conn.query(`
        CREATE TABLE page_banners (
          id INT AUTO_INCREMENT PRIMARY KEY,
          page_key VARCHAR(100) NOT NULL UNIQUE,
          page_name VARCHAR(100) NOT NULL,
          page_type VARCHAR(50) NOT NULL DEFAULT 'main_page',
          badge VARCHAR(255) DEFAULT 'SOUTH INDIA → THE WORLD',
          title VARCHAR(255) NOT NULL,
          highlight VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          button_label VARCHAR(100) DEFAULT 'Explore Our Services',
          button_slug VARCHAR(255) DEFAULT '/services',
          bg_image VARCHAR(255) NOT NULL,
          side_image VARCHAR(255) DEFAULT '',
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
    }

    // Check banner_settings
    const [settingsRows] = await conn.query('SELECT * FROM banner_settings WHERE setting_key = "banner_video"');
    if (settingsRows.length === 0) {
      await conn.query(
        'INSERT INTO banner_settings (setting_key, setting_value) VALUES (?, ?)',
        ['banner_video', '/assets/fliqmarine-hero.mov']
      );
    }

    // Check hero_slides
    const [slidesRows] = await conn.query('SELECT COUNT(*) as count FROM hero_slides');
    if (slidesRows[0].count === 0) {
      const initialSlides = [
        {
          slide_id: 'marine-logistics',
          title_prefix: 'Your Global ',
          highlight: 'Logistics Partner',
          title_suffix: '',
          description: 'End-to-end logistics and courier solutions with operational excellence, global reach and a commitment to trust, safety and timely delivery across 190+ countries.',
          primary_cta: 'Explore Our Services',
          primary_slug: '/services',
          secondary_cta: 'Get Fare Rate',
          secondary_slug: '/contact',
          is_active: 1,
          sort_order: 1
        },
        {
          slide_id: 'worldwide-courier',
          title_prefix: 'Rapid Door-to-Door ',
          highlight: 'Worldwide Delivery',
          title_suffix: '',
          description: 'Connecting 190+ countries with priority doorstep pickup across South India for commercial samples, urgent documents, and specialized NRI parcels.',
          primary_cta: 'Explore Courier Rates',
          primary_slug: '/services/international-courier',
          secondary_cta: 'Get Instant Quote',
          secondary_slug: '/quote',
          is_active: 1,
          sort_order: 2
        },
        {
          slide_id: 'customs-brokerage',
          title_prefix: 'Seamless Ocean & Air ',
          highlight: 'Freight Clearance',
          title_suffix: '',
          description: 'Dedicated seaport and airport customs house brokerage with direct ICEGATE EDI filing, bonded warehousing, and multi-modal freight transport.',
          primary_cta: 'Consult Customs Broker',
          primary_slug: '/services/customs-clearance',
          secondary_cta: 'Contact Team',
          secondary_slug: '/contact',
          is_active: 1,
          sort_order: 3
        }
      ];

      for (const s of initialSlides) {
        await conn.query(
          `INSERT INTO hero_slides 
           (slide_id, title_prefix, highlight, title_suffix, description, primary_cta, primary_slug, secondary_cta, secondary_slug, is_active, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            s.slide_id, s.title_prefix, s.highlight, s.title_suffix,
            s.description, s.primary_cta, s.primary_slug, s.secondary_cta,
            s.secondary_slug, s.is_active, s.sort_order
          ]
        );
      }
    }

    // Seed/upsert all 9 page banners
    for (const p of DEFAULT_PAGE_BANNERS) {
      await conn.query(`
        INSERT INTO page_banners 
        (page_key, page_name, page_type, badge, title, highlight, description, button_label, button_slug, bg_image, side_image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          page_name = VALUES(page_name),
          page_type = VALUES(page_type)
      `, [
        p.page_key, p.page_name, p.page_type, p.badge,
        p.title, p.highlight, p.description, p.button_label,
        p.button_slug, p.bg_image, p.side_image || ''
      ]);
    }

    conn.release();
    console.log('✅ MySQL Database Schema & All 9 Page Banners Initialized');
  } catch (err) {
    console.error('❌ Error initializing MySQL tables:', err.message);
  }
}

// Format row helper
const formatBannerRow = (row) => ({
  pageKey: row.page_key,
  pageName: row.page_name,
  pageType: row.page_type,
  badge: row.badge,
  title: row.title,
  highlight: row.highlight,
  description: row.description,
  buttonLabel: row.button_label,
  buttonSlug: row.button_slug,
  bgImage: row.bg_image,
  sideImage: row.side_image || ''
});

// Fetch all page banners (returns as dictionary keyed by page_key)
async function getAllPageBannersFromDb() {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM page_banners ORDER BY id ASC');
    const banners = {};
    rows.forEach((r) => {
      banners[r.page_key] = formatBannerRow(r);
    });
    return banners;
  } finally {
    conn.release();
  }
}

// Fetch single page banner
async function getPageBannerFromDb(pageKey) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM page_banners WHERE page_key = ? LIMIT 1', [pageKey]);
    if (rows.length === 0) return null;
    return formatBannerRow(rows[0]);
  } finally {
    conn.release();
  }
}

// Update single page banner
async function updatePageBannerInDb(pageKey, data) {
  const conn = await pool.getConnection();
  try {
    await conn.query(`
      INSERT INTO page_banners 
      (page_key, page_name, page_type, badge, title, highlight, description, button_label, button_slug, bg_image, side_image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        badge = VALUES(badge),
        title = VALUES(title),
        highlight = VALUES(highlight),
        description = VALUES(description),
        button_label = VALUES(button_label),
        button_slug = VALUES(button_slug),
        bg_image = VALUES(bg_image),
        side_image = VALUES(side_image)
    `, [
      pageKey,
      data.pageName || pageKey,
      data.pageType || 'main_page',
      data.badge || 'SOUTH INDIA → THE WORLD',
      data.title || '',
      data.highlight || '',
      data.description || '',
      data.buttonLabel || 'Explore Services',
      data.buttonSlug || '/services',
      data.bgImage || '',
      data.sideImage || ''
    ]);
    return await getPageBannerFromDb(pageKey);
  } finally {
    conn.release();
  }
}

// Fetch combined home banner + slides + legacy page banners for SlidersBannersTab
async function getBannerFromDb() {
  const conn = await pool.getConnection();
  try {
    // 1. Banner video
    const [settings] = await conn.query('SELECT setting_value FROM banner_settings WHERE setting_key = "banner_video" LIMIT 1');
    const bannerVideo = settings.length > 0 ? settings[0].setting_value : '/assets/fliqmarine-hero.mov';

    // 2. Hero slides
    const [slides] = await conn.query('SELECT * FROM hero_slides ORDER BY sort_order ASC, id ASC');
    const heroSlides = slides.map(s => ({
      id: s.slide_id,
      titlePrefix: s.title_prefix,
      highlight: s.highlight,
      titleSuffix: s.title_suffix || '',
      desc: s.description,
      primaryCta: s.primary_cta,
      primarySlug: s.primary_slug,
      secondaryCta: s.secondary_cta,
      secondarySlug: s.secondary_slug,
      isActive: Boolean(s.is_active)
    }));

    // 3. Page banners
    const pageBanners = await getAllPageBannersFromDb();

    return { bannerVideo, heroSlides, pageBanners };
  } finally {
    conn.release();
  }
}

// Save combined banner data
async function saveBannerToDb(data) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Video
    if (data.bannerVideo) {
      await conn.query(
        `INSERT INTO banner_settings (setting_key, setting_value) 
         VALUES ('banner_video', ?) 
         ON DUPLICATE KEY UPDATE setting_value = ?`,
        [data.bannerVideo, data.bannerVideo]
      );
    }

    // 2. Hero slides
    if (Array.isArray(data.heroSlides)) {
      await conn.query('DELETE FROM hero_slides');
      for (let i = 0; i < data.heroSlides.length; i++) {
        const s = data.heroSlides[i];
        await conn.query(
          `INSERT INTO hero_slides 
           (slide_id, title_prefix, highlight, title_suffix, description, primary_cta, primary_slug, secondary_cta, secondary_slug, is_active, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            s.id || `slide-${Date.now()}-${i}`,
            s.titlePrefix || '',
            s.highlight || '',
            s.titleSuffix || '',
            s.desc || '',
            s.primaryCta || 'Explore Services',
            s.primarySlug || '/services',
            s.secondaryCta || 'Get Quote',
            s.secondarySlug || '/contact',
            s.isActive !== false ? 1 : 0,
            i + 1
          ]
        );
      }
    }

    // 3. Page banners
    if (data.pageBanners && typeof data.pageBanners === 'object') {
      for (const [pageKey, p] of Object.entries(data.pageBanners)) {
        await conn.query(`
          INSERT INTO page_banners 
          (page_key, page_name, page_type, badge, title, highlight, description, button_label, button_slug, bg_image, side_image)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            badge = VALUES(badge),
            title = VALUES(title),
            highlight = VALUES(highlight),
            description = VALUES(description),
            button_label = VALUES(button_label),
            button_slug = VALUES(button_slug),
            bg_image = VALUES(bg_image),
            side_image = VALUES(side_image)
        `, [
          pageKey,
          p.pageName || pageKey,
          p.pageType || (['about', 'contact', 'services'].includes(pageKey) ? 'main_page' : 'service_detail'),
          p.badge || 'SOUTH INDIA → THE WORLD',
          p.title || '',
          p.highlight || '',
          p.description || '',
          p.buttonLabel || 'Explore Services',
          p.buttonSlug || '/services',
          p.bgImage || p.image || '',
          p.sideImage || ''
        ]);
      }
    }

    await conn.commit();
    return true;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = {
  pool,
  initDb,
  getBannerFromDb,
  saveBannerToDb,
  getAllPageBannersFromDb,
  getPageBannerFromDb,
  updatePageBannerInDb,
  DEFAULT_PAGE_BANNERS
};
