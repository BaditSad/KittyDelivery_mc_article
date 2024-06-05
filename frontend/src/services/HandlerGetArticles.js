import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getArticles = async (restaurantId) => {
  restaurantId = 1;
  try {
    const response = await axios.get(`${API_URL}/restaurants/${restaurantId}/articles`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    throw error;
  }
};
