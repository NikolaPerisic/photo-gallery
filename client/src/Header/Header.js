import React from "react";
import { withRouter } from "react-router";
import "./Header.scss";
import logo from "../assets/Logo.svg";
import SearchIcon from "../assets/Search-icon.svg";

/**
 * header component, handling search coming from
 * form input
 */
const Header = props => {
  /**
   * router history func that is being called only
   * if user is on details page
   */

  const goBack = () => {
    if (props.match.url !== "/") {
      return props.history.goBack();
    }
    return props.freshSearch;
  };
  // handle form submit coming from details page
  const handleSubmitFromPage = e => {
    e.preventDefault();
    props.tagSearch(props.userInput);
    props.history.push("/");
  };
  //
  return (
    <div className="header">
      <div>
        <img src={logo} alt="logo" className="logo-img" onClick={goBack} />
      </div>
      <div className="search-box">
        <form
          onSubmit={
            props.match.url === "/"
              ? props.inputSearch
              : e => handleSubmitFromPage(e)
          }
        >
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
