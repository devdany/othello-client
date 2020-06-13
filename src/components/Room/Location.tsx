import React, { useState } from 'react'

import { PUT_UNIT } from '../../apollo/queries'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'

type Props = {
  x: number
  y: number
  unit: number
  code: string
  userPosition: number
  isMyTurn: boolean
}

function LocationComponent(props: Props) {
  const [putUnit] = useMutation(PUT_UNIT)
  const [isViewUnit, setViewUnit] = useState(false)
  const onHandlePut = () => {
    putUnit({
      variables: {
        x: props.x,
        y: props.y,
        code: props.code,
        userName: localStorage.getItem('userName')
      }
    })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }

  const handleMouseEnter = () => {
    if (props.isMyTurn) {
      setViewUnit(true)
    }
  }

  return (
    <Box isMyTurn={props.isMyTurn} onMouseLeave={() => { setViewUnit(false) }} onMouseEnter={handleMouseEnter} onClick={onHandlePut} isRight={props.x === 8} isBottom={props.y === 1}>
      {props.unit !== 0 ? (
        <Unit isBlack={props.unit === 2} />
      ): null}
      {props.unit === 0 && isViewUnit ? (
        <OpacityUnit isBlack={props.userPosition === 2} />
      ): null}
    </Box>
  )
}


const Box = styled.div<{ isRight: boolean , isBottom: boolean, isMyTurn: boolean}>`
  ${(props) => props.isRight ? '' : 'border-right: 1px solid #000000'};
  ${(props) => props.isBottom ? '' : 'border-bottom: 1px solid #000000'};
  width: 70px;
  height: 70px;
  ${(props) => props.isMyTurn ? 'cursor: pointer;' : ''}
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
`

const Unit = styled.div<{ isBlack: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${(props) => props.isBlack ? '#000000' : '#ffffff'}
`

const OpacityUnit = styled.div<{ isBlack: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  opacity: 0.3;
  background-color: ${(props) => props.isBlack ? '#000000' : '#ffffff'}
`



export default LocationComponent