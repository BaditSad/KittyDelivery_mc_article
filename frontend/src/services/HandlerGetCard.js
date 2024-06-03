
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getMenu = async (restaurantId) => {
  try {
    const response = await axios.get(`${API_URL}/restaurant/${restaurantId}/card`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de menu:", error);
    throw error;
  }
};
