import { API_URL } from "../apiConfig";
import { store } from "../../redux/createStore";

const addNewJob = async (type, description, startDate) => {
  const url = `${API_URL}jobs/`;
  const state = store.getState();

  const body = JSON.stringify({
    type,
    status: "WAI",
    price: 0.0,
    description,
    start_date: startDate,
    end_date: startDate,
    client: state.auth.id,
    mechanic: 1,
  });

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.auth.access}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };
  const response = await fetch(url, requestOptions);
  if (response.status !== 201) {
    return undefined;
  }
  const data = await response.json();

  return data;
};

export default addNewJob;
