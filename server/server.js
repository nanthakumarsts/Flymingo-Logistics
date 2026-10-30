const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const {
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
  DEFAULT_SERVICES,
  DEFAULT_TESTIMONIALS
} = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure upload and data directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Serve static uploads
app.use('/uploads', express.static(uploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${Date.now()}_${cleanName}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 250 * 1024 * 1024 } // 250MB limit
});

const BANNER_FILE = path.join(dataDir, 'bannerData.json');

// File fallback helper
const getBannerFromFile = () => {
  if (fs.existsSync(BANNER_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(BANNER_FILE, 'utf-8'));
    } catch (e) {
      console.error('Error reading banner data file:', e);
    }
  }
  return {
    bannerVideo: '/assets/fliqmarine-hero.mov',
    heroSlides: [],
    pageBanners: {},
    homeSections: null
  };
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Flymingo Logistics Backend API with MySQL' });
});

// File Upload Endpoint (Drag & Drop support)
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${fileUrl}`;
    res.json({
      success: true,
      message: 'File uploaded successfully',
      filename: req.file.filename,
      fileUrl: fileUrl,
      fullUrl: fullUrl,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, error: err.message || 'File upload failed' });
  }
});

// GET Banner Data - Fetches dynamically from MySQL Database
app.get('/api/banner', async (req, res) => {
  try {
    const data = await getBannerFromDb();
    res.json({ success: true, source: 'mysql', data });
  } catch (err) {
    console.warn('MySQL read failed, serving from file backup:', err.message);
    const data = getBannerFromFile();
    res.json({ success: true, source: 'file_fallback', data });
  }
});

// PUT Banner Data - Updates MySQL Database dynamically
app.put('/api/banner', async (req, res) => {
  try {
    const update = req.body;
    if (!update || typeof update !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid data payload' });
    }

    // 1. Save directly into MySQL Database
    try {
      await saveBannerToDb(update);
    } catch (dbErr) {
      console.error('Failed to save to MySQL:', dbErr.message);
    }

    // 2. Also sync to local JSON backup
    try {
      const current = getBannerFromFile();
      const merged = { ...current, ...update, updatedAt: new Date().toISOString() };
      fs.writeFileSync(BANNER_FILE, JSON.stringify(merged, null, 2), 'utf-8');
    } catch (fsErr) {
      console.error('Failed to sync JSON backup:', fsErr.message);
    }

    // Return latest data from DB
    const latestData = await getBannerFromDb().catch(() => update);
    res.json({
      success: true,
      message: 'Banner settings updated dynamically in MySQL Database!',
      data: latestData
    });
  } catch (err) {
    console.error('Error saving banner data:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- PAGE BANNERS CRUD ENDPOINTS (MySQL flymingo) ---

// GET all page banners from MySQL
app.get('/api/page-banners', async (req, res) => {
  try {
    const banners = await getAllPageBannersFromDb();
    res.json({ success: true, banners });
  } catch (err) {
    console.error('Error fetching page banners from DB:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET specific page banner by pageKey
app.get('/api/page-banners/:pageKey', async (req, res) => {
  try {
    const banner = await getPageBannerFromDb(req.params.pageKey);
    if (!banner) {
      return res.status(404).json({ success: false, error: 'Banner not found for page: ' + req.params.pageKey });
    }
    res.json({ success: true, banner, data: banner });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update single page banner in MySQL
app.put('/api/page-banners/:pageKey', async (req, res) => {
  try {
    const updated = await updatePageBannerInDb(req.params.pageKey, req.body);
    res.json({ success: true, message: `Banner for ${req.params.pageKey} updated successfully`, banner: updated, data: updated });
  } catch (err) {
    console.error(`Error updating banner for ${req.params.pageKey}:`, err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Hero Slides Endpoints
app.get('/api/sliders', async (req, res) => {
  try {
    const data = await getBannerFromDb();
    res.json({ success: true, slides: data.heroSlides || [] });
  } catch (e) {
    const data = getBannerFromFile();
    res.json({ success: true, slides: data.heroSlides || [] });
  }
});

app.post('/api/hero-slides', async (req, res) => {
  try {
    const created = await createHeroSlideInDb(req.body);
    res.json({ success: true, message: 'Slide created successfully', slide: created });
  } catch (err) {
    console.error('Error creating slide:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/hero-slides/:id', async (req, res) => {
  try {
    await deleteHeroSlideFromDb(req.params.id);
    res.json({ success: true, message: 'Slide deleted successfully' });
  } catch (err) {
    console.error('Error deleting slide:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- SERVICES CRUD ENDPOINTS (MySQL via Sequelize) ---
app.get('/api/services', async (req, res) => {
  try {
    const services = await getAllServicesFromDb();
    res.json({ success: true, services });
  } catch (err) {
    console.error('Error fetching services from DB:', err.message);
    res.status(500).json({ success: false, error: err.message, services: DEFAULT_SERVICES });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const created = await createServiceInDb(req.body);
    res.json({ success: true, message: 'Service created successfully in MySQL', service: created });
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const updated = await updateServiceInDb(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({ success: true, message: 'Service updated successfully in MySQL', service: updated });
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await deleteServiceInDb(req.params.id);
    res.json({ success: true, message: 'Service deleted successfully from MySQL' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/services', async (req, res) => {
  try {
    const { services } = req.body;
    if (!Array.isArray(services)) {
      return res.status(400).json({ success: false, error: 'services array is required' });
    }
    const updated = await saveServicesBatchToDb(services);
    res.json({ success: true, message: 'All services saved successfully to MySQL', services: updated });
  } catch (err) {
    console.error('Error batch saving services:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- HOME SECTIONS ENDPOINTS (MySQL via Sequelize) ---
app.get('/api/home-sections', async (req, res) => {
  try {
    const rec = await BannerSetting.findByPk('home_sections');
    if (rec?.setting_value) {
      return res.json({ success: true, data: JSON.parse(rec.setting_value) });
    }
  } catch (e) {}

  const bannerData = getBannerFromFile();
  if (bannerData.homeSections) {
    return res.json({ success: true, data: bannerData.homeSections });
  }
  res.json({ success: true, data: null });
});

app.put('/api/home-sections', async (req, res) => {
  try {
    const sections = req.body;
    await BannerSetting.upsert({
      setting_key: 'home_sections',
      setting_value: JSON.stringify(sections)
    });

    const bannerData = getBannerFromFile();
    bannerData.homeSections = sections;
    fs.writeFileSync(BANNER_FILE, JSON.stringify(bannerData, null, 2), 'utf-8');

    res.json({ success: true, message: 'Home sections saved successfully to MySQL', data: sections });
  } catch (err) {
    console.error('Error saving home sections:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- ABOUT CONTENT ENDPOINTS ---
app.get('/api/about', async (req, res) => {
  try {
    const rec = await BannerSetting.findByPk('aboutContent');
    if (rec?.setting_value) {
      return res.json({ success: true, data: JSON.parse(rec.setting_value) });
    }
  } catch (e) {}

  const bannerData = getBannerFromFile();
  if (bannerData.aboutContent) {
    return res.json({ success: true, data: bannerData.aboutContent });
  }

  res.json({ success: true, data: null });
});

app.post('/api/about', async (req, res) => {
  try {
    const { aboutContent } = req.body;
    if (!aboutContent) {
      return res.status(400).json({ success: false, error: 'aboutContent is required' });
    }

    try {
      await BannerSetting.upsert({
        setting_key: 'aboutContent',
        setting_value: JSON.stringify(aboutContent)
      });
    } catch (e) {}

    const bannerData = getBannerFromFile();
    bannerData.aboutContent = aboutContent;
    fs.writeFileSync(BANNER_FILE, JSON.stringify(bannerData, null, 2), 'utf-8');

    res.json({ success: true, message: 'About content saved successfully', data: aboutContent });
  } catch (err) {
    console.error('Error saving about content:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/inquiries', (req, res) => res.json({ message: 'Inquiries endpoint ready' }));
app.post('/api/inquiries', (req, res) => res.json({ message: 'Inquiry received' }));

// --- TESTIMONIALS CRUD & MODERATION ENDPOINTS (MySQL via Sequelize) ---
app.get('/api/testimonials', async (req, res) => {
  try {
    const list = await getAllTestimonialsFromDb();
    res.json({ success: true, testimonials: list });
  } catch (err) {
    console.error('Error fetching testimonials:', err.message);
    res.status(500).json({ success: false, error: err.message, testimonials: DEFAULT_TESTIMONIALS });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const { name, position, role, company, rating, quote, review } = req.body;
    if (!name || (!quote && !review)) {
      return res.status(400).json({ success: false, error: 'Name and review are required' });
    }
    const newT = await createTestimonialInDb({
      name: name.trim(),
      company: (company || position || role || 'Verified Customer').trim(),
      role: (position || role || 'Client').trim(),
      rating: Number(rating) || 5,
      quote: (quote || review || '').trim(),
      date: 'Just Now',
      status: 'pending' // Pending admin approval
    });
    res.json({ success: true, message: 'Review submitted and pending administrator approval!', testimonial: newT });
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/testimonials/:id', async (req, res) => {
  try {
    const updated = await updateTestimonialInDb(req.params.id, req.body);
    const list = await getAllTestimonialsFromDb();
    res.json({ success: true, message: 'Testimonial updated successfully in MySQL', testimonial: updated, testimonials: list });
  } catch (err) {
    console.error('Error updating testimonial:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    await deleteTestimonialInDb(req.params.id);
    const list = await getAllTestimonialsFromDb();
    res.json({ success: true, message: 'Testimonial deleted successfully from MySQL', testimonials: list });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- UNIFIED ADMIN DATA SYNC ENDPOINT (Syncs full state to MySQL DB) ---
app.post('/api/admin/sync', async (req, res) => {
  try {
    const payload = req.body || {};
    // 1. Sync Services
    if (Array.isArray(payload.services)) {
      await saveServicesBatchToDb(payload.services);
    }
    // 2. Sync Home Sections
    if (payload.homeSections) {
      await BannerSetting.upsert({
        setting_key: 'home_sections',
        setting_value: JSON.stringify(payload.homeSections)
      });
    }
    // 3. Sync About Content
    if (payload.aboutContent) {
      await BannerSetting.upsert({
        setting_key: 'aboutContent',
        setting_value: JSON.stringify(payload.aboutContent)
      });
    }
    // 4. Sync Page Banners
    if (payload.pageBanners && typeof payload.pageBanners === 'object') {
      for (const [pageKey, p] of Object.entries(payload.pageBanners)) {
        await updatePageBannerInDb(pageKey, p);
      }
    }
    // 5. Sync Banner Video
    if (payload.bannerVideo) {
      await BannerSetting.upsert({
        setting_key: 'banner_video',
        setting_value: payload.bannerVideo
      });
    }

    // Also update local JSON backup
    const current = getBannerFromFile();
    const merged = { ...current, ...payload, updatedAt: new Date().toISOString() };
    fs.writeFileSync(BANNER_FILE, JSON.stringify(merged, null, 2), 'utf-8');

    res.json({ success: true, message: 'All admin changes synchronized directly into MySQL database!' });
  } catch (err) {
    console.error('Error in /api/admin/sync:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Initialize MySQL and start server
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Flymingo Server running on port ${PORT} connected to MySQL (flymingo)`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MySQL at startup:', err.message);
    app.listen(PORT, () => {
      console.log(`⚠️ Flymingo Server running on port ${PORT} (offline DB mode)`);
    });
  });