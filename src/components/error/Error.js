import React from "react";
import { useSelector } from "react-redux";

import "./error.scss";

const Error = () => {
  const { status } = useSelector((state) => state.repositories);

  return <h3 className="error"><span>&#x26A0;</span>Something went wrong. Please try again.</h3>;
};

export default Error;
