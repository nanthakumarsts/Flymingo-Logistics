import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Plane, Anchor, AlertTriangle, Truck, ShieldCheck,
  ArrowRight, Calculator, Check, Quote,
  Boxes, FileText, Coffee, Luggage, HeartPulse, Flame,
  Ship, Radio, Utensils, Atom, Activity, Car,
  ArrowUpRight, Globe, Clock, ChevronLeft, ChevronRight
} from 'lucide-react';
import {
  BRAND, STATS, CORE_SERVICES, SIX_WAYS_CARGO,
  SPECIALIZED_EXPRESS, INDUSTRIES_SERVED, TESTIMONIALS
} from '../data/siteData';

/* Background photos. Swap any URL for your own file, e.g. '/images/process-bg.jpg' in /public.
   If an image fails to load, the section falls back to the brand-blue gradient behind it. */
const IMG = {
  hero: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=70',
  process: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=70',
  industries: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=70',
};

/* Hero banner slider items - structured with minimal text for future CMS / admin integration */
const HERO_SLIDES = [
  {
    id: 'marine-logistics',
    badge: 'Marine Logistics & Port Operations',
    titlePrefix: 'Six ways we get your cargo from ',
    highlight: 'origin to destination',
    titleSuffix: '.',
    desc: 'From ship spares delivered on board at global anchorages to overseas courier, personal relocation and certified DG air cargo.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=70',
    primaryCta: 'Get fare rate',
    secondaryCta: 'Explore services',
    secondaryLink: '/services',
    serviceId: 'ship-spares',
    featureBadge: 'Priority Marine Desk',
    featureTitle: 'Ship Spares Logistics',
    featureDesc: 'Port deck & outer anchorage delivery with onboard hand-over and round-the-clock clearance.',
    highlights: ['24/7 Port deck delivery', 'IATA / IMO certified DG', 'Zero-demurrage focus'],
  },
  {
    id: 'worldwide-courier',
    badge: 'Express Global Network',
    titlePrefix: 'Rapid door-to-door ',
    highlight: 'worldwide express courier',
    titleSuffix: ' delivery.',
    desc: 'Connecting 190+ countries with priority doorstep delivery for commercial samples, urgent documents, and specialized parcels.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=70',
    primaryCta: 'Calculate fare rate',
    secondaryCta: 'View courier options',
    secondaryLink: '/services',
    serviceId: 'international-courier',
    featureBadge: 'Global Express Dispatch',
    featureTitle: 'Worldwide Express Courier',
    featureDesc: 'Fastest door-to-door transit times to USA, UK, Europe, Middle East, Singapore & worldwide.',
    highlights: ['190+ Global destinations', 'Live end-to-end GPS tracking', 'Express customs clearance'],
  },
  {
    id: 'customs-brokerage',
    badge: 'Multimodal Freight & Brokerage',
    titlePrefix: 'Seamless ocean & air ',
    highlight: 'freight forwarding & customs',
    titleSuffix: ' clearance.',
    desc: 'Dedicated seaport and airport customs clearance with direct EDI filing, warehousing, and intermodal transport across all major corridors.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=70',
    primaryCta: 'Request freight quote',
    secondaryCta: 'Explore all solutions',
    secondaryLink: '/services',
    serviceId: 'customs-clearance',
    featureBadge: 'Licensed Customs House',
    featureTitle: 'Direct Seaport & Airport EDI',
    featureDesc: 'Zero-delay documentation and automated filing across all major Indian ports.',
    highlights: ['Licensed Customs Brokers', 'Air & ocean freight options', 'Dedicated 24/7 support desk'],
  },
];

/* Built-in illustrated backgrounds (brand colours). They always render, even offline;
   the photo from IMG is drawn on top when it loads. */
