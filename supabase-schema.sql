-- =========================================================
-- Schéma de base de données pour le site Charenton TT
-- À exécuter dans l'éditeur SQL de Supabase
-- =========================================================

-- 1. Table des Posts (Actualités)
CREATE TABLE posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    date DATE NOT NULL,
    year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table du Bandeau Défilant
CREATE TABLE ticker_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    text TEXT NOT NULL,
    image_url TEXT,
    link TEXT,
    active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table du Bureau
CREATE TABLE bureau_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL,
    photo_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table des Équipes
CREATE TABLE teams (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    pool TEXT NOT NULL,
    players TEXT[] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Table des Documents (Inscriptions & Stages)
CREATE TABLE documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('inscription', 'stage')),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Table du Contenu du Site (Ex: Historique)
CREATE TABLE site_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- Configuration du Storage (Stockage des images)
-- =========================================================

-- IMPORTANT: Vous devez créer manuellement un bucket nommé "uploads" 
-- dans l'interface Storage de Supabase et le rendre "Public".
-- Ou exécuter la requête suivante si vous avez les droits admin complets :
-- insert into storage.buckets (id, name, public) values ('uploads', 'uploads', true);

-- Politique pour permettre à tout le monde de lire les images
create policy "Images publiques"
  on storage.objects for select
  using ( bucket_id = 'uploads' );

-- Politique pour permettre l'upload (Sécurisé par le backend API Next.js)
create policy "Upload d'images"
  on storage.objects for insert
  with check ( bucket_id = 'uploads' );

-- =========================================================
-- Données initiales (Optionnel)
-- =========================================================

INSERT INTO site_content (key, title, content) VALUES (
    'historique', 
    'Historique du Club',
    'Avril 1953 — Fondation du club sous le nom SOC/SOSC Charenton. Premier président : Albert Frère (1953-1966).

1961/62 — Le club atteint la Nationale 3.

1962/63 — Champion de France de Nationale 3.

1971/72 — Champion de France de Nationale 1 ! Victoire 11-8 contre l''US Messine (avec Jacques Secrétin dans leurs rangs).

1972/73 — Quarts de finale de la Coupe d''Europe.

1974/75 — Nouveau quart de finale européen.

1975/76 — Champion de France de Nationale 2.

Aujourd''hui — Le club continue de briller avec des équipes de la Nationale au Départemental, un programme jeunes labellisé FFTT, et une communauté passionnée.'
);
