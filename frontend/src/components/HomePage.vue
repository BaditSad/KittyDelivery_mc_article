<template>
  <div class="container">
    <div class="header">
      <h1>Kitty Delivery</h1>
    </div>
    <div class="main">
      <div class="menu-card">
        <h2>Ma carte</h2>
        <div class="card-items">
          <div
            class="card-item"
            v-for="(item, index) in menuItems"
            :key="index"
          >
            <p>Prix : {{ item.price }} €</p>
            <p>{{ item.description }}</p>
            <div class="buttons">
              <button @click="modifierItem(item)">Modifier</button>
              <button @click="supprimerItem(item)">Supprimer</button>
            </div>
          </div>
        </div>
        <button class="add-button">+</button>
      </div>
      <div class="sidebar">
        <button>Mon profil</button>
        <button>Mes commandes et statistiques</button>
        <div class="delivery-status">
          <h3>Suivi de livraisons</h3>
          <p>Pas de livraison en cours</p>
          <div class="progress-bar">
            <div class="progress"></div>
          </div>
        </div>
        <div class="referral">
          <h3>Parrainage</h3>
          <input type="email" placeholder="Adresse mail à parrainer" />
          <button>Parrainer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/services/HandlerGetArticles";
import { deleteArticle } from "@/services/HandlerDeleteArticles";

export default {
  name: "HomePage",
  data() {
    return {
      menuItems: [],
    };
  },
  async mounted() {
    try {
      this.menuItems = await getArticles();
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  },
  methods: {
    async supprimerItem(item) {
      if (
        confirm(
          `Êtes-vous sûr de vouloir supprimer l'article: ${item.article_name}?`
        )
      ) {
        try {
          await deleteArticle(item._id);
          this.menuItems = this.menuItems.filter(
            (article) => article._id !== item._id
          );
        } catch (error) {
          console.error("Erreur lors de la suppression de l'article:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  background-color: #00adef;
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: white;
  font-size: 2rem;
}

.main {
  display: flex;
  width: 80%;
  margin-top: 2rem;
}

.menu-card {
  flex: 2;
  background-color: #e0e0e0;
  padding: 1rem;
  margin-right: 1rem;
}

.card-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card-item {
  background-color: white;
  padding: 1rem;
  text-align: center;
}

.item-placeholder {
  height: 100px;
  background-color: #f0f0f0;
  margin-bottom: 0.5rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.add-button {
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  background-color: white;
  border: none;
  cursor: pointer;
}

.sidebar {
  flex: 1;
  background-color: #e0e0e0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.sidebar button {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.delivery-status,
.referral {
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
}

.progress-bar {
  width: 100%;
  background-color: #f0f0f0;
  height: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress {
  width: 0%;
  height: 100%;
  background-color: #00adef;
}

input[type="email"] {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>