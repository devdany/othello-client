import { gql } from 'apollo-boost'

export const GET_LOCAL_USER = gql`
  query getUserName {
    userName @client
  }
`

export const SET_LOCAL_USER = gql`
  mutation setUserName($userName: String!) {
    setUserName(userName: $userName) @client
  }
`

