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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f6fdf577-8fda-11f1-818d-507b9dd6e96d:1-102';

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider_services`
--

LOCK TABLES `provider_services` WRITE;
/*!40000 ALTER TABLE `provider_services` DISABLE KEYS */;
INSERT INTO `provider_services` VALUES (1,1,1,'2026-08-18 07:01:36'),(2,3,2,'2026-08-18 07:01:36'),(28,5,8,'2026-08-20 04:27:48'),(29,2,7,'2026-08-20 04:28:39'),(32,4,3,'2026-08-20 04:31:37'),(33,6,5,'2026-08-20 04:34:17'),(34,7,6,'2026-08-20 04:36:01'),(35,8,4,'2026-08-20 04:38:01'),(36,9,1,'2026-08-20 04:42:23');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,2,'Islamabad',0,'/uploads/1787285935241-profile.png',0.0,0,0,'2026-08-17 05:30:58'),(2,4,'Islamabad',1,'/uploads/1787285901879-profile.png',0.0,0,0,'2026-08-17 05:34:19'),(3,6,'Rawalpindi',4,'/uploads/1786953108207-profile.png',0.0,0,0,'2026-08-17 07:51:48'),(4,7,'Rawalpindi',8,'/uploads/1786953215999-profile.png',0.0,0,0,'2026-08-17 07:53:36'),(5,9,'Islamabad',10,'/uploads/1787039438144-profile.png',0.0,0,0,'2026-08-18 07:50:38'),(6,10,'Islamabad',0,'/uploads/1787200457368-profile.png',0.0,0,0,'2026-08-20 04:34:17'),(7,11,'Islamabad',0,'/uploads/1787200561579-profile.png',0.0,0,0,'2026-08-20 04:36:01'),(8,12,'Islamabad',8,'/uploads/1787200681088-profile.png',0.0,0,0,'2026-08-20 04:38:01'),(9,13,'Rawalpindi',5,'/uploads/1787200942957-profile.png',0.0,0,0,'2026-08-20 04:42:23');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Usman','usman123@gmail.com','+934567890','$2b$10$.Kv0BxlybU9Y58JRVSg6jOZWfzf03Wa80eRoh.r0yUetq6prZ0ooS','customer','2026-08-17 05:28:31'),(2,'Rahim','rahim123@gmail.com','+9212984729','$2b$10$bgbnYtzgf/pxQszNYwP8Z..yvVMBv4UPMwXTQ.Xbi8Ro/JKeZtrIu','provider','2026-08-17 05:30:58'),(3,'Ayla','ayla123@gmail.com','+969823792','$2b$10$olIEi6s299j0cG0cMu0XC.x1NPGsjm1p0AmoegBeFeGtDZWJkYxPe','customer','2026-08-17 05:32:59'),(4,'Hania','hania123@gmail.com','+91328736','$2b$10$/mOqP/DsCJf0LRjQ4d67e.mhWSxi0xwC5L6PxouAvfF4UPFfuuiyq','provider','2026-08-17 05:34:19'),(5,'Samavia Rasool','samaviarasool888@gmail.com','03407084330','$2b$10$HQUail8xY16./VR/EAu/.OnuKYwGJWKMWgRp0AoAn/MjrYNXVYZGu','customer','2026-08-17 05:45:06'),(6,'Usama','usama@gmail.com','9327843049','$2b$10$6f7jP74DlGFDbZe.Zpca2Oe0sCV9wCZqSPTS4Sz7.I5soFDShw/Ea','provider','2026-08-17 07:51:48'),(7,'Usama Ali','usama123@gmail.com','324879472','$2b$10$ppNszQ97RX4VdaCTMp58ROqXje1xskVpEOSFZTibQ2jq7jNqQ23O2','provider','2026-08-17 07:53:36'),(8,'Ahmer','ahmer@gmail.com','86432946','$2b$10$ikKI5tgHWHJWc7DYjdlUIecmNt9yj.QYf/kcMtNCa/4RG8EdJohHq','customer','2026-08-17 07:54:57'),(9,'Ali','ali123@gmail.com','973204740','$2b$10$/jpp9MAlIjEQG/Ffwtatte5fmLc8B4dNJAA0l6jjdqLEHXc/hzUBa','provider','2026-08-18 07:50:38'),(10,'Usman','usman@gmail.com','9974324230','$2b$10$261xHwrcd2a4KkQlkoo/Sufb.MfggLAmYl5p8B5O451N6xq3VlEvW','provider','2026-08-20 04:34:17'),(11,'Yasir','yasir@gmail.com','92437049','$2b$10$5u560ernKIq3lS4aOqRXy.pwmol1aLnDVVZdeJqG1zvsfaEWTacP6','provider','2026-08-20 04:36:01'),(12,'Rakesh','rakesh@gmail.com','27400423','$2b$10$j5An1Obk29qrLsDmXy1AcucbTBTL/atqpVjyt3BeX1tR5I7eugyf2','provider','2026-08-20 04:38:01'),(13,'check-1','check1@gmail.com','92743024','$2b$10$9.6qci8k5r2NlJJbAh1/KuZ4HXUYv00JQ3r3T8TY7mSc7hxseiTP.','provider','2026-08-20 04:42:23');
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

-- Dump completed on 2026-08-21 10:15:34
