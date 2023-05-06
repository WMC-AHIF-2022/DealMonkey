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
import { addHabit } from "../utils/data-utils";
import dayjs, { Dayjs } from "dayjs";

const Form = () => {
  const [color, setColor] = useState("#fff");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // make the API call
      let dateString: string = dayjs(date).format("YYYY-MM-DD");
      await addHabit(title, dateString, category, color);
      //Todo: clear form fields
    } catch (error: any) {
      alert("Add Habit Failed");
      console.log(error);
    }
  };

  return (
    <div>
      <SlidingPaneCom>
        {/*Title*/}
        <FormInput
          placeholder="Title"
          label="Title"
          value={title}
          onChange={(value) => handleTitleChange(value)}
        />

        {/*Date Picker*/}
        <div className="mt-5">
          <DatePicker
            label="Date"
            value={date}
            onChange={(value) => setDate(value)}
          />
        </div>

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
            onChange={handleCategoryChange}
          >
            <MenuItem value={"School"}>School</MenuItem>
            <MenuItem value={"Private"}>Private</MenuItem>
            <MenuItem value={"Work"}>Work</MenuItem>
          </Select>
        </FormControl>

        {/*Color Picker*/}
        <TwitterPicker
          className="mt-5"
          color={color}
          onChangeComplete={handleColorChange}
        />

        <button onClick={handleSubmit} className="mt-5">
          Save
        </button>
      </SlidingPaneCom>
    </div>
  );
};

export default Form;
