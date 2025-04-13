# Part 6 - Advanced State Management

So far, we have placed the application's state and state logic directly inside React components. When applications grow larger, state management should be moved outside React components. In [this part](https://fullstackopen.com/en/part6), we will introduce the Redux library, which is currently the most popular solution for managing the state of React applications.

We'll learn about the lightweight version of Redux directly supported by React, namely the React context and useReducer hook, as well as the React Query library that simplifies the server state management.

---
---

## Table of Contents:

- **[Flux-Architecture and Redux](#flux-architecture-and-redux)**
- **[Many Reducers](#many-reducers)**
- **[Communicating with Server in a Redux Application](#communicating-with-server-in-a-redux-application)**
- **[React Query, useReducer and the Context](#react-query-usereducer-and-the-context)**

---
---

## Flux-Architecture and Redux:

In [this chapter](https://fullstackopen.com/en/part6/flux_architecture_and_redux), we will learn about the Flux-Architecture and Redux.

### Exercises (Unicafe Revisated):

- **[Exercise 6.1](https://github.com/Jvlsc/FullStack-Course/blob/7696f8a7e9c9c152e857fef1f0222386543d836e/part6/unicafe-redux/src/reducer.js)**: Unicafe Revisated (Step 1).
- **[Exercise 6.2](https://github.com/Jvlsc/FullStack-Course/blob/b6bad432bec841a43cdb6cda9b1cf6d0a890db40/part6/unicafe-redux/src/main.jsx)**: Unicafe Revisated (Step 2).

---

### Exercises (Better Anecdotes):

- **[Exercise 6.3](https://github.com/Jvlsc/FullStack-Course/blob/da1673966e5183d71b5abac367a4a20859b4240d/part6/anecdotes-redux/src/reducers/anecdoteReducer.js)**: Better Anecdotes (Step 1).
- **[Exercise 6.4](https://github.com/Jvlsc/FullStack-Course/blob/a6783260176451011301c8fc50af96be0f058a8f/part6/anecdotes-redux/src/reducers/anecdoteReducer.js)**: Better Anecdotes (Step 2).
- **[Exercise 6.5](https://github.com/Jvlsc/FullStack-Course/blob/bced8b1bfcf70bb9963e81b7ea288609ee67a354/part6/anecdotes-redux/src/App.jsx)**: Better Anecdotes (Step 3).
- **[Exercise 6.6](https://github.com/Jvlsc/FullStack-Course/blob/a6783260176451011301c8fc50af96be0f058a8f/part6/anecdotes-redux/src/reducers/anecdoteReducer.js)**: Better Anecdotes (Step 4).
- **[Exercise 6.7](https://github.com/Jvlsc/FullStack-Course/blob/00add1fe79a5901ce807943167f0d13ae1b998f1/part6/anecdotes-redux/src/components/AnecdoteForm.jsx)**: Better Anecdotes (Step 5).
- **[Exercise 6.8](https://github.com/Jvlsc/FullStack-Course/blob/00add1fe79a5901ce807943167f0d13ae1b998f1/part6/anecdotes-redux/src/components/AnecdoteList.jsx)**: Better Anecdotes (Step 6).

---
---

## Many Reducers:

In [this chapter](https://fullstackopen.com/en/part6/many_reducers), we will learn to create and manage multiple reducers using the Redux Toolkit.

### Exercises:

- **[Exercise 6.9](https://github.com/Jvlsc/FullStack-Course/blob/d05d3a8fcd5564689ff094e657c82d080c7af31d/part6/anecdotes-redux/src/reducers/filterReducer.js)**: Better Anecdotes (Step 7).
- **[Exercise 6.10](https://github.com/Jvlsc/FullStack-Course/blob/c64c130c788c305d8c9b0890db1559bd7146f80c/part6/anecdotes-redux/src/reducers/filterReducer.js)**: Better Anecdotes (Step 8).
- **[Exercise 6.11](https://github.com/Jvlsc/FullStack-Course/blob/14caabef8984be18a8da868f2df02e9d20e68b09/part6/anecdotes-redux/src/reducers/anecdoteReducer.js)**: Better Anecdotes (Step 9).
- **[Exercise 6.12](https://github.com/Jvlsc/FullStack-Course/blob/f4ac3ab8ef2a511ec1320e4f5ea6aaabdd3c5eac/part6/anecdotes-redux/src/reducers/notificationReducer.js)**: Better Anecdotes (Step 10).
- **[Exercise 6.13](https://github.com/Jvlsc/FullStack-Course/blob/2335e598816bc280f26ea5e74b6d30c2ff5cc65d/part6/anecdotes-redux/src/components/Notification.jsx)**: Better Anecdotes (Step 11).

---
---

## Communicating with Server in a Redux Application:

In [this chapter](https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application), we will learn about the communicating with server in a redux application.

### Exercises:

- **[Exercise 6.14](https://github.com/Jvlsc/FullStack-Course/blob/c31c8af1e6ccc3660865c750f7198b7ad4a30321/part6/anecdotes-redux/src/App.jsx)**: Anecdotes and the Backend (Step 1).
- **[Exercise 6.15](https://github.com/Jvlsc/FullStack-Course/blob/0f9d452c09f420dcd51b08dce1903dcd62a98443/part6/anecdotes-redux/src/components/AnecdoteForm.jsx)**: Anecdotes and the Backend (Step 2).
- **[Exercise 6.16](https://github.com/Jvlsc/FullStack-Course/blob/942da9ecae9380c9455219dc230bbcdc8e64f8cc/part6/anecdotes-redux/src/reducers/anecdoteReducer.js)**: Anecdotes and the Backend (Step 3).
- **[Exercise 6.17](https://github.com/Jvlsc/FullStack-Course/blob/31a6238aed69cff764630a5540317d42a5c1561f/part6/anecdotes-redux/src/reducers/anecdoteReducer.js)**: Anecdotes and the Backend (Step 4).
- **[Exercise 6.18](https://github.com/Jvlsc/FullStack-Course/blob/1114418580d1f69c0527685b7ee6971a90277b3d/part6/anecdotes-redux/src/reducers/anecdoteReducer.js)**: Anecdotes and the Backend (Step 5).
- **[Exercise 6.19](https://github.com/Jvlsc/FullStack-Course/blob/793ad18e77d95ff0164bfa75d26b978cd89a4c12/part6/anecdotes-redux/src/components/Notification.jsx)**: Anecdotes and the Backend (Step 6).

---
---

## React Query, useReducer and the Context:

In [this chapter](https://fullstackopen.com/en/part6/react_query_use_reducer_and_the_context), we will learn about the React Query, useReducer and the Context.

### Exercises:

- **[Exercise 6.20](https://github.com/Jvlsc/FullStack-Course/blob/a40fd3c8af91b6af524ee9d9df101fb6113d9014/part6/anecdotes-query/src/App.jsx)**: New Anecdotes (Step 1).
- **[Exercise 6.21](https://github.com/Jvlsc/FullStack-Course/blob/4f8b62e0ae2d7589ad14a5e8b4605cef603bee6a/part6/anecdotes-query/src/components/AnecdoteForm.jsx)**: New Anecdotes (Step 2).
- **[Exercise 6.22](https://github.com/Jvlsc/FullStack-Course/blob/4f8b62e0ae2d7589ad14a5e8b4605cef603bee6a/part6/anecdotes-query/src/App.jsx)**: New Anecdotes (Step 3).
- **[Exercise 6.23](https://github.com/Jvlsc/FullStack-Course/blob/a2838c82cf2e60700cd5eec8c81f23d8663eb6ea/part6/anecdotes-query/src/components/NotificationContext.jsx)**: New Anecdotes (Step 4).
- **[Exercise 6.24](https://github.com/Jvlsc/FullStack-Course/blob/8e6f7adda51bcf2a656438ef69c764e1604a8b7d/part6/anecdotes-query/src/components/AnecdoteForm.jsx)**: New Anecdotes (Step 5).

---
---

