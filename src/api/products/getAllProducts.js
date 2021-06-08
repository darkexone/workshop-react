import { API_URL } from "../apiConfig";

const getAllProducts = async () => {
  const url = `${API_URL}products/`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export default getAllProducts;
