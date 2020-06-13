import { GET_LOCAL_USER, SET_LOCAL_USER } from '../../apollo/clientQuries'
/* eslint-disable react-hooks/exhaustive-deps */
import { GET_ROOM, JOIN_GAME, ON_CHANGE_ROOM, START_GAME } from '../../apollo/queries'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks'

import Board from './GameBoard'
import styled from 'styled-components'

type Props = {
  match: any
  history: any
}

type Room = {
  code: string
  p1: string
  p2: string | null
  board: Location[][]
  isGaming: boolean
  winner: number
  turn: number
}

const initRoom: Room = {
  code: '',
  p1: '',
  p2: null,
  board: [],
  isGaming: false,
  winner: 0,
  turn: 0,
}

type Location = {
  x: number
  y: number
  unit: number
}

const getScore = (board: Location[][]) => {
    let p1 = 0
    let p2 = 0
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].unit === 1) {
          p1 ++
        } else if (board[i][j].unit === 2) {
          p2 ++
        }
      }
    }
    return {p1, p2}
}

function RoomComponent(props: Props) {
  let code = ''
  if (props.match && props.match.params) {
    code = props.match.params.roomId
  }

  const [room, setRoom] = useState(initRoom)
  const [ setLocalUser ] = useMutation(SET_LOCAL_USER)
  const [ startGame ] = useMutation(START_GAME)
  const [ joinGame ] = useMutation(JOIN_GAME)
  const { data } = useQuery(GET_LOCAL_USER)
  const [name, setName] = useState('')
  const roomResult = useQuery(GET_ROOM, {
    variables: {
      code: code,
    }
  })

  const subscribeRoom = useSubscription(
    ON_CHANGE_ROOM,
    { variables: {
      code: code,
    }}
  )

  useEffect(() => {
    if (room.p2 !== null) {
      props.history.push('/')
    } else {
      if (roomResult.data) {
        setRoom({
          code: code,
          ...roomResult.data.getRoom
        })
        if (data.userName !== null && data.userName !== roomResult.data.getRoom.p1) {
          joinGame({
            variables: {
              userName: data.userName,
              code: code
            }
          })
        }
      }
    }
  }, [roomResult])

  const {p1, p2} = getScore(room.board)

  const onHandleTextChange = (e: any) => {
    setName(e.target.value)
  }

  const saveName = (e: any) => {
    if (e.key === 'Enter') {
      setLocalUser({
        variables: {
          userName: name,
        }
      })
      // join
      joinGame({
        variables: {
          userName: name,
          code: code
        }
      })
    }
  }

  useEffect(() => {
    if (subscribeRoom && subscribeRoom.data && subscribeRoom.data.onChangeRoom) {
      setRoom(subscribeRoom.data.onChangeRoom)
    }
  }, [subscribeRoom])

  const onStartGame = () => {
    startGame({
      variables: {
        code: code,
      }
    })
  }

  const playerPosition = room.p1 === localStorage.getItem('userName') ? 1 : 2
  
  return (
    <Container>
      {room.p1 === localStorage.getItem('userName') && room.p2 && !room.isGaming && room.winner === 0 ? (
        <StartButton onClick={onStartGame}>
          Start
        </StartButton>
      ) : null}
      {!room.isGaming && room.winner > 0 ? (
        <ReStartButton onClick={onStartGame}>
          {room.winner === playerPosition ? 'You win!' : 'You lose..'}
        </ReStartButton>
      ) : null}
      {!data.userName ? (
        <EnterNameBox>
          <EnterInput placeholder={'Enter name for using in game'} onChange={onHandleTextChange} onKeyPress={saveName} value={name}/>
        </EnterNameBox>
      ) : null}
      <ContentContainer isEnterName={!data.userName}>
        <BoardContainer>
          <Board userPosition={playerPosition} isMyTurn={playerPosition === room.turn} board={room.board} code={code} />
        </BoardContainer>
        <StatusContainer>
          <StatusBox isMe={playerPosition === 1}>
            <StatusHeader>
              {room.p1}
            </StatusHeader>
            <StatusBody>
              <Content>
                <ContentHeader>Score</ContentHeader>
                <ContentBody>
                  {p1}
                </ContentBody>
              </Content>
              <Content>
                <ContentHeader>Turn</ContentHeader>
                <ContentBody>
                  {room.turn % 2 === 1 ? (
                    <TurnAlarm />
                  ): (<></>)}
                </ContentBody>
              </Content>
            </StatusBody>
          </StatusBox>
          <StatusBox isMe={playerPosition === 2}>
            {room.p2 ? (
              <>
              <StatusHeader>
                {room.p2}
              </StatusHeader>
              <StatusBody>
                <Content>
                  <ContentHeader>Score</ContentHeader>
                  <ContentBody>
                    {p2}
                  </ContentBody>
                </Content>
                <Content>
                  <ContentHeader>Turn</ContentHeader>
                  <ContentBody>
                    {room.turn !== 0 && room.turn % 2 === 0 ? (
                      <TurnAlarm />
                    ): (<></>)}
                  </ContentBody>
                </Content>
              </StatusBody>
              </>
            ) : (
              <>Waiting ..</>
            )}
          </StatusBox>
        </StatusContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`

const ContentContainer = styled.div<{ isEnterName: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  ${(props) => props.isEnterName ? 'opacity: 0.3;' : ''}
`

const BoardContainer = styled.div`
  flex: 0 0 800px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StatusContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid #dddddd;
`

const StatusBox = styled.div<{ isMe: boolean }>`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${(props) => props.isMe ? 'border: 1px solid green;' : 'border-bottom: 1px solid #dddddd;'}
`

const StatusHeader = styled.div`
  display: flex;
  width: 100%;
  flex: 0 0 35px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dddddd;
`

const StatusBody = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Content = styled.div`
  height: 100%;
  flex: 0 0 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid #dddddd;
`

const ContentHeader = styled.div`
  flex: 0 0 35px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dddddd;
`

const ContentBody = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const TurnAlarm = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: green;
`

const StartButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 50px;
  border: 1px solid #888888;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  z-index: 5;
  cursor: pointer;
`

const ReStartButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 150px;
  border: 1px solid #888888;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  z-index: 5;
  cursor: pointer;
`

const EnterNameBox = styled.div`
  width: 400px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #888888;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  z-index: 5;
`

const EnterInput = styled.input`
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding-left: 10px;
  width: 200px;
  height: 32px;
`

export default RoomComponent