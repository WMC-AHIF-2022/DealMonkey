import React from "react";
import "../styles/popup.css";
export const Popup = ({ text, closePopup, ...props }: any) => {
  return (
    <div className="popup-container">
      {" "}
      <div className="popup-body">
        {props.children}
        <h1>{text}</h1> <button onClick={closePopup}>Close X</button>{" "}
      </div>{" "}
    </div>
  );
};