const svgBg = (svg) => `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
const SCENE = {
  ship: svgBg("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1600 900\" preserveAspectRatio=\"xMidYMid slice\"><defs><linearGradient id=\"s\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#00243d\"/><stop offset=\".6\" stop-color=\"#005687\"/><stop offset=\"1\" stop-color=\"#0b7bb5\"/></linearGradient><linearGradient id=\"w\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#0a5f90\"/><stop offset=\"1\" stop-color=\"#00243d\"/></linearGradient></defs><rect width=\"1600\" height=\"900\" fill=\"url(#s)\"/><circle cx=\"1180\" cy=\"520\" r=\"210\" fill=\"#E8291F\" opacity=\".22\"/><circle cx=\"1180\" cy=\"520\" r=\"110\" fill=\"#E8291F\" opacity=\".3\"/><rect y=\"620\" width=\"1600\" height=\"280\" fill=\"url(#w)\"/><path d=\"M0 634.0 Q200 626.0 400 634.0 T800 634.0 T1200 634.0 T1600 634.0\" stroke=\"#fff\" stroke-opacity=\"0.160\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 635.6 Q200 627.6 400 635.6 T800 635.6 T1200 635.6 T1600 635.6\" stroke=\"#fff\" stroke-opacity=\"0.151\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 640.4 Q200 632.4 400 640.4 T800 640.4 T1200 640.4 T1600 640.4\" stroke=\"#fff\" stroke-opacity=\"0.142\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 648.4 Q200 640.4 400 648.4 T800 648.4 T1200 648.4 T1600 648.4\" stroke=\"#fff\" stroke-opacity=\"0.133\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 659.6 Q200 651.6 400 659.6 T800 659.6 T1200 659.6 T1600 659.6\" stroke=\"#fff\" stroke-opacity=\"0.124\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 674.0 Q200 666.0 400 674.0 T800 674.0 T1200 674.0 T1600 674.0\" stroke=\"#fff\" stroke-opacity=\"0.115\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 691.6 Q200 683.6 400 691.6 T800 691.6 T1200 691.6 T1600 691.6\" stroke=\"#fff\" stroke-opacity=\"0.106\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 712.4 Q200 704.4 400 712.4 T800 712.4 T1200 712.4 T1600 712.4\" stroke=\"#fff\" stroke-opacity=\"0.097\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 736.4 Q200 728.4 400 736.4 T800 736.4 T1200 736.4 T1600 736.4\" stroke=\"#fff\" stroke-opacity=\"0.088\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 763.6 Q200 755.6 400 763.6 T800 763.6 T1200 763.6 T1600 763.6\" stroke=\"#fff\" stroke-opacity=\"0.079\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 794.0 Q200 786.0 400 794.0 T800 794.0 T1200 794.0 T1600 794.0\" stroke=\"#fff\" stroke-opacity=\"0.070\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 827.6 Q200 819.6 400 827.6 T800 827.6 T1200 827.6 T1600 827.6\" stroke=\"#fff\" stroke-opacity=\"0.061\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 864.4 Q200 856.4 400 864.4 T800 864.4 T1200 864.4 T1600 864.4\" stroke=\"#fff\" stroke-opacity=\"0.052\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 904.4000000000001 Q200 896.4000000000001 400 904.4000000000001 T800 904.4000000000001 T1200 904.4000000000001 T1600 904.4000000000001\" stroke=\"#fff\" stroke-opacity=\"0.043\" fill=\"none\" stroke-width=\"2\"/><path d=\"M260 560 H1340 L1290 650 H330 Z\" fill=\"#06182a\"/><path d=\"M285 590 H1320 L1308 612 H300 Z\" fill=\"#E8291F\"/><rect x=\"330\" y=\"522\" width=\"58\" height=\"36\" fill=\"#1b86bf\"/><path d=\"M344 525v30M359 525v30M374 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"392\" y=\"522\" width=\"58\" height=\"36\" fill=\"#ffffff\"/><path d=\"M406 525v30M421 525v30M436 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"454\" y=\"522\" width=\"58\" height=\"36\" fill=\"#c9d6df\"/><path d=\"M468 525v30M483 525v30M498 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"516\" y=\"522\" width=\"58\" height=\"36\" fill=\"#0a6aa3\"/><path d=\"M530 525v30M545 525v30M560 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"578\" y=\"522\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M592 525v30M607 525v30M622 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"640\" y=\"522\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M654 525v30M669 525v30M684 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"702\" y=\"522\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M716 525v30M731 525v30M746 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"764\" y=\"522\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M778 525v30M793 525v30M808 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"826\" y=\"522\" width=\"58\" height=\"36\" fill=\"#1b86bf\"/><path d=\"M840 525v30M855 525v30M870 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"888\" y=\"522\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M902 525v30M917 525v30M932 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"950\" y=\"522\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M964 525v30M979 525v30M994 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1012\" y=\"522\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M1026 525v30M1041 525v30M1056 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1074\" y=\"522\" width=\"58\" height=\"36\" fill=\"#ffffff\"/><path d=\"M1088 525v30M1103 525v30M1118 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1136\" y=\"522\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M1150 525v30M1165 525v30M1180 525v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"330\" y=\"484\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M344 487v30M359 487v30M374 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"392\" y=\"484\" width=\"58\" height=\"36\" fill=\"#c9d6df\"/><path d=\"M406 487v30M421 487v30M436 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"454\" y=\"484\" width=\"58\" height=\"36\" fill=\"#c9d6df\"/><path d=\"M468 487v30M483 487v30M498 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"516\" y=\"484\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M530 487v30M545 487v30M560 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"578\" y=\"484\" width=\"58\" height=\"36\" fill=\"#ffffff\"/><path d=\"M592 487v30M607 487v30M622 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"640\" y=\"484\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M654 487v30M669 487v30M684 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"702\" y=\"484\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M716 487v30M731 487v30M746 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"764\" y=\"484\" width=\"58\" height=\"36\" fill=\"#c9d6df\"/><path d=\"M778 487v30M793 487v30M808 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"826\" y=\"484\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M840 487v30M855 487v30M870 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"888\" y=\"484\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M902 487v30M917 487v30M932 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"950\" y=\"484\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M964 487v30M979 487v30M994 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1012\" y=\"484\" width=\"58\" height=\"36\" fill=\"#ffffff\"/><path d=\"M1026 487v30M1041 487v30M1056 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1074\" y=\"484\" width=\"58\" height=\"36\" fill=\"#0a6aa3\"/><path d=\"M1088 487v30M1103 487v30M1118 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1136\" y=\"484\" width=\"58\" height=\"36\" fill=\"#0a6aa3\"/><path d=\"M1150 487v30M1165 487v30M1180 487v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"330\" y=\"446\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M344 449v30M359 449v30M374 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"392\" y=\"446\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M406 449v30M421 449v30M436 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"454\" y=\"446\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M468 449v30M483 449v30M498 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"516\" y=\"446\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M530 449v30M545 449v30M560 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"578\" y=\"446\" width=\"58\" height=\"36\" fill=\"#c9d6df\"/><path d=\"M592 449v30M607 449v30M622 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"640\" y=\"446\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M654 449v30M669 449v30M684 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"702\" y=\"446\" width=\"58\" height=\"36\" fill=\"#ffffff\"/><path d=\"M716 449v30M731 449v30M746 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"764\" y=\"446\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M778 449v30M793 449v30M808 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"826\" y=\"446\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M840 449v30M855 449v30M870 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"888\" y=\"446\" width=\"58\" height=\"36\" fill=\"#ffffff\"/><path d=\"M902 449v30M917 449v30M932 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"950\" y=\"446\" width=\"58\" height=\"36\" fill=\"#1b86bf\"/><path d=\"M964 449v30M979 449v30M994 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1012\" y=\"446\" width=\"58\" height=\"36\" fill=\"#c9d6df\"/><path d=\"M1026 449v30M1041 449v30M1056 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1074\" y=\"446\" width=\"58\" height=\"36\" fill=\"#ffffff\"/><path d=\"M1088 449v30M1103 449v30M1118 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1136\" y=\"446\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M1150 449v30M1165 449v30M1180 449v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"330\" y=\"408\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M344 411v30M359 411v30M374 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"392\" y=\"408\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M406 411v30M421 411v30M436 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"454\" y=\"408\" width=\"58\" height=\"36\" fill=\"#1b86bf\"/><path d=\"M468 411v30M483 411v30M498 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"516\" y=\"408\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M530 411v30M545 411v30M560 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"578\" y=\"408\" width=\"58\" height=\"36\" fill=\"#0a6aa3\"/><path d=\"M592 411v30M607 411v30M622 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"640\" y=\"408\" width=\"58\" height=\"36\" fill=\"#ffffff\"/><path d=\"M654 411v30M669 411v30M684 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"702\" y=\"408\" width=\"58\" height=\"36\" fill=\"#E8291F\"/><path d=\"M716 411v30M731 411v30M746 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"764\" y=\"408\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M778 411v30M793 411v30M808 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"826\" y=\"408\" width=\"58\" height=\"36\" fill=\"#b3170f\"/><path d=\"M840 411v30M855 411v30M870 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"888\" y=\"408\" width=\"58\" height=\"36\" fill=\"#0a6aa3\"/><path d=\"M902 411v30M917 411v30M932 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"950\" y=\"408\" width=\"58\" height=\"36\" fill=\"#ffffff\"/><path d=\"M964 411v30M979 411v30M994 411v30\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1210\" y=\"420\" width=\"90\" height=\"140\" fill=\"#e9eef2\"/><rect x=\"1195\" y=\"400\" width=\"120\" height=\"30\" fill=\"#fff\"/><rect x=\"1220\" y=\"440\" width=\"14\" height=\"14\" fill=\"#003D63\"/><rect x=\"1242\" y=\"440\" width=\"14\" height=\"14\" fill=\"#003D63\"/><rect x=\"1264\" y=\"440\" width=\"14\" height=\"14\" fill=\"#003D63\"/><rect x=\"1286\" y=\"440\" width=\"14\" height=\"14\" fill=\"#003D63\"/><rect x=\"1250\" y=\"360\" width=\"8\" height=\"44\" fill=\"#fff\"/><path d=\"M0 760 Q400 700 800 770 T1600 740\" stroke=\"#E8291F\" stroke-width=\"4\" fill=\"none\" opacity=\".55\"/></svg>"),
  stacks: svgBg("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1600 900\" preserveAspectRatio=\"xMidYMid slice\"><defs><linearGradient id=\"s\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#00243d\"/><stop offset=\".6\" stop-color=\"#003D63\"/><stop offset=\"1\" stop-color=\"#0a6aa3\"/></linearGradient><linearGradient id=\"w\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#0a5f90\"/><stop offset=\"1\" stop-color=\"#00243d\"/></linearGradient></defs><rect width=\"1600\" height=\"900\" fill=\"url(#s)\"/><circle cx=\"1180\" cy=\"520\" r=\"210\" fill=\"#E8291F\" opacity=\".22\"/><circle cx=\"1180\" cy=\"520\" r=\"110\" fill=\"#E8291F\" opacity=\".3\"/><path d=\"M-40 300 H260 V316 H-40 Z M-20 316 V560 M240 316 V560\" stroke=\"#06182a\" stroke-width=\"12\" fill=\"none\" opacity=\".75\"/><path d=\"M380 300 H680 V316 H380 Z M400 316 V560 M660 316 V560\" stroke=\"#06182a\" stroke-width=\"12\" fill=\"none\" opacity=\".75\"/><path d=\"M800 300 H1100 V316 H800 Z M820 316 V560 M1080 316 V560\" stroke=\"#06182a\" stroke-width=\"12\" fill=\"none\" opacity=\".75\"/><path d=\"M1220 300 H1520 V316 H1220 Z M1240 316 V560 M1500 316 V560\" stroke=\"#06182a\" stroke-width=\"12\" fill=\"none\" opacity=\".75\"/><rect y=\"640\" width=\"1600\" height=\"260\" fill=\"#06182a\" opacity=\".85\"/><rect x=\"-20\" y=\"560\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M-2 563v32M15 563v32M32 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"56\" y=\"560\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M74 563v32M91 563v32M108 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"208\" y=\"560\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M226 563v32M243 563v32M260 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"284\" y=\"560\" width=\"70\" height=\"38\" fill=\"#1b86bf\"/><path d=\"M302 563v32M319 563v32M336 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"360\" y=\"560\" width=\"70\" height=\"38\" fill=\"#c9d6df\"/><path d=\"M378 563v32M395 563v32M412 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"436\" y=\"560\" width=\"70\" height=\"38\" fill=\"#ffffff\"/><path d=\"M454 563v32M471 563v32M488 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"512\" y=\"560\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M530 563v32M547 563v32M564 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"588\" y=\"560\" width=\"70\" height=\"38\" fill=\"#E8291F\"/><path d=\"M606 563v32M623 563v32M640 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"664\" y=\"560\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M682 563v32M699 563v32M716 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"740\" y=\"560\" width=\"70\" height=\"38\" fill=\"#1b86bf\"/><path d=\"M758 563v32M775 563v32M792 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"816\" y=\"560\" width=\"70\" height=\"38\" fill=\"#1b86bf\"/><path d=\"M834 563v32M851 563v32M868 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"892\" y=\"560\" width=\"70\" height=\"38\" fill=\"#E8291F\"/><path d=\"M910 563v32M927 563v32M944 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1044\" y=\"560\" width=\"70\" height=\"38\" fill=\"#1b86bf\"/><path d=\"M1062 563v32M1079 563v32M1096 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1120\" y=\"560\" width=\"70\" height=\"38\" fill=\"#c9d6df\"/><path d=\"M1138 563v32M1155 563v32M1172 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1196\" y=\"560\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M1214 563v32M1231 563v32M1248 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1348\" y=\"560\" width=\"70\" height=\"38\" fill=\"#1b86bf\"/><path d=\"M1366 563v32M1383 563v32M1400 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1424\" y=\"560\" width=\"70\" height=\"38\" fill=\"#1b86bf\"/><path d=\"M1442 563v32M1459 563v32M1476 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1500\" y=\"560\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M1518 563v32M1535 563v32M1552 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1576\" y=\"560\" width=\"70\" height=\"38\" fill=\"#E8291F\"/><path d=\"M1594 563v32M1611 563v32M1628 563v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"10\" y=\"520\" width=\"70\" height=\"38\" fill=\"#1b86bf\"/><path d=\"M28 523v32M45 523v32M62 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"86\" y=\"520\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M104 523v32M121 523v32M138 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"238\" y=\"520\" width=\"70\" height=\"38\" fill=\"#1b86bf\"/><path d=\"M256 523v32M273 523v32M290 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"314\" y=\"520\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M332 523v32M349 523v32M366 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"390\" y=\"520\" width=\"70\" height=\"38\" fill=\"#1b86bf\"/><path d=\"M408 523v32M425 523v32M442 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"466\" y=\"520\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M484 523v32M501 523v32M518 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"542\" y=\"520\" width=\"70\" height=\"38\" fill=\"#c9d6df\"/><path d=\"M560 523v32M577 523v32M594 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"618\" y=\"520\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M636 523v32M653 523v32M670 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"846\" y=\"520\" width=\"70\" height=\"38\" fill=\"#ffffff\"/><path d=\"M864 523v32M881 523v32M898 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"922\" y=\"520\" width=\"70\" height=\"38\" fill=\"#c9d6df\"/><path d=\"M940 523v32M957 523v32M974 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"998\" y=\"520\" width=\"70\" height=\"38\" fill=\"#c9d6df\"/><path d=\"M1016 523v32M1033 523v32M1050 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1150\" y=\"520\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M1168 523v32M1185 523v32M1202 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1226\" y=\"520\" width=\"70\" height=\"38\" fill=\"#ffffff\"/><path d=\"M1244 523v32M1261 523v32M1278 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1302\" y=\"520\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M1320 523v32M1337 523v32M1354 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1378\" y=\"520\" width=\"70\" height=\"38\" fill=\"#c9d6df\"/><path d=\"M1396 523v32M1413 523v32M1430 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1454\" y=\"520\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M1472 523v32M1489 523v32M1506 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1530\" y=\"520\" width=\"70\" height=\"38\" fill=\"#ffffff\"/><path d=\"M1548 523v32M1565 523v32M1582 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1606\" y=\"520\" width=\"70\" height=\"38\" fill=\"#ffffff\"/><path d=\"M1624 523v32M1641 523v32M1658 523v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"-20\" y=\"480\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M-2 483v32M15 483v32M32 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"56\" y=\"480\" width=\"70\" height=\"38\" fill=\"#c9d6df\"/><path d=\"M74 483v32M91 483v32M108 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"132\" y=\"480\" width=\"70\" height=\"38\" fill=\"#ffffff\"/><path d=\"M150 483v32M167 483v32M184 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"208\" y=\"480\" width=\"70\" height=\"38\" fill=\"#E8291F\"/><path d=\"M226 483v32M243 483v32M260 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"284\" y=\"480\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M302 483v32M319 483v32M336 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"360\" y=\"480\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M378 483v32M395 483v32M412 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"436\" y=\"480\" width=\"70\" height=\"38\" fill=\"#ffffff\"/><path d=\"M454 483v32M471 483v32M488 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"512\" y=\"480\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M530 483v32M547 483v32M564 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"588\" y=\"480\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M606 483v32M623 483v32M640 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"664\" y=\"480\" width=\"70\" height=\"38\" fill=\"#E8291F\"/><path d=\"M682 483v32M699 483v32M716 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"740\" y=\"480\" width=\"70\" height=\"38\" fill=\"#0a6aa3\"/><path d=\"M758 483v32M775 483v32M792 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"816\" y=\"480\" width=\"70\" height=\"38\" fill=\"#c9d6df\"/><path d=\"M834 483v32M851 483v32M868 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"892\" y=\"480\" width=\"70\" height=\"38\" fill=\"#c9d6df\"/><path d=\"M910 483v32M927 483v32M944 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1044\" y=\"480\" width=\"70\" height=\"38\" fill=\"#E8291F\"/><path d=\"M1062 483v32M1079 483v32M1096 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1120\" y=\"480\" width=\"70\" height=\"38\" fill=\"#ffffff\"/><path d=\"M1138 483v32M1155 483v32M1172 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1196\" y=\"480\" width=\"70\" height=\"38\" fill=\"#E8291F\"/><path d=\"M1214 483v32M1231 483v32M1248 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1272\" y=\"480\" width=\"70\" height=\"38\" fill=\"#E8291F\"/><path d=\"M1290 483v32M1307 483v32M1324 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1424\" y=\"480\" width=\"70\" height=\"38\" fill=\"#b3170f\"/><path d=\"M1442 483v32M1459 483v32M1476 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1576\" y=\"480\" width=\"70\" height=\"38\" fill=\"#E8291F\"/><path d=\"M1594 483v32M1611 483v32M1628 483v32\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"-20\" y=\"700\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M-4 703v50M13 703v50M30 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"50\" y=\"700\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M66 703v50M83 703v50M100 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"120\" y=\"700\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M136 703v50M153 703v50M170 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"190\" y=\"700\" width=\"66\" height=\"56\" fill=\"#1b86bf\"/><path d=\"M206 703v50M223 703v50M240 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"260\" y=\"700\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M276 703v50M293 703v50M310 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"330\" y=\"700\" width=\"66\" height=\"56\" fill=\"#1b86bf\"/><path d=\"M346 703v50M363 703v50M380 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"400\" y=\"700\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M416 703v50M433 703v50M450 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"470\" y=\"700\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M486 703v50M503 703v50M520 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"540\" y=\"700\" width=\"66\" height=\"56\" fill=\"#b3170f\"/><path d=\"M556 703v50M573 703v50M590 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"610\" y=\"700\" width=\"66\" height=\"56\" fill=\"#1b86bf\"/><path d=\"M626 703v50M643 703v50M660 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"680\" y=\"700\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M696 703v50M713 703v50M730 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"750\" y=\"700\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M766 703v50M783 703v50M800 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"820\" y=\"700\" width=\"66\" height=\"56\" fill=\"#1b86bf\"/><path d=\"M836 703v50M853 703v50M870 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"890\" y=\"700\" width=\"66\" height=\"56\" fill=\"#1b86bf\"/><path d=\"M906 703v50M923 703v50M940 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"960\" y=\"700\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M976 703v50M993 703v50M1010 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1030\" y=\"700\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M1046 703v50M1063 703v50M1080 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1100\" y=\"700\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M1116 703v50M1133 703v50M1150 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1170\" y=\"700\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M1186 703v50M1203 703v50M1220 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1240\" y=\"700\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M1256 703v50M1273 703v50M1290 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1310\" y=\"700\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M1326 703v50M1343 703v50M1360 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1380\" y=\"700\" width=\"66\" height=\"56\" fill=\"#1b86bf\"/><path d=\"M1396 703v50M1413 703v50M1430 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1450\" y=\"700\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M1466 703v50M1483 703v50M1500 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1520\" y=\"700\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M1536 703v50M1553 703v50M1570 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1590\" y=\"700\" width=\"66\" height=\"56\" fill=\"#b3170f\"/><path d=\"M1606 703v50M1623 703v50M1640 703v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"-20\" y=\"760\" width=\"66\" height=\"56\" fill=\"#b3170f\"/><path d=\"M-4 763v50M13 763v50M30 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"50\" y=\"760\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M66 763v50M83 763v50M100 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"120\" y=\"760\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M136 763v50M153 763v50M170 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"190\" y=\"760\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M206 763v50M223 763v50M240 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"260\" y=\"760\" width=\"66\" height=\"56\" fill=\"#1b86bf\"/><path d=\"M276 763v50M293 763v50M310 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"330\" y=\"760\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M346 763v50M363 763v50M380 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"400\" y=\"760\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M416 763v50M433 763v50M450 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"470\" y=\"760\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M486 763v50M503 763v50M520 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"540\" y=\"760\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M556 763v50M573 763v50M590 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"610\" y=\"760\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M626 763v50M643 763v50M660 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"680\" y=\"760\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M696 763v50M713 763v50M730 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"750\" y=\"760\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M766 763v50M783 763v50M800 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"820\" y=\"760\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M836 763v50M853 763v50M870 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"890\" y=\"760\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M906 763v50M923 763v50M940 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"960\" y=\"760\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M976 763v50M993 763v50M1010 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1030\" y=\"760\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M1046 763v50M1063 763v50M1080 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1100\" y=\"760\" width=\"66\" height=\"56\" fill=\"#1b86bf\"/><path d=\"M1116 763v50M1133 763v50M1150 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1170\" y=\"760\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M1186 763v50M1203 763v50M1220 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1240\" y=\"760\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M1256 763v50M1273 763v50M1290 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1310\" y=\"760\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M1326 763v50M1343 763v50M1360 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1380\" y=\"760\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M1396 763v50M1413 763v50M1430 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1450\" y=\"760\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M1466 763v50M1483 763v50M1500 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1520\" y=\"760\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M1536 763v50M1553 763v50M1570 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1590\" y=\"760\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M1606 763v50M1623 763v50M1640 763v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"-20\" y=\"820\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M-4 823v50M13 823v50M30 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"50\" y=\"820\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M66 823v50M83 823v50M100 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"120\" y=\"820\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M136 823v50M153 823v50M170 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"190\" y=\"820\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M206 823v50M223 823v50M240 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"260\" y=\"820\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M276 823v50M293 823v50M310 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"330\" y=\"820\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M346 823v50M363 823v50M380 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"400\" y=\"820\" width=\"66\" height=\"56\" fill=\"#b3170f\"/><path d=\"M416 823v50M433 823v50M450 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"470\" y=\"820\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M486 823v50M503 823v50M520 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"540\" y=\"820\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M556 823v50M573 823v50M590 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"610\" y=\"820\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M626 823v50M643 823v50M660 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"680\" y=\"820\" width=\"66\" height=\"56\" fill=\"#b3170f\"/><path d=\"M696 823v50M713 823v50M730 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"750\" y=\"820\" width=\"66\" height=\"56\" fill=\"#b3170f\"/><path d=\"M766 823v50M783 823v50M800 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"820\" y=\"820\" width=\"66\" height=\"56\" fill=\"#c9d6df\"/><path d=\"M836 823v50M853 823v50M870 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"890\" y=\"820\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M906 823v50M923 823v50M940 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"960\" y=\"820\" width=\"66\" height=\"56\" fill=\"#1b86bf\"/><path d=\"M976 823v50M993 823v50M1010 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1030\" y=\"820\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M1046 823v50M1063 823v50M1080 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1100\" y=\"820\" width=\"66\" height=\"56\" fill=\"#b3170f\"/><path d=\"M1116 823v50M1133 823v50M1150 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1170\" y=\"820\" width=\"66\" height=\"56\" fill=\"#b3170f\"/><path d=\"M1186 823v50M1203 823v50M1220 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1240\" y=\"820\" width=\"66\" height=\"56\" fill=\"#ffffff\"/><path d=\"M1256 823v50M1273 823v50M1290 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1310\" y=\"820\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M1326 823v50M1343 823v50M1360 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1380\" y=\"820\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M1396 823v50M1413 823v50M1430 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1450\" y=\"820\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M1466 823v50M1483 823v50M1500 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1520\" y=\"820\" width=\"66\" height=\"56\" fill=\"#0a6aa3\"/><path d=\"M1536 823v50M1553 823v50M1570 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1590\" y=\"820\" width=\"66\" height=\"56\" fill=\"#E8291F\"/><path d=\"M1606 823v50M1623 823v50M1640 823v50\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><path d=\"M0 690 H1600\" stroke=\"#E8291F\" stroke-width=\"5\" opacity=\".7\"/></svg>"),
  port: svgBg("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1600 900\" preserveAspectRatio=\"xMidYMid slice\"><defs><linearGradient id=\"s\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#001a2d\"/><stop offset=\".6\" stop-color=\"#003D63\"/><stop offset=\"1\" stop-color=\"#0b7bb5\"/></linearGradient><linearGradient id=\"w\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#0a5f90\"/><stop offset=\"1\" stop-color=\"#00243d\"/></linearGradient></defs><rect width=\"1600\" height=\"900\" fill=\"url(#s)\"/><circle cx=\"1180\" cy=\"520\" r=\"210\" fill=\"#E8291F\" opacity=\".22\"/><circle cx=\"1180\" cy=\"520\" r=\"110\" fill=\"#E8291F\" opacity=\".3\"/><rect y=\"640\" width=\"1600\" height=\"260\" fill=\"url(#w)\"/><path d=\"M0 654.0 Q200 646.0 400 654.0 T800 654.0 T1200 654.0 T1600 654.0\" stroke=\"#fff\" stroke-opacity=\"0.160\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 655.6 Q200 647.6 400 655.6 T800 655.6 T1200 655.6 T1600 655.6\" stroke=\"#fff\" stroke-opacity=\"0.151\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 660.4 Q200 652.4 400 660.4 T800 660.4 T1200 660.4 T1600 660.4\" stroke=\"#fff\" stroke-opacity=\"0.142\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 668.4 Q200 660.4 400 668.4 T800 668.4 T1200 668.4 T1600 668.4\" stroke=\"#fff\" stroke-opacity=\"0.133\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 679.6 Q200 671.6 400 679.6 T800 679.6 T1200 679.6 T1600 679.6\" stroke=\"#fff\" stroke-opacity=\"0.124\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 694.0 Q200 686.0 400 694.0 T800 694.0 T1200 694.0 T1600 694.0\" stroke=\"#fff\" stroke-opacity=\"0.115\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 711.6 Q200 703.6 400 711.6 T800 711.6 T1200 711.6 T1600 711.6\" stroke=\"#fff\" stroke-opacity=\"0.106\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 732.4 Q200 724.4 400 732.4 T800 732.4 T1200 732.4 T1600 732.4\" stroke=\"#fff\" stroke-opacity=\"0.097\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 756.4 Q200 748.4 400 756.4 T800 756.4 T1200 756.4 T1600 756.4\" stroke=\"#fff\" stroke-opacity=\"0.088\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 783.6 Q200 775.6 400 783.6 T800 783.6 T1200 783.6 T1600 783.6\" stroke=\"#fff\" stroke-opacity=\"0.079\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 814.0 Q200 806.0 400 814.0 T800 814.0 T1200 814.0 T1600 814.0\" stroke=\"#fff\" stroke-opacity=\"0.070\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 847.6 Q200 839.6 400 847.6 T800 847.6 T1200 847.6 T1600 847.6\" stroke=\"#fff\" stroke-opacity=\"0.061\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 884.4 Q200 876.4 400 884.4 T800 884.4 T1200 884.4 T1600 884.4\" stroke=\"#fff\" stroke-opacity=\"0.052\" fill=\"none\" stroke-width=\"2\"/><path d=\"M0 924.4000000000001 Q200 916.4000000000001 400 924.4000000000001 T800 924.4000000000001 T1200 924.4000000000001 T1600 924.4000000000001\" stroke=\"#fff\" stroke-opacity=\"0.043\" fill=\"none\" stroke-width=\"2\"/><g stroke=\"#06182a\" stroke-width=\"10\" fill=\"none\"><path d=\"M260 640 L290 300 M370 640 L340 300 M290 300 H340 M80 300 H590 M560 300 V380\"/></g><rect x=\"252\" y=\"290\" width=\"120\" height=\"26\" fill=\"#E8291F\"/><path d=\"M560 380 v60\" stroke=\"#06182a\" stroke-width=\"5\"/><g stroke=\"#06182a\" stroke-width=\"10\" fill=\"none\"><path d=\"M760 640 L790 300 M870 640 L840 300 M790 300 H840 M580 300 H1090 M1060 300 V380\"/></g><rect x=\"752\" y=\"290\" width=\"120\" height=\"26\" fill=\"#E8291F\"/><path d=\"M1060 380 v60\" stroke=\"#06182a\" stroke-width=\"5\"/><g stroke=\"#06182a\" stroke-width=\"10\" fill=\"none\"><path d=\"M1260 640 L1290 300 M1370 640 L1340 300 M1290 300 H1340 M1080 300 H1590 M1560 300 V380\"/></g><rect x=\"1252\" y=\"290\" width=\"120\" height=\"26\" fill=\"#E8291F\"/><path d=\"M1560 380 v60\" stroke=\"#06182a\" stroke-width=\"5\"/><rect x=\"-10\" y=\"590\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M12 593v44M33 593v44M54 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"80\" y=\"590\" width=\"86\" height=\"50\" fill=\"#0a6aa3\"/><path d=\"M102 593v44M123 593v44M144 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"170\" y=\"590\" width=\"86\" height=\"50\" fill=\"#ffffff\"/><path d=\"M192 593v44M213 593v44M234 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"260\" y=\"590\" width=\"86\" height=\"50\" fill=\"#c9d6df\"/><path d=\"M282 593v44M303 593v44M324 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"350\" y=\"590\" width=\"86\" height=\"50\" fill=\"#ffffff\"/><path d=\"M372 593v44M393 593v44M414 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"440\" y=\"590\" width=\"86\" height=\"50\" fill=\"#ffffff\"/><path d=\"M462 593v44M483 593v44M504 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"530\" y=\"590\" width=\"86\" height=\"50\" fill=\"#E8291F\"/><path d=\"M552 593v44M573 593v44M594 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"620\" y=\"590\" width=\"86\" height=\"50\" fill=\"#1b86bf\"/><path d=\"M642 593v44M663 593v44M684 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"710\" y=\"590\" width=\"86\" height=\"50\" fill=\"#ffffff\"/><path d=\"M732 593v44M753 593v44M774 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"800\" y=\"590\" width=\"86\" height=\"50\" fill=\"#1b86bf\"/><path d=\"M822 593v44M843 593v44M864 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"890\" y=\"590\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M912 593v44M933 593v44M954 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"980\" y=\"590\" width=\"86\" height=\"50\" fill=\"#ffffff\"/><path d=\"M1002 593v44M1023 593v44M1044 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1070\" y=\"590\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M1092 593v44M1113 593v44M1134 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1160\" y=\"590\" width=\"86\" height=\"50\" fill=\"#1b86bf\"/><path d=\"M1182 593v44M1203 593v44M1224 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1250\" y=\"590\" width=\"86\" height=\"50\" fill=\"#1b86bf\"/><path d=\"M1272 593v44M1293 593v44M1314 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1340\" y=\"590\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M1362 593v44M1383 593v44M1404 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1430\" y=\"590\" width=\"86\" height=\"50\" fill=\"#c9d6df\"/><path d=\"M1452 593v44M1473 593v44M1494 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1520\" y=\"590\" width=\"86\" height=\"50\" fill=\"#ffffff\"/><path d=\"M1542 593v44M1563 593v44M1584 593v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"30\" y=\"540\" width=\"86\" height=\"50\" fill=\"#E8291F\"/><path d=\"M52 543v44M73 543v44M94 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"120\" y=\"540\" width=\"86\" height=\"50\" fill=\"#0a6aa3\"/><path d=\"M142 543v44M163 543v44M184 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"210\" y=\"540\" width=\"86\" height=\"50\" fill=\"#1b86bf\"/><path d=\"M232 543v44M253 543v44M274 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"300\" y=\"540\" width=\"86\" height=\"50\" fill=\"#c9d6df\"/><path d=\"M322 543v44M343 543v44M364 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"390\" y=\"540\" width=\"86\" height=\"50\" fill=\"#0a6aa3\"/><path d=\"M412 543v44M433 543v44M454 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"480\" y=\"540\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M502 543v44M523 543v44M544 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"570\" y=\"540\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M592 543v44M613 543v44M634 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"660\" y=\"540\" width=\"86\" height=\"50\" fill=\"#c9d6df\"/><path d=\"M682 543v44M703 543v44M724 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"750\" y=\"540\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M772 543v44M793 543v44M814 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"840\" y=\"540\" width=\"86\" height=\"50\" fill=\"#ffffff\"/><path d=\"M862 543v44M883 543v44M904 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"930\" y=\"540\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M952 543v44M973 543v44M994 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1020\" y=\"540\" width=\"86\" height=\"50\" fill=\"#ffffff\"/><path d=\"M1042 543v44M1063 543v44M1084 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1110\" y=\"540\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M1132 543v44M1153 543v44M1174 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/><rect x=\"1200\" y=\"540\" width=\"86\" height=\"50\" fill=\"#b3170f\"/><path d=\"M1222 543v44M1243 543v44M1264 543v44\" stroke=\"#000\" stroke-opacity=\".18\" stroke-width=\"2\"/></svg>"),
};

const SERVICE_ICONS = {
  'international-courier': Package,
  'freight-forwarding': Plane,
  'ship-spares': Anchor,
  'dg-shipping': AlertTriangle,
  'international-relocation': Truck,
  'customs-clearance': ShieldCheck,
};
const EXPRESS_ICONS = { FileText, Coffee, Luggage, HeartPulse, Flame, Boxes };
const INDUSTRY_ICONS = { Ship, Radio, Utensils, Atom, Activity, Car };

/* Logo colours: red #E8291F, blue #005687 */
const css = `
@keyframes fm-rise { from { opacity: 0; transform: translateY(26px); filter: blur(6px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes fm-draw { to { stroke-dashoffset: 0; } }
@keyframes fm-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes fm-blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-24px) scale(1.08); } 66% { transform: translate(-22px,18px) scale(.95); } }
@keyframes fm-shine { to { background-position: 200% center; } }
@keyframes fm-zoom { from { transform: scale(1.08); } to { transform: scale(1); } }
@keyframes fm-ping { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(2.6); opacity: 0; } }
@keyframes fm-dash { to { stroke-dashoffset: -64; } }
@keyframes fm-spin-slow { to { transform: rotate(360deg); } }
@keyframes fm-pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(232,41,31,.55); } 100% { box-shadow: 0 0 0 16px rgba(232,41,31,0); } }

