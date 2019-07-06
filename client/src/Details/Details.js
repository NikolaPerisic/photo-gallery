import React from "react";
import "./Details.scss";

/*
 * details component that recieves data from props and dynamically
 * renders releated info from state
 */
const Details = props => {
  // check if item matches uri path and fetch current item
  let currentItem = null;
  let path = props.location.pathname.slice(1);
  props.data.map(el => {
    if (el.id === Number(path)) {
      currentItem = el;
    }
    return currentItem;
  });
  console.log(currentItem);
  // go back to previous page with router history func
  const goBack = () => {
    return props.history.goBack();
  };
  /**
   * filter search results by clicking on author or tags
   * coming from detail page, setTimeout func is used to
   * improve UX, delay redirect to main page by 200ms because
   * data is re-fetched from server
   */
  const filterResults = (author, tag) => {
    if (author) props.filterByAuthor(currentItem.author);
    if (tag) props.filterByTag(tag);
    setTimeout(() => {
      props.history.push("/");
    }, 200);
  };
  //
  return (
    <div className="details-wrapper">
      <div className="details-image">
        <img
          src={currentItem.cover_photo.urls.regular}
          alt={currentItem.cover_photo.alt_description}
        />
      </div>
      <div className="details-info">
        <div className="back-btn">
          <button onClick={goBack}>Back To Results</button>
        </div>
        <div className="details-author">
          <div className="avatar-div">
            <img src="https://i.pravatar.cc/150?img=58" alt="avatar" />
          </div>
          <div className="author-contact">
            <p onClick={() => filterResults(currentItem.author, null)}>
              {currentItem.user.first_name}
            </p>
            <button>Follow</button>
          </div>
        </div>
        <div className="details-imageinfo">
          <h3>{currentItem.cover_photo.alt_description}</h3>
          <p>{currentItem.description}</p>
        </div>
        <div className="details-tags">
          {/* {currentItem.tags.map((el, i) => {
            return (
              <button onClick={() => filterResults(null, el)} key={i}>
                {el}
              </button>
            );
          })} */}
        </div>
        <hr />
        <div className="details-pricing">
          <div className="price-small">
            <p>$30</p>
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
            Protect your work by licencing the exclusive rights to our images
            with Market Freeze.
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
