<script src="../scripts/StatsPage.js"></script>
<style src="../stylesheets/styles.css" scoped></style>

<template>
  <div>
    <div v-if="loading">Chargement en cours...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h2>Statistiques journalières :</h2>
      <ul>
        <li v-for="(count, date) in dailyOrdersCount" :key="date">
          {{ date }}: {{ count }} commandes
        </li>
      </ul>

      <h2>Meilleurs menus :</h2>
      <ul>
        <li v-for="(item, index) in topMenuItems" :key="index">
          {{ item.name }} : {{ item.count }} commandes
        </li>
      </ul>

      <h2>Meilleurs articles :</h2>
      <ul>
        <li v-for="(item, index) in otherItems" :key="index">
          {{ item.name }} : {{ item.count }} commandes
        </li>
      </ul>

      <h2>Chiffre d'affaires total : {{ totalRevenue }}</h2>

      <h2>Historiques des commandes :</h2>
      <ul>
        <li v-for="(order, index) in orders" :key="index">
          <p>Livraison effectuée le : {{ order.delivery_date }}</p>
          <p>Commande : {{ order.order_status }}</p>
          <p>Adresse de livraison : {{ order.delivery_address }}</p>
          <p>Prix de la course : {{ order.order_total_amount }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
