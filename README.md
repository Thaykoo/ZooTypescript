# 🦁 Zoo TypeScript - Application de Gestion

Application de gestion d'un zoo avec **NestJS** (backend) et **Angular** (frontend).

## 🚀 Démarrage en 4 étapes

### 1. Configuration PostgreSQL
```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base et l'utilisateur
CREATE USER zoo_user WITH PASSWORD 'zoo_password';
CREATE DATABASE zoo_db OWNER zoo_user;
GRANT ALL PRIVILEGES ON DATABASE zoo_db TO zoo_user;
\q

2. Démarrer le Backend
cd zoo-backend
npm install
npm run start:dev
✅ Backend prêt sur : http://localhost:3001

3. Démarrer le Frontend (nouveau terminal)
cd zoo-frontend
npm install
ng serve
✅ Frontend prêt sur : http://localhost:4200

4. Installer Angular CLI (si nécessaire)
npm install -g @angular/cli

🌐 Liens importants pour tester
Service	URL	Description
Interface Web	http://localhost:4200	Application complète (naviguer entre Animaux/Enclos/Visites)
API Swagger	http://localhost:3001/api   
API directe	http://localhost:3001	    Backend REST (pour curl)

