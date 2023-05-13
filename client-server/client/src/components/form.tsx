"use strict";
import React from "react";
import { useState, ChangeEvent } from "react";
import FormInput from "./form-input";
import { TwitterPicker } from "react-color";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SlidingPaneCom from "./slidingPane";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { addHabit, getAllHabits } from "../utils/data-utils";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({
  title,
  frequency,
  reminder,
  category,
  color,
  setTitle,
  setFrequency,
  setReminder,
  setCategory,
  setColor,
  setHabits,
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

  const handleFrequencyChange = (event: SelectChangeEvent) => {
    setFrequency(event.target.value as string);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // make the API call
      let timeString: string = dayjs(reminder).toISOString();
      await addHabit(title, frequency, timeString, category, color, auth()?.id);

      toast.success("Habit added", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      //Todo: clear form fields
    } catch (error: any) {
      alert("Add Habit Failed");
      console.log(error);
    }

    try {
      const response = await getAllHabits(auth()?.id);
      setHabits(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <ToastContainer />
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

      {/*Category Picker*/}
      <FormControl className="mt-5" fullWidth>
        <InputLabel className="mt-5" id="demo-simple-select-label">
          Frequency
        </InputLabel>
        <Select
          className="mt-5"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={frequency}
          label="Frequency"
          required
          onChange={handleFrequencyChange}
        >
          <MenuItem value={"Day"}>Every Day</MenuItem>
          <MenuItem value={"Week"}>Once a Week</MenuItem>
          <MenuItem value={"Month"}>Once a Month</MenuItem>
        </Select>
      </FormControl>

      <div className="mt-5">
        <TimePicker
          label="Reminder"
          value={reminder}
          onChange={(value) => setReminder(value)}
        />
      </div>

      {/*Color Picker*/}
      <TwitterPicker
        className="mt-5"
        color={color}
        onChangeComplete={handleColorChange}
      />

      <button
        style={{ display: saveBtn == false ? "none" : "" }}
        onClick={handleSubmit}
        className="mt-5"
      >
        Save
      </button>

      <button
        style={{ display: updateBtn == false ? "none" : "" }}
        onClick={() => {
          const habit = {
            id: parseInt(localStorage.getItem("currHabitId")!),
            title: title,
            frequency: frequency,
            reminder: reminder,
            category: category,
            color: color,
            userId: auth()?.id,
          };
          onUpdate(habit);
        }}
        className="mt-5"
      >
        Update
      </button>

      <button
        style={{ display: deleteBtn == false ? "none" : "" }}
        onClick={() => {
          onDelete(parseInt(localStorage.getItem("currHabitId")!));
        }}
        className="mt-5"
      >
        Delete
      </button>
    </div>
  );
};

export default Form;
