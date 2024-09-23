CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `announcement_time` datetime NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3