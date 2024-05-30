import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const postArticle = async (article) => {
  try {
    const response = await axios.post(`${API_URL}/articles`, article);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    throw error;
  }
};
