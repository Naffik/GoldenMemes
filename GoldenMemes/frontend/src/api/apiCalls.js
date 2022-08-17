import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

export async function LoginCall({ username, password }) {
  return await axios
    .post(BASE_URL + "account/api/token/", { username, password })
    .then((response) => {
      return response;
    })
    .catch(() => {
      return null;
    });
}

export async function RegisterCall({ username, email, password, password2 }) {
  return await axios
    .post(BASE_URL + "account/register/", { username, email, password, password2 })
    .then((response) => {
      return response;
    })
    .catch(() => {
      return null;
    });
}
