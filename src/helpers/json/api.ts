// src/helpers/api.ts
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.VITE_GAS_URL;
if (!API_URL) throw new Error("Missing VITE_GAS_URL in .env file");

// Generic fetch
const fetchJSON = async (params?: any) => {
  try {
    const res = await axios.get(API_URL, { params });
    return res.data;
  } catch (err) {
    console.error("Fetch error:", API_URL, err);
    return null;
  }
};

// Roads / Local roads
export const fetchRoadData = async (bounds?: any) => {
  return await fetchJSON({ type: "road", bbox: bounds?.toBBoxString?.() || "" });
};

// Reporting
export const fetchReporting = async () => {
  return await fetchJSON({ type: "reporting" });
};

// POIs
export const fetchPOIs = async () => {
  return await fetchJSON({ type: "poi" });
};

// Weather
export const fetchWeather = async () => {
  return await fetchJSON({ type: "weather" });
};

// Flipbook
export const fetchFlipbookImages = async () => {
  const data = await fetchJSON({ type: "flipbook" });
  return data?.images || [];
};
