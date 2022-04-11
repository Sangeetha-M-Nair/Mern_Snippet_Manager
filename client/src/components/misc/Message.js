import React from "react";
import "./Message.scss";

function Message({ message, clear }) {
  return (
    <div className="error-message">
      <p>{message}</p>
      <button onClick={clear}>Clear</button>
    </div>
  );
}

export default Message;
