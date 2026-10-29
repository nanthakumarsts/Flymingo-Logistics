const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

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
  limits: { fileSize: 250 * 1024 * 1024 } // 250MB limit for high-res videos
});

const BANNER_FILE = path.join(dataDir, 'bannerData.json');

// Helper to get banner data
const getBannerData = () => {
  if (fs.existsSync(BANNER_FILE)) {
    try {
      const raw = fs.readFileSync(BANNER_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading banner data:', e);
    }
  }
  return {
    bannerVideo: '/assets/fliqmarine-hero.mov',
    heroSlides: [],
    pageBanners: {}
  };
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Flymingo Logistics Backend API' });
});

// File Upload Endpoint (Drag & Drop support for video & images)
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

// Banner Endpoints
app.get('/api/banner', (req, res) => {
  try {
    const data = getBannerData();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/banner', (req, res) => {
  try {
    const update = req.body;
    if (!update || typeof update !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid data payload' });
    }
    const current = getBannerData();
    const merged = {
      ...current,
      ...update,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(BANNER_FILE, JSON.stringify(merged, null, 2), 'utf-8');
    res.json({ success: true, message: 'Banner settings updated successfully', data: merged });
  } catch (err) {
    console.error('Error saving banner data:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Legacy endpoints
app.get('/api/sliders', (req, res) => {
  const data = getBannerData();
  res.json({ success: true, slides: data.heroSlides || [] });
});
app.get('/api/services', (req, res) => res.json({ message: 'Services endpoint ready' }));
app.get('/api/about', (req, res) => res.json({ message: 'About content endpoint ready' }));
app.get('/api/inquiries', (req, res) => res.json({ message: 'Inquiries endpoint ready' }));
app.post('/api/inquiries', (req, res) => res.json({ message: 'Inquiry received' }));

app.listen(PORT, () => {
  console.log('Flymingo Server running on port ' + PORT);
});