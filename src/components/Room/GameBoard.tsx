import Location from './Location'
import React from 'react'
import styled from 'styled-components'

type Props = {
  board: LocationType[][]
  code: string
  isMyTurn: boolean
  userPosition: number
}

type LocationType = {
  x: number
  y: number
  unit: number
}

function BoardComponent(props: Props) {
  return (
    <Board>
        {props.board.map((row: LocationType[]) => {
          return (
            <Row>
              {row.map((location) => {
                return (
                  <Location userPosition={props.userPosition} isMyTurn={props.isMyTurn} x={location.x} y={location.y} unit={location.unit} code={props.code}/>
                )
              })}
            </Row>
          )
        })}
    </Board>
  )
}


const Board = styled.div`
  flex: 0 0 567px;
  height: 567px;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
`

export default BoardComponent