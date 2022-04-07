-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: j6b102.p.ssafy.io    Database: buur
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `search_history`
--

DROP TABLE IF EXISTS `search_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_history` (
  `search_id` bigint NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  PRIMARY KEY (`search_id`),
  KEY `FKq0puo1iw3fda68u687b4oljxm` (`id`),
  CONSTRAINT `FKq0puo1iw3fda68u687b4oljxm` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_history`
--

LOCK TABLES `search_history` WRITE;
/*!40000 ALTER TABLE `search_history` DISABLE KEYS */;
INSERT INTO `search_history` VALUES (36,'호가든',421),(37,'호가든',422),(38,'호가든',422),(39,'호가든',422),(40,'호가든',425),(41,'에델바이스',425),(42,'밀러',425),(68,'에일',432),(69,'ㅔ라',432),(70,'테라',432),(73,'칭따오',434),(74,'써머스비',434),(76,'진라거',434),(81,'맥주',1),(82,'크로넨',1),(84,'칼스버그',427),(86,'밀러',436),(87,'호가든',436),(94,'카스',427),(95,'호가든',427),(96,'에델바이스',427);
/*!40000 ALTER TABLE `search_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 22:52:33
