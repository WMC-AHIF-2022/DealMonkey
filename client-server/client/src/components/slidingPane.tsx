import React, { Component, useState } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Form from "./form";

const SlidingPaneCom = ({ open, setOpen, ...props }: any) => {
  return (
    <div>
      <SlidingPane
        isOpen={open}
        from="right"
        width="400px"
        onRequestClose={() => setOpen(false)}
      >
        {props.children}
      </SlidingPane>
    </div>
  );
};

export default SlidingPaneCom;
