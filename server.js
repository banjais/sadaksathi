import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 4000;

// Enable CORS for localhost:5173 (your Vite dev server)
app.use(cors({
  origin: "http://localhost:5173"
}));

// Waze proxy
app.get("/waze-proxy", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Missing URL query parameter" });

    const response = await fetch(url);
    const data = await response.text(); // Waze may return XML sometimes
    res.send(data); // send raw text so frontend can parse JSON/XML
  } catch (err) {
    console.error("Waze proxy error:", err);
    res.status(500).json({ error: "Failed to fetch Waze feed" });
  }
});

// TomTom proxy
app.get("/tomtom-proxy", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Missing URL query parameter" });

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("TomTom proxy error:", err);
    res.status(500).json({ error: "Failed to fetch TomTom feed" });
  }
});

app.listen(PORT, () => console.log(`Proxy server running at http://localhost:${PORT}`));
