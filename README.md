# 🎮 AireJeux - Frontend

Application web Angular pour la gestion et la réservation d'aires de jeux à Tours.

## 📋 Description

AireJeux est une plateforme de réservation d'équipements de jeux permettant aux utilisateurs de consulter un catalogue interactif avec carte géographique, de réserver des créneaux horaires, et aux administrateurs de gérer les jeux et valider les réservations.

## ✨ Fonctionnalités

### 👤 Espace Utilisateur
- 🗺️ **Carte interactive** avec Leaflet affichant la localisation des jeux à Tours
- 📋 **Catalogue des jeux** avec filtrage et recherche
- 📅 **Réservation de créneaux** avec sélection de date, heure et quantité
- 📜 **Suivi des réservations** avec statuts (En attente, Approuvé, Rejeté)
- 🔔 **Notifications toast** pour les succès et erreurs

### 👨‍💼 Espace Administrateur
- 🎯 **Gestion des jeux** (CRUD complet)
- ✅ **Validation des réservations** en attente
- 📊 **Tableau de bord** avec vue d'ensemble
- 🗺️ **Configuration des coordonnées GPS** pour chaque jeu

### 🔐 Authentification
- Connexion/Inscription avec JWT
- Guards pour routes protégées (admin/user)
- Gestion des rôles (ROLE_USER, ROLE_ADMIN)

## 🛠️ Technologies

- **Framework** : Angular 17 (standalone components)
- **Styling** : Tailwind CSS
- **Cartographie** : Leaflet 1.9.4
- **HTTP Client** : Angular HttpClient avec intercepteurs JWT
- **Routing** : Angular Router avec guards
- **UI Components** : Angular Material Icons

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/Mounaejiwene/airejeux_frontend.git
cd airejeux_frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run start
```

L'application sera accessible sur `http://localhost:4200/`

## ⚙️ Configuration

### API Backend

Modifier l'URL du backend dans `src/app/core/services/api-config.service.ts` :

```typescript
readonly apiBaseUrl = 'http://localhost:8080/api';
```

## 🏗️ Structure du Projet

```
src/
├── app/
│   ├── core/               # Services core (auth, api-config, guards)
│   ├── features/           # Modules métier
│   │   ├── admin/          # Dashboard et gestion admin
│   │   ├── auth/           # Login/Register
│   │   ├── jeux/           # Catalogue et carte
│   │   └── reservations/   # Gestion réservations
│   └── shared/             # Composants partagés (toast, modèles)
└── assets/                 # Ressources statiques
```

## 🚀 Scripts Disponibles

```bash
# Démarrage dev
npm start

# Build production
npm run build

# Tests
npm test

# Linting
ng lint
```

## 🌐 Routes Principales

| Route | Description | Accès |
|-------|-------------|-------|
| `/login` | Page de connexion | Public |
| `/register` | Inscription | Public |
| `/jeux` | Catalogue avec carte | Authentifié |
| `/reservations/new` | Nouvelle réservation | Authentifié |
| `/reservations/mine` | Mes réservations | Authentifié |
| `/admin` | Dashboard admin | Admin uniquement |
| `/admin/jeux` | Gestion des jeux | Admin uniquement |
| `/admin/reservations` | Validation réservations | Admin uniquement |

## 👥 Contributors

- **Christ Chadrak MVOUNGOU** - ccmvoungou@gmail.com
- **Mariem Ejiewen** - [@Mounaejiwene](https://github.com/Mounaejiwene)
- **Sidi Med SABAR** - [@sabar40](https://github.com/sabar40)

## 📄 Licence

Ce projet est développé dans le cadre d'un projet académique à Polytech Tours.

---

**Version** : 1.0.0  
**Angular** : 17.3.17  
**Node** : >=18.x
