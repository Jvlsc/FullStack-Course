// Import React and ReactDOM
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Import Apollo Client:
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// Import App Component:
import App from "./App.jsx";

// Auth Link:
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

// Http Link:
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

// Initialize Apollo Client:
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

// Render App Component:
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);
