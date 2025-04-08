# Gestion des Soirées Étudiantes & Stock de Goodies
## 📌 Contexte :

Un bureau des étudiants (BDE) souhaite développer une application interne pour gérer l’organisation des soirées étudiantes ainsi que la distribution de goodies aux participants.

L’application doit permettre aux membres du BDE de :

    Consulter la liste des soirées étudiantes organisées (thème, lieu, date, prix, etc.).

    Gérer les réservations des étudiants pour ces soirées.

    Gérer un stock de goodies à distribuer aux participants (bracelets, t-shirts, stickers, etc.).

L’application est destinée à une gestion interne, mais pourrait évoluer vers une version accessible aux étudiants pour leurs réservations.
## 🛠️ Technologies utilisées :

    Backend API : Laravel

    Frontend Web : Angular

## 📋 Travail demandé :

Vous devez développer la partie Angular et Laravel de l’application permettant :
✔ L’affichage de la liste des soirées étudiantes prévues (nom, date, lieu, etc.).
✔ La consultation et la gestion des réservations enregistrées.
✔ L’ajout manuel d’une nouvelle réservation pour un étudiant.
✔ La gestion du stock de goodies disponibles (ajout, suppression, mise à jour des quantités).
✔ (Optionnel - Bonus) : La modification ou l’annulation d’une réservation.

## 🗂️ Structures de données

![Diagramme De Classes](Conception/Diagramme%20de%20classes.png)



## Installation

1. Construire et lancer le projet laravel

```
cd BDEGoodiesApi

composer install 

cp .env.example .env

php artisan key:generate

php artisan migrate

php artisan db:seed

php artisan serve
```
2. Construire et lancer le projet angular

```
cd BDEGoodiesUI

npm install

ng serve

```

3. Accéder au résultat

Se connecter à `localhost:4200`.
