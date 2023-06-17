import { fetchRestEndpoint } from "./client-server";
import { Deal, Habit } from "./model";

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
  birthdate: string,
  email: string
) => {
  const data = JSON.parse(
    `{"username": "${username}", "password": "${password}", "birthdate": "${birthdate}", "email": "${email}"}`
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
  color: string,
  userId: string
): Promise<number> => {
  let id: number = 0;
  try {
    const data = JSON.parse(
      `{"title": "${title}", "frequency": "${frequency}", "reminder": "${reminder}", "category": "${category}", "color": "${color}", "userId": "${userId}"}`
    );

    const response = await fetchRestEndpoint(
      "http://localhost:8000/api/habits",
      "POST",
      data
    );

    const result: Habit = await response.json();

    id = result.id;
  } catch (err) {
    console.log(err);
  }

  return id;
};

export const logout = () => {
  sessionStorage.removeItem("user");
  window.location.href = "/";
};

export const getAllHabits = async (id: number) => {
  const response = await fetchRestEndpoint(
    "http://localhost:8000/api/habits/" + id,
    "GET"
  );

  return await response.json();
};

export const addTodo = async (
  title: string,
  category: string,
  color: string,
  priority: string,
  userId: string
) => {
  try {
    const data = JSON.parse(
      `{"title": "${title}", "category": "${category}", "color": "${color}", "priority": "${priority}", "userId": "${userId}"}`
    );

    await fetchRestEndpoint("http://localhost:8000/api/todos", "POST", data);
  } catch (err) {
    console.log(err);
  }
};

export const getAllTodos = async (id: number) => {
  const response = await fetchRestEndpoint(
    "http://localhost:8000/api/todos/" + id,
    "GET"
  );

  return await response.json();
};

export const getDealById = async (id: number) => {
  const response = await fetchRestEndpoint(
    "http://localhost:8000/api/deals/task/" + id,
    "GET"
  );

  const deal: Deal = response.json();

  return await deal;
};

export const updateProgress = async (
  userId: number,
  points: number,
  experience: number
) => {
  try {
    const data = JSON.parse(
      `{"points": "${points}", "experience": "${experience}"}`
    );

    await fetchRestEndpoint(
      "http://localhost:8000/api/progress/" + userId,
      "PUT",
      data
    );
  } catch (err) {
    console.log(err);
  }
};
