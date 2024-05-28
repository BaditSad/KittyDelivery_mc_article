import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const deleteArticle = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    throw error;
  }
};
