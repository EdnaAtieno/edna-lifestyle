-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Fashion', 'fashion', 'Latest fashion trends and style guides'),
('Lifestyle', 'lifestyle', 'Lifestyle tips and inspiration'),
('Beauty', 'beauty', 'Beauty tips, tutorials, and product reviews'),
('Travel', 'travel', 'Travel guides and destination inspiration'),
('Health & Wellness', 'health-wellness', 'Health tips and wellness advice');

-- Insert sample tags
INSERT INTO tags (name, slug, description, color) VALUES
('trending', 'trending', 'Currently trending content', '#ff6b6b'),
('summer', 'summer', 'Summer-related content', '#feca57'),
('style', 'style', 'Style and fashion content', '#48dbfb'),
('tips', 'tips', 'Helpful tips and advice', '#0abde3'),
('inspiration', 'inspiration', 'Inspirational content', '#ff9ff3');

-- Insert sample admin user (password should be hashed in real application)
INSERT INTO users (email, password_hash, first_name, last_name, username, role, is_verified) VALUES
('admin@edna.com', '$2b$10$example_hashed_password', 'Admin', 'User', 'admin', 'admin', true);
