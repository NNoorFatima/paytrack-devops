-- Create the `users` table
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `date_of_join` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_no` (`phone_no`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert data into `users` table
INSERT INTO `users` VALUES (1,'Noor','n122','Female','noor.f@example.com','1234567890','F11, Islamabad, Pakistan','2025-03-19');
INSERT INTO `users` VALUES (2,'Sara','s123','Female','sara.f@example.com','0123242141','G10, Islamabad, Pakistan','2025-03-19');
INSERT INTO `users` VALUES (3,'Munim','1080','Female','munim.f@example.com','123435412490','K11, Islamabad, Pakistan','2025-03-19');
INSERT INTO `users` VALUES (4,'hehe','hehe','Female','hehe.f@example.com','12341241240','H11, Islamabad, Pakistan','2025-03-19');

-- Create the `admin` table, referencing `users.userid`
CREATE TABLE `admin` (
  `userid` int NOT NULL,
  PRIMARY KEY (`userid`),
  CONSTRAINT `fk_admin_user` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert data into `admin` table (userid 4 must already exist in `users`)
INSERT INTO `admin` VALUES (4);
