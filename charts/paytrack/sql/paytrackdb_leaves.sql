-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: paytrackdb
-- ------------------------------------------------------
-- Server version	8.0.41

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

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaves` (
  `leaveid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `leave_date` date NOT NULL,
  `reason` text NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`leaveid`),
  KEY `userid` (`userid`),
  CONSTRAINT `leaves_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `employee` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` VALUES (1,1,'2024-03-12','Mood Nhi hai','Approved'),(2,1,'2024-01-15','Family function','Approved'),(3,1,'2024-02-20','Feeling unwell','Rejected'),(4,1,'2024-02-25','Personal work','Approved'),(5,1,'2025-04-02','d','Approved'),(6,1,'2025-03-27','bhai i am Death','Approved'),(7,1,'2024-03-12','Mood Nhi hai','Approved'),(8,1,'2024-03-12','Whatever','Approved'),(9,1,'2024-03-12','I am going for go carting trip hence whatever','Approved'),(10,1,'2025-05-01','Whatever','Pending'),(11,7,'2025-05-01','WHATEVERRRRR','Approved'),(12,1,'2025-05-07','I need PEACE!!','Pending'),(13,1,'2025-05-05','cm on bro lemme spend time with fam!','Pending'),(14,1,'2025-05-09','just because','Pending');
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-29 22:42:21
