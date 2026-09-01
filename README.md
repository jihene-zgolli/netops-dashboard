# 📡 NetOps Dashboard

Dashboard full-stack de supervision d'incidents réseau, inspiré d'un contexte télécom (roaming, data, voix, cœur de réseau). Conçu pour illustrer un flux complet de gestion d'incidents avec authentification par rôles, visualisation KPI en temps réel, et une architecture DevOps prête pour la production.

**🔗 Démo live :** [netops-dashboard-git-main-team-jihene.vercel.app](https://netops-dashboard-git-main-team-jihene.vercel.app)
**🔗 API backend :** [netops-dashboard.onrender.com](https://netops-dashboard.onrender.com)

> ⚠️ Le backend est hébergé sur le tier gratuit de Render, qui se met en veille après inactivité — la première requête peut prendre 30 à 60 secondes.

---

## ✨ Fonctionnalités

- **Authentification JWT** avec inscription et gestion de rôles (`admin`, `CEM`, `superviseur`, `technicien`)
- **CRUD complet** sur les incidents réseau (création, lecture, mise à jour du statut, suppression)
- **Dashboard KPI** avec 3 graphiques dynamiques (répartition par sévérité, statut, type d'incident)
- **Recherche et filtres** en temps réel sur la liste des incidents
- **Routes protégées** par guard Angular selon l'état de connexion
- **Interface professionnelle** avec sidebar, landing page et thème sombre cohérent
- **Conteneurisation complète** avec Docker et docker-compose

## 🛠️ Stack technique

**Frontend**
- Angular 21 (standalone components, signals, mode zoneless)
- Chart.js / ng2-charts
- SCSS

**Backend**
- Node.js / Express
- MongoDB Atlas (Mongoose)
- JWT (jsonwebtoken) + bcryptjs

**DevOps**
- Docker & docker-compose
- Déploiement : Render (backend) + Vercel (frontend)
- CI-ready via GitHub

## 🏗️ Architecture

```
[Angular Frontend] --HTTP/REST--> [Express API] --Mongoose--> [MongoDB Atlas]
                                        |
                                  JWT Auth + Rôles
```

## 📂 Structure du projet

```
netops-dashboard/
├── backend/
│   ├── models/          # Schémas Mongoose (Incident, User)
│   ├── routes/          # Routes API (auth, incidents)
│   ├── middleware/       # Middleware d'authentification JWT
│   ├── server.js
│   └── Dockerfile
├── frontend/
│   └── netops-frontend/
│       ├── src/app/
│       │   ├── components/   # incident-list, incident-form, login, register, kpi-dashboard, home
│       │   ├── services/     # incident.ts, auth.ts
│       │   ├── guards/       # auth-guard.ts
│       │   └── interceptors/ # auth-interceptor.ts
│       └── Dockerfile
└── docker-compose.yml
```

## 🚀 Lancer le projet en local

### Prérequis
- Node.js 20+
- Un cluster MongoDB Atlas (ou MongoDB local)
- Angular CLI (`npm install -g @angular/cli`)

### Backend

```bash
cd backend
npm install
```

Crée un fichier `.env` :
```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/netops?retryWrites=true&w=majority
JWT_SECRET=une_phrase_secrete
PORT=5000
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend/netops-frontend
npm install --legacy-peer-deps
ng serve --proxy-config proxy.conf.json
```

### Avec Docker

```bash
docker-compose up --build
```

## 👤 Rôles disponibles

| Rôle | Description |
|---|---|
| `admin` | Accès complet |
| `cem` | Centre d'Exploitation et de Maintenance — supervision |
| `superviseur` | Gestion d'équipe |
| `technicien` | Création et traitement des incidents |

## 📌 Roadmap

- [ ] Tests unitaires (Jest / Karma)
- [ ] Export CSV des rapports d'incidents
- [ ] Historique / timeline par incident
- [ ] Notifications temps réel (WebSocket)

## 👩‍💻 Auteure

**Jihene Zgolli** — Ingénieure Réseaux & Cloud
[LinkedIn](https://linkedin.com/in/jihenezgolli) · [GitHub](https://github.com/jihene-zgolli)