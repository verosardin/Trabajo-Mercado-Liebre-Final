CREATE SCHEMA `mercadoliebre` ;
CREATE TABLE `mercadoliebre`.`productos` (
  `id` INT(11) NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL,
  `description` VARCHAR(800) NULL,
  `price` DOUBLE NULL,
  `image` VARCHAR(45) NULL,
  `category` VARCHAR(45) NULL,
  `discount` INT(11) NULL,
  PRIMARY KEY (`id`));
