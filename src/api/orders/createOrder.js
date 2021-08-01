import { API_URL } from "../apiConfig";
import { store } from "../../redux/createStore";

const createOrder = async (type, storedProducts) => {
  const url = `${API_URL}orders/`;
  const state = store.getState();

  const productArray = Object.keys(storedProducts).map(
    (key) => storedProducts[key].id,
  );
  const newDate = new Date();
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const actualDate = `${year}-${month}-${day}`;

  const bodyData = {
    status: "WT",
    delivery: "IP",
    order_date: actualDate,
    client: state.auth.id,
    products: productArray,
  };

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.auth.access}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(bodyData),
  };
  const response = await fetch(url, requestOptions);
  if (response.status !== 201) {
    return undefined;
  }
  const data = await response.json();

  return data;
};

export default createOrder;
