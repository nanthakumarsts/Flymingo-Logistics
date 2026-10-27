// Simple CLI Tool for Hero Slider Management
// Run with: node scripts/admin-slides.js

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const SLIDES_FILE = path.resolve('src/data/heroSlides.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

function readSlides() {
  try {
    const raw = fs.readFileSync(SLIDES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading slides file:', err.message);
    return [];
  }
}

function writeSlides(slides) {
  try {
    fs.writeFileSync(SLIDES_FILE, JSON.stringify(slides, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving slides:', err.message);
    return false;
  }
}

function showSlides() {
  const slides = readSlides();
  console.log('\n========================================');
  console.log('       FLYMINO HERO SLIDER SLIDES       ');
  console.log('========================================\n');

  if (slides.length === 0) {
    console.log('No slides found.');
    return;
  }

  slides.forEach((slide, i) => {
    console.log(`[Slide #${i + 1}] ID: ${slide.id}`);
    console.log(`  Badge:       ${slide.badge}`);
    console.log(`  Title:       ${slide.titlePrefix}[${slide.highlight}]${slide.titleSuffix}`);
    console.log(`  Description: ${slide.desc.substring(0, 75)}${slide.desc.length > 75 ? '...' : ''}`);
    console.log(`  Image:       ${slide.image}`);
    console.log(`  Primary CTA: ${slide.primaryCta}`);
    console.log(`  Secondary:   ${slide.secondaryCta} -> ${slide.secondaryLink}`);
    console.log(`  Service ID:  ${slide.serviceId}`);
    console.log(`  Highlights:  ${(slide.highlights || []).join(' | ')}`);
    console.log('----------------------------------------');
  });
  console.log(`Total active slides: ${slides.length}\n`);
}

async function addSlide() {
  const slides = readSlides();
  console.log('\n--- Add New Slide ---');
  const id = (await ask('Slide ID (e.g. air-freight): ')).trim() || `slide-${Date.now()}`;
  const badge = (await ask('Badge text (e.g. Express Air Cargo): ')).trim() || 'Express Logistics';
  const titlePrefix = (await ask('Title prefix (e.g. Fast & secure ): ')).trim() || 'Fast & secure ';
  const highlight = (await ask('Highlight text (e.g. global air freight): ')).trim() || 'global logistics';
  const titleSuffix = (await ask('Title suffix (default .): ')).trim() || '.';
  const desc = (await ask('Description: ')).trim() || 'Worldwide logistics and express freight forwarding.';
  const image = (await ask('Image path (e.g. /assets/sea cargo.jpg): ')).trim() || '/assets/slide-marine.jpg';
  const primaryCta = (await ask('Primary CTA (default: Get fare rate): ')).trim() || 'Get fare rate';
  const secondaryCta = (await ask('Secondary CTA (default: Explore services): ')).trim() || 'Explore services';
  const secondaryLink = (await ask('Secondary link (default: /services): ')).trim() || '/services';
  const serviceId = (await ask('Service ID (e.g. ship-spares / international-courier): ')).trim() || 'international-courier';
  const rawHighlights = await ask('Highlights (comma separated): ');
  const highlights = rawHighlights ? rawHighlights.split(',').map(s => s.trim()).filter(Boolean) : ['24/7 Port Delivery', 'Global Network'];

  const newSlide = {
    id,
    badge,
    titlePrefix,
    highlight,
    titleSuffix,
    desc,
    image,
    primaryCta,
    secondaryCta,
    secondaryLink,
    serviceId,
    featureBadge: 'Priority Desk',
    featureTitle: badge,
    featureDesc: desc,
    highlights,
    isActive: true,
    design: {
      gradientStart: '#003d63',
      gradientEnd: '#00243d',
      accentColor: '#E8291F',
      overlayOpacity: '90%',
      badgeBackground: 'bg-brand-red-50 text-brand-red border-brand-red-200',
      showFeatureCard: true
    }
  };

  slides.push(newSlide);
  if (writeSlides(slides)) {
    console.log('\n Slide added successfully!');
  }
}

async function removeSlide() {
  const slides = readSlides();
  showSlides();
  const indexStr = await ask(`Enter slide number to delete (1-${slides.length}): `);
  const idx = parseInt(indexStr.trim(), 10) - 1;

  if (idx >= 0 && idx < slides.length) {
    const [removed] = slides.splice(idx, 1);
    if (writeSlides(slides)) {
      console.log(`\n Removed slide [${removed.id} - ${removed.badge}] successfully!`);
    }
  } else {
    console.log('\n Invalid slide number.');
  }
}

async function menu() {
  while (true) {
    console.log('=== Flymingo Hero Slider CLI ===');
    console.log('1. View all slides');
    console.log('2. Add new slide');
    console.log('3. Delete slide');
    console.log('4. Exit');
    const choice = (await ask('Select option (1-4): ')).trim();

    if (choice === '1') {
      showSlides();
    } else if (choice === '2') {
      await addSlide();
    } else if (choice === '3') {
      await removeSlide();
    } else if (choice === '4' || choice.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      process.exit(0);
    } else {
      console.log('Invalid option, please choose 1, 2, 3, or 4.');
    }
    console.log('');
  }
}

menu().catch((err) => {
  console.error('Fatal CLI error:', err);
  rl.close();
});