# Zoo TypeScript - Application de Gestion de Zoo

## Description
Application de gestion de zoo avec Angular 18 (frontend) et NestJS (backend).

## Prérequis
- **Node.js** v18+
- **PostgreSQL** 
- **Angular CLI** (`npm install -g @angular/cli`)

## Installation Rapide

### 1. Cloner le projet
```bash
git clone https://github.com/Thaykoo/ZooTypescript.git
cd TypescriptZoo
```

### 2. Base de données PostgreSQL
```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base et l'utilisateur
CREATE USER zoo_user WITH PASSWORD 'zoo_password';
CREATE DATABASE zoo_db OWNER zoo_user;
GRANT ALL PRIVILEGES ON DATABASE zoo_db TO zoo_user;
\q
```

### 3. Démarrer le Backend
```bash
cd zoo-backend
npm install
npm run start:dev
```
**Backend prêt sur** : http://localhost:3001

### 4. Démarrer le Frontend (nouveau terminal)
```bash
cd zoo-frontend
npm install
npm start
```
**Frontend prêt sur** : http://localhost:4200

## Liens pour tester
- **Interface Web** : http://localhost:4200
- **API Swagger** : http://localhost:3001/api
- **API Backend** : http://localhost:3001

## Test de l'Application

1. **Vérifier que PostgreSQL fonctionne** : 
   - Le backend doit se connecter à la base `zoo_db`

2. **Accéder au Frontend** : 
   - Aller sur http://localhost:4200
   - Tester les pages : Animaux, Enclos, Visites, Soigneurs

3. **Vérifier l'API** : 
   - Aller sur http://localhost:3001/api (Swagger)
   - Tester les endpoints directement

## Dépannage - Problèmes Courants

### ❌ Erreur: "Cannot find module '@nestjs/common'"
**Cause** : Les dépendances ne sont pas installées après le clonage
```bash
cd zoo-backend
npm install
```

### ❌ Erreur: "EADDRINUSE: address already in use :::3001"
**Cause** : Le port 3001 est déjà utilisé par une autre instance
```bash
# Arrêter le processus qui utilise le port 3001
sudo pkill -f "node.*3001"
# Ou trouver et tuer le processus
lsof -ti:3001 | xargs kill -9
# Puis relancer
npm run start:dev
```

### ❌ Erreur: "Could not find the '@angular-devkit/build-angular' builder"
**Cause** : Les dépendances Angular ne sont pas installées
```bash
cd zoo-frontend
npm install
```

### ⚠️ Warnings npm (normal)
Les messages `npm warn deprecated` sont normaux et n'empêchent pas le fonctionnement :
- Ce sont des avertissements sur des packages obsolètes
- Le projet fonctionne malgré ces warnings
- Les "vulnerabilities" sont mineures et non-critiques


