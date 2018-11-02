-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 02 nov 2018 om 09:20
-- Serverversie: 5.7.14
-- PHP-versie: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wbsmonitor`
--
CREATE DATABASE IF NOT EXISTS `wbsmonitor` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `wbsmonitor`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `projects`
--

CREATE TABLE `projects` (
  `projectId` int(11) NOT NULL,
  `projectName` varchar(30) NOT NULL,
  `projectEstimatedTime` time NOT NULL,
  `projectActualTime` time NOT NULL DEFAULT '00:00:00',
  `projectDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `projects`
--

INSERT INTO `projects` (`projectId`, `projectName`, `projectEstimatedTime`, `projectActualTime`, `projectDeleted`) VALUES
(1, 'Test', '00:10:00', '00:00:00', 1),
(2, 'Nog een test project', '00:20:00', '00:00:00', 1),
(3, 'Nog een test project', '00:20:00', '00:00:00', 1),
(4, 'Hallo', '01:00:00', '00:00:00', 1),
(5, 'awooo', '10:00:00', '00:00:00', 1),
(6, 'han han han', '00:00:01', '00:00:00', 1),
(7, 'eeee', '00:00:10', '00:00:00', 1),
(8, 'hallo', '00:10:00', '00:00:00', 1),
(9, 'eeeee', '10:00:00', '00:00:00', 1),
(10, 'a', '10:00:00', '00:00:00', 1),
(11, 'c', '10:00:00', '00:00:00', 1),
(12, 'c', '10:00:00', '00:00:00', 1),
(13, 'TEST', '20:00:00', '00:00:00', 1),
(14, 'oi', '10:00:00', '00:00:00', 1),
(15, 'jesse', '01:00:00', '00:00:00', 1),
(16, 'oi', '10:00:00', '00:00:00', 1),
(17, 'nieuw', '10:00:00', '00:00:00', 1),
(18, 'e', '00:00:10', '00:00:00', 1),
(19, 'e', '00:00:10', '00:00:00', 1),
(20, 'e', '00:00:10', '00:00:00', 1),
(21, 'a', '10:00:00', '00:00:00', 1),
(22, 'yaw', '10:00:00', '00:00:00', 1),
(23, 'Test', '00:00:10', '00:00:00', 0),
(24, 'Yawwww', '00:10:00', '00:00:00', 0),
(25, 'hey', '10:00:00', '00:00:00', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tasks`
--

CREATE TABLE `tasks` (
  `taskId` int(11) NOT NULL,
  `taskName` varchar(60) NOT NULL,
  `taskPredecessor` int(11) NOT NULL DEFAULT '0',
  `taskOwner` varchar(12) NOT NULL,
  `taskMoscowType` int(11) NOT NULL DEFAULT '0',
  `taskPlannedTime` time NOT NULL,
  `taskActualTime` time NOT NULL,
  `taskCheckNote` varchar(255) NOT NULL,
  `taskActNote` varchar(255) NOT NULL,
  `projectId` int(11) NOT NULL,
  `taskDeleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `tasks`
--

INSERT INTO `tasks` (`taskId`, `taskName`, `taskPredecessor`, `taskOwner`, `taskMoscowType`, `taskPlannedTime`, `taskActualTime`, `taskCheckNote`, `taskActNote`, `projectId`, `taskDeleted`) VALUES
(1, 'Task test', 0, 'Jesse', 0, '00:00:00', '00:00:00', 'C', 'A', 15, 0),
(2, 'Task test', 0, 'Jesse', 0, '00:00:00', '00:00:00', 'C', 'y', 15, 0),
(3, 'Nog een task', 2, 'Jesse', 1, '00:10:00', '00:20:00', 'C', 'a', 15, 0),
(4, 'Task test', 0, 'Jesse', 0, '00:00:00', '00:00:00', '', '', 15, 0),
(5, 'Task test', 0, 'Jesse', 0, '00:00:00', '00:00:00', '', '', 15, 0),
(6, 'Nog een task', 2, 'Jesse', 0, '00:10:00', '00:20:00', '', '', 15, 0),
(7, 'Task test', 0, 'Jesse', 0, '00:00:00', '00:00:00', '', '', 15, 0),
(8, 'Task test', 0, 'Jesse', 0, '00:00:00', '00:00:00', '', '', 15, 0),
(9, 'Nog een task', 2, 'Jesse', 0, '00:10:00', '00:20:00', '', '', 15, 0),
(10, '', 0, '', 0, '00:00:00', '00:00:00', '', '', 15, 0),
(11, 'test', 8, 'Jesse', 0, '00:00:00', '00:00:00', '', '', 6, 0),
(12, '', 0, '', 0, '00:00:00', '00:00:00', '', '', 6, 0),
(13, 'Een test task', 0, 'Jesse', 1, '00:00:00', '00:00:00', 'HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', '', 23, 1),
(14, 'aaaa', 0, 'Han', 0, '10:00:00', '00:00:34', '', 'yaw', 23, 0),
(15, 'bbb', 0, 'Han', 3, '00:01:20', '00:01:23', 'hallo', '', 23, 0),
(16, 'Nog een', 0, 'Jesse', 0, '00:00:00', '00:00:12', 'aweo', 'awooo', 23, 1),
(17, 'En nog een', 0, 'Jesse', 1, '00:00:00', '00:00:00', '', '', 23, 1),
(18, 'aa', 0, 'eee', 0, '00:00:00', '00:00:00', '', '', 23, 1),
(19, '', 0, '', 0, '00:00:00', '00:00:03', '', '', 23, 1),
(20, '', 0, '', 0, '00:00:00', '00:00:00', '', '', 23, 1),
(21, 'Afbeelding toevoegen', 0, 'Jesse', 1, '00:01:00', '00:00:33', 'ddd', 'ddddd', 23, 0),
(22, 'Jesse task test', 0, 'Jesse', 1, '00:00:05', '00:00:04', 'Yawwww', 'wwwww', 24, 0),
(23, 'eee', 0, '', 0, '00:00:00', '00:00:00', '', '', 24, 1),
(24, 'Niks', 0, 'ee', 0, '00:00:20', '00:00:10', 'e', 'e', 25, 0),
(25, '', 0, '', 0, '00:00:00', '00:00:00', '', '', 25, 1),
(26, '', 0, '', 0, '00:00:00', '00:00:03', '', '', 25, 0);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`projectId`),
  ADD KEY `projectId` (`projectId`);

--
-- Indexen voor tabel `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskId`),
  ADD KEY `projectId` (`projectId`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `projects`
--
ALTER TABLE `projects`
  MODIFY `projectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT voor een tabel `tasks`
--
ALTER TABLE `tasks`
  MODIFY `taskId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
