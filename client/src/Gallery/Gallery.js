import React, { useState } from "react";
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
                    <div
                        className="img-wrap"
                        key={el.name}
                        onMouseEnter={() => handleMouseEnter(el.name)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {show.hover && show.name === el.name ? (
                            <div>
                                <p>{el.name}</p>
                                <p>{el.author}</p>
                            </div>
                        ) : null}
                        <img
                            src={`http://localhost:5000${el.uri}`}
                            alt={el.name}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Gallery;
