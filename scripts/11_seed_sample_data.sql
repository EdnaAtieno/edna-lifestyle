-- Insert sample categories
insert into public.categories (name, slug, description, color, icon) values
  ('Fashion', 'fashion', 'Latest fashion trends and style inspiration', '#ec4899', 'Shirt'),
  ('Lifestyle', 'lifestyle', 'Daily life, wellness, and personal growth', '#8b5cf6', 'Heart'),
  ('Beauty', 'beauty', 'Skincare, makeup, and beauty tips', '#f59e0b', 'Sparkles'),
  ('Travel', 'travel', 'Travel guides and adventure stories', '#10b981', 'MapPin'),
  ('Food', 'food', 'Recipes, restaurants, and culinary experiences', '#ef4444', 'UtensilsCrossed')
on conflict (slug) do nothing;

-- Insert sample tags
insert into public.tags (name, slug, description) values
  ('Trending', 'trending', 'Currently popular content'),
  ('Style Tips', 'style-tips', 'Fashion and style advice'),
  ('DIY', 'diy', 'Do it yourself projects'),
  ('Sustainable', 'sustainable', 'Eco-friendly and sustainable living'),
  ('Minimalist', 'minimalist', 'Minimalist lifestyle and design'),
  ('Vintage', 'vintage', 'Vintage fashion and decor'),
  ('Wellness', 'wellness', 'Health and wellness content'),
  ('Photography', 'photography', 'Photography tips and inspiration')
on conflict (slug) do nothing;
