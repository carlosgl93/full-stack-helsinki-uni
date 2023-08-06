import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Togglable } from "./Togglable";

describe("<Togglable />", () => {
  let container;
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" id="testDiv">
          <p>togglable content</p>
        </div>
      </Togglable>
    ).container;
  });

  test("renders its children", () => {
    screen.getByText(/show/i);
  });
});
