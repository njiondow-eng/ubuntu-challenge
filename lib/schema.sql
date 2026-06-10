-- ================================================
-- UBUNTU CHALLENGE — Schéma SQL Supabase
-- Copiez-collez ce code dans :
-- Supabase Dashboard > SQL Editor > New Query
-- ================================================

-- TABLE: players
create table public.players (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  country text not null,
  country_code text not null,
  university text not null,
  position text not null,
  height text not null,
  ppg numeric(4,1) default 0,
  rpg numeric(4,1) default 0,
  apg numeric(4,1) default 0,
  bpg numeric(4,1) default 0,
  spg numeric(4,1) default 0,
  photo_url text,
  bio text,
  is_featured boolean default false
);

-- TABLE: news
create table public.news (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null check (category in (
    'Season Update','Achievement','Community',
    'Partnership','Education','Announcement','Media'
  )),
  cover_image_url text,
  published boolean default false,
  published_at timestamp with time zone
);

-- TABLE: events
create table public.events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  description text not null,
  location text not null,
  event_date date not null,
  event_time text not null,
  category text not null check (category in (
    'Tournament','Community','VIP','Championship','Clinic'
  )),
  registration_open boolean default false,
  registration_url text
);

-- TABLE: sponsors
create table public.sponsors (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  tier text not null check (tier in ('bronze','silver','gold','custom')),
  logo_url text,
  website_url text,
  description text,
  is_active boolean default true
);

-- TABLE: contact_inquiries
create table public.contact_inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  full_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  read boolean default false
);

-- ================================================
-- STORAGE BUCKET pour les images
-- ================================================
insert into storage.buckets (id, name, public)
values ('ubuntu-media', 'ubuntu-media', true);

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

-- Players: lecture publique, écriture admin seulement
alter table public.players enable row level security;
create policy "Players lisibles par tous" on public.players
  for select using (true);
create policy "Players modifiables par admin" on public.players
  for all using (auth.role() = 'authenticated');

-- News: lecture publique (published only), écriture admin
alter table public.news enable row level security;
create policy "News publiées lisibles par tous" on public.news
  for select using (published = true);
create policy "Admin voit tout" on public.news
  for all using (auth.role() = 'authenticated');

-- Events: lecture publique, écriture admin
alter table public.events enable row level security;
create policy "Events lisibles par tous" on public.events
  for select using (true);
create policy "Events modifiables par admin" on public.events
  for all using (auth.role() = 'authenticated');

-- Sponsors: lecture publique (active only), écriture admin
alter table public.sponsors enable row level security;
create policy "Sponsors actifs lisibles par tous" on public.sponsors
  for select using (is_active = true);
create policy "Sponsors modifiables par admin" on public.sponsors
  for all using (auth.role() = 'authenticated');

-- Contact: écriture publique (formulaire), lecture admin seulement
alter table public.contact_inquiries enable row level security;
create policy "Tout le monde peut envoyer un message" on public.contact_inquiries
  for insert with check (true);
create policy "Admin lit les messages" on public.contact_inquiries
  for select using (auth.role() = 'authenticated');

-- ================================================
-- DONNÉES DE TEST — joueurs exemple
-- ================================================
insert into public.players (name, country, country_code, university, position, height, ppg, rpg, apg, bpg, is_featured)
values
  ('Jean-Marc Essono', 'Cameroon', 'CMR', 'University of Santo Tomas', 'Power Forward', '6''7"', 18.4, 9.2, 1.8, 2.1, true),
  ('Chukwuemeka Obi', 'Nigeria', 'NGA', 'Ateneo de Manila', 'Point Guard', '6''1"', 21.7, 3.2, 5.8, 0.4, true),
  ('Emmanuel Kollie', 'Liberia', 'LBR', 'De La Salle University', 'Small Forward', '6''5"', 15.3, 7.4, 3.2, 1.1, true),
  ('Patrick Niyomugabo', 'Rwanda', 'RWA', 'Far Eastern University', 'Center', '6''9"', 12.9, 11.1, 1.4, 3.7, true);
