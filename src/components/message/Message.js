import React from "react";

import "./message.scss";

const Message = ({ status }) => (
  <h3 className={`message ${status}`}>
    {status === "error" && (
      <>
        <span>&#x26A0;</span>Something went wrong. Please try again.
      </>
    )}
    {status === "empty" && (
      <>
        <span>&#x0021;</span>No result found. Please try again.
      </>
    )}
  </h3>
);

export default Message;
