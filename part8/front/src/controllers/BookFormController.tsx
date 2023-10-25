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

type BookFormControllerProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BookFormController = ({
  setShowForm,
}: BookFormControllerProps) => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);
  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onCompleted: () => {
      dispatch({
        type: "CLEAR",
      });
      setShowForm(() => false);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        };
      });
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

  return {
    state,
    dispatch,
    addBook,
    loading,
    error,
    handleChangeInput,
    handleCreateBook,
    handleSelectGenre,
  };
};
