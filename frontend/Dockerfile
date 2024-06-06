# Utiliser une image officielle de Node.js comme image de base
FROM node:lts AS build

# Installer Vue CLI de manière globale
RUN npm install -g @vue/cli

# Définir le répertoire de travail
WORKDIR /app

# Copier le code source de l'application
COPY . .

# Installer les dépendances
RUN npm install

# Exécuter le serveur de développement
CMD ["vue", "serve"]
