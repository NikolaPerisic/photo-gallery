import React from "react";
import "./ReleatedSearch.scss";

/**
 * tag buttons component, render all tags coming from
 * state and display only available tags according to
 * pictures currently displayed in the gallery
 */
const ReleatedSearch = props => {
  let tags = [];
  if (props.tags) {
    props.tags.map(el => {
      return el.tags.map(item => {
        if (!tags.includes(item.title)) {
          return tags.push(item.title);
        }
        return null;
      });
    });
  }
  return (
    <div className="releated-wrapper">
      <p>Releated Searches:</p>
      <div className="btn-wrapper">
        {tags.map(el => {
          let btnSelected = props.items.includes(el) ? true : false;
          return (
            <button
              className={
                btnSelected ? "highlight releated-btn" : "releated-btn"
              }
              onClick={() => props.releatedSearch(el)}
              key={el}
            >
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReleatedSearch;
