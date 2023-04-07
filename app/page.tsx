"use client";
import { Inter } from "next/font/google";

//components
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodos";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <InputTodo />
      <ListTodo />
    </main>
  );
}
