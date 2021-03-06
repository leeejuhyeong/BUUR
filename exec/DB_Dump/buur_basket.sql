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
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `basket_id` bigint NOT NULL AUTO_INCREMENT,
  `beer_id` bigint DEFAULT NULL,
  `group_id` bigint DEFAULT NULL,
  PRIMARY KEY (`basket_id`),
  KEY `FK1oqvgq3tt0g6ys1gy44jduh8t` (`beer_id`),
  KEY `FKsmdy1li8cc9phtlxpcnsahj47` (`group_id`),
  CONSTRAINT `FK1oqvgq3tt0g6ys1gy44jduh8t` FOREIGN KEY (`beer_id`) REFERENCES `beer` (`beer_id`),
  CONSTRAINT `FKsmdy1li8cc9phtlxpcnsahj47` FOREIGN KEY (`group_id`) REFERENCES `beer_group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
INSERT INTO `basket` VALUES (13,42,4),(14,9,4),(15,73,4),(16,1,4),(29,15,8),(30,24,8),(31,9,8),(32,6,8),(33,12,9),(34,53,9),(35,66,9),(36,73,9),(113,22,29),(114,96,29),(115,43,29),(116,10,29),(145,1,48),(146,72,48),(147,55,48),(148,102,48),(149,9,52),(150,85,52),(151,82,52),(152,58,52),(157,4,54),(158,26,54),(159,109,54),(160,95,54),(165,7,74),(166,61,74),(167,5,74),(168,54,74),(169,28,75),(170,108,75),(171,53,75),(172,63,75),(173,29,76),(174,29,76),(175,50,76),(176,15,76),(177,39,77),(178,39,77),(179,36,77),(180,25,77),(181,79,78),(182,79,78),(183,11,78),(184,11,78),(189,30,80),(190,108,80),(191,100,80),(192,46,80),(193,22,82),(194,21,82),(195,13,82),(196,93,82),(197,105,83),(198,30,83),(199,53,83),(200,28,83),(217,9,88),(218,4,88),(219,42,88),(220,87,88);
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-07 22:52:35
