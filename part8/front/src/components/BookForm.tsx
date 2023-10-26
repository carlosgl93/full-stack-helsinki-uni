import React, { FC } from "react";
import { Genres } from "../types";
import { BookFormController } from "../controllers/BookFormController";

type BookFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BookForm: FC<BookFormProps> = ({ setShowForm }) => {
  const {
    loading,
    error,
    handleChangeInput,
    handleCreateBook,
    handleSelectGenre,
    state,
  } = BookFormController({ setShowForm });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oops, try again</p>;
  }

  return (
    <form
      onSubmit={handleCreateBook}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
      }}
    >
      <table>
        <thead>
          <tr>
            <td>Field</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label htmlFor="title">Title *</label>
            </td>
            <td>
              <input
                autoFocus
                required
                type="text"
                name="title"
                id="title"
                value={state.title}
                onChange={handleChangeInput}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="author">Author *</label>
            </td>
            <td>
              <input required type="text" name="author" id="author" value={state.author} onChange={handleChangeInput} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="published">Published</label>
            </td>
            <td>
              <input
                type="number"
                name="published"
                id="published"
                value={state.published}
                onChange={handleChangeInput}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="genres">Genres</label>
            </td>
            <td>
              <select multiple name="genres" id="genres" value={state.genres} onChange={handleSelectGenre}>
                {Object.values(Genres).map(g => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit">Create Book</button>
    </form>
  );
};
