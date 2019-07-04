import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Gallery.scss";
/**
 * gallery page with images fetched from server, mini
 * state managment with hooks for handling displaying
 * author and image name on mouse hover
 */
const Gallery = props => {
  const [show, setShow] = useState({ hover: false, name: "" });

  // handle mouse enter and mouse leave
  const handleMouseEnter = name => {
    setShow({ hover: true, name: name });
  };

  const handleMouseLeave = () => {
    setShow({ hover: false, name: "" });
  };
  console.log(props.imgs);
  return (
    <div className="gallery">
      {props.imgs.map(el => {
        return (
          <Link to={`${el.id}`} key={el.id}>
            <div
              className="img-wrap"
              onMouseEnter={() => handleMouseEnter(el.name)}
              onMouseLeave={handleMouseLeave}
            >
              {show.hover && show.name === el.name ? (
                <div className="img-captions">
                  <p>{el.alt_description}</p>
                  <p>{el.user.first_name}</p>
                </div>
              ) : null}
              <img src={el.urls.small} alt={el.alt_description} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Gallery;
