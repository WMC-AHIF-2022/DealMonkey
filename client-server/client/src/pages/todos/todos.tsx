import Layout from "../../layout/loggedIn/layout";
import { useState, useEffect } from "react";
import { fetchRestEndpoint } from "../../utils/client-server";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import SlidingPaneCom from "../../components/slidingPane";
import "react-toastify/dist/ReactToastify.css";
import TodoList from "../../components/todoList";
import Form from "../../components/todo-form";
import toast, { Toaster } from "react-hot-toast";
import SideNavigation from "../../components/sideNavigation";

interface TodoItem {
  id: number;
  title: string;
  category: string;
  color: string;
  userId: number;
  priority: string;
}

const Todos = (socket: any) => {
  const auth = useAuthUser();
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [color, setColor] = useState("#fff");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");

  const [deleteBtn, setDeleteBtn] = useState(false);
  const [saveBtn, setSaveBtn] = useState(true);
  const [updateBtn, setUpdateBtn] = useState(false);

  const habitOnClickHandler = () => {
    setSaveBtn(false);
    setDeleteBtn(true);
    setUpdateBtn(true);
  };

  const getTodos = async () => {
    try {
      const response = await fetchRestEndpoint(
        `http://localhost:8000/api/todos/${auth()?.id}`,
        "GET"
      );

      const data: TodoItem[] = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetchRestEndpoint(
        `http://localhost:8000/api/tasks/${id}`,
        "DELETE"
      );
      toast.success("Todo deleted");
    } catch (error: any) {
      toast.error(error.message);
    }

    getTodos();
  };

  const updateTodo = async (todo: TodoItem) => {
    try {
      await fetchRestEndpoint("http://localhost:8000/api/todos", "PUT", todo);
      toast.success("Todo updated");
    } catch (error: any) {
      toast.error(error.message);
    }

    getTodos();
  };

  const resetForm = () => {
    setTitle("");
    setPriority("");
    setCategory("");
    setColor("#fff");
    setPriority("");
    setSaveBtn(true);
    setDeleteBtn(false);
    setUpdateBtn(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-6 h-max">
        <SideNavigation />

        <div className="col-span-5 px-12 mt-4">
          <Toaster />
          <div className="">
            <TodoList
              todos={todos}
              setOpen={setOpen}
              setTitle={setTitle}
              setPriority={setPriority}
              setCategory={setCategory}
              setColor={setColor}
              habitOnClickHandler={habitOnClickHandler}
            />
            <div style={{ marginTop: "32px" }}>
              <button
                className="bg-red-400 rounded-lg"
                onClick={() => {
                  setOpen(true);
                  resetForm();
                }}
              >
                Add Todo
              </button>
            </div>

            <SlidingPaneCom setOpen={setOpen} open={open}>
              <Form
                title={title}
                priority={priority}
                category={category}
                color={color}
                setTitle={setTitle}
                setPriority={setPriority}
                setCategory={setCategory}
                setColor={setColor}
                setTodos={setTodos}
                updateBtn={updateBtn}
                deleteBtn={deleteBtn}
                saveBtn={saveBtn}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            </SlidingPaneCom>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Todos;
