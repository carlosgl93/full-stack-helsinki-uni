import React from "react";
import { Genres } from "../types";

export const BookForm = () => {
  const handleCreateBook = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <form
      onSubmit={handleCreateBook}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <table>
        <thead>
          <td>Field</td>
          <td>Value</td>
        </thead>
        <tbody>
          <tr>
            <td>
              <label htmlFor="title">Title *</label>
            </td>
            <td>
              <input autoFocus required type="text" name="title" id="title" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="author">Author *</label>
            </td>
            <td>
              <input required type="text" name="author" id="author" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="published">Published</label>
            </td>
            <td>
              <input type="text" name="published" id="published" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="genre">Genres</label>
            </td>
            <td>
              <select name="genre" id="genre">
                {Object.values(Genres).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <button type="submit">Create Book</button>
    </form>
  );
};
