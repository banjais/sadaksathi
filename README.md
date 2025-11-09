# Sadak-Sathi 🛣️

**Sadak-Sathi** is a bilingual (Nepali-English) real-time highway and road status web and mobile application for Nepal. It provides live updates on road conditions, travel alerts, weather, nearby services, and AI-powered travel suggestions.

---

## Features

- **Real-time road status**: Blocked, one-lane, resumed, and more.  
- **Interactive map**: Powered by Leaflet, supports 2D and optional 3D.  
- **Dark & light mode**: System toggle or manual switch.  
- **Bilingual support**: Nepali & English, with language selector.  
- **Driver Onboard Panel**: Auto-hidable, semi-transparent, device-friendly.  
- **AI Assistant**: Bilingual TTS/STT, voice and text interaction, travel suggestions.  
- **Nearby POIs**: Fuel stations, hotels, restaurants, hospitals, services.  
- **Notifications Panel**: Shows traffic alerts, road closures, trip updates.  
- **Mobile & Desktop ready**: Fully responsive and Android/iOS-friendly.  
- **Print / Export**: Generate reports for current road status.  
- **Admin panel**: Superadmin can edit settings and keys.  
- **Offline support**: View last known road status when offline.

---

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion  
- **Map**: Leaflet (with optional 3D layers)  
- **Icons**: Lucide-react  
- **Notifications & Toasts**: Sonner  
- **Backend**: Google Apps Script API (for road status data)  
- **Other**: Firebase (optional for hosting & auth), dotenv for environment variables  

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sadak-sathi.git
cd sadak-sathi
Install dependencies:

bash
Copy code
npm install
Configure environment variables:

Create a .env.local file in the root:

ini
Copy code
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_APPS_SCRIPT_URL=your_google_apps_script_url
Run the project:

bash
Copy code
npm run dev
Open in your browser:

arduino
Copy code
http://localhost:5173
Build
bash
Copy code
npm run build
Deploy dist/ to your hosting service.

Folder Structure
graphql
Copy code
src/
  components/       # React components
  utils/            # Utility functions and translations
  App.tsx           # Main app entry
  main.tsx          # Vite entry
public/
  data/             # GeoJSON and static data
