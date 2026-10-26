import type { Order } from './supabase';

const ORDERS_STORAGE_KEY = 'bb_orders';

/**
 * Generates dynamic realistic simulated orders relative to the current date/time,
 * ensuring the last 7 days of the admin dashboard chart and orders tables look lively and active.
 */
export function generateSimulatedOrders(): Order[] {
  const now = new Date();

  const createDate = (daysAgo: number, hoursOffset: number = 0): string => {
    const d = new Date(now.getTime());
    d.setDate(d.getDate() - daysAgo);
    d.setHours(d.getHours() - hoursOffset);
    return d.toISOString();
  };

  return [
    {
      id: 'ord-sim-1',
      order_number: 'BB-892401',
      customer_name: 'Aline Uwase',
      customer_email: 'aline.uwase@gmail.com',
      customer_phone: '+250 788 345 678',
      status: 'processing',
      total: 1865000,
      user_id: 'cust-1',
      created_at: createDate(0, 3), // Today, 3 hours ago
      items: [
        {
          id: 'prod-1',
          name: 'A-Line Silk Organza Bridal Gown',
          price: 1850000,
          quantity: 1,
          image_url: '/1.jpg',
          category: 'Wedding Gowns',
        },
      ],
    },
    {
      id: 'ord-sim-2',
      order_number: 'BB-891942',
      customer_name: 'Keza Mutoni Diane',
      customer_email: 'keza.mutoni@gmail.com',
      customer_phone: '+250 783 219 044',
      status: 'processing',
      total: 2535000,
      user_id: 'cust-2',
      created_at: createDate(1, 6), // 1 day ago
      items: [
        {
          id: 'prod-2',
          name: 'Royal Chantilly Lace Wedding Dress',
          price: 2100000,
          quantity: 1,
          image_url: '/2.jpg',
          category: 'Wedding Gowns',
        },
        {
          id: 'prod-7',
          name: 'Cathedral Lace Trim Veil & Hairpiece',
          price: 420000,
          quantity: 1,
          image_url: '/7.png',
          category: 'Veils',
        },
      ],
    },
    {
      id: 'ord-sim-3',
      order_number: 'BB-889410',
      customer_name: 'Sandrine Mukamana',
      customer_email: 'sandrine.m@yahoo.com',
      customer_phone: '+250 789 554 112',
      status: 'shipped',
      total: 1415000,
      user_id: 'cust-3',
      created_at: createDate(2, 4), // 2 days ago
      items: [
        {
          id: 'prod-6',
          name: 'Traditional Rwandan Umushanana Gown',
          price: 1400000,
          quantity: 1,
          image_url: '/6.jpg',
          category: 'Traditional Attire',
        },
      ],
    },
    {
      id: 'ord-sim-4',
      order_number: 'BB-887329',
      customer_name: 'Marie-Claire Gasana',
      customer_email: 'mc.gasana@gmail.com',
      customer_phone: '+250 788 672 901',
      status: 'delivered',
      total: 3115000,
      user_id: 'cust-4',
      created_at: createDate(3, 8), // 3 days ago
      items: [
        {
          id: 'prod-3',
          name: 'Kigali Haute Couture Bridal Gown',
          price: 2450000,
          quantity: 1,
          image_url: '/3.png',
          category: 'Wedding Gowns',
        },
        {
          id: 'prod-5',
          name: 'Pure Silk Mikado Bridal Robe',
          price: 650000,
          quantity: 1,
          image_url: '/5.jpg',
          category: 'Bridal Robes',
        },
      ],
    },
    {
      id: 'ord-sim-5',
      order_number: 'BB-885108',
      customer_name: 'Fiona Umutoni',
      customer_email: 'fiona.umutoni@outlook.com',
      customer_phone: '+250 781 443 289',
      status: 'delivered',
      total: 1965000,
      user_id: 'cust-5',
      created_at: createDate(4, 5), // 4 days ago
      items: [
        {
          id: 'prod-4',
          name: 'Bespoke Embroidered Silhouette',
          price: 1950000,
          quantity: 1,
          image_url: '/4.png',
          category: 'Wedding Gowns',
        },
      ],
    },
    {
      id: 'ord-sim-6',
      order_number: 'BB-883921',
      customer_name: 'Divine Ingabire',
      customer_email: 'divine.ingabire@gmail.com',
      customer_phone: '+250 785 889 012',
      status: 'delivered',
      total: 1265000,
      user_id: 'cust-6',
      created_at: createDate(5, 7), // 5 days ago
      items: [
        {
          id: 'prod-8',
          name: 'Celebration & Reception Scarlet Evening Dress',
          price: 1250000,
          quantity: 1,
          image_url: '/red.jpg',
          category: 'Evening Wear',
        },
      ],
    },
    {
      id: 'ord-sim-7',
      order_number: 'BB-881044',
      customer_name: 'Clarisse Uwimana',
      customer_email: 'clarisse.u@gmail.com',
      customer_phone: '+250 788 112 345',
      status: 'delivered',
      total: 1085000,
      user_id: 'cust-7',
      created_at: createDate(6, 9), // 6 days ago
      items: [
        {
          id: 'prod-5',
          name: 'Pure Silk Mikado Bridal Robe',
          price: 650000,
          quantity: 1,
          image_url: '/5.jpg',
          category: 'Bridal Robes',
        },
        {
          id: 'prod-7',
          name: 'Cathedral Lace Trim Veil & Hairpiece',
          price: 420000,
          quantity: 1,
          image_url: '/7.png',
          category: 'Veils',
        },
      ],
    },
  ];
}

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  const simulated = generateSimulatedOrders();
  saveStoredOrders(simulated);
  return simulated;
}

export function saveStoredOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('bb_orders_updated', { detail: orders }));
  } catch {
    /* ignore */
  }
}

export function ensureSimulatedOrdersExist(): void {
  const current = getStoredOrders();
  if (!current || current.length === 0) {
    saveStoredOrders(generateSimulatedOrders());
  }
}
