import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query fetchAllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query fetchAllBooks {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
  query fetchAllBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`


export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query me {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`