import React, { ChangeEvent } from "react";
import FormInput from "./form-input";
import { TwitterPicker } from "react-color";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { addTodo, getAllTodos } from "../utils/data-utils";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import toast, { Toaster } from "react-hot-toast";
import { TimePicker } from "antd";
import dayjs from "dayjs";

const TodoForm = ({
  title,
  category,
  color,
  priority,
  setTitle,
  setCategory,
  setColor,
  setTodos,
  setPriority,
  saveBtn,
  updateBtn,
  deleteBtn,
  onDelete,
  onUpdate,
}: any) => {
  const auth = useAuthUser();

  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // make the API call
      await addTodo(title, category, color, priority, auth()?.id);
      toast.success("Todo created");
      //Todo: clear form fields

    } catch (error: any) {
      toast.error(error.message);
    }

    try {
      const response = await getAllTodos(auth()?.id);
      setTodos(response);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/*Title*/}
      <FormInput
        placeholder="Title"
        label="Title"
        value={title}
        required
        onChange={(value) => handleTitleChange(value)}
      />

      {/*Category Picker*/}
      <FormControl className="mt-5" fullWidth>
        <InputLabel className="mt-5" id="demo-simple-select-label">
          Category
        </InputLabel>
        <Select
          className="mt-5"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          required
          onChange={handleCategoryChange}
        >
          <MenuItem value={"School"}>School</MenuItem>
          <MenuItem value={"Private"}>Private</MenuItem>
          <MenuItem value={"Work"}>Work</MenuItem>
        </Select>
      </FormControl>

        {/*Priority Picker*/}
        <FormControl className="mt-5" fullWidth>
        <InputLabel className="mt-5" id="demo-simple-select-label">
          Priority
        </InputLabel>
        <Select
          className="mt-5"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          label="Priority"
          required
          onChange={handlePriorityChange}
        >
          <MenuItem value={"Easy"}>Easy</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"Hard"}>Hard</MenuItem>
        </Select>
      </FormControl>

      {/*Color Picker*/}
      <TwitterPicker
        className="mt-5"
        color={color}
        onChangeComplete={handleColorChange}
      />

      <button
        style={{ display: saveBtn === false ? "none" : "" }}
        onClick={handleSubmit}
        className="mt-5"
      >
        Save
      </button>

      <button
        style={{ display: updateBtn === false ? "none" : "" }}
        onClick={() => {
          const todo = {
            id: parseInt(localStorage.getItem("currTodoId")!),
            title: title,
            category: category,
            color: color,
            priority: priority,
            userId: auth()?.id,
          };
          onUpdate(todo);
        }}
        className="mt-5"
      >
        Update
      </button>

      <button
        style={{ display: deleteBtn === false ? "none" : "" }}
        onClick={() => {
          onDelete(parseInt(localStorage.getItem("currTodoId")!));
        }}
        className="mt-5"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoForm;
