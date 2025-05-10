# Utilise une image officielle de Node.js
FROM node:18

# Crée un dossier de travail
WORKDIR /app

# Copie les fichiers de projet
COPY . .

# Installe les dépendances
RUN npm install

# Build du projet React
RUN npm run build

# Utilise nginx pour servir le contenu static
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose le port 80
EXPOSE 80
