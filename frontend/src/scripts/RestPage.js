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
      newMenu: {
        menu_name: "",
        menu_description: "",
        menu_price: 0,
        article_list: [""],
      },
      isAddingMenu: false, // Propriété pour suivre l'état du formulaire d'ajout
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
      try {
        //need to call user => restaurant_id
        this.newMenu.restaurant_id = "1";
        const createdMenu = await postMenu(this.newMenu);
        this.menuItems.push(createdMenu);
        this.resetNewMenu();
        this.isAddingMenu = false;
      } catch (error) {
        console.error("Erreur lors de la création du menu:", error);
      }
    },
    resetNewMenu() {
      this.newMenu = {
        menu_name: "",
        menu_description: "",
        menu_price: 0,
        article_list: [""],
      };
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
    addNewArticle() {
      this.newMenu.article_list.push("");
    },
    removeNewArticle(index) {
      this.newMenu.article_list.splice(index, 1);
    },
    showAddMenuForm() {
      this.isAddingMenu = true;
    },
    cancelAddMenu() {
      this.isAddingMenu = false;
      this.resetNewMenu();
    },
  },
};
