import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App.tsx";
import "./index.css";
import Provider from "./state/Provider.tsx";

const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(localStorage?.getItem("blogs-gql")!);
  return {
    headers: {
      ...headers,
      authorization: user?.token ? `Bearer ${user?.token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider>
        <Router>
          <App />
        </Router>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
