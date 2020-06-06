import { CREATE_GAME } from '../../apollo/queries'
import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
type Props = {
  history: any
}

function StartComponent(props: Props) {
  const [createGame] = useMutation(CREATE_GAME)
  const onCreateGame = () => {
    createGame({
      variables: {
        userName: localStorage.getItem('userName')
      }
    })
      .then((result) => {
        const code = result.data.createGame
        props.history.push('/room/' + code)
      })
  }
  return (
    <Container>
      <StartButton onClick={onCreateGame}>
        <StartText>Start</StartText>
      </StartButton>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StartButton = styled.div`
  width: 200px;
  height: 50px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 1px solid #888888; 
  }
`

const StartText = styled.span`
  font-size: 15px;
`

export default StartComponent