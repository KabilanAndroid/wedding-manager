-- Food & catering items an admin can offer for an event
CREATE TABLE IF NOT EXISTS food_items (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255)   NOT NULL,
  description   TEXT           NULL,
  price         DECIMAL(10, 2) NOT NULL,                 -- price per plate
  dietary_type  ENUM('Vegetarian', 'Non-Vegetarian') NOT NULL,
  image_url     TEXT           NULL,                     -- Cloudinary URL
  status        ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
