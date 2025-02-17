-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 17, 2025 at 02:57 PM
-- Server version: 8.0.30
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tp-lecteur-audio`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` bigint NOT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `song_id` bigint NOT NULL,
  `publication_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `text`, `song_id`, `publication_date`) VALUES
(4, 'test comment', 2, '2024-11-04'),
(5, 'test comment', 2, '2024-11-04'),
(6, 'test comment', 2, '2024-11-04'),
(7, 'test comment', 2, '2024-11-04'),
(8, 'ouiii', 2, '2024-11-04'),
(9, 'test comment', 2, '2024-11-04'),
(10, 'test comment', 2, '2024-11-04'),
(11, '1', 2, '2024-11-04'),
(12, '2', 2, '2024-11-04'),
(13, '3', 2, '2024-11-04'),
(14, 'ok', 2, '2024-11-04'),
(15, 'c ok ?', 2, '2024-11-04'),
(16, 'coucou', 3, '2024-11-04'),
(17, 'slt', 2, '2024-11-04'),
(18, 'slt', 3, '2024-11-04'),
(20, 'quentin', 3, '2024-11-05'),
(21, '1', 3, '2024-11-05'),
(22, 'ouiii', 3, '2024-11-05'),
(45, 'lll', 4, '2024-11-06'),
(46, 'ff', 4, '2024-11-06'),
(47, 'ff', 4, '2024-11-06'),
(48, 'ff', 4, '2024-11-06'),
(49, 'ff', 4, '2024-11-06'),
(50, 'ff', 4, '2024-11-06'),
(51, 'ff', 4, '2024-11-06'),
(52, 'ff', 4, '2024-11-06'),
(53, 'ff', 4, '2024-11-06'),
(62, 'hello', 2, '2024-11-06'),
(63, 'hello', 2, '2024-11-06'),
(65, 'hey', 2, '2024-11-06'),
(66, 'oh', 2, '2024-11-06'),
(67, 'song 4', 5, '2024-11-06'),
(68, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 2, '2024-11-06'),
(69, 'aaaaaaaaaa', 2, '2024-11-06'),
(70, 'aaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa a', 2, '2024-11-06'),
(71, 'ouiii', 5, '2024-11-07'),
(72, 'aaaaaaaaaaaa bbbbbbbbbbbbb ccccccccccccccccc ddddddddddddddddddd', 2, '2024-11-07'),
(73, 'bonjour', 14, '2024-11-08'),
(74, 'aaa', 15, '2024-11-08'),
(75, 'test comment 2', 16, '2024-11-08');

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `id` bigint NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `picture` varchar(255) NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`id`, `name`, `picture`, `author`) VALUES
(1, 'Night Detective', 'assets/img/night-img.webp', 'Amaksi'),
(2, 'In Slow Motion', 'assets/img/inslow-img.webp', 'soundbay'),
(3, 'AMALGAM', 'assets/img/amalgam-img.webp', 'Rockot'),
(4, 'No Place To Go', 'assets/img/noplace-img.webp', 'SergePavkinMusic'),
(5, 'Flow', 'assets/img/flow-img.webp', 'Loksii');

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `id` bigint NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mp3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `playlist_id` bigint NOT NULL,
  `artist` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publication_date` date NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `duration` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `song`
--

INSERT INTO `song` (`id`, `name`, `mp3`, `playlist_id`, `artist`, `publication_date`, `picture`, `duration`) VALUES
(2, 'Song1', 'assets/music/music1.mp3', 1, 'artist1', '2024-10-31', '1', '00:01:00'),
(3, 'Song2', 'assets/music/music2.mp3', 1, 'artist1', '2024-10-31', '1', '00:01:00'),
(4, 'Song3', 'assets/music/music3.mp3', 1, 'artist1', '2024-10-31', '1', '00:01:00'),
(5, 'Song4', 'assets/music/music4.mp3', 1, 'artist1', '2024-10-31', '1', '00:01:00'),
(6, 'Song5', 'assets/music/music5.mp3', 1, 'artist1', '2024-10-31', '1', '00:01:00'),
(7, 'Song1', 'assets/music/music6.mp3', 2, 'artist1', '2024-10-31', '1', '00:01:00'),
(8, 'Song2', 'assets/music/music7.mp3', 2, 'artist1', '2024-10-31', '1', '00:01:00'),
(9, 'Song3', 'assets/music/music8.mp3', 2, 'artist1', '2024-10-31', '1', '00:01:00'),
(10, 'Song4', 'assets/music/music9.mp3', 2, 'artist1', '2024-10-31', '1', '00:01:00'),
(11, 'Song5', 'assets/music/music10.mp3', 2, 'artist1', '2024-10-31', '1', '00:01:00'),
(12, 'Tell Me The Truth', 'assets/music/tell-me-the-truth-260010.mp3', 3, 'Denys_Brodovskyi', '2024-10-31', 'assets/img/tellme-img.webp', '00:01:00'),
(13, 'Soulsweeper', 'assets/music/soulsweeper-252499.mp3.mp3', 3, 'ItsWatR', '2024-10-31', 'assets/img/souls-img.webp', '00:01:00'),
(14, 'Creative Technology', 'assets/music/creative-technology-showreel-241274.mp3', 3, 'Pumpupthemind', '2024-10-31', 'assets/img/creative-img.webp', '00:01:00'),
(15, 'Lazy Day', 'assets/music/lazy-day-stylish-futuristic-chill-239287.mp3', 3, 'penguinmusic', '2024-10-31', 'assets/img/lazy-img.webp', '00:01:00'),
(16, 'Nightfall', 'assets/music/nightfall-future-bass-music-228100.mp3', 3, 'SoulProdMusic', '2024-10-31', 'assets/img/nightfall-img.jpg', '00:01:00'),
(17, 'Song1', '1', 4, 'artist1', '2024-10-31', '1', '00:01:00'),
(18, 'Song2', '1', 4, 'artist1', '2024-10-31', '1', '00:01:00'),
(19, 'Song3', '1', 4, 'artist1', '2024-10-31', '1', '00:01:00'),
(20, 'Song4', '1', 4, 'artist1', '2024-10-31', '1', '00:01:00'),
(21, 'Song5', '1', 4, 'artist1', '2024-10-31', '1', '00:01:00'),
(22, 'Song1', '1', 5, 'artist1', '2024-10-31', '1', '00:01:00'),
(23, 'Song2', '1', 5, 'artist1', '2024-10-31', '1', '00:01:00'),
(24, 'Song3', '1', 5, 'artist1', '2024-10-31', '1', '00:01:00'),
(25, 'Song4', '1', 5, 'artist1', '2024-10-31', '1', '00:01:00'),
(26, 'Song5', '1', 5, 'artist1', '2024-10-31', '1', '00:01:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_song` (`song_id`);

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`),
  ADD KEY `song_playlist` (`playlist_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_song` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `song_playlist` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
