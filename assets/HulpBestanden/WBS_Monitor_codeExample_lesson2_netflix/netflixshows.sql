-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Gegenereerd op: 21 mrt 2018 om 19:12
-- Serverversie: 5.7.19
-- PHP-versie: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `netflixshows`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `showinfo`
--

CREATE TABLE `showinfo` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `release_date` varchar(4) NOT NULL,
  `poster` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `showinfo`
--

INSERT INTO `showinfo` (`id`, `name`, `release_date`, `poster`) VALUES
(1, 'Better Call Saul', '2015', 'bcs.jpg'),
(2, 'Stranger Things', '2019', 'stranger_things.jpg'),
(3, 'Narcos', '2015', 'narcos.jpg');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `showinfo`
--
ALTER TABLE `showinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `showinfo`
--
ALTER TABLE `showinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
