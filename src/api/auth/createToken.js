import { AUTH_URL } from "../apiConfig";

const createToken = async (email, password) => {
  const url = `${AUTH_URL}jwt/create`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return { ...data };
};

export default createToken;
