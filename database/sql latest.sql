-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: servicehub
-- ------------------------------------------------------
-- Server version	9.7.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f6fdf577-8fda-11f1-818d-507b9dd6e96d:1-154';

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `provider_id` int NOT NULL,
  `service_id` int NOT NULL,
  `booking_date` date NOT NULL,
  `house_details` text,
  `status` enum('Pending','Accepted','Rejected','Completed') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `provider_id` (`provider_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,9,7,7,'2026-08-22','Chamnabad, Misrial Road Rawalpindi','Rejected','2026-08-21 06:34:57'),(2,9,7,7,'2026-08-22','Cmnabad, Misrial Road Rawalpindi','Completed','2026-08-21 06:36:42'),(3,9,2,2,'2026-08-22','Chmnabad, Misrial Road Rawalpindi','Completed','2026-08-21 06:39:43'),(4,10,2,2,'2026-08-22','Chmanbad, Misrial Road Rawalpinid','Completed','2026-08-21 06:43:03'),(5,10,7,7,'2026-08-25','h7uiu','Completed','2026-08-21 06:46:03'),(6,9,7,7,'2026-08-23','adsdsfd','Completed','2026-08-21 07:18:24');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider_services`
--

DROP TABLE IF EXISTS `provider_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider_id` int NOT NULL,
  `service_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_provider_service` (`provider_id`,`service_id`),
  KEY `provider_services_ibfk_2` (`service_id`),
  CONSTRAINT `provider_services_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `provider_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_services`
--

LOCK TABLES `provider_services` WRITE;
/*!40000 ALTER TABLE `provider_services` DISABLE KEYS */;
INSERT INTO `provider_services` VALUES (1,1,1,'2026-08-21 05:22:12'),(2,2,2,'2026-08-21 05:23:24'),(3,3,3,'2026-08-21 05:24:15'),(4,4,4,'2026-08-21 05:25:20'),(5,5,5,'2026-08-21 05:25:53'),(6,6,6,'2026-08-21 05:26:25'),(7,7,7,'2026-08-21 05:27:32'),(8,8,8,'2026-08-21 05:28:13');
/*!40000 ALTER TABLE `provider_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `city` varchar(100) NOT NULL,
  `years_experience` int DEFAULT '0',
  `profile_picture` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT '0.0',
  `reviews_count` int DEFAULT '0',
  `verified` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `providers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,1,'Islamabad',1,'/uploads/1787289732375-profile.png',0.0,0,0,'2026-08-21 05:22:12'),(2,2,'Islamabad',5,'/uploads/1787289804137-profile.png',2.0,2,0,'2026-08-21 05:23:24'),(3,3,'Islamabad',9,'/uploads/1787289855410-profile.png',0.0,0,0,'2026-08-21 05:24:15'),(4,4,'Islamabad',10,'/uploads/1787289920054-profile.png',0.0,0,0,'2026-08-21 05:25:20'),(5,5,'Islamabad',10,'/uploads/1787289952662-profile.png',0.0,0,0,'2026-08-21 05:25:53'),(6,6,'Islamabad',10,'/uploads/1787289985667-profile.png',0.0,0,0,'2026-08-21 05:26:25'),(7,7,'Rawalpindi',10,'/uploads/1787290052312-profile.png',4.3,3,0,'2026-08-21 05:27:32'),(8,8,'Rawalpindi',10,'/uploads/1787290092888-profile.png',0.0,0,0,'2026-08-21 05:28:13');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `provider_id` int NOT NULL,
  `rating` tinyint NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_id` (`booking_id`),
  KEY `customer_id` (`customer_id`),
  KEY `provider_id` (`provider_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,2,9,7,5,'Goood experience with the provider.','2026-08-21 06:38:47'),(2,3,9,2,3,'Avrgae work condition. nto satisfied','2026-08-21 06:41:32'),(3,4,10,2,1,'Very Bad service and behaviour','2026-08-21 06:44:06'),(4,5,10,7,5,'very good','2026-08-21 06:47:17'),(5,6,9,7,3,NULL,'2026-08-21 07:21:07');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Electrician','electrician'),(2,'Plumber','plumber'),(3,'Painter','painter'),(4,'Cleaner','cleaner'),(5,'Mechanic','mechanic'),(6,'Carpenter','carpenter'),(7,'Home Tutor','home-tutor'),(8,'AC Technician','ac-technician');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('customer','provider') NOT NULL DEFAULT 'customer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Usama','usama@gmail.com','0823494280','$2b$10$zAwfDklsZTXvaXlRzL94FeBsyZ.v/Uc4HuBMrygTyaTTuP1Ldj77m','provider','2026-08-21 05:22:12'),(2,'Ali','ali@gmail.com','29874974239','$2b$10$Jja54y8DlZwDC3Eaz4Ea3.nM5sMHobvYiKqsx.tc9mWesR4Oji//2','provider','2026-08-21 05:23:24'),(3,'Yasir','yasir@gmail.com','84329470','$2b$10$OdN8F/JDCplI12WZdd/3x.DnRzf779..syFGKYYVqAb8C2n5/JXUO','provider','2026-08-21 05:24:15'),(4,'Ahmer','ahmer@gamil.com','643296942649','$2b$10$z5YknR47reUrVoreyhu1Lec5/MOSDgfNsChVDviwVa1/zw6LC4i7y','provider','2026-08-21 05:25:20'),(5,'Ahmed','ahmer@gmail.com','47949823','$2b$10$SOW6ckoAjvFv1j8Sm5FQyOrep1FQSKGsyq3HA50jab.XuO4Y8REsS','provider','2026-08-21 05:25:53'),(6,'Talha','talha@gmail.com','098765432','$2b$10$uT7adb672JsRvIV.AlDKF..NY0vIOvdZ.4EULlN8MvLqp04qQYFym','provider','2026-08-21 05:26:25'),(7,'Yusra Shabaz ','yusra@gmail.com','23456789','$2b$10$Jzt9v6KE2G17AFAejzhT/.kyxVZk.J7HqL3n816AxTY2IXLYgGRc.','provider','2026-08-21 05:27:32'),(8,'Ali Raza','aliraza@gmail.com','23456789','$2b$10$Eg6mQGw1u0r/8PXNqxwdVOlGcWMJnvEMLE3wwUdry5Umx0LZsMvZa','provider','2026-08-21 05:28:13'),(9,'Usman','usman@gmail.com','987654323458','$2b$10$pqoyPYoYobfUcM8JAttGfeTuX650U0pPmROvrva1YQBX2/HM1fZfy','customer','2026-08-21 05:31:03'),(10,'Usmanii','usmanii@gmail.com','23456789','$2b$10$Yaqn7tqeKHqZJ3xhVeH9AeIS3b56bloPOJ9vv8.lOQk7qVm9Jfhoq','customer','2026-08-21 06:42:24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-21 12:43:21
