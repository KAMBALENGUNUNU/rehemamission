import { useEffect, useState, useCallback } from 'react';
import { supabase, type Product, type Category } from './supabase';

const PRODUCTS_STORAGE_KEY = 'bb_custom_products';
export const PRODUCTS_EVENT = 'bb_products_updated';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Wedding Gowns', slug: 'wedding-gowns', sort_order: 1 },
  { id: 'cat-2', name: 'Bridal Robes', slug: 'bridal-robes', sort_order: 2 },
  { id: 'cat-3', name: 'Veils', slug: 'veils', sort_order: 3 },
  { id: 'cat-4', name: 'Traditional Attire', slug: 'traditional-attire', sort_order: 4 },
  { id: 'cat-5', name: 'Evening Wear', slug: 'evening-wear', sort_order: 5 },
  { id: 'cat-6', name: 'Accessories', slug: 'accessories', sort_order: 6 },
];

export const PUBLIC_CATALOG_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'A-Line Silk Organza Bridal Gown',
    description: 'Handcrafted luxury bridal gown featuring intricate French lace, subtle shimmer accents, and lightweight silk organza that moves effortlessly with every step.',
    price: 1850000,
    category: 'Wedding Gowns',
    subcategory: 'Haute Couture',
    image_url: '/1.jpg',
    materials: 'French Lace, Pure Silk Organza, Pearl Buttons',
    lead_time: '6-8 weeks',
    tags: ['Couture', 'Silk', 'Featured', 'A-Line'],
    available: true,
    featured: true,
    best_seller: true,
    seasonal: false,
    signature: true,
    created_at: new Date('2026-08-18T10:00:00Z').toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Royal Chantilly Lace Wedding Dress',
    description: 'Timeless elegance tailored to perfection with hand-embroidered floral motifs, sheer illusion neckline, and delicate hand-placed pearl beading.',
    price: 2100000,
    category: 'Wedding Gowns',
    subcategory: 'Bridal Collection',
    image_url: '/2.jpg',
    materials: 'Chantilly Lace, Silk Mikado, Swarovski Crystals',
    lead_time: '6-8 weeks',
    tags: ['Lace', 'Elegant', 'Featured', 'Royal'],
    available: true,
    featured: true,
    best_seller: true,
    seasonal: false,
    signature: false,
    created_at: new Date('2026-08-18T09:30:00Z').toISOString(),
  },
  {
    id: 'prod-3',
    name: 'Kigali Haute Couture Bridal Gown',
    description: 'A masterpiece bespoke silhouette designed in our Kigali atelier to flatter gracefully with an exquisite dramatic train and regal sculpted corset.',
    price: 2450000,
    category: 'Wedding Gowns',
    subcategory: 'Signature Series',
    image_url: '/3.png',
    materials: 'Duchess Satin, Multi-layered Tulle, Hand Embroidery',
    lead_time: '8-10 weeks',
    tags: ['Bespoke', 'Couture', 'Featured', 'Dramatic Train'],
    available: true,
    featured: true,
    best_seller: false,
    seasonal: false,
    signature: true,
    created_at: new Date('2026-08-18T09:00:00Z').toISOString(),
  },
  {
    id: 'prod-4',
    name: 'Bespoke Embroidered Silhouette',
    description: 'Modern luxury bridal styling with clean architectural lines, graceful movement, and delicate golden threading tailored for the contemporary bride.',
    price: 1950000,
    category: 'Wedding Gowns',
    subcategory: 'Modern Bride',
    image_url: '/4.png',
    materials: 'Silk Crepe, Glass Beads, Soft Tulle',
    lead_time: '6-8 weeks',
    tags: ['Modern', 'Embroidered', 'Featured', 'Minimalist'],
    available: true,
    featured: true,
    best_seller: true,
    seasonal: true,
    signature: false,
    created_at: new Date('2026-08-18T08:30:00Z').toISOString(),
  },
  {
    id: 'prod-5',
    name: 'Pure Silk Mikado Bridal Robe',
    description: 'An opulent getting-ready robe made with premium Rwandan silk, featherweight lace trims, and customized monogramming for your unforgettable wedding morning.',
    price: 650000,
    category: 'Bridal Robes',
    subcategory: 'Morning of Wedding',
    image_url: '/5.jpg',
    materials: '100% Pure Silk, Chantilly Lace Sleeves',
    lead_time: '2-3 weeks',
    tags: ['Robe', 'Silk', 'Morning Prep', 'Bridal Party'],
    available: true,
    featured: false,
    best_seller: true,
    seasonal: false,
    signature: true,
    created_at: new Date('2026-08-18T08:00:00Z').toISOString(),
  },
  {
    id: 'prod-6',
    name: 'Traditional Rwandan Umushanana Gown',
    description: 'Honoring Rwandan heritage with extraordinary craftsmanship. Flowing Umushanana draping adorned with delicate golden filigree for Gusaba and traditional nuptials.',
    price: 1400000,
    category: 'Traditional Attire',
    subcategory: 'Gusaba & Cultural',
    image_url: '/6.jpg',
    materials: 'Gold Brocade, Chiffon Silk, Handmade Accessories',
    lead_time: '4-6 weeks',
    tags: ['Umushanana', 'Traditional', 'Gusaba', 'Cultural'],
    available: true,
    featured: false,
    best_seller: true,
    seasonal: false,
    signature: true,
    created_at: new Date('2026-08-18T07:30:00Z').toISOString(),
  },
  {
    id: 'prod-7',
    name: 'Cathedral Lace Trim Veil & Hairpiece',
    description: 'Dramatic 3-meter cathedral length veil trimmed with matching French lace scalloping, paired with an artisanal bridal pearl headpiece.',
    price: 420000,
    category: 'Veils',
    subcategory: 'Cathedral Veils',
    image_url: '/7.png',
    materials: 'Illusion Tulle, French Scalloped Lace, Freshwater Pearls',
    lead_time: '2-3 weeks',
    tags: ['Veil', 'Cathedral', 'Lace', 'Accessories'],
    available: true,
    featured: false,
    best_seller: true,
    seasonal: false,
    signature: false,
    created_at: new Date('2026-08-18T07:00:00Z').toISOString(),
  },
  {
    id: 'prod-8',
    name: 'Celebration & Reception Scarlet Evening Dress',
    description: 'A striking crimson evening gown tailored with rich draping and opulent silhouette, ideal for reception transitions, galas, and rehearsal dinners.',
    price: 1250000,
    category: 'Evening Wear',
    subcategory: 'Reception & Gala',
    image_url: '/red.jpg',
    materials: 'Royal Silk Mikado, Structured Corsetry',
    lead_time: '4-5 weeks',
    tags: ['Evening', 'Reception', 'Red Gown', 'Gala'],
    available: true,
    featured: false,
    best_seller: false,
    seasonal: true,
    signature: false,
    created_at: new Date('2026-08-18T06:30:00Z').toISOString(),
  },
  {
    id: 'prod-9',
    name: 'Haute Couture Bridal Party Collection',
    description: 'Coordinated bespoke ensembles crafted for the bridal party, merging cohesive Rwandan luxury styling with individually tailored silhouettes.',
    price: 3200000,
    category: 'Wedding Gowns',
    subcategory: 'Bridal Ensemble',
    image_url: '/group photo.jpg',
    materials: 'Fine Tulle, Silk Mikado, Beaded Appliqué',
    lead_time: '8-12 weeks',
    tags: ['Bridal Party', 'Ensemble', 'Haute Couture', 'Signature'],
    available: true,
    featured: false,
    best_seller: false,
    seasonal: false,
    signature: true,
    created_at: new Date('2026-08-18T06:00:00Z').toISOString(),
  },
];

export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  return PUBLIC_CATALOG_PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent(PRODUCTS_EVENT, { detail: products }));
  } catch {
    /* ignore */
  }
}

/**
 * Merges public catalog items with database items and local overrides
 */
export function mergeCatalogWithPublicProducts(databaseProducts: Product[]): Product[] {
  const localItems = getStoredProducts();
  if (!databaseProducts || databaseProducts.length === 0) {
    return localItems;
  }

  // Create a map keyed by ID
  const map = new Map<string, Product>();

  // 1. Initial base
  for (const p of PUBLIC_CATALOG_PRODUCTS) {
    map.set(p.id, p);
  }

  // 2. Database products
  for (const p of databaseProducts) {
    map.set(p.id, p);
  }

  // 3. Local admin overrides (highest priority for immediate dynamic changes)
  for (const p of localItems) {
    map.set(p.id, p);
  }

  return Array.from(map.values());
}
