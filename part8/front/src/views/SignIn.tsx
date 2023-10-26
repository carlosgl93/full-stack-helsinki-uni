import { ApolloError, useMutation } from "@apollo/client";
import React, { useContext, useReducer } from "react";
import { LOGIN } from "../graphql/mutations/login";
import { useNavigate } from "react-router";
import { Context } from "../state/Context";
import '../styles/signInForm.css'

type INITIAL_FORM_STATE = {
  username: string;
  password: string;
  error: ApolloError | null;
};

type Action =
  | {
      type: "INPUT_CHANGE";
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: "ERROR";
      payload: {
        error: ApolloError;
      };
    }
  | {
      type: "REMOVE_ERROR";
    };

const initialState: INITIAL_FORM_STATE = {
  username: "",
  password: "",
  error: null,
};

const formReducer = (state: INITIAL_FORM_STATE, action: Action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    case "REMOVE_ERROR":
      return {
        ...state,
        error: null,
      };
  }
};

export const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(Context);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onError: (error) => {
      dispatch({
        type: "ERROR",
        payload: {
          error,
        },
      });
      setTimeout(() => {
        dispatch({
          type: "REMOVE_ERROR",
        });
      }, 5000);
    },
    onCompleted: (data) => {
      console.log(data);
      login(data.login);
      localStorage.setItem("blogs-gql", JSON.stringify(data.login));
      navigate("/");
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    loginMutation({
      variables: {
        username: state.username,
        password: state.password,
      },
    });
  };

  return (
    <>
      {state.error && (
        <figure style={{
          color: 'red'
        }}>
          <figcaption>{state.error.message}</figcaption>
          <p>{state.error.extraInfo}</p>
        </figure>
      )}
      <form id="signin" onSubmit={handleSubmit}>
        <div className="labels">
        <label htmlFor="username">Username:</label>
        <br />
        <label htmlFor="password">Password:</label>
          
        </div>
        <div className="inputs">
          <input
          type="text"
          name="username"
          id="username"
          value={state.username}
          onChange={(e) =>
            dispatch({
              type: "INPUT_CHANGE",
              payload: {
                name: e.target.name,
                value: e.target.value,
              },
            })
          }
        />
        <br/>
        <input
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={(e) =>
            dispatch({
              type: "INPUT_CHANGE",
              payload: {
                name: e.target.name,
                value: e.target.value,
              },
            })
          }
        />
        </div>

        <br/>
        
       
      </form>
       <button form="signin" type="submit" disabled={!state.password}>
          Login
        </button>
    </>
  );
};
