/**
 * update-merged.cjs
 * Node 24+ CommonJS
 * Fetch & merge Sadak-Sathi sources
 * Writes merged.json to /public/data/
 * Supports --once mode for testing
 */

const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const nodemailer = require("nodemailer");

const args = process.argv.slice(2);
const RUN_ONCE = args.includes("--once");

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// ---------------- CONFIG PATHS ----------------
const scriptPropertiesPath = path.join(__dirname, "script-properties.json");
const fallbackIndexPath = path.join(__dirname, "fallback-index.json");
const MERGED_JSON_PATH = path.join(__dirname, "..", "..", "public", "data", "merged.json");

// ---------------- LOGGING ----------------
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
const cacheDir = path.join(__dirname, "cache");
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

const LOG_RETENTION_DAYS = 14;
function cleanupOldLogs() {
  const files = fs.readdirSync(logsDir);
  const now = Date.now();
  files.forEach(file => {
    const filePath = path.join(logsDir, file);
    try {
      const stats = fs.statSync(filePath);
      if ((now - stats.mtimeMs)/(1000*60*60*24) > LOG_RETENTION_DAYS) fs.unlinkSync(filePath);
    } catch {}
  });
}
cleanupOldLogs();

function logMessage(msg) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${msg}`;
  console.log(line);
  fs.appendFileSync(path.join(logsDir, `merged-${new Date().toISOString().slice(0,10)}.log`), line+"\n", "utf-8");
}

// ---------------- CONFIG LOAD ----------------
let config;
try { config = JSON.parse(fs.readFileSync(scriptPropertiesPath, "utf-8")); } 
catch (err) { logMessage("❌ Error reading script-properties.json: "+err.message); process.exit(1); }

const {
  GAS_URL,
  WAZE_JSON,
  WAZE_XML,
  TOMTOM_API_KEY,
  TRAFFIC_API,
  OVERPASS_API,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  SUPERADMINS = ""
} = config;
const SUPERADMINS_EMAILS = SUPERADMINS.split(",").map(e => e.trim());

// ---------------- EMAIL ----------------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USERNAME, pass: EMAIL_PASSWORD }
});

// ---------------- RETRY / FALLBACK ----------------
const MAX_RETRIES = 3;
const RETRY_INTERVAL = 30_000; // 30s
let fallbackIndices = {};
if (fs.existsSync(fallbackIndexPath)) {
  try { fallbackIndices = JSON.parse(fs.readFileSync(fallbackIndexPath,"utf-8")); } catch {}
}
function saveFallbackIndices() { fs.writeFileSync(fallbackIndexPath, JSON.stringify(fallbackIndices,null,2), "utf-8"); }
function rotateUrls(urls, key) {
  if (!urls || urls.length<=1) return urls;
  const lastIndex = fallbackIndices[key] ?? -1;
  const startIndex = (lastIndex+1) % urls.length;
  fallbackIndices[key] = startIndex;
  saveFallbackIndices();
  return [...urls.slice(startIndex), ...urls.slice(0,startIndex)];
}

const fetchSummary = {};
function getCachePath(name) { return path.join(cacheDir, name.toLowerCase().replace(/\s+/g,"_")+".json"); }

async function fetchJson(url,name){
  for (let attempt=1; attempt<=MAX_RETRIES; attempt++){
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      logMessage(`✅ Fetched JSON: ${name}`);
      fetchSummary[name]="success";
      return data;
    } catch(err){
      logMessage(`⚠ Attempt ${attempt} failed for ${name}: ${err.message}`);
      if (attempt===MAX_RETRIES) return null;
      await new Promise(r=>setTimeout(r,1000));
    }
  }
}

async function fetchXml(url,name){
  for (let attempt=1; attempt<=MAX_RETRIES; attempt++){
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const text = await res.text();
      const parser = new xml2js.Parser({explicitArray:false});
      const data = await parser.parseStringPromise(text);
      logMessage(`✅ Fetched & parsed XML: ${name}`);
      fetchSummary[name]="success";
      return data;
    } catch(err){
      logMessage(`⚠ Attempt ${attempt} failed for ${name}: ${err.message}`);
      if (attempt===MAX_RETRIES) return null;
      await new Promise(r=>setTimeout(r,1000));
    }
  }
}

async function fetchWithFallbacks(urls,name,type="json",lastMergedData={}){
  const rotated = rotateUrls(urls,name);
  const cachePath = getCachePath(name);
  for (const url of rotated){
    try {
      const data = type==="json"? await fetchJson(url,name) : await fetchXml(url,name);
      if (data) { fs.writeFileSync(cachePath, JSON.stringify(data,null,2),"utf-8"); return data; }
    } catch{}
  }
  // offline cache
  if (fs.existsSync(cachePath)){
    try { const cached = JSON.parse(fs.readFileSync(cachePath,"utf-8")); logMessage(`ℹ Using offline cache for ${name}`); fetchSummary[name]="cached"; return cached; } catch{}
  }
  // last merged fallback
  if (lastMergedData[name]) { logMessage(`ℹ Using last merged fallback for ${name}`); fetchSummary[name]="cached"; return lastMergedData[name]; }
  logMessage(`⚠ No data for ${name}, returning empty object`);
  fetchSummary[name]="failed";
  return {};
}

// ---------------- MERGE ----------------
function loadLastMerged(){ if (!fs.existsSync(MERGED_JSON_PATH)) return {}; try{ return JSON.parse(fs.readFileSync(MERGED_JSON_PATH,"utf-8")); } catch{return {};} }
function saveMerged(data){ fs.mkdirSync(path.dirname(MERGED_JSON_PATH), {recursive:true}); fs.writeFileSync(MERGED_JSON_PATH, JSON.stringify(data,null,2),"utf-8"); logMessage(`✅ Merged data saved to ${MERGED_JSON_PATH}`); }
function saveDailySummary(){ const f = path.join(logsDir, `summary-${new Date().toISOString().slice(0,10)}.json`); fs.writeFileSync(f, JSON.stringify({timestamp:new Date().toISOString(),
