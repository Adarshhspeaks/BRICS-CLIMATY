# 🌿 BRICS-CLIMATY — Sustainability Consulting Website

A modern, responsive website replica for **BRICS-CLIMATY** ([green-volt.framer.website](https://green-volt.framer.website/)), built with React, Vite, and modern CSS.

---

## ✨ Features

- **17 Full Pages & Detail Views**:
  - `Home` (`/`): Hero with live status badges, `{ 01 } About`, `{ 02 } Impact Numbers`, `{ 03 } Services`, `{ 04 } Success Stories`, `{ 05 } Why Choose Us`, `{ 06 } Testimonials`, `{ 07 } FAQ Accordions`, Consultation CTA, and Newsletter Subscription.
  - `About Us` (`/about`): Mission, story, core principles, timeline, and leadership team.
  - `Services` (`/service`): Service catalog & deep-dive detail pages.
    - Commercial & Residential Solar Installation (`/service/commercial-residential-solar-installation`)
    - Carbon Footprint Analysis (`/service/carbon-footprint-analysis`)
    - Sustainable Building Design & Consulting (`/service/sustainable-building-design-consulting`)
    - Smart Waste Management & Reduction Solutions (`/service/smart-waste-management-reduction-solutions`)
  - `Impact` (`/impact`): Environmental metrics dashboard (2018–2026), industry breakdowns, and spotlight case study.
  - `Projects` (`/project`): Filterable project gallery + individual case studies (`/project/sustainx`, `/project/cleanpath`, `/project/greenshift`).
  - `Pricing` (`/pricing`): Starter, Growth, Enterprise tiers with an interactive Annual (Save 20%) / Monthly billing toggle.
  - `Contact Us` (`/contact`): Consultation booking form, office locations (SF, Austin, London), and direct contact info.
  - `Style Guide` (`/style-guide`): Design tokens, color palette swatches, typography scale, and button components.
  - `Legal & Utility`: Privacy Policy (`/privacy-policy`), Terms of Service (`/terms-of-service`), and custom 404 Page.

- **Design System & Aesthetics**:
  - **Typography**: Inter (Google Fonts) with weights 400–800.
  - **Color Palette**: Forest Green (`#1b4332`), Emerald Accent (`#0b8e58`), Dark Emerald (`#00140c`), Light Gray Neutral (`#f2f2f2`), and Amber Accent (`#f5ad11`).
  - **Glassmorphism**: Backdrop blur floating navigation bar with mobile drawer menu.
  - **Animations**: Infinite logo marquee for partner logos, smooth accordion dropdowns, and responsive transitions.
  - **Assets**: 70+ local SVG icons, illustrations, partner logos, and images.

- **Responsive Breakpoints**:
  - Desktop (1440px+)
  - Laptop (1200px)
  - Tablet (810px)
  - Mobile (390px - 480px)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🛠 Tech Stack
- **Framework**: React 18 + Vite
- **Routing**: React Router DOM
- **Icons**: Custom SVG & Lucide
- **Styling**: Vanilla CSS Design Tokens
