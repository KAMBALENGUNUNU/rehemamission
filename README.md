# Rehema Mission Rwanda — Web Platform

A luxury, bilingual (English & French) digital platform for **Rehema Mission Rwanda** and **Kaze Collection Atelier**, supporting youth empowerment, restoration through art, and community impact in Kigali, Rwanda.

---

## Key Features & Enhancements

### 1. Bilingual Internationalization (EN / FR)
- **Central Dictionary**: Full coverage across all pages located in [`src/lib/translations.ts`](src/lib/translations.ts).
- **Persistent State**: Managed via `StoreContext` with automatic `localStorage` synchronization (`rehema_language`).
- **Interactive Switcher**: Sliding pill toggle (`EN` | `FR`) located in the desktop navigation bar and mobile drawer.
- **Dynamic Localization**: All routes, forms, modals, FAQ accordions, and WhatsApp query links adapt to the active language.

### 2. Luxury Rotating Rings Theme (`RotatingRingsTheme`)
- **Mathematical Specification**: 46 rotating concentric ellipses matching the Signature Gallery luxury vortex aesthetic.
- **Brand Multi-Stop Gradients**:
  - `rehemaGoldAmber`: Solar Gold (`#FAC832`) $\rightarrow$ Rehema Yellow (`#F5B324`) $\rightarrow$ Warm Amber (`#D97706`) $\rightarrow$ Champagne (`#C5A059`) $\rightarrow$ Bronze (`#B45309`).
  - `rehemaAmberNavy`: Light Navy (`#1C3656`) $\rightarrow$ Champagne (`#C5A059`) $\rightarrow$ Rehema Yellow (`#F5B324`) $\rightarrow$ Deep Navy (`#0E1E33`).
  - `rehemaLuminous`: Radiant Solar Gold accent for accented orbital rings.
- **Continuous Animation**: Smooth 55-second infinite rotation (`sgRingsSpin`) with GPU acceleration (`transform-origin: center; will-change: transform;`).
- **Applied Locations**:
  - **Home**: Centered directly behind the 4 core pillar cards in *What We Do*.
  - **Our Story**: Framing the hero section (*Our Foundation · Est. 1998*).

### 3. Typography & Styling Overhaul
- **Classical Luxury Serif**: Classical Cormorant Garamond headings with increased boldness (`font-bold text-slate-950 tracking-[-0.015em]`).
- **Solid Sticky Navbar**: Removed transparency in favor of a crisp, non-distracting white backdrop with sticky elevation.
- **Refined Showcase**: Streamlined artwork cards with yellow *View in Gallery* buttons and removal of price tags for gallery emphasis.

---

## Technology Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables & Animations
- **Icons**: Lucide React
- **Routing**: React Router v6

---

## Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```