.fm-hero-item { opacity: 0; animation: fm-rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
.fm-wing { stroke-dasharray: 1200; stroke-dashoffset: 1200; animation: fm-draw 2.4s .2s cubic-bezier(.3,.6,.2,1) forwards; }
.fm-zoom { animation: fm-zoom 14s ease-out forwards; }
.fm-float { animation: fm-float 7s ease-in-out infinite; }
.fm-blob { animation: fm-blob 16s ease-in-out infinite; }
.fm-dash { stroke-dasharray: 8 12; animation: fm-dash 4s linear infinite; }
.fm-spin { animation: fm-spin-slow 40s linear infinite; }
.fm-pulse { animation: fm-pulse-ring 2s ease-out infinite; }

.fm-gradient-text {
  color: #005687;
}
.fm-gradient-light {
  color: #E8291F;
}

/* photo backgrounds: parallax on desktop, normal scroll on touch devices */
.fm-parallax { background-image: var(--bg); background-size: cover; background-position: center; }
@media (min-width: 1024px) { .fm-parallax { background-attachment: fixed; } }

/* scroll reveal variants */
.fm-reveal { opacity: 0; transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); will-change: transform, opacity; }
.fm-up    { transform: translateY(28px); }
.fm-left  { transform: translateX(-28px); }
.fm-right { transform: translateX(28px); }
.fm-scale { transform: scale(.94); }
.fm-reveal.fm-in { opacity: 1; transform: none; }

