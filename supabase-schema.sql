-- Supabase Database Schema for Vevantae
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) CHECK (category IN ('ayurvedic', 'nutraceutical')) NOT NULL,
  image_url TEXT,
  ingredients TEXT[], -- Array of strings
  benefits TEXT[], -- Array of strings
  age_group TEXT[], -- Array of strings
  lifestyle_problems TEXT[], -- Array of strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author VARCHAR(255) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category VARCHAR(100),
  tags TEXT[], -- Array of strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_forms table (for form submissions)
CREATE TABLE IF NOT EXISTS contact_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_product_id ON testimonials(product_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on blog_posts" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on testimonials" ON testimonials
  FOR SELECT USING (true);

-- Allow public insert on contact forms
CREATE POLICY "Allow public insert on contact_forms" ON contact_forms
  FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data

-- Sample products
INSERT INTO products (name, description, price, category, image_url, ingredients, benefits, age_group, lifestyle_problems) VALUES
('Ashwagandha Premium', 'Premium quality Ashwagandha extract for stress relief and vitality', 899.00, 'ayurvedic', '/api/placeholder/400/500', 
 ARRAY['Ashwagandha Root Extract', 'Organic Turmeric', 'Black Pepper Extract'], 
 ARRAY['Reduces stress and anxiety', 'Improves energy levels', 'Supports immune system'], 
 ARRAY['Adults 18-65'], 
 ARRAY['Stress', 'Low Energy', 'Poor Sleep']),

('Turmeric Curcumin Complex', 'High-potency turmeric with enhanced bioavailability', 699.00, 'ayurvedic', '/api/placeholder/400/500',
 ARRAY['Turmeric Root Extract', 'Curcumin 95%', 'Piperine'], 
 ARRAY['Anti-inflammatory properties', 'Joint health support', 'Antioxidant protection'], 
 ARRAY['Adults 25+'], 
 ARRAY['Joint Pain', 'Inflammation', 'Low Immunity']),

('Omega-3 Fish Oil', 'Pure fish oil with EPA and DHA for heart and brain health', 1299.00, 'nutraceutical', '/api/placeholder/400/500',
 ARRAY['Fish Oil', 'EPA', 'DHA', 'Vitamin E'], 
 ARRAY['Heart health support', 'Brain function enhancement', 'Anti-inflammatory'], 
 ARRAY['Adults 18+'], 
 ARRAY['Heart Health', 'Brain Fog', 'Inflammation']);

-- Sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author, category, tags) VALUES
('The Science Behind Ashwagandha', 'science-behind-ashwagandha', 'Discover the research-backed benefits of this ancient adaptogen', 
 'Ashwagandha, scientifically known as Withania somnifera, has been used in Ayurvedic medicine for over 3,000 years...', 
 '/api/placeholder/600/400', 'Dr. Priya Sharma', 'Ayurveda', 
 ARRAY['ashwagandha', 'adaptogens', 'stress-relief']),

('Turmeric: The Golden Spice of Life', 'turmeric-golden-spice-life', 'Exploring the anti-inflammatory properties of turmeric and curcumin', 
 'Turmeric has been revered in traditional medicine systems for centuries. Modern science has validated many of its traditional uses...', 
 '/api/placeholder/600/400', 'Dr. Rajesh Kumar', 'Nutrition', 
 ARRAY['turmeric', 'curcumin', 'inflammation']);

-- Sample testimonials
INSERT INTO testimonials (name, rating, comment, product_id) VALUES
('Anita Sharma', 5, 'Ashwagandha has completely transformed my energy levels. I feel more balanced and less stressed.', 
 (SELECT id FROM products WHERE name = 'Ashwagandha Premium' LIMIT 1)),

('Rajesh Patel', 4, 'Great quality turmeric supplement. I\'ve noticed reduced joint pain after using it for 2 months.', 
 (SELECT id FROM products WHERE name = 'Turmeric Curcumin Complex' LIMIT 1)),

('Meera Singh', 5, 'Excellent omega-3 supplement. My doctor is impressed with my improved heart health markers.', 
 (SELECT id FROM products WHERE name = 'Omega-3 Fish Oil' LIMIT 1));