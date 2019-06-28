import React from "react";
import "./Details.scss";

const Details = props => {
    console.log(props.data);
    return (
        <div className="details-wrapper">
            <div className="details-image">
                <img
                    src={`http://localhost:5000${props.data[0].uri}`}
                    alt="somepics"
                />
            </div>
            <div className="details-info">
                <div className="back-btn">
                    <button>Back To Results</button>
                </div>
                <div className="details-author">
                    <div className="avatar-div">
                        <img
                            src="https://i.pravatar.cc/150?img=58"
                            alt="avatar"
                        />
                    </div>
                    <div className="author-contact">
                        <p>author name</p>
                        <button>Follow</button>
                    </div>
                </div>
                <div className="details-imageinfo">
                    <h3>Image Title</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.{" "}
                    </p>
                </div>
                <div className="details-tags">
                    <button>tags 1</button>
                    <button>tags 2</button>
                </div>
                <hr />
                <div className="details-pricing">
                    <div className="price-small">
                        <p>$20</p>
                        <span>Small</span>
                    </div>
                    <div className="price-medium">
                        <p>$50</p>
                        <span>Medium</span>
                    </div>
                    <div className="price-large">
                        <p>$100</p>
                        <span>Large</span>
                    </div>
                </div>
                <div className="details-exclusive">
                    <h3>Use this image exclusively for:</h3>
                    <div className="details-market">
                        <p>Market Freeze</p>
                        <p className="market-price">$300</p>
                    </div>
                    <p className="text-licencing">
                        Protect your work by licencing the exclusive rights to
                        our images with Market Freeze.
                    </p>
                </div>
                <hr />
                <div className="details-button">
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Details;
