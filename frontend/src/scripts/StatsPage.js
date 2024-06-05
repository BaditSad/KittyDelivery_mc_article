import { getOrders } from "../services/HandlerGetOrders";

export default {
  name: "SuiviPage",
  data() {
    return {
      orders: [],
      loading: false,
      error: null,
      dailyOrdersCount: {},
      topMenuItems: [],
      otherItems: [],
      totalRevenue: 0,
    };
  },
  methods: {
    async getOrders() {
      try {
        const id = 1;
        this.loading = true;
        this.orders = await getOrders(id);
        this.calculateDailyOrders();
        this.calculateTopItems();
        this.calculateTotalRevenue();
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    calculateDailyOrders() {
      this.dailyOrdersCount = {};
      this.orders.forEach((order) => {
        const orderDate = new Date(order.order_date).toDateString();
        if (this.dailyOrdersCount[orderDate]) {
          this.dailyOrdersCount[orderDate]++;
        } else {
          this.dailyOrdersCount[orderDate] = 1;
        }
      });
    },
    calculateTopItems() {
      const menuItems = [];
      const otherItems = [];
      this.orders.forEach((order) => {
        order.order_items.forEach((item) => {
          if (item.startsWith("Menu")) {
            menuItems.push(item);
          } else {
            otherItems.push(item);
          }
        });
      });
      const sortedMenuItems = this.sortItemsByCount(menuItems);
      const sortedOtherItems = this.sortItemsByCount(otherItems);
      this.topMenuItems = sortedMenuItems;
      this.otherItems = sortedOtherItems;
    },
    calculateTotalRevenue() {
      // Filtrer les commandes avec statut "accepté" et calculer le chiffre d'affaires
      this.totalRevenue = this.orders
        .filter((order) => order.order_status === "accepté")
        .reduce((total, order) => total + order.order_total_amount, 0);
    },
    sortItemsByCount(items) {
      const itemMap = {};
      items.forEach((item) => {
        if (itemMap[item]) {
          itemMap[item]++;
        } else {
          itemMap[item] = 1;
        }
      });
      return Object.entries(itemMap)
        .sort((a, b) => b[1] - a[1])
        .map((item) => ({ name: item[0], count: item[1] }));
    },
  },
  created() {
    this.getOrders();
  },
};
