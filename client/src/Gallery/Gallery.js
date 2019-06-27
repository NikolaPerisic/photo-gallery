import React from "react";
import "./Gallery.scss";

const Gallery = props => {
    return (
        <div className="gallery">
            {props.imgs.map(el => {
                return (
                    <div key={el.name}>
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
