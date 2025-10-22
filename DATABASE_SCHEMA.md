# EDNA Database Schema Documentation

## Overview
This database schema is designed for the EDNA platform, a modern lifestyle and fashion web application with social features, content management, and user engagement capabilities.

## Core Tables

### Users (`users`)
- **Purpose**: Store user account information and authentication data
- **Key Features**: 
  - UUID primary keys for security
  - Role-based access control (user, admin, moderator)
  - Profile information and verification status
  - Soft delete capability with `is_active` flag

### Posts (`posts`)
- **Purpose**: Main content table for articles, blog posts, and other content
- **Key Features**:
  - SEO-friendly slugs
  - Draft/published/archived status workflow
  - Featured content capability
  - Automatic view and engagement counting
  - Rich content support

### Categories (`categories`)
- **Purpose**: Hierarchical content organization
- **Key Features**:
  - Self-referencing for nested categories
  - SEO-friendly slugs
  - Custom sorting order
  - Image support for visual categories

## Social Features

### Comments (`comments`)
- **Purpose**: User engagement through threaded comments
- **Key Features**:
  - Nested comment support (replies)
  - Moderation with approval system
  - Like counting

### Likes (`likes`)
- **Purpose**: User engagement tracking
- **Key Features**:
  - Support for both post and comment likes
  - Prevents duplicate likes per user
  - Automatic count updates via triggers

### Follows (`follows`)
- **Purpose**: Social networking features
- **Key Features**:
  - User-to-user following relationships
  - Prevents self-following
  - Unique constraint to prevent duplicate follows

## Content Management

### Media (`media`)
- **Purpose**: File upload and media management
- **Key Features**:
  - Image metadata storage (dimensions, file size)
  - Alt text for accessibility
  - File path and URL tracking
  - User attribution

### Tags (`tags`)
- **Purpose**: Flexible content tagging system
- **Key Features**:
  - Many-to-many relationship with posts
  - Usage counting for popular tags
  - Color coding for visual organization
  - SEO-friendly slugs

## System Features

### Notifications (`notifications`)
- **Purpose**: User alert system
- **Key Features**:
  - Flexible notification types
  - JSON data storage for custom payloads
  - Read/unread status tracking
  - Efficient querying with indexes

### User Sessions (`user_sessions`)
- **Purpose**: Authentication session management
- **Key Features**:
  - JWT token storage
  - Refresh token support
  - Session metadata (IP, user agent)
  - Automatic cleanup capability

### User Settings (`user_settings`)
- **Purpose**: User preference storage
- **Key Features**:
  - Key-value pair storage
  - Per-user customization
  - Flexible setting types

### Audit Logs (`audit_logs`)
- **Purpose**: Security and compliance tracking
- **Key Features**:
  - Action logging with before/after values
  - User attribution
  - IP and user agent tracking
  - JSON storage for flexible data

## Performance Optimizations

### Indexes
- Strategic indexes on frequently queried columns
- Composite indexes for complex queries
- Foreign key indexes for join performance

### Triggers
- Automatic timestamp updates
- Real-time count maintenance
- Data consistency enforcement

### Constraints
- Data integrity enforcement
- Business rule validation
- Referential integrity

## Security Features

### Data Protection
- UUID primary keys prevent enumeration attacks
- Password hashing (implementation required)
- Soft deletes preserve data integrity
- Audit trail for sensitive operations

### Access Control
- Role-based permissions
- User verification system
- Session management
- IP tracking for security monitoring

## Scalability Considerations

### Database Design
- Normalized structure reduces data redundancy
- Efficient indexing strategy
- Partitioning-ready timestamp columns
- JSON fields for flexible data storage

### Performance
- Optimized for read-heavy workloads
- Efficient counting via triggers
- Proper foreign key relationships
- Query-optimized indexes

## Usage Examples

### Common Queries
\`\`\`sql
-- Get user's posts with engagement metrics
SELECT p.*, u.username, c.name as category_name
FROM posts p
JOIN users u ON p.author_id = u.id
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.status = 'published'
ORDER BY p.published_at DESC;

-- Get user's notifications
SELECT * FROM notifications
WHERE user_id = $1 AND is_read = false
ORDER BY created_at DESC;

-- Get popular tags
SELECT * FROM tags
ORDER BY usage_count DESC
LIMIT 10;
\`\`\`

This schema provides a solid foundation for a modern social content platform with room for future expansion and optimization.
