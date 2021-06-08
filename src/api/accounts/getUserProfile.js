import { ACCOUNTS_URL } from "../apiConfig";

const getUserProfile = async (id) => {
  const authToken = localStorage.getItem("authToken");
  const url = `${ACCOUNTS_URL}profile/${id}/`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();

  return data;
};

export default getUserProfile;
