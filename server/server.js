const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Flymingo Logistics Backend API' });
});

app.get('/api/sliders', (req, res) => res.json({ message: 'Sliders endpoint ready' }));
app.get('/api/services', (req, res) => res.json({ message: 'Services endpoint ready' }));
app.get('/api/about', (req, res) => res.json({ message: 'About content endpoint ready' }));
app.get('/api/inquiries', (req, res) => res.json({ message: 'Inquiries endpoint ready' }));
app.post('/api/inquiries', (req, res) => res.json({ message: 'Inquiry received' }));

app.listen(PORT, () => {
  console.log('Flymingo Server running on port ' + PORT);
});