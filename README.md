# 🌿 BRICS-CLIMATY — Clean Air & Climate Resilience Platform

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4.3-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-Geospatial%20Maps-199900?style=flat&logo=leaflet)](https://leafletjs.com)

---

## 📖 About the Platform

**BRICS-CLIMATY** (Clean Air & Climate Resilience / **CACR**) is a comprehensive climate intelligence, atmospheric monitoring, and sustainability consulting web application. Engineered to accelerate carbon neutrality, clean energy transitions, and climate adaptation across **BRICS+ member states** (*Brazil, Russia, India, China, South Africa, Egypt, Ethiopia, Iran, United Arab Emirates, and Saudi Arabia*).

The platform bridges policy frameworks, industrial decarbonization engineering, live atmospheric telemetry, and financial modeling into an intuitive, high-performance web experience.

---

## 🌟 Key Features & Modules

### 1. 🗺️ Real-Time BRICS Weather & Airshed Telemetry Map
- Interactive geospatial map powered by **Leaflet** and **Open-Meteo API**.
- Live telemetry tracking temperature, wind velocity, humidity, weather conditions, and airshed health indices across all 10 BRICS capital cities.
- Custom interactive SVG markers with real-time station cards.

### 2. ⚡ Multi-National Carbon Offset & Solar ROI Calculator
- Calibrated mathematical models for all **10 BRICS partner nations**.
- Localized currencies (INR, BRL, RUB, CNY, ZAR, EGP, ETB, IRR, AED, SAR), national grid emission factors ($kg\text{ CO}_2\text{/kWh}$), solar insolation hours, commercial electricity tariffs, and estimated ROI timelines.
- Integrated engineering audit modal connected directly to Supabase for automated lead capture.

### 3. 🌬️ Clean Air & Atmospheric Restoration Program (`/clean-air`)
- Dedicated portal for particulate matter reduction strategies, airshed management protocols, and emission abatement solutions.

### 4. 🛡️ Climate Adaptation & Resilience Hub (`/climate-resilience`)
- Interactive sector adaptation matrix (Urban Infrastructure, Agriculture, Energy Grids, Coastal Defense, Industrial Supply Chains) with mitigation countermeasures and ROI metrics.

### 5. 📊 Impact & Decarbonization Hub (`/impact`)
- Visual environmental impact tracking (metric tons of $\text{CO}_2\text{e}$ mitigated, megawatt-hours of clean solar power generated, and verified municipal outcomes from 2018–2026).

### 6. 💼 Service Catalog & Detail Solutions (`/service`)
- Deep-dive technical service pages:
  - Commercial & Residential Solar Installation
  - Enterprise Carbon Footprint Analysis & ESG Compliance
  - Sustainable Building Design & LEED Consulting
  - Smart Industrial Waste Management & Circular Economy Systems

### 7. 📁 Case Studies & Portfolio Gallery (`/project`)
- Filterable project showcases detailing real-world enterprise deployments across renewable energy, supply chain optimization, and ecological restoration.

### 8. 💬 Stakeholder Feedback & Consultation Engine (`/feedback` & `/contact`)
- Interactive multi-category feedback system with star ratings, Net Promoter Score (NPS) sliders, and direct database persistence.
- Free consultation and engineering audit booking forms.

---

## 🛠 Complete Tech Stack

| Category | Technology | Purpose / Role |
| :--- | :--- | :--- |
| **Core Framework** | **React 18** (`v18.3.1`) | Component-based UI architecture, state hooks (`useState`, `useEffect`, `useMemo`, `useRef`). |
| **Build Tool & Bundler** | **Vite 5** (`v5.4.3`) | Fast ESM dev server, Hot Module Replacement (HMR), optimized Rollup production bundling. |
| **Routing** | **React Router DOM** (`v6.26.2`) | Client-side Single Page Application (SPA) routing, deep link handling, and dynamic route parameters. |
| **Backend & Database** | **Supabase** (`@supabase/supabase-js v2.116.0`) | PostgreSQL cloud database with Row-Level Security (RLS) for inquiries, feedback, and audit submissions. |
| **Geospatial & Mapping** | **Leaflet** (`v1.9.4`) & **React-Leaflet** (`v4.2.1`) | Interactive map canvas, tile rendering, custom station markers, and responsive popups. |
| **Live Telemetry API** | **Open-Meteo API** | Free, open-source weather and atmospheric telemetry API with zero API-key overhead. |
| **Styling & CSS Architecture** | **Modern Vanilla CSS** | Custom design tokens, glassmorphism, responsive flex/grid layouts, smooth animations, and dark/light accents. |
| **Iconography** | **Lucide React** (`v0.441.0`) & Custom SVG | Scalable, pixel-perfect modern vector iconography. |
| **Typography** | **Google Fonts** (*Inter & Outfit*) | High-legibility modern sans-serif typography system. |
| **Deployment & Hosting** | **Vercel** (`vercel.json`) | Edge CDN deployment with automatic SPA route rewrite configuration. |
| **Version Control** | **Git & GitHub** | Source code management and CI/CD pipelines. |

---

## 📂 Project Architecture

```plaintext
CACR/
├── public/                     # Static assets, hero images, and branding assets
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── BRICSWeatherMap.jsx # Live Leaflet weather & telemetry map
│   │   ├── CarbonCalculator.jsx# BRICS Solar ROI & Carbon Offset Calculator
│   │   ├── FAQAccordion.jsx    # Interactive animated FAQ accordion
│   │   ├── Footer.jsx          # Balanced modern footer
│   │   ├── Navbar.jsx          # Floating glassmorphic navigation bar
│   │   └── ...
│   ├── lib/
│   │   ├── carbonCalculatorData.js # Dataset for all 10 BRICS countries
│   │   └── supabaseClient.js   # Supabase client with graceful configuration fallback
│   ├── pages/                  # Page-level route views
│   │   ├── Home.jsx            # Full-bleed hero & primary entry portal
│   │   ├── About.jsx           # Mission, principles & history
│   │   ├── CleanAir.jsx        # Atmospheric restoration program
│   │   ├── ClimateResilience.jsx# Climate adaptation & resilience
│   │   ├── Services.jsx        # Service catalog & solutions
│   │   ├── Impact.jsx          # Metrics dashboard & calculator
│   │   ├── Projects.jsx        # Filterable case study gallery
│   │   ├── Pricing.jsx         # Tiered pricing plans with billing toggle
│   │   ├── Feedback.jsx        # Stakeholder feedback form
│   │   ├── Contact.jsx         # Consultation booking & office locations
│   │   └── ...
│   ├── App.jsx                 # Route definitions & layout wrappers
│   ├── main.jsx                # Application bootstrap & DOM mount
│   └── index.css               # Global design tokens, resets & layout utilities
├── vercel.json                 # Vercel SPA rewrite routing rules
├── supabase_schema.sql         # Database schema & RLS policies
└── package.json                # Project dependencies and build scripts
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Adarshhspeaks/BRICS-CLIMATY.git
cd BRICS-CLIMATY
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional)
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 📄 License

This project is licensed under the **MIT License**.
