import React, { FC } from "react";

type Props = {
  parts: {
    name: string;
    exercises: number;
    id: number;
  }[];
};

const Total: FC<Props> = ({ parts }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts && parts.reduce((acc, current) => acc + current.exercises, 0)}
      </p>
    </>
  );
};

export default Total;
