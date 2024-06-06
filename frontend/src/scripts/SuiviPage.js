import { getOrders } from "../services/HandlerGetOrders";
import { updateOrder } from "../services/HandlerPutOrder";

export default {
  name: "SuiviPage",
  data() {
    return {
      orders: [],
      categorizedOrders: {
        pending: [],
        accepted: [],
        refused: [],
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    categorizeOrders(orders) {
      const categorized = {
        pending: [],
        accepted: [],
        refused: [],
      };
      orders.forEach((order) => {
        if (order.order_status === "0") {
          categorized.pending.push(order);
        } else if (order.order_status === "accepté") {
          categorized.accepted.push(order);
        } else if (order.order_status === "refusé") {
          categorized.refused.push(order);
        }
      });
      this.categorizedOrders = categorized;
    },
    async updateOrder(orderId, newStatus) {
      try {
        const updatedOrder = await updateOrder(orderId, newStatus);
        const index = this.orders.findIndex((order) => order._id === orderId);
        if (index !== -1) {
          this.orders.splice(index, 1, updatedOrder);
          this.categorizeOrders(this.orders);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande:", error);
        this.error = "Erreur lors de la mise à jour de la commande.";
      }
    },
    async refreshOrders() {
      this.loading = true;
      try {
        const restaurantId = "1";
        const orders = await getOrders(restaurantId);
        this.orders = orders;
        this.categorizeOrders(orders);
      } catch (err) {
        this.error = "Erreur lors de la récupération des commandes.";
      } finally {
        this.loading = false;
      }
    },
    acceptOrder(orderId) {
      this.updateOrder(orderId, "accepté");
    },
    refuseOrder(orderId) {
      this.updateOrder(orderId, "refusé");
    },
  },
  async created() {
    this.refreshOrders();
  },
};
