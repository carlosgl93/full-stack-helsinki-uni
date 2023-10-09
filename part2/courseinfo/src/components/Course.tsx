import React from "react";
// @ts-ignore
import Total from "./Total.tsx";
import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  const { id, name, parts } = course;

  return (
    <div>
      <Header title={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
