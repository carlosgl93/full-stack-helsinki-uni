import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Controller = (anecdote) => {
  console.log(anecdote);
  const navigate = useNavigate();

  useEffect(() => {
    if (!anecdote) {
      navigate("/", {
        replace: true,
      });
    }
  }, [anecdote]);

  return {
    navigate,
  };
};
