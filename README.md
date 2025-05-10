# 📝Todo App – DevOps Project

Ce projet est une application "Todo List" avec un frontend en React et un backend Node.js (Express + MongoDB), déployée en utilisant Docker, GitHub Actions pour l'intégration continue, et Terraform pour l'infrastructure sur AWS.

## 🧱 Structure du projet

```
devops-project/
├── todo-frontend/        # Application frontend (React)
├── todo-backend/         # API backend (Node.js + Express + MongoDB)
├── .github/workflows/    # CI avec GitHub Actions
│   └── ci.yml
├── terraform-todo-infra/ # Fichiers Terraform pour provisionner AWS
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── provider.tf
└── README.md
```

## 🚀 Technologies utilisées

- ReactJS
- Node.js / Express
- MongoDB
- Docker
- GitHub Actions
- Terraform
- AWS EC2, VPC, Security Groups...

## 🔧 Installation en local

### 1. Cloner le projet

```bash
git clone https://github.com/<ton-username>/devops-project.git
cd devops-project
```

### 2. Lancer MongoDB (si non Dockerisé)

```bash
docker run -d -p 27017:27017 --name mongo mongo
```

### 3. Lancer le backend

```bash
cd todo-backend
npm install
npm start
```

### 4. Lancer le frontend

```bash
cd ../todo-frontend
npm install
npm start
```

## ⚙️ Intégration Continue (GitHub Actions)

Le fichier `.github/workflows/ci.yml` déclenche une intégration continue à chaque `push` ou `pull_request` sur la branche `main` :

- Lint / Test du backend
- Build du frontend
- Vérification des builds Docker

## 🐳 Dockerisation

### Build et lancement

```bash
# Backend
docker build -t backend todo-backend

# Frontend
docker build -t frontend todo-frontend
```

## ☁️ Déploiement Infrastructure – Terraform + AWS

### 1. Configuration AWS (une seule fois)

```bash
aws configure
```

Saisir l’`AWS Access Key`, `Secret Key`, et la `région` (ex: `eu-west-3`).

### 2. Initialiser Terraform

```bash
cd terraform-todo-infra
terraform init
```

### 3. Planifier l’infrastructure

```bash
terraform plan
```

### 4. Appliquer et créer l’infra

```bash
terraform apply
```

Cela va :
- Créer un VPC
- Lancer une instance EC2
- Ouvrir les ports nécessaires

## ✅ Améliorations possibles

- Ajouter des tests pour le backend
- Automatiser le déploiement avec GitHub Actions + Terraform
- Ajouter un DNS avec Route 53
- CI/CD avec pipeline complet (build → push Docker → déploiement)

## 👤 Auteur

Projet réalisé dans le cadre d’un exercice pratique DevOps.

## 📄 Licence

Libre d'utilisation à des fins pédagogiques.
