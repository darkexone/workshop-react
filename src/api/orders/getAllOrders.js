import { API_URL } from "../apiConfig";
import { store } from "../../redux/createStore";

const getAllJobs = async () => {
  const url = `${API_URL}orders/`;
  const state = store.getState();

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.auth.access}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();

  return data;
};

export default getAllJobs;
