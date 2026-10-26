import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const ADMIN_EMAIL = 'admin@actwavelab.rw';

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  subcategory: string | null;
  image_url: string | null;
  materials: string | null;
  lead_time: string | null;
  tags: string[] | null;
  available: boolean;
  featured: boolean;
  best_seller: boolean;
  seasonal: boolean;
  signature: boolean;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  items: any[];
  total: number;
  status: string;
  user_id: string | null;
  created_at: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  user_id: string | null;
  created_at: string;
};

export type Settings = {
  // Contact & Business Info
  contact_email: string;
  phone: string;
  address: string;
  location_name: string;
  shipping_fee: number;
  instagram_handle: string;
  instagram_url: string;

  // Hero Section
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;

  // Announcement Bar
  announcement_enabled: boolean;
  announcement_message: string;

  // About & Brand Story
  about_headline: string;
  about_subtitle: string;
  about_story_p1: string;
  about_story_p2: string;
  about_story_p3: string;

  // CTA Section
  cta_title: string;
  cta_subtitle: string;
  cta_button: string;

  // FAQ
  faq: { q: string; a: string }[];
};

export type Announcement = {
  id: string;
  message: string;
  type: string;
  active: boolean;
  created_at: string;
};

export const DEFAULT_SETTINGS: Settings = {
  contact_email: 'assumptakayiranga05@gmail.com',
  phone: '+250 798 618 524',
  address: 'Kicukiro, Kigali, Rwanda',
  location_name: 'Kicukiro · Kigali, Rwanda',
  shipping_fee: 0,
  instagram_handle: '@rehemamissionrwanda',
  instagram_url: 'https://www.instagram.com',

  hero_title_line1: 'A difficult chapter',
  hero_title_line2: 'does not define a whole life.',
  hero_subtitle: 'Rehema Mission Rwanda walks alongside young people and families facing addiction and related challenges through listening, follow-up, prevention, family engagement, and creative expression.',
  hero_cta_primary: 'Discover Our Mission',
  hero_cta_secondary: 'Explore the Art Gallery',

  announcement_enabled: true,
  announcement_message: '“Thus far the Lord has helped us” (1 Samuel 7:12) — Welcome to Rehema Mission Rwanda · Kicukiro, Kigali',

  about_headline: 'A place to be heard. A path toward possibility.',
  about_subtitle: 'Faith-Rooted, Youth-Centered Social Mission Founded in 1998',
  about_story_p1: 'Rehema Mission Rwanda began with a belief: when young people are listened to, respected, and supported, they can begin to see beyond the challenges in front of them.',
  about_story_p2: 'Founded by Assumpta Kayiranga in 1998, in the years following the 1994 genocide against the Tutsi in Rwanda, Rehema Mission Rwanda grew from a commitment to listen to young people and respond to their needs. Many young people carry difficult questions about identity, belonging, relationships, and their future. They need more than judgment; they need space to speak, caring guidance, and adults who take their experiences seriously.',
  about_story_p3: 'Our mission is rooted in faith in Jesus Christ and inspired by the biblical reminder of Ebenezer: “Thus far the Lord has helped us” (1 Samuel 7:12). For us, this is a reminder that the past does not have to be the end of the story. With support, responsibility, and purpose, a new chapter can begin.',

  cta_title: 'Stronger futures are built together.',
  cta_subtitle: 'Schools, community organizations, galleries, institutions, and individuals can help expand opportunities for young people and families. Let’s discuss a practical way to work together.',
  cta_button: 'Start a Conversation',

  faq: [
    {
      q: 'Is Rehema Mission Rwanda a rehabilitation center?',
      a: 'No. Rehema’s mission document explains that it is not a rehabilitation center. When specialized care is needed, the team can help individuals identify suitable detoxification or rehabilitation services and may provide follow-up support. Contact us to confirm what is currently available.',
    },
    {
      q: 'Can I buy an artwork online?',
      a: 'You can explore the works shown in the gallery and contact us to confirm current availability, price, and the purchase process. The team will explain payment and collection or delivery options.',
    },
    {
      q: 'Does every artwork tell a personal recovery story?',
      a: 'Not necessarily. Each artist chooses what to share. Some stories may focus on technique, imagination, relationships, hope, or the meaning of the image. The artwork should always be allowed to speak for itself.',
    },
    {
      q: 'Can I view an artwork in person?',
      a: 'Contact us before visiting. We will confirm the current viewing location and whether an appointment is available.',
    },
    {
      q: 'How can our organization collaborate with Rehema?',
      a: 'Send us a message describing your organization, the people you serve, and the type of collaboration you have in mind. We will discuss possibilities and current capacity.',
    },
  ],
};
