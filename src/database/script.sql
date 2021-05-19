CREATE DATABASE dbhrojas;

use dbhrojas;

CREATE TABLE `persona` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido_paterno` varchar(100) DEFAULT NULL,
  `apellido_materno` varchar(100) DEFAULT NULL,
  `dni` char(8) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `celular` char(9) DEFAULT NULL,
  `fecha_nac` datetime DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `nacionalidad` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8