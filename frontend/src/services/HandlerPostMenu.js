import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const postMenu = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/menus`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de menu:", error);
    throw error;
  }
};
