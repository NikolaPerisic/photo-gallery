import React from "react";
import "./Main.scss";
import rectangle from "../assets/Rectangle.svg";

const Main = props => {
    return (
        <div className="main-wrapper">
            <h1>{props.title}</h1>
            <img src={rectangle} alt="rectangle" />
            <p>{props.count} Pictures of Dubai</p>
            <hr />
        </div>
    );
};

export default Main;