/* spotlight card: glow follows the cursor */
.fm-spot { position: relative; isolation: isolate; }
.fm-spot::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1; opacity: 0;
  background: radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(0,86,135,.10), transparent 60%);
  transition: opacity .3s;
}
.fm-spot:hover::before { opacity: 1; }
.fm-spot-dark::before { background: radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(232,41,31,.22), transparent 60%); }

/* animated accent line on cards */
.fm-line { transform: scaleX(0); transform-origin: left; transition: transform .5s cubic-bezier(.2,.7,.2,1); }
.group:hover .fm-line { transform: scaleX(1); }

/* scroll progress bar */
.fm-progress { transform-origin: left; transform: scaleX(var(--p,0)); }

@media (prefers-reduced-motion: reduce) {
  .fm-hero-item, .fm-reveal { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; filter: none !important; }
  .fm-wing { stroke-dashoffset: 0; animation: none; }
  .fm-zoom, .fm-float, .fm-blob, .fm-gradient-text, .fm-gradient-light, .fm-ping::after, .fm-dash, .fm-spin, .fm-pulse { animation: none; }
}
`;

/* Reveal on scroll */
const Reveal = ({ children, delay = 0, className = '', variant = 'up' }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`fm-reveal fm-${variant} ${shown ? 'fm-in' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

/* Photo background that hides itself if the file is missing (used by the hero, with slow zoom) */
const BgImage = ({ src, scene, className = '', eager = false }) => (
  <>
    {scene && (
      <div aria-hidden="true" className={`absolute inset-0 bg-cover bg-center pointer-events-none ${className}`}
        style={{ backgroundImage: scene }} />
    )}
    <img
      src={src} alt="" aria-hidden="true" loading={eager ? 'eager' : 'lazy'} decoding="async"
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${className}`}
    />
  </>
);

/* Full-bleed photo with parallax. The built-in scene sits underneath as the fallback. */
const ParallaxBg = ({ src, scene, className = '' }) => (
  <div
    aria-hidden="true"
    className={`fm-parallax absolute inset-0 pointer-events-none ${className}`}
    style={{ '--bg': `url("${src}"), ${scene}` }}
  />
);

/* Curved edge that blends a dark section into the next one. Colour comes from text-* */
const Wave = ({ className = '', flip = false }) => (
  <svg
    viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"
    className={`absolute left-0 w-full h-10 sm:h-16 pointer-events-none ${flip ? '-top-[2px] rotate-180' : '-bottom-[2px]'} ${className}`}
  >
    <path fill="currentColor" d="M0 44 C 240 92 480 0 720 36 S 1200 84 1440 28 V80 H0 Z" />
  </svg>
);

/* Cursor-follow glow handler */
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

/* Count-up for stats like "15+", "24/7", "500" */
const CountUp = ({ value }) => {
  const str = String(value);
  const m = str.match(/^(\d[\d,]*)(.*)$/);
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!m) return;
    const target = parseInt(m[1].replace(/,/g, ''), 10);
    const el = ref.current;
    let raf;
    const run = () => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === 'undefined') { setN(target); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [str]);
  if (!m) return <span ref={ref}>{str}</span>;
  return <span ref={ref}>{n.toLocaleString()}{m[2]}</span>;
};

const SectionHead = ({ title, text, light = false }) => (
  <Reveal className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-16">
    <span className="mx-auto block h-1 w-12 rounded-full bg-brand-red" aria-hidden="true" />
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {text && <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-white/80' : 'text-slate-600'}`}>{text}</p>}
  </Reveal>
);

