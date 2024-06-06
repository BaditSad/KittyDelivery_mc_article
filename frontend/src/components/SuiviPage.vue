<script src="../scripts/SuiviPage.js"></script>
<style src="../stylesheets/styles.css" scoped></style>

<template>
  <div class="order-container">
    <h1>Suivi des Commandes</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-if="!loading && !orders.length">Aucune commande trouvée.</div>

    <div>
      <h2>Commandes en attente</h2>
      <div v-if="categorizedOrders.pending.length">
        <ul>
          <li v-for="order in categorizedOrders.pending" :key="order._id">
            Commande #{{ order._id }} - {{ order.order_total_amount }}€ - Items:
            {{ order.order_items.join(", ") }}
            <button @click="acceptOrder(order._id)">Accepter</button>
            <button @click="refuseOrder(order._id)">Refuser</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucune commande en attente.</p>
      </div>
    </div>

    <div>
      <h2>Commandes acceptées</h2>
      <div v-if="categorizedOrders.accepted.length">
        <ul>
          <li v-for="order in categorizedOrders.accepted" :key="order._id">
            Commande #{{ order._id }} - {{ order.order_total_amount }}€ - Items:
            {{ order.order_items.join(", ") }}
            <div v-if="order.delivery_person_id === 0">
              Livreur non assigné.
            </div>
            <div v-else>
              Livreur #{{ order.delivery_person_id }} est en train de livrer.
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucune commande acceptée.</p>
      </div>
    </div>

    <div>
      <h2>Commandes refusées</h2>
      <div v-if="categorizedOrders.refused.length">
        <ul>
          <li v-for="order in categorizedOrders.refused" :key="order._id">
            Commande #{{ order._id }} - {{ order.order_total_amount }}€ - Items:
            {{ order.order_items.join(", ") }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucune commande refusée.</p>
      </div>
    </div>
  </div>
</template>
