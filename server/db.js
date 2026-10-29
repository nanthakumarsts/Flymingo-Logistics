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

// Initialize database schema and seed initial banner data if empty
async function initDb() {
  try {
    const conn = await pool.getConnection();

    // 1. Settings Table (for global background video etc.)
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

    // 3. Page Banners Table (About, Services, Contact)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS page_banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_key VARCHAR(100) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        highlight VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Check if banner_settings is empty, seed initial banner video
    const [settingsRows] = await conn.query('SELECT * FROM banner_settings WHERE setting_key = "banner_video"');
    if (settingsRows.length === 0) {
      await conn.query(
        'INSERT INTO banner_settings (setting_key, setting_value) VALUES (?, ?)',
        ['banner_video', '/assets/fliqmarine-hero.mov']
      );
    }

    // Check if hero_slides is empty, seed initial 3 slides
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

    // Check if page_banners is empty, seed default banners
    const [pageRows] = await conn.query('SELECT COUNT(*) as count FROM page_banners');
    if (pageRows[0].count === 0) {
      const initialPages = [
        {
          page_key: 'about',
          title: 'We Are The Bridge Between You And Your Relations.',
          highlight: 'Across Oceans & Continents.',
          image: '/assets/banner-marine-hd.jpg'
        },
        {
          page_key: 'services',
          title: 'Six Proven Channels.',
          highlight: 'Zero Cargo Gaps.',
          image: '/assets/banner-courier-hd.jpg'
        },
        {
          page_key: 'contact',
          title: 'Direct Lines.',
          highlight: 'Immediate Logistics Response.',
          image: '/assets/banner-contact-hd.jpg'
        }
      ];

      for (const p of initialPages) {
        await conn.query(
          'INSERT INTO page_banners (page_key, title, highlight, image) VALUES (?, ?, ?, ?)',
          [p.page_key, p.title, p.highlight, p.image]
        );
      }
    }

    conn.release();
    console.log('✅ MySQL Database Schema & Seed Data Initialized for Flymingo');
  } catch (err) {
    console.error('❌ Error initializing MySQL tables:', err.message);
  }
}

// Fetch complete banner configuration from MySQL
async function getBannerFromDb() {
  const conn = await pool.getConnection();
  try {
    // 1. Get banner video setting
    const [settings] = await conn.query('SELECT setting_value FROM banner_settings WHERE setting_key = "banner_video" LIMIT 1');
    const bannerVideo = settings.length > 0 ? settings[0].setting_value : '/assets/fliqmarine-hero.mov';

    // 2. Get active hero slides ordered
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

    // 3. Get page banners
    const [pages] = await conn.query('SELECT * FROM page_banners');
    const pageBanners = {};
    pages.forEach(p => {
      pageBanners[p.page_key] = {
        title: p.title,
        highlight: p.highlight,
        image: p.image
      };
    });

    return { bannerVideo, heroSlides, pageBanners };
  } finally {
    conn.release();
  }
}

// Update complete banner configuration in MySQL
async function saveBannerToDb(data) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Update banner video if provided
    if (data.bannerVideo) {
      await conn.query(
        `INSERT INTO banner_settings (setting_key, setting_value) 
         VALUES ('banner_video', ?) 
         ON DUPLICATE KEY UPDATE setting_value = ?`,
        [data.bannerVideo, data.bannerVideo]
      );
    }

    // 2. Update hero slides if provided
    if (Array.isArray(data.heroSlides)) {
      // Clear existing and replace with new slides
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

    // 3. Update page banners if provided
    if (data.pageBanners && typeof data.pageBanners === 'object') {
      for (const [pageKey, p] of Object.entries(data.pageBanners)) {
        await conn.query(
          `INSERT INTO page_banners (page_key, title, highlight, image) 
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE title = ?, highlight = ?, image = ?`,
          [pageKey, p.title || '', p.highlight || '', p.image || '', p.title || '', p.highlight || '', p.image || '']
        );
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
  saveBannerToDb
};
