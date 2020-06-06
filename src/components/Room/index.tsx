import { GET_ROOM, ON_PUT_UNIT } from '../../apollo/queries'
import React, { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'

import Board from './GameBoard'
import styled from 'styled-components'

type Props = {
  match: any
}

const initRoom = {
  code: '',
  p1: '',
  board: [],
  isGaming: false,
  winner: 0,
  turn: 0,
}

function RoomComponent(props: Props) {
  let code = ''
  if (props.match && props.match.params) {
    code = props.match.params.roomId
  }
  const [room, setRoom] = useState(initRoom)
  const roomResult = useQuery(GET_ROOM, {
    variables: {
      code: code,
    }
  })

  const onPutResult = useSubscription(
    ON_PUT_UNIT,
    { variables: {
      code: code,
    }}
  )

  if (roomResult.data) {
    if (room.code === '' || room.turn !== roomResult.data.getRoom.turn) {
      setRoom(roomResult.data.getRoom)
    }
  }

  console.log('subscribe', onPutResult)
  return (
    <Container>
      <ContentContainer>
        <BoardContainer>
          <Board board={room.board} code={code} />
        </BoardContainer>
        <StatusContainer>
          
        </StatusContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const BoardContainer = styled.div`
  flex: 0 0 800px;
  height: 100%;
  display: flex;
  border: 1px solid red;
  justify-content: center;
  align-items: center;
`

const StatusContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
`

export default RoomComponent