import { AUTH_URL } from "../apiConfig";

const getUserInfo = async (token) => {
  const url = `${AUTH_URL}users/`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();

  return data;
};

export default getUserInfo;
