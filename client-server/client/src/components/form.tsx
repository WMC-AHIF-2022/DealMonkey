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
import { io, Socket } from "socket.io-client";

import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import toast, { Toaster } from "react-hot-toast";

import { TimePicker } from "antd";
import dayjs from "dayjs";

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

  const socket = io("");

  socket.on("do habit", () => {
    console.log("");
  });

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
      toast.success("Habit created");

      socket.emit("new habit", 3);

      //Todo: clear form fields
    } catch (error: any) {
      toast.error(error.message);
    }

    try {
      const response = await getAllHabits(auth()?.id);
      setHabits(response);
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
        </Select>
      </FormControl>

      <div className="mt-5">
        {/*         <TimePicker
          label="Reminder"
          value={reminder}
          onChange={(value) => setReminder(value)}
        />*/}
        <TimePicker
          value={reminder}
          onChange={(value) => setReminder(value)}
          defaultValue={dayjs("12:00", "HH:mm")}
          format={"HH:mm"}
          size="large"
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
