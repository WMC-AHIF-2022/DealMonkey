import React, { Component, useState } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

const SlidingPaneCom = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div style={{ marginTop: "32px" }}>
        <button onClick={() => setOpen(true)}>Add Habit</button>
      </div>

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
