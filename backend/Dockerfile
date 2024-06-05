# Utiliser une image officielle de Node.js comme image de base
FROM node:lts AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY . .

# Installer les dépendances
RUN npm install

# Installer nodemon en tant que dépendance de développement
RUN npm install --save-dev nodemon

# Exposer le port
EXPOSE 3000

# Exécuter le serveur avec nodemon
CMD ["npm", "run", "start"]
