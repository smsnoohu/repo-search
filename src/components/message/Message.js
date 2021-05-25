import React from "react";

import "./message.scss";

const Message = ({ status }) => (
  <h3
    className={`message ${status}`}
    aria-live="assertive"
    role="alert"
    aria-atomic="true"
  >
    {status === "error" && (
      <>
        <span aria-hidden="true">&#x26A0;</span>Something went wrong. Please try
        again.
      </>
    )}
    {status === "empty" && (
      <>
        <span aria-hidden="true">&#x0021;</span>No result found. Please try
        again.
      </>
    )}
  </h3>
);

export default Message;
