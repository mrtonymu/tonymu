-- Tony Portfolio — Supabase Database Schema
-- Run this in the Supabase SQL Editor to set up all tables

-- Portfolio items
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'zh', 'ms')),
  category TEXT CHECK (category IN ('property', 'tech')),
  images TEXT[],
  link TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(slug, locale)
);

-- Blog posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'zh', 'ms')),
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(slug, locale)
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_title TEXT,
  quote TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'zh', 'ms')),
  avatar_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'zh', 'ms')),
  slug TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  UNIQUE(slug, locale)
);

-- Site settings
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
  ('whatsapp', '{"number": "60123456789", "messages": {"en": "Hi Tony, I''d like to know more about your services.", "zh": "你好 Tony，我想了解更多关于你的服务。", "ms": "Hi Tony, saya ingin tahu lebih lanjut tentang perkhidmatan anda."}}'),
  ('personal_info', '{"name": "Tony Mu", "tagline": {"en": "Property Advisory | Digital Solutions", "zh": "房产顾问 | 数字解决方案", "ms": "Penasihat Hartanah | Penyelesaian Digital"}, "photo_url": ""}');

-- Enable Row Level Security
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Public read" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read" ON services FOR SELECT USING (true);
CREATE POLICY "Public read" ON site_settings FOR SELECT USING (true);

-- Authenticated write access (admin only)
CREATE POLICY "Admin write" ON portfolio_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
