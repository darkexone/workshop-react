import { AUTH_URL } from "../apiConfig";

const createUser = async (email, password) => {
  const url = `${AUTH_URL}users/`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  if (data.id === undefined) {
    const keyName = Object.keys(data);
    // eslint-disable-next-line no-alert
    alert(`Błąd: ${data[keyName][0]}`);
    data = { ...data, ok: false };
  } else {
    data = { ...data, ok: true };
  }

  return { ...data };
};

export default createUser;
