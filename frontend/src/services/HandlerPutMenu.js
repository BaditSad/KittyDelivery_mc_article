import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const updateMenu = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/menus/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de menu:", error);
    throw error;
  }
};
