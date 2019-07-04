import React from "react";
import "./Main.scss";
import rectangle from "../assets/Rectangle.svg";

/**
 * Gallery information component, handle gallery
 * title and pictures count coming from state
 */
const Main = props => {
  return (
    <div className="main-wrapper">
      <h1>{props.title}</h1>
      <img src={rectangle} alt="rectangle" />
      <p>{props.count} Pictures</p>
      <hr />
    </div>
  );
};

export default Main;
