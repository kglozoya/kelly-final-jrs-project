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
		REFERENCES `game`(`id`)
        ON DELETE CASCADE,
  FOREIGN KEY(`playerId`)
		REFERENCES `player`(`id`)
        ON DELETE CASCADE
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
  ('volleyball', '2022-07-19 10:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'Beach volleyball- court to the right of Folly pier', 'men', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-25 09:30:00', 'all levels', '235 Runner Rd.', 'North Charleston', 'Court to the right of the parking lot.', 'coed', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-08-31 18:00:00', 'intermediate', '12 Long Point Rd.', 'Mount Pleasant', 'Park in the gravel lot.', 'coed', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-17 15:30:00', 'advanced', '333 Lucky Ln.', 'West Ashley', 'Look for the cones and water cooler', 'women', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-01 13:00:00', 'advanced', '100 Coleman Blvd.', 'Mount Pleasant', 'Will be playing on all fields at Santis', 'coed', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-04 11:00:00', 'all levels', '100 Coleman Blvd.', 'Mount Pleasant', 'Will be playing on all fields at Santis', 'coed', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-12 18:15:00', 'all levels', '333 Lucky Ln.', 'West Ashley', 'Look for the cones and water cooler', 'men', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-14 18:30:00', 'beginner', '12 Long Point Rd.', 'Mount Pleasant', 'Park in the gravel lot.', 'men', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-08-01 18:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'Court to the right of Folly pier.', 'coed', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('volleyball', '2022-07-25 18:00:00', 'advanced', '9635 Middle St.', 'Isle of Plams', 'Park at the Harris Teeter.', 'men', '78021592-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-07-17 10:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'game will take place on the beach', 'men', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-07-22 09:30:00', 'all levels', '235 Runner Rd.', 'North Charleston', 'Court to the right of the parking lot.', 'coed', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-07-30 18:00:00', 'intermediate', '12 Long Point Rd.', 'Mount Pleasant', 'Park in the gravel lot.', 'coed', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-07-17 15:30:00', 'advanced', '333 Lucky Ln.', 'West Ashley', 'Look for the cones and water cooler', 'women', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-07-21 13:00:00', 'advanced', '100 Coleman Blvd.', 'Mount Pleasant', 'Will be playing on the courts next to Santis.', 'coed', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-07-04 11:00:00', 'all levels', '100 Coleman Blvd.', 'Mount Pleasant', 'Will be playing on the courts next to Santis.', 'coed', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-07-12 18:15:00', 'all levels', '333 Lucky Ln.', 'West Ashley', 'Look for the cones and water cooler', 'men', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-07-19 18:30:00', 'beginner', '12 Long Point Rd.', 'Mount Pleasant', 'Park in the gravel lot.', 'men', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-08-01 18:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'Court to the right of the county park.', 'coed', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('basketball', '2022-07-29 18:00:00', 'advanced', '9635 Middle St.', 'Isle of Plams', 'Park at the Harris Teeter.', 'men', '78021592-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-07-27 10:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'game will take place on the beach', 'men', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-07-05 09:30:00', 'all levels', '235 Runner Rd.', 'North Charleston', 'Field to the right of the parking lot.', 'coed', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-07-30 18:00:00', 'intermediate', '12 Long Point Rd.', 'Mount Pleasant', 'Park in the gravel lot.', 'coed', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-07-17 15:30:00', 'advanced', '333 Lucky Ln.', 'West Ashley', 'Look for the cones and water cooler', 'women', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-07-01 13:00:00', 'advanced', '100 Coleman Blvd.', 'Mount Pleasant', 'Will be playing on the field next to Santis.', 'coed', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-07-04 11:00:00', 'all levels', '100 Coleman Blvd.', 'Mount Pleasant', 'Will be playing on the fields next to Santis.', 'coed', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-07-02 18:15:00', 'all levels', '333 Lucky Ln.', 'West Ashley', 'Look for the cones and water cooler', 'men', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-07-04 18:30:00', 'beginner', '12 Long Point Rd.', 'Mount Pleasant', 'Park in the gravel lot.', 'men', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-08-01 18:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'Court to the right of the county park.', 'coed', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('soccer', '2022-07-15 18:00:00', 'advanced', '9635 Middle St.', 'Isle of Plams', 'Park at the Harris Teeter.', 'men', '78021592-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-07-17 10:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'game will take place on the beach', 'men', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-07-25 09:30:00', 'all levels', '235 Runner Rd.', 'North Charleston', 'Field to the right of the parking lot.', 'coed', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-07-05 18:00:00', 'intermediate', '12 Long Point Rd.', 'Mount Pleasant', 'Park in the gravel lot.', 'coed', '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-07-17 15:30:00', 'advanced', '333 Lucky Ln.', 'West Ashley', 'Look for the cones and water cooler', 'women', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-07-01 13:00:00', 'advanced', '100 Coleman Blvd.', 'Mount Pleasant', 'Will be playing on the field next to Santis.', 'coed', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-07-07 11:00:00', 'all levels', '100 Coleman Blvd.', 'Mount Pleasant', 'Will be playing on the fields next to Santis.', 'coed', '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-07-12 18:15:00', 'all levels', '333 Lucky Ln.', 'West Ashley', 'Look for the cones and water cooler', 'men', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-07-26 18:30:00', 'beginner', '12 Long Point Rd.', 'Mount Pleasant', 'Park in the gravel lot.', 'men', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-08-03 18:00:00', 'beginner', '101 Artic Ave.', 'Folly Beach', 'Court to the right of the county park.', 'coed', '78021808-d79f-11ec-856c-6b8b7bc362a1'),
  ('football', '2022-07-16 18:00:00', 'advanced', '9635 Middle St.', 'Isle of Plams', 'Park at the Harris Teeter.', 'men', '78021592-d79f-11ec-856c-6b8b7bc362a1');

INSERT INTO `games`.`rsvp`
(`gameId`, `playerId`)
VALUES
(1, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(2, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(3, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(6, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(7, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(8, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(9, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(11, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(12, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(13, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(21, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(22, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(23, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(31, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(32, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(33, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(16, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(18, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(20, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(25, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(26, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(28, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(30, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(36, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(37, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(40, '7801ff44-d79f-11ec-856c-6b8b7bc362a1'),
(2, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(3, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(4, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(5, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(6, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(14, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(15, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(16, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(19, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(24, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(25, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(26, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(34, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(35, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(36, '7802170e-d79f-11ec-856c-6b8b7bc362a1'),
(5, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(6, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(7, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(8, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(9, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(10, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(15, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(16, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(17, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(18, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(19, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(20, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(25, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(26, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(27, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(28, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(29, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(30, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(35, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(36, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(37, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(38, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(39, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(40, '78021808-d79f-11ec-856c-6b8b7bc362a1'),
(2, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(3, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(9, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(10, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(11, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(12, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(13, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(15, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(16, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(18, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(19, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(20, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(21, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(22, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(23, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(28, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(29, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(30, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(31, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(32, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(33, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(35, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(38, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(39, '78021592-d79f-11ec-856c-6b8b7bc362a1'),
(40, '78021592-d79f-11ec-856c-6b8b7bc362a1');