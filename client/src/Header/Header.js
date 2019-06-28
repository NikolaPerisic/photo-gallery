import React from "react";
import { withRouter } from "react-router";
import "./Header.scss";
import logo from "../assets/Logo.svg";
import SearchIcon from "../assets/Search-icon.svg";

const Header = props => {
    const goBack = () => {
        if (!props.match.isExact) {
            return props.history.goBack();
        }
        return null;
    };
    return (
        <div className="header">
            <div>
                <img
                    src={logo}
                    alt="logo"
                    className="logo-img"
                    onClick={goBack}
                />
            </div>
            <div className="search-box">
                <form onSubmit={props.inputSearch}>
                    <label htmlFor="search" />

                    <input
                        type="text"
                        name="search"
                        placeholder="search..."
                        className="search"
                        value={props.userInput}
                        onChange={props.handleInputChange}
                    />
                    <button className="search-btn">
                        <img src={SearchIcon} alt="search icon" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Header);
