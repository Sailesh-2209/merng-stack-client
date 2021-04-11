import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import App from "./App";

const httplink = createHttpLink({ uri: "http://localhost:5000" });

const client = new ApolloClient({ link: httplink, cache: new InMemoryCache() });

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
