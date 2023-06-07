import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// create client to talk to graphql
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
