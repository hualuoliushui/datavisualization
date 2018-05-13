-- MySQL dump 10.13  Distrib 5.7.15, for Win64 (x86_64)
--
-- Host: localhost    Database: datavisualization
-- ------------------------------------------------------
-- Server version	5.7.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `data_source_t`
--

DROP TABLE IF EXISTS `data_source_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data_source_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `host` char(100) NOT NULL DEFAULT '127.0.0.1' COMMENT '主机地址',
  `port` int(11) NOT NULL DEFAULT '80' COMMENT '端口',
  `createTime` char(100) DEFAULT '' COMMENT '添加记录的时间',
  `deleted` int(11) DEFAULT '1' COMMENT '1：正常；2：已删除',
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`userId`),
  CONSTRAINT `data_source_t_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user_t` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `good_detail_t`
--

DROP TABLE IF EXISTS `good_detail_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `good_detail_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `record_id` int(11) NOT NULL,
  `good_id` int(11) NOT NULL,
  `good_type_id` int(11) NOT NULL,
  `good_batch` char(100) DEFAULT NULL,
  `good_code` char(100) DEFAULT NULL,
  `pack_type` char(100) DEFAULT NULL,
  `good_number` int(11) DEFAULT NULL,
  `produce_date` char(100) DEFAULT NULL,
  `life_time` int(11) DEFAULT NULL,
  `qr_code_num` int(11) DEFAULT NULL,
  `star_avg` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `good_type_id` (`good_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=180019 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `good_type_detail_t`
--

DROP TABLE IF EXISTS `good_type_detail_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `good_type_detail_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `record_id` int(11) NOT NULL,
  `good_type_id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `type_code` char(100) DEFAULT NULL,
  `type_name` char(100) DEFAULT NULL,
  `produce_place` text,
  PRIMARY KEY (`id`),
  KEY `good_type_id` (`good_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16001 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `merchant_detail_t`
--

DROP TABLE IF EXISTS `merchant_detail_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_detail_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `record_id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `create_date` char(100) NOT NULL,
  `user_name` char(100) NOT NULL,
  `merchant_name` char(100) NOT NULL,
  `company_name` char(100) NOT NULL,
  `company_area` char(100) NOT NULL,
  `area_code` char(100) NOT NULL,
  `gis_location` char(100) NOT NULL,
  `company_code` char(100) NOT NULL,
  `business_scope` char(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `record_id` (`record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9910 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `record_t`
--

DROP TABLE IF EXISTS `record_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createTime` char(100) NOT NULL DEFAULT '',
  `dataSourceId` int(11) NOT NULL,
  `result` int(11) NOT NULL DEFAULT '1' COMMENT '1:成功；2：失败',
  `errMsg` text COMMENT '失败原因',
  `deleted` int(11) NOT NULL DEFAULT '1' COMMENT '1：正常；2：已删除',
  PRIMARY KEY (`id`),
  KEY `data_source_id` (`dataSourceId`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_t`
--

DROP TABLE IF EXISTS `user_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` char(100) NOT NULL,
  `psw` char(100) NOT NULL,
  `createTime` char(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-13 11:12:48
