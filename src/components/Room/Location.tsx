import { PUT_UNIT } from '../../apollo/queries'
import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
type Props = {
  x: number
  y: number
  unit: number
  code: string
}

function LocationComponent(props: Props) {
  const [putUnit] = useMutation(PUT_UNIT)
  const onHandlePut = () => {
    putUnit({
      variables: {
        x: props.x,
        y: props.y,
        code: props.code,
        userName: localStorage.getItem('userName')
      }
    })
  }
  return (
    <Box onClick={onHandlePut} isRight={props.x === 8} isBottom={props.y === 1}>
      {props.unit !== 0 ? (
        <Unit isBlack={props.unit === 1} />
      ): null}
    </Box>
  )
}


const Box = styled.div<{ isRight: boolean , isBottom: boolean}>`
  ${(props) => props.isRight ? '' : 'border-right: 1px solid #000000'};
  ${(props) => props.isBottom ? '' : 'border-bottom: 1px solid #000000'};
  width: 70px;
  height: 70px;
  cursor: pointer;
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



export default LocationComponent