import { useState } from "react";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  return (
    <main>
      <h1>Input Todo</h1>
      <form>
        <input type="text" value={description}></input>
        <button>Add</button>
      </form>
    </main>
  );
}
