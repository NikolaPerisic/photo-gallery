import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Gallery.scss";

const Gallery = props => {
    const [show, setShow] = useState({ hover: false, name: "" });
    const handleMouseEnter = name => {
        setShow({ hover: true, name: name });
    };
    const handleMouseLeave = () => {
        setShow({ hover: false, name: "" });
    };
    return (
        <div className="gallery">
            {props.imgs.map(el => {
                return (
                    <Link to={`${el.uri}`} key={el.name}>
                        <div
                            className="img-wrap"
                            onMouseEnter={() => handleMouseEnter(el.name)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {show.hover && show.name === el.name ? (
                                <div className="img-captions">
                                    <p>{el.name}</p>
                                    <p>{el.author}</p>
                                </div>
                            ) : null}
                            <img
                                src={`http://localhost:5000${el.uri}`}
                                alt={el.name}
                            />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Gallery;
