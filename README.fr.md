![Logo HBnB](docs/assets/Logo_hbnb.png)

# HBnB — Application web modulaire inspirée d'Airbnb

*[Read in English](README.md)*

**HBnB** est une application web modulaire développée étape par étape chez **Holberton School**,
couvrant la conception d'architecture logicielle, le développement d'API REST, l'authentification
et l'intégration d'une base de données.

---

## 📸 Aperçu

![Page d'accueil](docs/assets/Home.png)

![Connexion & Inscription](docs/assets/capture_login.png)

![Détail d'une annonce](docs/assets/Place_details.png)

---

## 🛠️ Stack technique

| Couche | Technologies |
| -------- | ------------- |
| Backend | Python 3 · Flask · Flask-RESTx |
| Auth | Flask-JWT-Extended · Flask-Bcrypt |
| ORM & Base de données | SQLAlchemy · SQLite (dev) · MySQL (prod) |
| Frontend | HTML5 · CSS3 · JavaScript Vanilla |
| Conception & Docs | UML · Mermaid.js · Swagger · Figma · Markdown |
| Tests | unittest · curl |

---

## 📐 Phases du projet

### Partie 1 — Architecture & Modélisation

Phase de conception avant toute ligne de code :

- **Diagrammes de packages** — organisation modulaire des composants
- **Diagrammes de classes** — entités et relations (User, Place, Review, Amenity)
- **Diagrammes de séquence** — cas d'usage (créer un utilisateur, une annonce, un avis, lister les annonces)
- **Documentation des entités** — règles métier et contraintes

👉 Voir : `part1/` et `docs/`

---

### Partie 2 — Logique métier & API REST

Implémentation des entités principales et des endpoints REST :

- CRUD complet sur Users, Places, Reviews, Amenities
- Architecture 3 couches : Présentation (API) · Logique métier (Services) · Persistance
- **Design pattern Facade** entre l'API, les modèles et le repository
- Repository en mémoire pour le prototypage rapide
- Tests automatisés (unittest) et tests manuels via Swagger

👉 Voir : `part2/`

---

### Partie 3 — Authentification & Base de données

- **Authentification JWT** (Flask-JWT-Extended) — connexion sécurisée, accès par token
- **Hachage des mots de passe** (Flask-Bcrypt) — jamais stockés en clair
- **Contrôle d'accès par rôle** — admin vs utilisateur standard (flag `is_admin`)
- **ORM SQLAlchemy** en remplacement du stockage en mémoire
- Relations en base de données :
  - Un-à-plusieurs : Users → Places, Users → Reviews
  - Plusieurs-à-plusieurs : Places ↔ Amenities (table d'association)
- Support **SQLite / MySQL** pour les environnements de dev et de production
- Diagrammes ER avec Mermaid.js

👉 Voir : `part3/`

---

### Partie 4 — Frontend (solo)

Conçu et développé entièrement de manière indépendante :

- **Design UI/UX** — thème Animal Crossing, logo custom, identité visuelle cohérente
- Grille de listings avec filtre par prix
- Page de connexion & inscription avec authentification JWT
- Page de détail d'une annonce avec avis, carte et équipements
- HTML/CSS/JS vanilla — sans framework

👉 Voir : `part4/`

---

## 💡 Compétences démontrées

- Traduire une architecture UML en code Python maintenable
- Concevoir et exposer une API RESTful (Flask, Flask-RESTx, Swagger)
- Implémenter une authentification sécurisée avec JWT et bcrypt
- Modéliser une base de données relationnelle avec ORM et gérer des relations complexes
- Écrire des tests unitaires et d'intégration (unittest)
- Concevoir une interface de A à Z — identité visuelle, choix UX, layout responsive
- Travailler en équipe avec Git

---

## 🚀 Lancer le projet en local

### Prérequis

- Python 3.10+
- pip
- SQLite ou MySQL

### Installation

```bash
# Cloner le repo
git clone https://github.com/Helvlaska/holbertonschool-hbnb.git
cd holbertonschool-hbnb

# Installer les dépendances
pip install -r requirements.txt

# Lancer l'API (Partie 2 ou 3)
cd part2/hbnb  # ou part3/hbnb
python run.py

# Lancer le frontend (Partie 4) — dans un autre terminal
cd part4
python3 -m http.server 8080
# Puis ouvrir http://localhost:8080
```

---

## 👩‍💻 Auteures

**Backend (Parties 1–3)** — développé en binôme :

- **Claire Castan** — [LinkedIn](https://www.linkedin.com/in/claire-castan) · [GitHub](https://github.com/Helvlaska)
- **Anne-Cécile Colléter**

**Frontend (Partie 4)** — conçu et développé en solo par :

- **Claire Castan** — design UI/UX, identité visuelle, thème Animal Crossing, création du logo

📄 Projet académique — Holberton School
