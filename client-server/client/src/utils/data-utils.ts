import { fetchRestEndpoint } from "./client-server";

export const getData = async (username: string, password: string) => {
  const data = JSON.parse(
    `{"username": "${username}", "password": "${password}"}`
  );
  const response = await fetchRestEndpoint(
    "http://localhost:8000/users/login",
    "POST",
    data
  );
  sessionStorage.setItem("user", username);
  sessionStorage.setItem("user-id", response?.id);

  return response;
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
  frequency: string,
  reminder: string,
  category: string,
  color: string
) => {
  const data = JSON.parse(
    `{"title": "${title}", "frequency": "${frequency}", "reminder": "${reminder}", "category": "${category}", "color": "${color}", "userId": "${sessionStorage.getItem(
      "user-id"
    )}"}`
  );
  await fetchRestEndpoint("http://localhost:8000/api/habits", "POST", data);
};

export const logout = () => {
  sessionStorage.removeItem("user");
  window.location.href = "/";
};
