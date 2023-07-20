import React from "react";
import "../index.css";

const ErrorNotification = ({ message }) => {
  if (message) {
    return <div className="error">{message}</div>;
  }
};

export default ErrorNotification;
