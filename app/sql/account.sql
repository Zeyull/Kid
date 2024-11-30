CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `salt` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'https://pic-zeyull.oss-cn-chengdu.aliyuncs.com/img/058a2c8ae13d613595d9f616d39df7f22000609327.jpg',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3