const STAT_ICONS = [Globe, Plane, ShieldCheck, Clock];

export const HomePage = ({ onOpenQuote }) => {
  const barRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slideCount]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideCount);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  const activeSlide = HERO_SLIDES[currentSlide];

  /* scroll progress */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1);
      if (barRef.current) barRef.current.style.setProperty('--p', p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-white text-slate-800 font-sans overflow-x-hidden">
      <style>{css}</style>

      {/* scroll progress */}
      <div ref={barRef} className="fm-progress fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-brand-red via-brand-red to-brand-blue" />

      {/* ============ HERO SLIDER ============ */}
      <section
        className="relative overflow-hidden bg-brand-blue-dark text-white select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slide background crossfade */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <BgImage src={slide.image} scene={SCENE.ship} eager={idx === 0} className="fm-zoom opacity-30" />
          </div>
        ))}

        {/* Dark contrast scrims to guarantee high legibility while retaining background texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/95 via-brand-blue-dark/80 to-brand-blue-dark/50" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-transparent to-brand-blue-dark/70" aria-hidden="true" />
        <div className="fm-blob absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-brand-red/30 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="fm-blob absolute -top-32 -left-24 w-96 h-96 rounded-full bg-brand-blue/50 blur-3xl pointer-events-none" style={{ animationDelay: '-6s' }} aria-hidden="true" />

        {/* Wing line echoing the logo */}
        <svg className="absolute -top-6 right-0 w-[70%] max-w-[900px] pointer-events-none hidden md:block" viewBox="0 0 900 400" fill="none" aria-hidden="true">
          <path className="fm-wing" d="M20 360 C 220 340, 420 220, 560 120 C 640 62, 760 30, 880 20" stroke="#E8291F" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path className="fm-wing" style={{ animationDelay: '.5s' }} d="M60 380 C 260 360, 460 250, 600 160 C 680 108, 780 70, 880 60" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
        </svg>

        {/* Pickup to delivery route, drawn behind the content */}
        <svg className="absolute left-0 bottom-24 w-full h-40 pointer-events-none hidden md:block opacity-60" viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className="fm-dash" d="M40 130 C 360 20, 700 170, 1000 70 S 1320 40, 1400 90" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* floating mode chips */}
        <div className="hidden xl:flex absolute left-[57%] top-[14%] w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 items-center justify-center fm-float shadow-xl shadow-black/20" aria-hidden="true">
          <Plane className="w-7 h-7 text-white" />
        </div>
        <div className="hidden xl:flex absolute left-[55%] bottom-[24%] w-14 h-14 rounded-2xl bg-brand-red/90 border border-white/20 items-center justify-center fm-float shadow-xl shadow-brand-red/40" style={{ animationDelay: '-3s' }} aria-hidden="true">
          <Ship className="w-7 h-7 text-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 sm:pt-8 sm:pb-24 lg:pt-8 lg:pb-24">
          {/* Top Bar inside Hero: Category Pill & Carousel Controls */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/25 text-xs sm:text-sm font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              {activeSlide.badge}
            </div>

            {/* Slider Controls: Counter & Arrows */}
            <div className="flex items-center gap-2">
              <div className="text-xs font-mono text-white/80 font-semibold tracking-wider mr-1">
                <span className="text-white font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="text-white/40"> / </span>
                <span>{String(slideCount).padStart(2, '0')}</span>
              </div>
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-red text-white border border-white/25 hover:border-brand-red flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-red text-white border border-white/25 hover:border-brand-red flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Clean, CMS-Ready Minimal Text */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-4 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black tracking-tight text-white leading-[1.14] drop-shadow-lg min-h-[76px] sm:min-h-[92px] flex items-center">
                <span>
                  {activeSlide.titlePrefix}
                  <span className="text-brand-red font-black">{activeSlide.highlight}</span>
                  {activeSlide.titleSuffix}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto lg:mx-0 leading-relaxed border-l-0 lg:border-l-3 lg:border-brand-red lg:pl-4 min-h-[44px]">
                {activeSlide.desc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenQuote(activeSlide.serviceId)}
                  className="group px-6 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-brand-red/40 hover:shadow-2xl hover:shadow-brand-red/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  {activeSlide.primaryCta}
                </button>
                <Link
                  to={activeSlide.secondaryLink}
                  className="px-6 py-3.5 bg-white/10 backdrop-blur border border-white/30 hover:bg-white hover:text-brand-blue text-white rounded-xl text-xs sm:text-sm font-bold transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  {activeSlide.secondaryCta}
                </Link>
                <a
                  href={BRAND.brochurePath}
                  download
                  className="group px-3 py-3.5 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition inline-flex items-center gap-1.5"
                >
                  Download brochure <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Minimal Highlight Chips */}
              <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                {activeSlide.highlights.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs sm:text-sm text-white/90"
                  >
                    <span className="w-4 h-4 rounded-full bg-brand-red flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Slide-Synced Priority Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Glow backdrop */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-red/40 via-white/10 to-brand-blue/50 blur-lg opacity-70" aria-hidden="true" />
                <div className="relative rounded-2xl bg-[#002844]/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl p-5 sm:p-6 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/15">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-brand-red font-bold">
                        {activeSlide.featureBadge}
                      </span>
                      <h3 className="text-base font-bold text-white">{activeSlide.featureTitle}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-semibold text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Network
                    </span>
                  </div>

                  {/* Feature Overview */}
                  <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10 space-y-2">
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      {activeSlide.featureDesc}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-brand-red-light font-semibold pt-1">
                      <span>Direct Hub Routing</span>
                      <span className="text-white/70">Verified Protocol</span>
                    </div>
                  </div>

                  {/* Instant Action CTA */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenQuote(activeSlide.serviceId)}
                      className="group w-full py-2.5 px-4 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-red/30 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Calculate Fare Rate Online
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Support hotline */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/75">
                    <span>Direct Ops Helpline</span>
                    <a
                      href={`tel:${BRAND.primaryPhone}`}
                      className="font-bold text-white hover:text-brand-red transition-colors inline-flex items-center gap-1"
                    >
                      {BRAND.primaryPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Progress Indicator Dots / Bars */}
          <div className="flex items-center justify-center gap-2.5 pt-6 sm:pt-8">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.badge}`}
                className={`transition-all duration-300 h-2 rounded-full cursor-pointer ${
                  idx === currentSlide
                    ? 'w-10 bg-brand-red shadow-md shadow-brand-red/50'
                    : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        <Wave className="text-white" />
      </section>

      {/* ============ STATS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((st, i) => {
            const StatIcon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <Reveal key={i} variant="scale" delay={i * 90}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white border border-slate-100 p-5 sm:p-7 text-center shadow-xl shadow-brand-blue/15 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-blue/25 transition-all duration-300">
                  <StatIcon className="absolute -right-5 -bottom-5 w-28 h-28 text-brand-blue/[0.06] group-hover:text-brand-red/10 group-hover:rotate-12 transition-all duration-500" aria-hidden="true" />
                  <div className="relative mx-auto mb-4 w-12 h-12 rounded-2xl bg-brand-blue-50 text-brand-blue flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
                    <StatIcon className="w-6 h-6" />
                  </div>
                  <div className="relative text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-blue">
                    <CountUp value={st.value} />
                  </div>
                  <div className="relative mt-2 text-sm font-bold text-slate-900">{st.label}</div>
                  <p className="relative mt-1 text-sm text-slate-500 max-w-[220px] mx-auto">{st.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ CORE SERVICES ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-blue-50 to-white" aria-hidden="true" />
        <div className="fm-blob absolute top-20 -left-24 w-80 h-80 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="fm-blob absolute bottom-10 -right-24 w-80 h-80 rounded-full bg-brand-red/10 blur-3xl pointer-events-none" style={{ animationDelay: '-7s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <SectionHead
            title="Comprehensive logistics and maritime services"
            text="Built for reliability, transparent tracking and full compliance across worldwide corridors."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CORE_SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[s.id] || Package;
              return (
                <Reveal key={s.id} delay={(i % 3) * 90}>
                  <div
                    onMouseMove={spot}
                    className="fm-spot group relative h-full bg-white rounded-3xl border border-slate-200 flex flex-col overflow-hidden shadow-lg shadow-brand-blue/5 hover:border-brand-blue/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-blue/15 transition-all duration-300"
                  >
                    {/* coloured header band */}
                    <div className="relative h-32 bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-dark overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-red/30 blur-2xl group-hover:scale-125 transition-transform duration-500" aria-hidden="true" />
                      <Icon className="absolute -right-6 -bottom-8 w-40 h-40 text-white/10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500" aria-hidden="true" />
                      <span className="absolute left-6 bottom-3 text-5xl font-black text-white/15 leading-none select-none" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <div className="absolute left-6 top-5 w-14 h-14 rounded-2xl bg-white text-brand-blue flex items-center justify-center shadow-xl shadow-black/20 group-hover:bg-brand-red group-hover:text-white group-hover:-rotate-6 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="absolute right-5 top-5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-red text-white shadow-lg shadow-brand-red/30">{s.badge}</span>
                    </div>

                    <div className="relative p-7 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-5">{s.shortDesc}</p>
                      <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                        {s.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2.5">
                            <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-blue-50 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                              <Check className="w-3 h-3" />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                        <Link to={s.path} className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Explore service <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button onClick={() => onOpenQuote(s.id)} className="px-4 py-1.5 rounded-full text-sm font-semibold text-brand-red border border-brand-red/30 hover:bg-brand-red hover:text-white transition-colors cursor-pointer">
                          Get quote
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SIX WAYS (pickup to delivery) ============ */}
      <section className="relative bg-brand-blue-dark text-white py-24 sm:py-32 overflow-hidden">
        <ParallaxBg src={IMG.process} scene={SCENE.stacks} className="opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00172b]/95 via-[#00223b]/90 to-[#00172b]/95" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#00172b]/50" aria-hidden="true" />
        <div className="fm-blob absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-red/25 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="fm-blob absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-brand-blue/40 blur-3xl pointer-events-none" style={{ animationDelay: '-8s' }} aria-hidden="true" />
        <Wave className="text-white" flip />
        <Wave className="text-white" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            light
            title="From pickup to delivery, one clear process"
            text="A standard, transparent pipeline built around shipowner precision and door-to-door accountability."
          />

          {/* start of the route */}
          <div className="flex lg:justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-sm font-bold text-white shadow-lg shadow-black/20">
              Pickup
            </span>
          </div>

          {/* vertical timeline, cards alternate left and right on desktop */}
          <ol className="relative max-w-5xl mx-auto list-none">
            <span className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-0.5 lg:-translate-x-1/2 bg-gradient-to-b from-brand-red via-white/50 to-white/10" aria-hidden="true" />
            {SIX_WAYS_CARGO.map((item, idx) => {
              const left = idx % 2 === 0;
              return (
                <li key={idx} className="relative pl-16 lg:pl-0 pb-8 lg:pb-10 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-x-24">
                  <span className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-5 z-10 w-10 h-10 rounded-full bg-brand-red text-white font-bold flex items-center justify-center shadow-lg shadow-brand-red/40 ring-4 ring-white/20">
                    {idx + 1}
                  </span>
                  <Reveal variant={left ? 'left' : 'right'} className={left ? 'lg:col-start-1' : 'lg:col-start-2'}>
                    <div className={`group relative h-full overflow-hidden bg-[#002d4d]/92 backdrop-blur-xl rounded-2xl border border-white/20 p-6 sm:p-7 shadow-xl shadow-black/40 hover:bg-[#00365c] hover:border-brand-red/80 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ${left ? 'lg:text-right' : ''}`}>
                      <span className={`absolute -top-3 text-8xl font-black text-white/[0.08] leading-none select-none ${left ? 'right-3 lg:left-3 lg:right-auto' : 'right-3'}`} aria-hidden="true">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={`absolute top-0 bottom-0 w-1 bg-brand-red scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ${left ? 'left-0 lg:left-auto lg:right-0' : 'left-0'}`} aria-hidden="true" />
                      <h3 className="relative text-lg sm:text-xl font-bold text-white mb-2 drop-shadow-sm">{item.title}</h3>
                      <p className="relative text-sm sm:text-base text-slate-100/90 leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* end of the route */}
          <div className="flex lg:justify-center mt-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-brand-blue-dark text-sm font-bold shadow-lg shadow-black/20">
              Delivery
            </span>
          </div>
        </div>
      </section>

      {/* ============ PROMISE ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#00223d] via-brand-blue to-brand-blue-dark text-white p-7 sm:p-12 lg:p-16 shadow-2xl shadow-brand-blue/30">
            <BgImage src={IMG.hero} scene={SCENE.ship} className="opacity-20 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/95 via-brand-blue-dark/80 to-brand-blue/50" aria-hidden="true" />
            <div className="fm-blob absolute -top-20 -left-16 w-72 h-72 rounded-full bg-brand-red/30 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="fm-blob absolute -bottom-24 right-10 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" style={{ animationDelay: '-8s' }} aria-hidden="true" />
            <Quote className="absolute -right-4 -bottom-6 w-56 h-56 text-white/5" />
            <span className="absolute left-0 top-10 bottom-10 w-1.5 rounded-r-full bg-gradient-to-b from-brand-red to-transparent" aria-hidden="true" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="space-y-6">
                <span className="w-14 h-14 rounded-2xl bg-brand-red flex items-center justify-center shadow-xl shadow-brand-red/40 fm-float">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">We never break our promise.</h2>
                <p className="text-white/90 leading-relaxed text-base sm:text-lg">
                  At Flymingo Logistics, every consignment is treated as mission-critical. Whether it is an AOG spare part
                  for an aircraft, replacement machinery for a berthing vessel, or homemade sweets sent to family overseas,
                  we operate with intentional precision.
                </p>
              </div>
              <blockquote className="relative border-l-4 border-brand-red pl-6 pr-5 py-6 text-lg sm:text-xl leading-relaxed text-white bg-[#001e36]/85 rounded-r-2xl backdrop-blur-md border-y border-r border-y-white/15 border-r-white/15 shadow-xl shadow-black/20">
                <Quote className="w-8 h-8 text-brand-red mb-3" />
                &ldquo;Just because you are doing a lot more doesn&apos;t mean you are getting a lot done. Don&apos;t confuse movement with progress!&rdquo;
                <footer className="mt-4 text-sm text-white/70 font-semibold">Denzel Washington, our core inspiration</footer>
              </blockquote>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ SPECIALIZED EXPRESS ============ */}
      <section className="relative overflow-hidden bg-brand-blue-50">
        {/* Subtle background image texture with high-contrast scrim */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/assets/packing.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-50/95 via-brand-blue-50/90 to-brand-blue-50/98" />
        </div>
        <div className="fm-blob absolute -top-24 right-0 w-96 h-96 rounded-full bg-brand-red/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <SectionHead
            title="Tailored express consignments"
            text="Special packaging and compliant customs clearance for specific categories."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALIZED_EXPRESS.map((item, idx) => {
              const Icon = EXPRESS_ICONS[item.icon] || Boxes;
              return (
                <Reveal key={idx} delay={(idx % 3) * 90} variant="scale">
                  <div className="group relative h-full overflow-hidden flex flex-col gap-5 p-7 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-brand-blue/5 hover:border-brand-red/40 hover:shadow-2xl hover:shadow-brand-red/10 hover:-translate-y-2 transition-all duration-300">
                    <Icon className="absolute -right-8 -bottom-8 w-36 h-36 text-brand-blue/[0.05] group-hover:text-brand-red/10 group-hover:rotate-12 transition-all duration-500" aria-hidden="true" />
                    <div className="relative flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white flex items-center justify-center shadow-lg shadow-brand-blue/30 group-hover:from-brand-red group-hover:to-brand-red-dark group-hover:shadow-brand-red/40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-brand-red group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" aria-hidden="true" />
                    </div>
                    <div className="relative">
                      <h3 className="text-lg font-bold text-slate-900 mb-1.5">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="relative bg-brand-blue-dark py-24 sm:py-32 overflow-hidden">
        <ParallaxBg src={IMG.industries} scene={SCENE.port} className="opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00172b]/95 via-[#00223b]/90 to-[#00172b]/95" aria-hidden="true" />
        <div className="absolute inset-0 bg-[#00172b]/50" aria-hidden="true" />
        <div className="fm-blob absolute top-10 left-1/4 w-96 h-96 rounded-full bg-brand-blue/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="fm-blob absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-red/25 blur-3xl pointer-events-none" style={{ animationDelay: '-9s' }} aria-hidden="true" />
        <Wave className="text-brand-blue-50" flip />
        <Wave className="text-slate-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            light
            title="Serving critical global sectors"
            text="Logistics workflows built to meet strict industry benchmarks."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES_SERVED.map((ind, idx) => {
              const Icon = INDUSTRY_ICONS[ind.icon] || Ship;
              return (
                <Reveal key={idx} delay={(idx % 3) * 90}>
                  <div
                    onMouseMove={spot}
                    className="fm-spot fm-spot-dark group relative h-full overflow-hidden bg-[#002d4d]/92 backdrop-blur-xl rounded-3xl p-7 border border-white/20 shadow-xl shadow-black/40 hover:border-brand-red/80 hover:bg-[#00365c] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                  >
                    <Icon className="absolute -right-6 -bottom-6 w-32 h-32 text-white/[0.06] group-hover:text-brand-red/20 group-hover:rotate-12 transition-all duration-500" aria-hidden="true" />
                    <span className="absolute right-5 top-4 text-5xl font-black text-white/10 leading-none select-none" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="relative flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 text-white flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-white leading-snug pr-8 drop-shadow-sm">{ind.name}</h3>
                    </div>
                    <p className="relative text-sm text-slate-100/90 leading-relaxed">{ind.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative overflow-hidden bg-slate-50">
        <Quote className="absolute left-4 top-24 w-56 h-56 text-brand-blue/[0.05] -rotate-6" aria-hidden="true" />
        <Quote className="absolute right-4 bottom-10 w-56 h-56 text-brand-red/[0.06] rotate-6" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <SectionHead title="Trusted by maritime fleets and global families" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <figure className="group relative h-full flex flex-col justify-between bg-white rounded-3xl border border-slate-200 p-7 overflow-hidden shadow-lg shadow-brand-blue/5 hover:-translate-y-2 hover:border-brand-blue/30 hover:shadow-2xl hover:shadow-brand-blue/15 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                      <Quote className="w-6 h-6" />
                    </div>
                    <blockquote className="text-slate-700 leading-relaxed text-sm">{t.quote}</blockquote>
                  </div>
                  <figcaption className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white font-bold flex items-center justify-center text-sm ring-2 ring-brand-red/30 ring-offset-2 flex-shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">{t.author}</div>
                      <div className="text-xs text-slate-500 truncate">{t.role}, {t.company}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
