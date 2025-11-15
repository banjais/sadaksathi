/**
 * server.cjs
 * Node 24+ CommonJS
 * Express server to serve Sadak-Sathi data
 * Hides live API URLs, provides merged.json fallback
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

// Paths
const mergedPath = path.join(__dirname, '..', 'public', 'data', 'merged.json');
const scriptPropsPath = path.join(__dirname, 'scripts', 'script-properties.json');

// Load config
let config = {};
try {
  config = JSON.parse(fs.readFileSync(scriptPropsPath, 'utf-8'));
} catch (err) {
  console.error('❌ Error loading script-properties.json:', err.message);
}

// API URLs from config
const {
  GAS_URL,
  WAZE_JSON,
  WAZE_XML,
  TOMTOM_API_KEY,
  TRAFFIC_API,
  OVERPASS_API
} = config;

// Utility: fetch JSON with fallback
async function fetchJson(url, fallback = {}) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch {
    return fallback;
  }
}

// Serve merged data
app.get('/api/data', async (req, res) => {
  let lastMerged = {};
  if (fs.existsSync(mergedPath)) {
    try {
      lastMerged = JSON.parse(fs.readFileSync(mergedPath, 'utf-8'));
    } catch {}
  }

  // Optional: live fetch
  const liveData = {
    sheets: lastMerged.sheets || {},
    pois: lastMerged.pois || null,
    wazeJSON: await fetchJson(WAZE_JSON, lastMerged.wazeJSON || {}),
    wazeXML: await fetchJson(WAZE_XML, lastMerged.wazeXML || {}),
    tomtomTraffic: await fetchJson(`${TRAFFIC_API}?key=${TOMTOM_API_KEY}`, lastMerged.tomtomTraffic || {}),
    overpassPOIs: await fetchJson(OVERPASS_API, lastMerged.overpassPOIs || {}),
  };

  res.json(liveData);
});

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT, () => {
  console.log(`🚀 Sadak-Sathi server running at http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/data`);
});
