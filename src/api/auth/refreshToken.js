import { AUTH_URL } from "../apiConfig";

const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  const url = `${AUTH_URL}jwt/refresh`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ refresh }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return { ...data };
  }

  const { status } = response;
  return status;
};

export default refreshToken;
