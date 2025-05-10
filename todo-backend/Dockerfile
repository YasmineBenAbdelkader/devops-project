# Utilise une image officielle de Node.js
FROM node:18

# Crée un dossier de travail
WORKDIR /app

# Copie les fichiers de projet
COPY . .

# Installe les dépendances
RUN npm install

# Expose le port sur lequel le serveur écoute
EXPOSE 5000

# Démarre l'application
CMD ["node", "server.js"]
