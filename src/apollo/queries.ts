import { gql } from 'apollo-boost'

export const GET_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      id
      name
    }
  }
`
export const CREATE_GAME = gql`
  mutation createGame($userName: String!) {
    createGame(userName: $userName)
  }
`

export const ON_CHANGE_ROOM = gql`
  subscription onChangeRoom($code: String!) {
    onChangeRoom(code: $code) {
      p1
      p2
      board {
        x
        y
        unit
      }
      isGaming
      winner
      turn
    }
  }
`

export const PUT_UNIT = gql`
  mutation putUnit($code: String!, $x: Int!, $y: Int!, $userName: String!) {
    putUnit(code: $code, x: $x, y: $y, userName: $userName) {
      p1
      p2
      board {
        x
        y
        unit
      }
      isGaming
      winner
      turn
    }
  }
`

export const GET_ROOM = gql`
  query getRoom($code: String!) {
    getRoom(code: $code) {
      p1
      p2
      board {
        x
        y
        unit
      }
      isGaming
      winner
      turn
    }
  }
`

export const JOIN_GAME = gql`
  mutation joinGame($userName: String!, $code: String!) {
    joinGame(userName: $userName, code: $code)
  }
`

export const START_GAME = gql`
  mutation startGame($code: String!) {
    startGame(code: $code)
  }
`
