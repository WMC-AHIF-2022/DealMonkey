import { fetchRestEndpoint } from "./client-server";

export const getData = async (username: string, password: string) => {
  const data = JSON.parse(
    `{"username": "${username}", "password": "${password}"}`
  );
  await fetchRestEndpoint("http://localhost:8000/users/login", "POST", data);
  sessionStorage.setItem("user", username);
  window.location.href = "/myhabits";
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
  window.location.href = "/myhabits";
};

export const addHabit = async (
  title: string,
  date: string,
  category: string,
  color: string
) => {
  console.log("adding habit", title, date, category, color);
  const data = JSON.parse(
    `{"title": "${title}", "date": "${date}", "category": "${category}", "color": "${color}" }`
  );
  await fetchRestEndpoint("http://localhost:8000/api/habits", "POST", data);
};

export const logout = () => {
  sessionStorage.removeItem("user");
  window.location.href = "/";
};
