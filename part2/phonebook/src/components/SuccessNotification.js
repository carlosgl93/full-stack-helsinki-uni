import React from "react";
import "../index.css";

const SuccessNotification = ({ message }) => {
  if (message) {
    return <div className="success">{message}</div>;
  }
};

export default SuccessNotification;
