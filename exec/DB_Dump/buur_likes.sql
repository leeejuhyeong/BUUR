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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `likes_id` bigint NOT NULL AUTO_INCREMENT,
  `beer_id` bigint DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  PRIMARY KEY (`likes_id`),
  KEY `FK9i1kd02vjt7f3xj8guxgctwru` (`beer_id`),
  KEY `FK1vfqkol34p0bohnecai9773xm` (`id`),
  CONSTRAINT `FK1vfqkol34p0bohnecai9773xm` FOREIGN KEY (`id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK9i1kd02vjt7f3xj8guxgctwru` FOREIGN KEY (`beer_id`) REFERENCES `beer` (`beer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (3,28,1),(7,37,425),(10,109,428),(11,47,1),(13,83,1),(14,83,1),(16,94,1),(22,4,1),(24,103,1),(26,81,1),(27,2,1),(30,51,1),(31,98,1),(48,9,427),(67,57,1),(69,1,1),(70,20,1),(71,59,1),(72,23,436),(76,19,436),(79,12,1),(81,25,436),(82,9,434),(83,87,434),(84,98,438),(85,99,438),(86,31,438),(87,83,438);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 22:52:32
