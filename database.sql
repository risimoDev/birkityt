-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `birkityt` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `birkityt`;

-- Submissions (contact and calculator requests)
CREATE TABLE IF NOT EXISTS `submissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('contact','calculator') NOT NULL,
  `name` VARCHAR(255) NULL,
  `phone` VARCHAR(64) NULL,
  `email` VARCHAR(255) NULL,
  `message` TEXT NULL,
  `payload` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Works images
CREATE TABLE IF NOT EXISTS `works` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NULL,
  `description` VARCHAR(500) NULL,
  `image_webp` VARCHAR(500) NOT NULL,
  `image_original` VARCHAR(500) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
