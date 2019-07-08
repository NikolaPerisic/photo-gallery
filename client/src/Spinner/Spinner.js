import React from "react";
import "./Spinner.scss";

const Spinner = props => {
  let spinner = props.loading ? <div className="spinner" /> : null;
  return <div>{spinner}</div>;
};

export default Spinner;
