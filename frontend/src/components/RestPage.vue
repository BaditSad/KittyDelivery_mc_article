<script src="../scripts/RestPage.js"></script>
<style src="../stylesheets/styles.css" scoped></style>

<template>
  <header>
    <img class="logo" src="../assets/logo.jpg" alt="Kitty Delivery logo" />
    <img class="title" src="../assets/title.png" alt="Kitty Delivery title" />
    <router-link to="/profile">
      <button class="profile_button">Profile</button>
    </router-link>
  </header>
  <div class="container">
    <div class="main">
      <div class="menu-card">
        <h1>Ma carte &#127828;</h1>
        <div class="card-items">
          <div
            class="card-item"
            v-for="(item, index) in menuItems"
            :key="index"
          >
            <p class="item">{{ item.menu_name }}</p>
            <p class="item">{{ item.menu_description }}</p>
            <ul>
              <p
                v-for="(article, articleIndex) in item.article_list"
                :key="articleIndex"
              >
                {{ article }}
              </p>
            </ul>
            <p class="item">Prix : {{ item.menu_price }} €</p>
            <div class="buttons">
              <button
                class="button-update"
                @click="selectMenuForEdit(item, index)"
              >
                Modifier
              </button>
              <button class="button-delete" @click="deleteMenu(item)">
                Supprimer
              </button>
            </div>
          </div>
        </div>
        <button class="add-button" @click="addMenu">Ajouter un menu</button>
      </div>
      <div class="sidebar">
        <router-link to="/stats">
          <button>Mes commandes et statistiques</button>
        </router-link>
        <div class="delivery-status">
          <h3>Suivi de livraisons</h3>
          <p class="delivery">Pas de livraison en cours</p>
          <div class="progress-bar">
            <div class="progress"></div>
          </div>
        </div>
        <div class="referral">
          <h3>Parrainage</h3>
          <label>
            <input
              class="text"
              type="email"
              placeholder="Adresse mail à parrainer"
            />
          </label>
          <button>Parrainer</button>
        </div>
      </div>
    </div>
    <div v-if="selectedItem" class="edit-form">
      <h2>Modifier le menu</h2>
      <form @submit.prevent="updateMenu">
        <input
          type="text"
          v-model="editItem.menu_name"
          placeholder="Nom du menu"
          required
        />
        <textarea
          v-model="editItem.menu_description"
          placeholder="Description"
          required
        ></textarea>
        <div
          v-for="(article, articleIndex) in editItem.article_list"
          :key="articleIndex"
        >
          <input
            type="text"
            v-model="editItem.article_list[articleIndex]"
            :placeholder="'Article ' + (articleIndex + 1)"
            required
          />
          <button type="button" @click="removeArticle(articleIndex)">
            Supprimer
          </button>
        </div>
        <button type="button" @click="addArticle">Ajouter un article</button>
        <input
          type="number"
          v-model="editItem.menu_price"
          placeholder="Prix"
          required
        />
        <button type="submit">Enregistrer</button>
        <button type="button" @click="cancelEditMenu">Annuler</button>
      </form>
    </div>
  </div>
</template>
