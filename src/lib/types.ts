// ==========================================
// Types pour la base de données Supabase
// ==========================================

export interface Post {
  id: string;
  title: string;
  description: string;
  images: string[];
  date: string;
  year: number;
  created_at: string;
}

export interface TickerItem {
  id: string;
  text: string;
  image_url: string | null;
  link: string | null;
  active: boolean;
  order_index: number;
}

export interface BureauMember {
  id: string;
  photo_url: string;
  first_name: string;
  last_name: string;
  role: string;
  order_index: number;
}

export interface Team {
  id: string;
  name: string;
  pool: string;
  players: string[];
  order_index: number;
}

export interface Document {
  id: string;
  type: 'inscription' | 'stage';
  title: string;
  file_url: string;
  order_index: number;
}

export interface SiteContent {
  id: string;
  key: string;
  title: string;
  content: string;
  updated_at: string;
}

// ==========================================
// Types pour les formulaires admin
// ==========================================

export interface PostFormData {
  title: string;
  description: string;
  images: string[];
  date: string;
}

export interface TickerFormData {
  text: string;
  image_url?: string;
  link?: string;
  active: boolean;
}

export interface BureauFormData {
  photo_url: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface TeamFormData {
  name: string;
  pool: string;
  players: string[];
}

export interface DocumentFormData {
  type: 'inscription' | 'stage';
  title: string;
  file_url: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
