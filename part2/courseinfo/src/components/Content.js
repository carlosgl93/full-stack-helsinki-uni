import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return parts.map((p) => <Part key={p.id} part={p} />);
};

export default Content;
