import { getArticles } from "@/services/HandlerGetArticles";
import { deleteArticle } from "@/services/HandlerDeleteArticle";
import { postArticle } from "@/services/HandlerPostArticle";
import { updateArticle } from "@/services/HandlerPutArticle";

export default {
  name: "ArticlePage",
  data() {
    return {
      articlesItems: [],
      selectedItem: null,
      editItem: null,
      selectedIndex: null,
      newArticle: {
        menu_id: "",
        article_name: "",
        description: "",
        price: 0,
      },
      isAddingArticle: false,
    };
  },
  async mounted() {
    try {
      this.articlesItems = await getArticles();
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
          this.articlesItems = this.articlesItems.filter(
            (article) => article._id !== item._id
          );
        } catch (error) {
          console.error("Erreur lors de la suppression de l'article:", error);
        }
      }
    },
    async addItem() {
      try {
        //need to call user => restaurant_id
        this.newArticle.restaurant_id = "1";
        const createdArticle = await postArticle(this.newArticle);
        this.articlesItems.push(createdArticle);
        this.resetNewArticle();
        this.isAddingArticle = false; // Masquer le formulaire d'ajout après l'ajout
      } catch (error) {
        console.error("Erreur lors de la création de l'article:", error);
      }
    },
    resetNewArticle() {
      this.newArticle = {
        menu_id: "",
        article_name: "",
        description: "",
        price: 0,
      };
    },
    selectItemForEdit(item, index) {
      this.selectedItem = item;
      this.editItem = { ...item };
      this.selectedIndex = index;
    },
    async modifierItem() {
      try {
        await updateArticle(this.editItem._id, this.editItem);
        this.articlesItems.splice(this.selectedIndex, 1, this.editItem);
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
    showAddArticleForm() {
      this.isAddingArticle = true;
    },
    cancelAddArticle() {
      this.isAddingArticle = false;
      this.resetNewArticle();
    },
  },
};
