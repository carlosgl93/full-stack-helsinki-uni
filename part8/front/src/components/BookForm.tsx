import React, { useReducer, SyntheticEvent, FC } from "react";
import { Genres } from "../types";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../graphql/mutations/addBook";
import { ALL_AUTHORS, ALL_BOOKS } from "../graphql";

type FormState = {
  title: string;
  author: string;
  published: string;
  genres: string[];
};

type Action = {
  type: string;
  payload?: any;
};

const INITIAL_FORM_STATE: FormState = {
  title: "",
  author: "",
  published: "",
  genres: [],
};

const formReducer = (state: FormState, action: Action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "SELECT_GENRE":
      return {
        ...state,
        genres: [...state.genres, action.payload.genres],
      };
    case "CLEAR":
      return INITIAL_FORM_STATE;

    default:
      return state;
  }
};

type BookFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BookForm: FC<BookFormProps> = ({ setShowForm }) => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);
  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onCompleted: () => {
      dispatch({
        type: "CLEAR",
      });
      setShowForm(() => false);
    },
  });

  const handleCreateBook = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
    addBook({
      variables: {
        title: state.title,
        author: state.author,
        published: Number(state.published),
        genres: state.genres,
      },
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SELECT_GENRE",
      payload: {
        genres: e.target.value,
      },
    });
  };

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
              <input
                required
                type="text"
                name="author"
                id="author"
                value={state.author}
                onChange={handleChangeInput}
              />
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
              <select
                multiple
                name="genres"
                id="genres"
                value={state.genres}
                onChange={handleSelectGenre}
              >
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
