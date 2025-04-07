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