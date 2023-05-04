import { fetchRestEndpoint } from "./client-server";

export const getData = async (username: string, password: string) => {
  const data = JSON.parse(
    `{"username": "${username}", "password": "${password}"}`
  );
  await fetchRestEndpoint("http://localhost:8000/users/login", "POST", data);
  sessionStorage.setItem("user", username);
  window.location.href = "/";
};

export const register = async (
  username: string,
  password: string,
  birthdate: string
) => {
  const data = JSON.parse(
    `{"username": "${username}", "password": "${password}", "birthdate": "${birthdate}"}`
  );
  await fetchRestEndpoint(
    "http://localhost:8000/users/registration",
    "POST",
    data
  );
  sessionStorage.setItem("user", username);
  window.location.href = "/";
};
