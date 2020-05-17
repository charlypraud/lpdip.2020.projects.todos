-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : Dim 17 mai 2020 à 10:26
-- Version du serveur :  5.6.48
-- Version de PHP : 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Web`
--

-- --------------------------------------------------------

--
-- Structure de la table `lists`
--

CREATE TABLE `lists` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `lists`
--

INSERT INTO `lists` (`id`, `label`, `description`) VALUES
(1, 'Films', 'Liste de films'),
(2, 'Musque', 'Artiste de musqie'),
(3, 'Courses', ''),
(4, 'Sports', '');

-- --------------------------------------------------------

--
-- Structure de la table `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `idList` int(11) NOT NULL,
  `isDone` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `todos`
--

INSERT INTO `todos` (`id`, `label`, `idList`, `isDone`) VALUES
(1, 'Django', 1, 1),
(3, 'Shrek', 1, 0),
(4, 'Guetta', 2, 0),
(5, 'Polnareff', 2, 0),
(6, 'François', 2, 0),
(7, 'Pêtes', 3, 0),
(8, 'Riz', 3, 0),
(9, 'Patates', 3, 1),
(10, 'chocolat', 3, 0),
(12, 'Basket', 4, 1),
(13, 'Skate', 4, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_lists_id` (`idList`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `lists`
--
ALTER TABLE `lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `todos`
--
ALTER TABLE `todos`
  ADD CONSTRAINT `FK_lists_id` FOREIGN KEY (`idList`) REFERENCES `lists` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
