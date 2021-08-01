/* eslint-disable camelcase */
import { ACCOUNTS_URL } from "../apiConfig";
import { store } from "../../redux/createStore";

const updateUserProfile = async (
  profile,
  first_name,
  last_name,
  phone,
  address,
  zipcode,
  city,
) => {
  const state = store.getState();

  const newData = {};

  if (profile.first_name !== first_name) {
    newData.first_name = first_name;
  }
  if (profile.last_name !== last_name) {
    newData.last_name = last_name;
  }
  if (profile.phone !== phone) {
    newData.phone = phone;
  }
  if (profile.address !== address) {
    newData.address = address;
  }
  if (profile.zipcode !== zipcode) {
    newData.zipcode = zipcode;
  }
  if (profile.city !== city) {
    newData.city = city;
  }
  if (Object.keys(newData).length === 0) {
    return "nothing changed";
  }

  const url = `${ACCOUNTS_URL}profile/${state.auth.id}/`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.auth.access}`);
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(newData),
    headers: myHeaders,
  });
  const data = await response.json();

  return data;
};

export default updateUserProfile;
