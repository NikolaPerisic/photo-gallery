import React from "react";
import "./ReleatedSearch.scss";

const ReleatedSearch = props => {
    let tags = [];
    props.tags.map(el => {
        return el.tags.map(item => {
            if (!tags.includes(item)) {
                return tags.push(item);
            }
            return null;
        });
    });
    return (
        <div>
            <p>Releated Searches:</p>
            <div className="btn-wrapper">
                {tags.map(el => {
                    let btnSelected = props.btnHighlight.includes(el)
                        ? true
                        : false;
                    return (
                        <button
                            className={
                                btnSelected
                                    ? "highlight releated-btn"
                                    : "releated-btn"
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
