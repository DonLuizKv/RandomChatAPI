DROP DATABASE IF EXISTS randomchat;
CREATE DATABASE randomchat;
USE randomchat;

DROP TABLE IF EXISTS users;

-- Tables
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Inserts

INSERT INTO users (id, username, email, password, created_at, updated_at) VALUES
(1, 'xibia', 'admin@randomchat.com', '$2a$10$SAucIuQ.0lkS.M2XfAnHSeIFFjCVzKaO37jJ2gZMlrbsKAamCYIrW', '2025-04-23 23:14:42', '2025-04-23 23:14:42');
