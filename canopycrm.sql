-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 10, 2023 at 03:22 PM
-- Server version: 8.0.31
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `canopycrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` int NOT NULL,
  `title` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `home_tel` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mobile_tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address_1` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `address_2` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `town` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `county` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `postcode` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `ec_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ec_number` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `GAD7` int NOT NULL,
  `PHQ9` int NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'New'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `title`, `first_name`, `last_name`, `email`, `home_tel`, `mobile_tel`, `address_1`, `address_2`, `town`, `county`, `postcode`, `ec_name`, `ec_number`, `GAD7`, `PHQ9`, `status`) VALUES
(4, 'Mr', 'Jeffrey', 'Mathers', 'jeff@email.com', '01903 123 433', '07192 354 675', '12 Good House', '2 Cooler Road', 'Greatford', 'West Sussexshire', 'GF12 3DE', 'Jenny White', '07762 323 234', 19, 15, 'New'),
(5, 'Mr', 'Ryan', 'Blum', 'ryan@email.com', '01903 425 647', '07936 745 742', '13 Wicked House', '4 Dirt Road', 'Brighton', 'East Sussex', 'BN2 3DF', 'Jenny Brown', '07762 123 456', 19, 15, 'New'),
(6, 'Mrs', 'Emma', 'Smith', 'emma@email.com', '01234 567 890', '07890 123 456', '5 Elm Street', '10 Oak Avenue', 'London', 'Greater London', 'SW1A 1AA', 'John Doe', '07654 321 098', 16, 20, 'New'),
(7, 'Ms', 'Sarah', 'Johnson', 'sarah@email.com', '01222 333 444', '07777 888 999', '7 Maple Lane', '2 Pine Road', 'Manchester', 'Greater Manchester', 'M1 2XY', 'Michael Smith', '07123 456 789', 22, 18, 'New'),
(8, 'Dr', 'David', 'Lee', 'david@email.com', '01555 666 777', '07979 000 111', '9 Cedar Street', '6 Birch Avenue', 'Glasgow', 'Lanarkshire', 'G12 8AB', 'Sarah Wilson', '07888 222 333', 17, 16, 'New'),
(9, 'Miss', 'Sophia', 'Brown', 'sophia@email.com', '01777 888 999', '07444 555 666', '11 Willow Lane', '8 Oak Road', 'Liverpool', 'Merseyside', 'L1 3AB', 'Tom Davis', '07999 111 222', 20, 22, 'New'),
(10, 'Mr', 'James', 'Wilson', 'james@email.com', '01444 123 456', '07555 987 654', '15 Birch Street', '12 Maple Avenue', 'Birmingham', 'West Midlands', 'B2 4CD', 'Rachel Green', '07222 333 444', 18, 19, 'New'),
(11, 'Mrs', 'Olivia', 'Smith', 'olivia@email.com', '01666 555 444', '07333 666 777', '19 Oak Avenue', '14 Willow Road', 'Leeds', 'West Yorkshire', 'LS1 5EF', 'John Smith', '07373 777 888', 21, 21, 'New'),
(12, 'Ms', 'Ava', 'Davis', 'ava@email.com', '01888 999 000', '07222 111 000', '23 Maple Street', '16 Cedar Avenue', 'Newcastle', 'Tyne and Wear', 'NE1 6FG', 'Emily Jones', '07000 222 111', 16, 24, 'New'),
(13, 'Mr', 'William', 'Jones', 'william@email.com', '01411 222 333', '07911 333 444', '27 Willow Road', '20 Elm Lane', 'Sheffield', 'South Yorkshire', 'S1 2GH', 'Daniel Brown', '07888 444 555', 20, 20, 'New'),
(14, 'Mrs', 'Mia', 'Miller', 'mia@email.com', '01722 444 555', '07111 555 444', '31 Elm Avenue', '24 Oak Lane', 'Edinburgh', 'Midlothian', 'EH1 7IJ', 'Oliver Taylor', '07555 666 777', 17, 18, 'New'),
(15, 'Mr', 'Ethan', 'Wilson', 'ethan@email.com', '01922 555 444', '07333 555 444', '35 Cedar Road', '28 Willow Street', 'Cardiff', 'Glamorgan', 'CF1 9KL', 'Lucy Hall', '07666 777 888', 19, 22, 'New'),
(16, 'Miss', 'Sophie', 'White', 'sophie@email.com', '01555 333 444', '07666 555 444', '39 Pine Lane', '32 Cedar Avenue', 'Bristol', 'Avon', 'BS1 4PQ', 'Liam Johnson', '07888 333 444', 21, 23, 'New'),
(17, 'Dr', 'Logan', 'Taylor', 'logan@email.com', '01666 555 666', '07999 111 222', '43 Oak Street', '36 Willow Avenue', 'Nottingham', 'Nottinghamshire', 'NG1 3XY', 'Ava Wilson', '07222 555 444', 18, 17, 'New'),
(18, 'Mrs', 'Harper', 'Davis', 'harper@email.com', '01444 555 444', '07222 555 444', '47 Elm Road', '40 Cedar Lane', 'Leicester', 'Leicestershire', 'LE1 6AB', 'Noah Smith', '07373 555 444', 22, 19, 'New'),
(19, 'Mr', 'Benjamin', 'Brown', 'benjamin@email.com', '01777 555 444', '07666 333 444', '51 Willow Lane', '44 Pine Avenue', 'Southampton', 'Hampshire', 'SO1 8YZ', 'Grace Hall', '07000 555 444', 20, 16, 'New'),
(20, 'Ms', 'Leah', 'Harris', 'leah@email.com', '01888 555 444', '07555 555 444', '55 Cedar Avenue', '48 Oak Road', 'Oxford', 'Oxfordshire', 'OX1 2CD', 'William White', '07888 555 444', 19, 20, 'New'),
(21, 'Mr', 'Jack', 'Clark', 'jack@email.com', '01411 555 444', '07111 333 444', '59 Pine Road', '52 Elm Street', 'Cambridge', 'Cambridgeshire', 'CB1 4EF', 'Emma Davis', '07222 333 444', 17, 21, 'New'),
(22, 'Miss', 'Zoe', 'Moore', 'zoe@email.com', '01555 555 444', '07888 333 444', '63 Willow Street', '56 Cedar Lane', 'Glasgow', 'Lanarkshire', 'G12 8YZ', 'James Smith', '07373 333 444', 18, 18, 'New'),
(23, 'Mrs', 'Lily', 'Martin', 'lily@email.com', '01666 555 444', '07000 333 444', '67 Elm Lane', '60 Pine Avenue', 'Liverpool', 'Merseyside', 'L1 6AB', 'Oliver Smith', '07000 333 444', 22, 20, 'New'),
(24, 'Mr', 'Samuel', 'Anderson', 'samuel@email.com', '01722 555 444', '07444 333 444', '71 Oak Road', '64 Willow Road', 'Manchester', 'Greater Manchester', 'M1 2XY', 'Sophia Taylor', '07666 333 444', 17, 19, 'New'),
(25, 'Ms', 'Nora', 'Parker', 'nora@email.com', '01444 333 444', '07555 333 444', '75 Pine Avenue', '68 Elm Street', 'Birmingham', 'West Midlands', 'B2 4CD', 'Logan Harris', '07000 333 444', 21, 17, 'New'),
(26, 'Miss', 'Luna', 'Carter', 'luna@email.com', '01555 333 444', '07111 555 444', '79 Cedar Lane', '72 Oak Lane', 'Leeds', 'West Yorkshire', 'LS1 5EF', 'Zoe Moore', '07222 333 444', 16, 22, 'New'),
(27, 'Mr', 'Leo', 'Turner', 'leo@email.com', '01666 333 444', '07888 555 444', '83 Willow Road', '76 Pine Street', 'Newcastle', 'Tyne and Wear', 'NE1 6FG', 'Ethan Wilson', '07373 333 444', 22, 17, 'New'),
(28, 'Mrs', 'Aria', 'Garcia', 'aria@email.com', '01722 333 444', '07444 555 444', '87 Elm Street', '80 Cedar Road', 'Sheffield', 'South Yorkshire', 'S1 2GH', 'Lily Martin', '07666 555 444', 19, 21, 'New'),
(29, 'Ms', 'Ella', 'Lopez', 'ella@email.com', '01444 555 444', '07111 333 444', '91 Oak Avenue', '84 Willow Avenue', 'Edinburgh', 'Midlothian', 'EH1 7IJ', 'Samuel Anderson', '07000 555 444', 20, 23, 'New'),
(30, 'Mr', 'Henry', 'Hernandez', 'henry@email.com', '01555 555 444', '07555 333 444', '95 Pine Lane', '88 Cedar Street', 'Bristol', 'Avon', 'BS1 4PQ', 'Nora Parker', '07222 333 444', 16, 24, 'New');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `title`, `first_name`, `last_name`, `email`, `password`, `admin`) VALUES
(3, 'Mr', 'Tom', 'Hamblin', 'tom@email.com', '$2b$10$uosKR8kimV.K.r/y4Py2guYaNE67l0KBPWNTh/ZiNBOYYxpS2FwxK', 1),
(4, 'Mr', 'Brian', 'Johnson', 'brian@email.com', '$2b$10$aG.uSbl10DSB3mKeT8cLcebefAEyz3tLC68rbE8SZvmFLcAuAjoJG', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
