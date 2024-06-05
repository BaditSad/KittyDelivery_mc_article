import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const updateArticle = async (id, article) => {
  try {
    const response = await axios.put(`${API_URL}/articles/${id}`, article);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification de l'article:", error);
    throw error;
  }
};
