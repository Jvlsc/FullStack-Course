// Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
// Import Apollo Client:
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Import App Component:
import App from "./App.jsx";

// Initialize Apollo Client:
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

// Render App Component:
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
