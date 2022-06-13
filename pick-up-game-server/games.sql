DROP SCHEMA IF EXISTS `games`;

CREATE SCHEMA `games` ;

CREATE TABLE `games`.`player` (
  `id` VARCHAR(255) NOT NULL UNIQUE,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,

  PRIMARY KEY (`id`)
);

CREATE TABLE `games`.`game` (
  `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
  `sport` VARCHAR(50) NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `skillLevel` VARCHAR(255) NOT NULL,  
  `address1` VARCHAR(255) NOT NULL,
  `city` VARCHAR(25) NOT NULL,
  `locationNote` VARCHAR(50),
  `gender` VARCHAR(10) NOT NULL,
  `gameCreator` VARCHAR(255) NOT NULL,

  PRIMARY KEY (`id`),
   FOREIGN KEY(`gameCreator`)
		REFERENCES `player`(`id`)
);

CREATE TABLE `games`.`rsvp` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gameId` INT NOT NULL,
  `playerId` VARCHAR(255) NOT NULL,


  PRIMARY KEY (`id`),
  FOREIGN KEY(`gameId`)
		REFERENCES `game`(`id`),
  FOREIGN KEY(`playerId`)
		REFERENCES `player`(`id`)
);

INSERT INTO `games`.`player` 
  (`id`, `firstName`, `lastName`, `email`, `password`) 
VALUES 
  ('7801ff44-d79f-11ec-856c-6b8b7bc362a1', 'Chuck', 'Norris', 'user1@email.com', '$2b$10$wt2o2lmxk8TIoiYVVKRDsewoUbFY75FngwpcITXxFQPoSfs0J38Ke'),
  ('78021592-d79f-11ec-856c-6b8b7bc362a1', 'James', 'Bond', 'user2@email.com', '$2b$10$KQa1Av63mMe506ccmzCOZO9nCaIKpcO4Fpwk75o8R5v80ScazfjWi'),
  ('7802168c-d79f-11ec-856c-6b8b7bc362a1', 'Eva', 'Longoria', 'user3@email.com', '$2b$10$d0yM6cCrMSO6tff3toxfFurhzFxI7wS6G1kcMA8Od3jGmi.LWHtba'),
  ('7802170e-d79f-11ec-856c-6b8b7bc362a1', 'Mariah', 'Carey', 'user4@email.com', '$2b$10$SeMGQhm.gsfvqkk6.pJA5ukTHHTaJZPMKnT6AwMp6mjSKNob.Jxim'),
  ('78021790-d79f-11ec-856c-6b8b7bc362a1', 'Jim', 'Carey', 'user5@email.com', '$2b$10$oq2vFyknns8ADkzXN1T75uBQco7fnyh7P5thaBc0FZXdq2Dj9J5Ga'),
  ('78021808-d79f-11ec-856c-6b8b7bc362a1', 'Wilson', 'Castaway', 'user6@email.com', '$2b$10$naF6Cg99jZIIqCBECE6yueA7QbCLXkn1FgthPbz/Z0.rHrE/qsTwe'),
  ('7802186c-d79f-11ec-856c-6b8b7bc362a1', 'Luney', 'Tuney', 'user7@email.com', '$2b$10$/yWXvXW1YOq1tfHAcxN7aeoe1mhjekbBdYqcgrbVPaQ24Gs8lyJcq'),
  ('780218da-d79f-11ec-856c-6b8b7bc362a1', 'Emma', 'Stone', 'user8@email.com', '$2b$10$K8zpzjVU.BLCkLpcNGZHLux65IqBmSbR87ZG4mvlJ6xLtSG9rbOs6'),
  ('78021948-d79f-11ec-856c-6b8b7bc362a1', 'Jim', 'Halpert', 'user9@email.com', '$2b$10$rWVg6//YHif2.aUMlfdd..zpwqulFPl1aLA1nTde2l2iIvs7LSOka'),
  ('780219d4-d79f-11ec-856c-6b8b7bc362a1', 'Monty', 'Python', 'user10@email.com', '$2b$10$QvBgK0fkXSnmDCLhltPnfuUZMabPmgV9kgQyHlW1JzU9UVSEJraJ2');
  
INSERT INTO `games`.`game` 
  (`sport`, `dateTime`, `skillLevel`, `address1`, `city`, `locationNote`, `gender`, `gameCreator`)
VALUES
  ('volleyball', '2022-07-17 10:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'Beach volleyball- court to the right of Folly pier', 'male', '780219d4-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-25 17:00:00', 'advanced', '101 Artic Ave.', 'Folly Beach', 'Beach volleyball- court to the right of Folly pier', 'female', '78021948-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-30 20:00:00', 'all levels', '101 Artic Ave.', 'Folly Beach', 'Beach volleyball- court to the right of Folly pier', 'coed', '780218da-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-04 13:00:00', 'intermediate', '101 Artic Ave.', 'Folly Beach','Beach volleyball- court to the right of Folly pier', 'male', '7802186c-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-12 18:00:00', 'all levels', '101 Artic Ave.', 'Folly Beach', 'Beach volleyball- court to the right of Folly pier', 'coed', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-06-12 18:00:00', 'advanced', '101 Artic Ave.', 'Folly Beach', 'Beach volleyball- court to the right of Folly pier', 'coed', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-06-13 18:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'Beach volleyball- court to the right of Folly pier', 'coed', '78021808-d79f-11ec-856c-6b8b7bc362a1');

INSERT INTO `games`.`rsvp`
(`gameId`, `playerId`)
VALUES
(5, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(5, '780219d4-d79f-11ec-856c-6b8b7bc362a1'),
(5, '780218da-d79f-11ec-856c-6b8b7bc362a1'),
(5, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(1, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(2, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(2, '780218da-d79f-11ec-856c-6b8b7bc362a1'),
(3, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(3, '780218da-d79f-11ec-856c-6b8b7bc362a1'),
(4, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(4, '7802168c-d79f-11ec-856c-6b8b7bc362a1'),
(4, '78021790-d79f-11ec-856c-6b8b7bc362a1'),
(4, '780219d4-d79f-11ec-856c-6b8b7bc362a1');