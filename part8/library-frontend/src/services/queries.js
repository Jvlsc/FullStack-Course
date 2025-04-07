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
      author
      published
    }
  }
`