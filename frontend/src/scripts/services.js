import { getArticles } from "@/services/HandlerGetArticles";
import { deleteArticle } from "@/services/HandlerDeleteArticles";
import { postArticle } from "@/services/HandlerPostArticles";
import { updateArticle } from "@/services/HandlerPutArticles";

export default {
  name: "HomePage",
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
      this.menuItems = await getArticles();
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  },
  methods: {
    async deleteItem(item) {
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
    async addItem() {
      const newArticle = {
        menu_id: 1,
        article_name: "Nouvel Article",
        description: "Description de l'article",
        price: 10,
      };
      try {
        const createdArticle = await postArticle(newArticle);
        this.menuItems.push(createdArticle);
      } catch (error) {
        console.error("Erreur lors de la création de l'article:", error);
      }
    },
    selectItemForEdit(item, index) {
      this.selectedItem = item;
      this.editItem = { ...item };
      this.selectedIndex = index;
    },
    async modifierItem() {
      try {
        await updateArticle(this.editItem._id, this.editItem);
        this.menuItems.splice(this.selectedIndex, 1, this.editItem);
        this.selectedItem = null;
        this.editItem = null;
        this.selectedIndex = null;
      } catch (error) {
        console.error("Erreur lors de la modification de l'article:", error);
      }
    },
    cancelEdit() {
      this.selectedItem = null;
      this.editItem = null;
      this.selectedIndex = null;
    },
  },
};