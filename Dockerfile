# Utiliser une image Node officielle comme image de base
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Exposer le port que l'application va utiliser
EXPOSE 3006

# Démarrer l'application
CMD ["node", "server.js"]
