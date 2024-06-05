import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const deleteArticle = async (article_id) => {
  try {
    console.log(article_id);
    const response = await axios.delete(`${API_URL}/articles/delete/${article_id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    throw error;
  }
};
