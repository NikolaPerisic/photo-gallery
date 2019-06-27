import React from "react";
import "./Main.scss";
import rectangle from "../assets/Rectangle.svg";

const Main = props => {
    return (
        <div className="main-wrapper">
            <h1>Dubai Pictures</h1>
            <img src={rectangle} alt="rectangle" />
            <p>500 Pictures of Dubai</p>
            <hr />
        </div>
    );
};

export default Main;
