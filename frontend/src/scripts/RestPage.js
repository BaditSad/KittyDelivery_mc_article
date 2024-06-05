import { getMenus } from "@/services/HandlerGetMenus";
import { deleteMenu } from "@/services/HandlerDeleteMenu";
import { postMenu } from "@/services/HandlerPostMenu";
import { updateMenu } from "@/services/HandlerPutMenu";

export default {
  name: "RestPage",
  data() {
    return {
      menuItems: [],
      selectedItem: null,
      editItem: null,
      selectedIndex: null,
    };
  },
  async mounted() {
    try {
      this.menuItems = await getMenus();
    } catch (error) {
      console.error("Erreur lors de la récupération des menus:", error);
    }
  },
  methods: {
    async deleteMenu(item) {
      if (
        confirm(
          `Êtes-vous sûr de vouloir supprimer le menu: ${item.menu_name}?`
        )
      ) {
        try {
          await deleteMenu(item._id);
          this.menuItems = this.menuItems.filter(
            (menu) => menu._id !== item._id
          );
        } catch (error) {
          console.error("Erreur lors de la suppression du menu:", error);
        }
      }
    },
    async addMenu() {
      const newMenu = {
        menu_name: "Nouveau Menu",
        menu_description: "Description du menu",
        menu_price: 10,
        article_list: ["Article 1", "Article 2"],
        restaurant_id: 1,
      };
      try {
        const createdMenu = await postMenu(newMenu);
        this.menuItems.push(createdMenu);
      } catch (error) {
        console.error("Erreur lors de la création du menu:", error);
      }
    },
    selectMenuForEdit(item, index) {
      this.selectedItem = item;
      this.editItem = { ...item };
      this.selectedIndex = index;
    },
    async updateMenu() {
      try {
        await updateMenu(this.editItem._id, this.editItem);
        this.menuItems.splice(this.selectedIndex, 1, this.editItem);
        this.selectedItem = null;
        this.editItem = null;
        this.selectedIndex = null;
      } catch (error) {
        console.error("Erreur lors de la modification du menu:", error);
      }
    },
    cancelEditMenu() {
      this.selectedItem = null;
      this.editItem = null;
      this.selectedIndex = null;
    },
    addArticle() {
      this.editItem.article_list.push("");
    },

    removeArticle(index) {
      this.editItem.article_list.splice(index, 1);
    },
  },
};
