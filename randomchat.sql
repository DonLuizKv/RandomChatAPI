-- DROP DATABASE IF EXISTS randomchat;
-- CREATE DATABASE randomchat;
USE randomchat;

-- DROP TABLE IF EXISTS users;

-- -- Tables
-- CREATE TABLE users (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   username VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO users (username, email, password) VALUES
('jausjuas', 'juasjuas@gmail.com', '$2b$10$Wdwms2mhwuElXQtROZ6RdOlTj8n.Wb13xFsSPh3aekI.dSr0bopn2');

