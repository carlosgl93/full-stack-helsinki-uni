import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blog";
import { BlogForm } from "../BlogForm";

describe("testing blog", () => {
  const user = userEvent.setup();
  let container;
  const mockHandleLike = jest.fn();
  beforeEach(() => {
    const blog = {
      author: "Test",
      title: "Testing react apps with jest and jest dom",
      url: "localhost342341234",
      likes: 0,
    };

    container = render(
      <Blog blog={blog} handleLike={mockHandleLike} userId="thisistheuser" />,
    ).container;
  });

  test("renders blog author and title", () => {
    const title = screen.getByText("Testing react apps with jest and jest dom");
    const author = screen.queryByTestId("#author");

    expect(title).toBeDefined();
    expect(author).toBeDefined();
  });

  test("likes and url render after clicking view", async () => {
    let blogInfo = container.querySelector("#blogInfo");
    expect(blogInfo).toBeNull();

    const viewButton = container.querySelector("#viewButton");
    await user.click(viewButton);
    blogInfo = container.querySelector("#blogInfo");
    expect(blogInfo).toBeDefined();
  });

  test("like handler is called", async () => {
    const viewButton = container.querySelector("#viewButton");
    await user.click(viewButton);
    blogInfo = container.querySelector("#blogInfo");
    expect(blogInfo).toBeDefined();

    const likeButton = container.querySelector("#likeButton");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandleLike.mock.calls).toHaveLength(2);
  });

  test("create new blog", async () => {
    const createHandler = jest.fn();
    const { container } = render(<BlogForm handleCreateBlog={createHandler} />);
    const title = container.querySelector("#titleInput");
    const url = container.querySelector("#urlInput");
    const submit = container.querySelector("#submitButton");
    await user.type(title, "this is a test blog");
    await user.type(url, "www.testblog.com");
    await user.click(submit);
    expect(createHandler.mock.calls).toHaveLength(1);
    expect(title.value).toBe("this is a test blog");
    expect(url.value).toBe("www.testblog.com");
  });
});
