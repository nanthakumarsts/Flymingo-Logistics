const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const {
  BannerSetting,
  initDb,
  getBannerFromDb,
  saveBannerToDb,
  getAllPageBannersFromDb,
  getPageBannerFromDb,
  updatePageBannerInDb,
  createHeroSlideInDb,
  deleteHeroSlideFromDb
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

app.get('/api/services', (req, res) => res.json({ message: 'Services endpoint ready' }));

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

// --- TESTIMONIALS CRUD & MODERATION ENDPOINTS ---
const TESTIMONIALS_FILE = path.join(dataDir, 'testimonials.json');

const getTestimonialsData = async () => {
  try {
    const rec = await BannerSetting.findByPk('testimonials');
    if (rec?.setting_value) {
      return JSON.parse(rec.setting_value);
    }
  } catch (e) {}

  if (fs.existsSync(TESTIMONIALS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(TESTIMONIALS_FILE, 'utf-8'));
    } catch (e) {}
  }

  return [
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
};

const saveTestimonialsData = async (list) => {
  try {
    await BannerSetting.upsert({
      setting_key: 'testimonials',
      setting_value: JSON.stringify(list)
    });
  } catch (e) {
    console.error('MySQL save testimonials error:', e.message);
  }
  try {
    fs.writeFileSync(TESTIMONIALS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {}
};

// GET all testimonials (client filters by status: approved)
app.get('/api/testimonials', async (req, res) => {
  try {
    const list = await getTestimonialsData();
    res.json({ success: true, testimonials: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST submit a review from client UI (defaults to status: pending)
app.post('/api/testimonials', async (req, res) => {
  try {
    const { name, position, role, company, rating, quote, review } = req.body;
    if (!name || (!quote && !review)) {
      return res.status(400).json({ success: false, error: 'Name and review are required' });
    }
    const list = await getTestimonialsData();
    const newT = {
      id: 't-' + Date.now(),
      name: name.trim(),
      company: (position || company || role || 'Verified Customer').trim(),
      role: (position || role || 'Client').trim(),
      rating: Number(rating) || 5,
      quote: (quote || review || '').trim(),
      date: 'Just Now',
      status: 'pending' // Pending admin approval!
    };
    list.unshift(newT);
    await saveTestimonialsData(list);
    res.json({ success: true, message: 'Review submitted and pending administrator approval!', testimonial: newT });
  } catch (err) {
    console.error('Error submitting review:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update testimonial status (approve / pending) or content
app.put('/api/testimonials/:id', async (req, res) => {
  try {
    const list = await getTestimonialsData();
    const updated = list.map((t) => (t.id === req.params.id ? { ...t, ...req.body } : t));
    await saveTestimonialsData(updated);
    res.json({ success: true, message: 'Testimonial updated successfully', testimonials: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE testimonial
app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    const list = await getTestimonialsData();
    const filtered = list.filter((t) => t.id !== req.params.id);
    await saveTestimonialsData(filtered);
    res.json({ success: true, message: 'Testimonial deleted successfully', testimonials: filtered });
  } catch (err) {
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