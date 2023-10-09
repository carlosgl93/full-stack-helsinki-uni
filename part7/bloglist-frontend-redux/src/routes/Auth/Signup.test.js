import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Signup } from "./Signup";

describe("Register view", () => {
  let container;
  beforeEach(() => {
    container = render(<Signup />).container;
  });

  test("renders its children", () => {
    screen.getByText(/register/i);
  });
});
