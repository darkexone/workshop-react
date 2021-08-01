import { API_URL } from "../apiConfig";
import { store } from "../../redux/createStore";

const addNewComplaint = async (type, description, id) => {
  const url = `${API_URL}complaints/`;
  const state = store.getState();

  const params = {
    status: "WAI",
    description,
  };

  switch (type) {
    case "order": {
      params.type = "ORD";
      params.order = id;
      params.job = null;
      break;
    }
    case "job": {
      params.type = "JOB";
      params.order = null;
      params.job = id;
      break;
    }
    default:
      break;
  }

  const body = JSON.stringify(params);

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

export default addNewComplaint;
