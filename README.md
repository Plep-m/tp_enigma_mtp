# Enigma MTP

**🛣️ Une application mobile de parcours interactif sur la ville de「✦ Montpellier ✦」**

## Objectif

Découvrir l'histoire de la ville de Montpellier en suivant des itinéraires guidés, avec des défis à résoudre sur chaque point d'intérêt.​

Exemple métier :
- Point A (départ) = Place Comédie : défi = prendre une photo de la fontaine des 3 Grâces
- Point B = Gare Saint-Roch : défi = En quelle année la Gare Saint Roch a-t-elle été inaugurée ?​
- Point C (arrivée) = Université de Montpellier : défi = Combien d'étudiants y suivent leur formation ?

L'audience principale concernerait :
- Touristes
- Nouveaux arrivants à Montpellier
- Toute personne souhaitant connaître l'histoire de la ville

## Fonctionnalités clés

- Affichage de la liste des activités disponibles à réaliser
- Gérer la création d'activités de parcours : manuelle ou à travers le scan d'un QR Code ; le QR code est généré lors de la création d'activité
- Affichage du détail d'une activité présentant les étapes de parcours sur une liste et sur une carte
- Démarrage de l'aventure avec les itinéraires à parcourir, réaliser les défis demandés (*prendre une photo, répondre à une question*)
- Gérer son profil et consulter ses statistiques (*nombre de lieux visités, distance la plus longue parcourue, etc.*)
- Gérer les paramètres clés de l'application (*thème, taille de police*)

## Installation et lancement

1. Cloner le repôt GitHub : `git clone https://github.com/Plep-m/tp_enigma_mtp.git` puis ouvrir le projet sur VS Code
2. Exécuter la commande `npm install` pour installer les dépendances
3. Lancer l'application avec Expo Go en exécutant la commande `npx expo start`. Pour rafraîchir le cache présent, vous pouvez exécuter la commande `npx expo start -c`. Scanner ensuite le QR Code affiché sur le terminal
4. **Résultat attendu:** L'application s'ouvre

## Architecture

Stack technique : **React Native + Expo**. Les composants natifs utilisés pour le contexte métier sont :
- Camera : prendre une photo pour l'image de présentation du parcours, scanner le QR Code pour importer une activité de parcours
- Maps : afficher le parcours de l'utilisateur ainsi que sa position
- Location : GPS
- Navigation
- Async Storage : persistance des données

Le projet est structuré en modèle MVC (Models-Views-Controllers) afin d'assurer une séparation des responsabilités des différentes couches.

Nous avons également implémenté des hooks personnalisés utilisant des librairies et adaptant la logique métier en fonction du champ d'application du projet (`useAsyncStorage, useProfile, useMapRoute, etc.`).

## Tableau de répartition des tâches

| Navid SABETE ISFAHANI  | Houda OUADAH | Tahina HONI RIKA | Paul MENUT | Tout le monde
| -------------          | ----------- | ----------- | ----------- | ----------- | 
| Fonctionnalités de profil utilisateur  + paramètres | Écran d'accueil, afficher la liste des activités, barre de navigation | Fonctionnalité de détails des activités | Fonctionnalités de Génération de QR Code + Hook Async Storage + affichage de la carte, navigation​ | Maquette de base + définition du modèle des données et des contraintes à respecter en fonction des besoins métier


## Points d'amélioration / Évolutions

- Ouvrir la création d'activités à tous les utilisateurs, créer un label de qualité pour celles organisées par les admins​ 
- Modification de la photo de profil, Connexion/Inscription​
- Proposer un système multi-langues : français (langue actuelle présente), anglais, allemand, espagnol, etc. - notamment pour les touristes internationaux
- Ajouter un système de score pour complémenter la section des statistiques consultables sur l'écran profil (*ex: -0,5 point tant que la réponse n'est pas correcte​, 1 point par bonne réponse​*)